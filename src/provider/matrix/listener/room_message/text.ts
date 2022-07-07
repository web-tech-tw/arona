import {
    Sender,
} from "../../../../sender";

import {
    MessageEvent,
} from "matrix-bot-sdk";

import {
    MatrixListenerClient,
} from "../client";

import {
    sendTextMessage as replyMessagePrototype,
} from "../../sender";

import {
    sendTextMessage,
} from "../../../line/sender";

const systemName = process.env.DEVICE_NAME || "System";
const matrixChatRoomId = process.env.MATRIX_CHAT_ROOM_ID || "";
const lineChatRoomId = process.env.LINE_CHAT_ROOM_ID || "";

const replyMessage = (roomId: string, message: string) => {
    const sender: Sender = new Sender({
        displayName: systemName,
    });
    return replyMessagePrototype(
        sender, roomId, message,
    );
};

type CommandMethod = (roomId: string, event: MessageEvent<any>) =>
    Promise<void | undefined> | void | undefined;

type CommandMethodList = {
    [key: string]: CommandMethod
};

const commands: CommandMethodList = {
    "getChatRoomId": (roomId: string) => {
        console.info(roomId);
        replyMessage(roomId, roomId);
    },
};

export default async (
    listenerClient: MatrixListenerClient,
    roomId: string,
    event: MessageEvent<any>,
): Promise<undefined> => {
    const messageEvent = event;

    const text = messageEvent.textBody;
    if (text.startsWith("#") && text.substring(1).length > 0) {
        const command = text.substring(1);
        if (command in commands) {
            await commands[command](roomId, messageEvent);
            return;
        }
    }

    if (roomId !== matrixChatRoomId) return;

    const senderProfile =
        await listenerClient.getUserProfile(messageEvent.sender);
    const senderIconHttp =
        listenerClient.mxcToHttp(senderProfile.avatar_url);
    const sender: Sender = new Sender({
        displayName: senderProfile.displayname,
        pictureUrl: senderIconHttp,
    });

    sendTextMessage(sender, text, lineChatRoomId);
};
