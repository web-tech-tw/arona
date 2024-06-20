import {
    Sender,
} from "../../../../sender";

import {
    MessageEvent,
    TextualMessageEventContent,
} from "matrix-bot-sdk";

import MatrixSend from "../../../submitter";

import Link from "../../../../link";
import Pair from "../../../../pair";

const systemName = process.env.DEVICE_NAME || "System";

const replyMessage = (roomId: string, message: string) => {
    const sender: Sender = new Sender({
        displayName: systemName,
    });
    const send = new MatrixSend();
    return send.text(
        sender, roomId, message,
    );
};

type CommandMethodParameters = {
    roomId: string,
    event: MessageEvent<TextualMessageEventContent>,
    args: Array<string>,
};
type CommandMethod = (params: CommandMethodParameters) =>
    Promise<void | undefined> | void | undefined;
type CommandMethodList = {
    [key: string]: CommandMethod
};

const commands: CommandMethodList = {
    "chatId": ({roomId}) => {
        replyMessage(roomId, roomId);
    },
    "pair": ({roomId}) => {
        const pairId = new Pair({
            chatFrom: "matrix",
            chatId: roomId,
        }).create();
        replyMessage(roomId, pairId);
    },
    "riap": ({roomId, args}) => {
        const pair = Pair.find(args[1]);
        if (!pair || pair.chatFrom === "matrix") {
            replyMessage(roomId, "Invalid pair ID");
            return;
        }

        new Link({line: roomId, matrix: pair.chatId}).create();
        pair.delete();

        replyMessage(roomId, "OK");
    },
};

export default async (
    roomId: string,
    event: MessageEvent<TextualMessageEventContent>,
): Promise<undefined> => {
    const text = event.textBody;
    if (text.startsWith("#")) {
        const args = text.substring(1).split(" ");
        const command = args[0];
        if (!(command in commands)) {
            return;
        }
        await commands[command]({
            roomId, event, args,
        });
        return;
    }

    const link = Link.find("matrix", roomId);
    if (!link) return;

    const sender = await Sender.fromMatrixSender(event.sender);
    link.toBroadcastExcept("matrix", (provider, chatId) => {
        provider.text(sender, chatId, text);
    });
};
