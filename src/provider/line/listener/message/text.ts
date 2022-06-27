import {
    MessageEvent,
    TextEventMessage,
    TextMessage,
    MessageAPIResponseBase,
} from "@line/bot-sdk";

import {
    sendTextMessage
} from "../../../matrix/sender";

import {
    client,
} from "../../index";

const chatRoomId = process.env.MATRIX_CHAT_ROOM_ID || "";

const commands: { [key: string]: any } = {
    "getChatRoomId": (event: MessageEvent) => {
        const sourceId: string = (() => {
            switch (event.source.type) {
                case "user":
                    return event.source.userId;
                case "group":
                    return event.source.groupId;
                case "room":
                    return event.source.roomId;
                default:
                    return "";
            }
        })();
        const replyMessage: TextMessage = {
            type: "text",
            text: sourceId,
        };
        return client.replyMessage(event.replyToken, replyMessage);
    }
};

// Function handler to receive the text.
export default (
    event: MessageEvent
): Promise<MessageAPIResponseBase | undefined> | undefined => {
    const message: TextEventMessage = event.message as TextEventMessage;
    const { text } = message;

    if (text.startsWith("#") && text.substring(1).length > 0) {
        const command = text.substring(1);
        if (command in commands) {
            return commands[command](event);
        }
    }

    sendTextMessage(text, chatRoomId);
};
