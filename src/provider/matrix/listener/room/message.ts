import {
    Sender,
} from "../../../../sender";

import {
    MatrixEvent,
} from "matrix-bot-sdk";

import {
    MatrixLintenerClient,
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

type CommandMethod = (roomId: string, event: MatrixEvent<string>) =>
    Promise<void | undefined> | void | undefined;

type CommandMethodList = {
    [key: string]: CommandMethod
};

const commands: CommandMethodList = {
    "getChatRoomId": (roomId: string) => {
        console.log(roomId);
        replyMessage(roomId, roomId);
    },
};

export default (listenerClient: MatrixLintenerClient) =>
    listenerClient.on("room.message", async (roomId, event) => {
        const senderId = event["sender"];
        if (senderId === listenerClient.identity || !event["content"]) return;

        const text = event["content"]["body"];
        if (text.startsWith("#") && text.substring(1).length > 0) {
            const command = text.substring(1);
            if (command in commands) {
                return await commands[command](roomId, event);
            }
        }

        if (roomId !== matrixChatRoomId) return;

        const senderProfile =
            await listenerClient.getUserProfile(senderId);
        const senderIconHttp =
            await listenerClient.mxcToHttp(senderProfile.avatar_url);
        const sender: Sender = new Sender({
            displayName: senderProfile.displayname,
            pictureUrl: senderIconHttp,
        });

        sendTextMessage(sender, text, lineChatRoomId);
    });
