import {
    MessageAPIResponseBase,
    MessageEvent,
    WebhookEvent,
} from "@line/bot-sdk";

import text from "./text";
import image from "./image";
import sticker from "./sticker";

type MessageTypeMethod = (event: MessageEvent) =>
    Promise<MessageAPIResponseBase | undefined> | undefined;

type MessageTypeMethodList = { [key: string]: MessageTypeMethod };

const messageHandlers: MessageTypeMethodList = {
    text,
    image,
    sticker,
};

export default (
    event: WebhookEvent,
): Promise<MessageAPIResponseBase | undefined> | undefined => {
    event = event as MessageEvent;
    const messageTypeName: string = event.message.type;
    if (messageTypeName in messageHandlers) {
        return messageHandlers[messageTypeName](event);
    }
};
