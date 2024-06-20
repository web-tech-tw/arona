/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    MatrixEvent,
    MessageEvent,
} from "matrix-bot-sdk";

import {
    client,
} from "../../../client";

import text from "./text";
import image from "./image";

type MessageTypeMethod = (
    roomId: string,
    event: MessageEvent<any>
) => Promise<void> | void;
type MessageTypeMethodList = { [key: string]: MessageTypeMethod };

const messageHandlers: MessageTypeMethodList = {
    "m.text": text,
    "m.image": image,
};

export default async (roomId: string, event: MatrixEvent) => {
    const messageEvent = new MessageEvent(event);
    if (
        !messageEvent.content ||
        messageEvent.sender === client.identity
    ) return;

    const messageTypeName: string = messageEvent.messageType;
    if (messageTypeName in messageHandlers) {
        return messageHandlers[messageTypeName](
            roomId,
            messageEvent,
        );
    }
};
