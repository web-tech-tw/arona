import Locale from "../../../../locales";

import {
    MessageEvent,
    TextEventMessage,
    TextMessage,
} from "@line/bot-sdk";

import {
    getInfoFromSource,
} from "../../utils";

import {
    Sender,
} from "../../../types";

import {
    messagingClient as chatClient,
} from "../../client";

import {
    SourceInfo,
} from "../../types";

import Link from "../../../link";
import Pair from "../../../pair";

type CommandMethodParameters = {
    event: MessageEvent,
    args: Array<string>,
    source: SourceInfo,
    locale: Locale,
};
type CommandMethod = (params: CommandMethodParameters) =>
    Promise<void> | void;
type CommandMethodList = {
    [key: string]: CommandMethod
};

const replyOneMessage = (replyToken: string, text: string) => {
    const sender: Sender = new Sender({});
    const replyMessage: TextMessage = {
        type: "text",
        text: `${sender.prefix}\n${text}`,
    };
    chatClient.replyMessage({
        replyToken: replyToken,
        messages: [replyMessage],
    });
};

const commands: CommandMethodList = {
    "chatId": ({event, source, locale}) => {
        const {chatId} = source;
        replyOneMessage(
            event.replyToken,
            `${locale.text("chat_id_here")}:\n` +
            `${chatId}`,
        );
    },
    "pair": ({event, source: {chatId}, locale}) => {
        const pair = new Pair({chatFrom: "line", chatId});
        const pairId = pair.create();
        replyOneMessage(
            event.replyToken,
            `${locale.text('pairing_id')}: ${pairId}\n\n` +
            `${locale.text('pairing_notice')}:\n` +
            `#pairLink ${pairId}`,
        );
    },
    "pairStatus": ({event, source: {chatId}, locale}) => {
        const link = Link.use("line", chatId);
        if (!link.exists()) {
            replyOneMessage(
                event.replyToken,
                locale.text("pairing_not_exists"),
            );
            return;
        }
        replyOneMessage(event.replyToken, JSON.stringify(link));
    },
    "pairLink": async ({event, args, source: {chatId}, locale}) => {
        const pair = Pair.find(args[1]);
        if (!pair || pair.chatFrom === "line") {
            replyOneMessage(
                event.replyToken,
                locale.text("pairing_id_invalid"),
            );
            return;
        }

        const link = Link.use("line", chatId);
        link.connect(pair.chatFrom, pair.chatId);
        link.save();
        pair.delete();

        replyOneMessage(
            event.replyToken,
            locale.text("pairing_success"),
        );
    },
    "pairUnlink": async ({event, source: {chatId}, locale}) => {
        const link = Link.use("line", chatId);
        if (!link.exists()) {
            replyOneMessage(
                event.replyToken,
                locale.text("pairing_not_exists"),
            );
            return;
        }
        link.disconnect("line");
        link.save();
        replyOneMessage(
            event.replyToken,
            locale.text("pairing_removed"),
        );
    },
};

// Function handler to receive the text.
export default async (event: MessageEvent): Promise<void> => {
    const message: TextEventMessage = event.message as TextEventMessage;
    const {text} = message;

    if (text.startsWith("#")) {
        const args = text.substring(1).split(" ");
        const command = args[0];
        if (!(command in commands)) {
            return;
        }
        const source = getInfoFromSource(event.source);
        const locale = new Locale("en");
        await commands[command]({
            event, args, source, locale,
        });
        return;
    }

    const {chatId} = getInfoFromSource(event.source);

    const link = Link.use("line", chatId);
    if (!link.exists()) return;

    const sender = await Sender.fromLINESource(event.source);
    link.toBroadcastExcept("line", (provider, chatId) => {
        provider.text({sender, chatId, text});
    });
};
