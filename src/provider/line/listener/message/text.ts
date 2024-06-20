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
} from "../../../sender";

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
    source: SourceInfo
};
type CommandMethod = (params: CommandMethodParameters) =>
    Promise<void> | void;
type CommandMethodList = {
    [key: string]: CommandMethod
};

const replyOneMessage = (replyToken: string, text: string) => {
    const replyMessage: TextMessage = {
        type: "text",
        text,
    };
    chatClient.replyMessage({
        replyToken: replyToken,
        messages: [replyMessage],
    });
};

const commands: CommandMethodList = {
    "chatId": ({event, source}) => {
        const {chatId} = source;
        replyOneMessage(event.replyToken, chatId);
    },
    "pair": ({event, source: {chatId}}) => {
        const pair = new Pair({chatFrom: "line", chatId});
        const pairId = pair.create();
        replyOneMessage(
            event.replyToken,
            `Pairing ID: ${pairId}\n\n` +
            "Please send the following command to the target chat room:\n" +
            `#pairLink ${pairId}`,
        );
    },
    "pairStatus": ({event, source: {chatId}}) => {
        const link = Link.use("line", chatId);
        if (!link.exists()) {
            replyOneMessage(event.replyToken, "Not paired");
            return;
        }
        replyOneMessage(event.replyToken, JSON.stringify(link));
    },
    "pairLink": async ({event, args, source: {chatId}}) => {
        const pair = Pair.find(args[1]);
        if (!pair || pair.chatFrom === "line") {
            replyOneMessage(event.replyToken, "Invalid pair ID");
            return;
        }

        const link = Link.use("line", chatId);
        link.connect(pair.chatFrom, pair.chatId);
        link.save();
        pair.delete();

        replyOneMessage(event.replyToken, "Paired");
    },
    "pairUnlink": async ({event, source: {chatId}}) => {
        const link = Link.use("line", chatId);
        if (!link.exists()) {
            replyOneMessage(event.replyToken, "Not paired");
            return;
        }
        link.disconnect("line");
        link.save();
        replyOneMessage(event.replyToken, "Unpaired");
    },
    "pairFlush": async ({event, source: {chatId}}) => {
        const link = Link.use("line", chatId);
        if (!link.exists()) {
            replyOneMessage(event.replyToken, "Not paired");
            return;
        }
        link.remove();
        replyOneMessage(event.replyToken, "Unpaired");
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
        await commands[command]({
            event, args, source,
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
