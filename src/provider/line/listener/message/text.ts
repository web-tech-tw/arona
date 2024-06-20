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

import Link from "../../../link";
import Pair from "../../../pair";

type CommandMethodParameters = {
    event: MessageEvent,
    args: Array<string>
};
type CommandMethod = (params: CommandMethodParameters) =>
    Promise<void> | void;
type CommandMethodList = {
    [key: string]: CommandMethod
};

const commands: CommandMethodList = {
    "chatId": ({event}) => {
        const {chatId} = getInfoFromSource(event.source);
        const replyMessage: TextMessage = {
            type: "text",
            text: chatId,
        };
        chatClient.replyMessage({
            replyToken: event.replyToken,
            messages: [replyMessage],
        });
    },
    "pair": ({event}) => {
        if (event.source.type !== "group") {
            return;
        }

        const {chatId} = getInfoFromSource(event.source);
        const pairId = new Pair({
            chatFrom: "line",
            chatId,
        }).create();

        const replyMessage: TextMessage = {
            type: "text",
            text: pairId,
        };
        chatClient.replyMessage({
            replyToken: event.replyToken,
            messages: [replyMessage],
        });
    },
    "riap": async ({event, args}) => {
        if (event.message.type !== "text") {
            return;
        }

        const pair = Pair.find(args[1]);
        if (!pair || pair.chatFrom === "line") {
            const replyMessage: TextMessage = {
                type: "text",
                text: "Invalid pair ID",
            };
            chatClient.replyMessage({
                replyToken: event.replyToken,
                messages: [replyMessage],
            });
            return;
        }

        const {chatId} = getInfoFromSource(event.source);
        new Link({line: chatId, matrix: pair.chatId}).create();
        pair.delete();

        const replyMessage: TextMessage = {
            type: "text",
            text: "OK",
        };
        chatClient.replyMessage({
            replyToken: event.replyToken,
            messages: [replyMessage],
        });
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
        await commands[command]({
            event, args,
        });
        return;
    }

    const {chatId} = getInfoFromSource(event.source);

    const link = Link.find("line", chatId);
    if (!link) return;

    const sender = await Sender.fromLINESource(event.source);
    link.toBroadcastExcept("line", (provider, chatId) => {
        provider.text(sender, chatId, text);
    });
};
