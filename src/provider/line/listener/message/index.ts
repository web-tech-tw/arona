import {
    MessageAPIResponseBase,
    MessageEvent,
} from "@line/bot-sdk";

import text from "./text";

type CommandMethod = { [key: string]: (string, any) => any };

const messageHandlers: CommandMethod = {
    text,
};

export default (
    event: MessageEvent,
): Promise<MessageAPIResponseBase | undefined> | undefined => {
    const messageTypeName: string = event.message.type;
    if (messageTypeName in messageHandlers) {
        return messageHandlers[event.message.type](event);
    }
};
