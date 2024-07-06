import {
    bridgeProviderConfig,
} from "../config";

import {
    CommandReply,
    CommandMethodList,
    CommandMethodParameters,
} from "./types";

import {
    providers,
} from "../types/provider";

import {
    nanoid,
} from "nanoid";

import {
    createNotifyAuthUrl,
} from "../providers/line/client";

import Sender from "../types/sender";
import Pair from "../types/pair";
import Link from "../types/link";
import NotifyLink from "../types/notify_link";

const {
    line: lineConfig,
    openai: openaiConfig,
} = bridgeProviderConfig();

const {
    notifyEnable,
} = lineConfig;

const {
    enable: openaiEnable,
} = openaiConfig;

export const textToArguments = (
    text: string,
    trigger: string,
    limit: number = -1,
): Array<string> | null => {
    if (!text.startsWith(trigger)) {
        return null;
    }
    const commad = text.substring(trigger.length);
    return commad.split(" ", limit);
};

export const commandExecutor = async (
    args: Array<string>,
    sender: Sender,
    reply: CommandReply,
): Promise<void> => {
    const key = args[0];
    if (!(key in commands)) {
        return;
    }
    const {
        commandSource: source,
        roomLink: {locale},
    } = sender;
    const {method, options} = commands[key];
    const optionsLength = options?.length ?? 0;
    if (args.length - 1 < optionsLength) {
        reply(locale.text("invalid_arguments"));
        return;
    }
    const params: CommandMethodParameters = {
        args, source, locale, reply, sender,
    };
    await method(params);
};

export const commands: CommandMethodList = {
    "aiLink": {
        description: "Link with artificial intelligence conversation",
        method: async ({source, reply}) => {
            if (!openaiEnable) {
                reply("AI is not enabled");
                return;
            }
            const link = Link.use(
                source.providerType,
                source.chatId,
            );
            const aiChatId = nanoid();
            link.connect("openai", aiChatId);
            link.save();
            reply("AI chat linked");
        },
    },
    "aiUnlink": {
        description: "Unlink from artificial intelligence conversation",
        method: async ({source, reply}) => {
            if (!openaiEnable) {
                reply("AI is not enabled");
                return;
            }
            const link = Link.use(
                source.providerType,
                source.chatId,
            );
            link.disconnect("openai");
            link.save();
            reply("AI chat unlinked");
        },
    },
    "setLocale": {
        description: "Set locale code for the chat",
        method: async ({args, source, reply}) => {
            const localeCode = args[1];
            const link = Link.use(
                source.providerType,
                source.chatId,
            );
            link.setLocaleCode(localeCode);
            link.save();
            reply(`Locale set to ${localeCode}`);
        },
        options: [{
            name: "locale",
            type: "string",
            description: "The locale to set",
            required: true,
        }],
    },
    "datetime": {
        description: "Get current date and time",
        method: ({locale, reply}) => {
            const date = new Date();
            reply(
                `${locale.text("current_datetime")}:\n` +
                `${date}`,
            );
        },
    },
    "chatId": {
        description: "Get the ID of the chat",
        method: ({source, locale, reply}) => {
            const {chatId} = source;
            reply(
                `${locale.text("chat_id_here")}:\n` +
                `${chatId}`,
            );
        },
    },
    "pair": {
        description: "Start pairing with another chat",
        method: ({source, locale, reply}) => {
            const pair = new Pair({
                chatFrom: source.providerType,
                chatId: source.chatId,
            });
            const pairId = pair.create();
            let message: string =
                `${locale.text("pairing_id")}: ${pairId}\n\n` +
                `${locale.text("pairing_notice")}:\n` +
                `/pairLink ${pairId}`;

            const notifyLink = NotifyLink.use(source.chatId);
            if (
                source.providerType === "line" &&
                notifyEnable && !notifyLink.exists()
            ) {
                message += "\n\n";
                message += locale.text("notify_enable_notice");
                message += "\n";
                message += createNotifyAuthUrl(source.chatId);
            }
            reply(message);
        },
    },
    "pairStatus": {
        description: "Get pairing status",
        method: ({source, locale, reply}) => {
            const link = Link.use(
                source.providerType,
                source.chatId,
            );
            if (!link.exists()) {
                reply(
                    locale.text("pairing_not_exists"),
                );
                return;
            }
            const {key, bridge} = link;
            if (bridge && Object.keys(bridge).length) {
                reply("Linked Bridges:\n\n" + Object.entries(bridge).map(
                    ([key, value]) => `${providers[key]}: ${value}`,
                ).join("\n") + `\n\nLink Chain: ${key}`);
            } else {
                reply(
                    locale.text("pairing_no_bridge"),
                );
            }
        },
    },
    "pairLink": {
        description: "Link the chat with the pairing",
        method: async ({source, args, locale, reply}) => {
            const pair = Pair.find(args[1]);
            if (!pair || pair.chatFrom === source.providerType) {
                reply(locale.text("pairing_id_invalid"));
                return;
            }

            let link: Link;
            link = Link.use(
                pair.chatFrom,
                pair.chatId,
            );
            if (link.exists()) {
                link.connect(
                    source.providerType,
                    source.chatId,
                );
            } else {
                link = Link.use(
                    source.providerType,
                    source.chatId,
                );
                link.connect(
                    pair.chatFrom,
                    pair.chatId,
                );
            }

            link.save();
            pair.delete();

            let message: string = locale.text("pairing_success");
            const notifyLink = NotifyLink.use(source.chatId);
            if (
                source.providerType === "line" &&
                notifyEnable && !notifyLink.exists()
            ) {
                message += "\n\n";
                message += locale.text("notify_enable_notice");
                message += "\n";
                message += createNotifyAuthUrl(source.chatId);
            }
            reply(message);
        },
        options: [{
            name: "pairId",
            type: "string",
            description: "Pairing ID",
            required: true,
        }],
    },
    "pairUnlink": {
        description: "Unlink the chat from the pairing",
        method: async ({source, locale, reply}) => {
            const link = Link.use(
                source.providerType,
                source.chatId,
            );
            if (!link.exists()) {
                reply(locale.text("pairing_not_exists"));
                return;
            }
            link.disconnect(source.providerType);
            link.save();

            if (source.providerType === "line" && notifyEnable) {
                const notifyLink = NotifyLink.use(source.chatId);
                if (notifyLink.exists()) {
                    notifyLink.remove();
                }
            }
            reply(locale.text("pairing_removed"));
        },
    },
    "help": {
        description: "Show the help message",
        method: ({reply}) => {
            const message = helpMessage();
            reply(message);
        },
    },
};

/**
 * Generate help message
 * @return {string}
 */
function helpMessage(): string {
    return "Commands: " + Object.entries(commands).map(
        ([key, {description, options}]) => {
            let message = `/${key}: ${description}`;
            if (options) {
                message += "\n  " + options.map(
                    ({name, description}) =>
                        `${name} - ${description}`,
                ).join("\n");
            }
            return message;
        },
    ).join("\n\n");
}
