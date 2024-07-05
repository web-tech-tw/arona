import {
    bridgeProviderConfig,
} from "../config";

import {
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
    chatWithAI,
} from "../providers/openai/client";

import {
    createNotifyAuthUrl,
} from "../providers/line/client";

import Pair from "../types/pair";
import Link from "../types/link";
import NotifyLink from "../types/notify_link";

const {
    line: lineConfig,
} = bridgeProviderConfig();

const {
    notifyEnable,
} = lineConfig;

export const textToArguments = (
    text: string,
    trigger: string,
): Array<string> | null => {
    if (!text.startsWith(trigger)) {
        return null;
    }
    return text.substring(1).split(" ");
};

export const commandExecutor = async (
    params: CommandMethodParameters,
): Promise<void> => {
    const {args} = params;
    const key = args[0];
    if (!(key in commands)) {
        return;
    }
    const {
        method,
    } = commands[key];
    await method(params);
};

export const commands: CommandMethodList = {
    "ai": {
        description: "AI chat",
        method: async ({source, args, reply}) => {
            const response = await chatWithAI(source.chatId, args[1]);
            reply(response);
        },
        options: [{
            name: "question",
            type: "string",
            description: "The question to ask the AI",
            required: true,
        }],
    },
    "aiLink": {
        description: "Link with AI chat",
        method: async ({source, reply}) => {
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
        description: "Unlink with AI chat",
        method: async ({source, reply}) => {
            const link = Link.use(
                source.providerType,
                source.chatId,
            );
            link.disconnect("openai");
            link.save();
            reply("AI chat unlinked");
        },
    },
    "setLocaleCode": {
        description: "Set locale",
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
        description: "Get chat ID",
        method: ({source, locale, reply}) => {
            const {chatId} = source;
            reply(
                `${locale.text("chat_id_here")}:\n` +
                `${chatId}`,
            );
        },
    },
    "pair": {
        description: "Pair with another chat",
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
        description: "Link with another chat",
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
        description: "Unlink with another chat",
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
};
