import {
    MessageAPIResponseBase,
    MessageEvent,
} from "@line/bot-sdk";

import text from "./text";

const messageHandlers = {
    text
};

export default (
    event: MessageEvent
): Promise<MessageAPIResponseBase | undefined> => {
    return messageHandlers[event.message.type](event);
};
