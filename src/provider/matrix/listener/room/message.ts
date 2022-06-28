import {
    Sender,
} from "@line/bot-sdk";

import {
    MatrixLintenerClient
} from '../index'

import {
    sendTextMessage as replyMessagePrototype
} from "../../sender";

import {
    sendTextMessage
} from "../../../line/sender";

const systemName = process.env.DEVICE_NAME || "System";
const matrixChatRoomId = process.env.MATRIX_CHAT_ROOM_ID || "";
const lineChatRoomId = process.env.LINE_CHAT_ROOM_ID || "";

const replyMessage = (roomId: string, message: any) => {
    const sender: Sender = {
        name: systemName,
    };
    return replyMessagePrototype(
        sender, roomId, message,
    );
};

const commands: { [key: string]: any } = {
    "getChatRoomId": (roomId: string, _: any) => {
        console.log(roomId);
        return replyMessage(roomId, roomId);
    }
};

export default (listenerClient: MatrixLintenerClient) => listenerClient.on("room.message", async (roomId, event) => {
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

    const senderProfile = await listenerClient.getUserProfile(senderId);
    const senderIconHttp = await listenerClient.mxcToHttp(senderProfile.avatar_url);
    const sender: Sender = {
        name: senderProfile.displayname,
        iconUrl: senderIconHttp,
    };

    sendTextMessage(sender, text, lineChatRoomId);
});
