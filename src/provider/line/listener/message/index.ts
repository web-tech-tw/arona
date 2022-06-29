import {
    MessageAPIResponseBase,
    MessageEvent,
    WebhookEvent,
} from "@line/bot-sdk";

import text from "./text";
import image from "./image";
import sticker from "./sticker";

type CommandMethod = (event: MessageEvent) =>
    Promise<MessageAPIResponseBase | undefined> | undefined;

type CommandMethodList = { [key: string]: CommandMethod };

const messageHandlers: CommandMethodList = {
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
        return messageHandlers[event.message.type](event);
    }
};
