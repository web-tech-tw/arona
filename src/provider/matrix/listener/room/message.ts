import {
    MatrixClient
} from "matrix-bot-sdk";

import {
    sendTextMessage
} from "../../../line/sender";

const chatRoomId = process.env.LINE_CHAT_ROOM_ID || "";

export default (client: MatrixClient) => client.on("room.message", (roomId, event) => {
    if (!event["content"]) return;
    const sender = event["sender"];
    const body = event["content"]["body"];
    sendTextMessage(`${roomId}: ${sender} says '${body}`, chatRoomId);
});
