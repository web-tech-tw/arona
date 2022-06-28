import {
    MessageAPIResponseBase,
    MessageEvent,
    WebhookEvent,
} from "@line/bot-sdk";

import text from "./text";

type CommandMethod = (event: MessageEvent) =>
    Promise<MessageAPIResponseBase | undefined> | undefined;

type CommandMethodList = { [key: string]: CommandMethod };

const messageHandlers: CommandMethodList = {
    text,
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
