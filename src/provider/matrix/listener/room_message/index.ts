import {
    MessageEvent,
} from "matrix-bot-sdk";

import {
    MatrixListenerClient,
} from "../client";

import text from "./text";
import image from "./image";

type MessageTypeMethod = (
    listenerClient: MatrixListenerClient,
    roomId: string,
    event: MessageEvent<any>
) => Promise<undefined> | undefined;

type MessageTypeMethodList = { [key: string]: MessageTypeMethod };

const messageHandlers: MessageTypeMethodList = {
    "m.text": text,
    "m.image": image,
};

export default (listenerClient: MatrixListenerClient) => {
    listenerClient.on(
        "room.failed_decryption",
        async (roomId: string, event: any, error: Error) => {
            console.error(
                `Failed to decrypt ${roomId} ${event["event_id"]} because`,
                error,
            );
        },
    );

    listenerClient.on(
        "room.message",
        async (roomId: string, event: any) => {
            const messageEvent = new MessageEvent(event);
            if (
                !messageEvent.content ||
                messageEvent.sender === listenerClient.identity
            ) return;

            const messageTypeName: string = messageEvent.messageType;
            if (messageTypeName in messageHandlers) {
                return messageHandlers[messageTypeName](
                    listenerClient,
                    roomId,
                    messageEvent,
                );
            }
        },
    );
};
