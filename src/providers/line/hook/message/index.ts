import {
    WebhookEvent,
    MessageEvent,
} from "@line/bot-sdk";

import text from "./text";
import image from "./image";
import sticker from "./sticker";

type MessageTypeMethod = (event: MessageEvent) =>
    Promise<void> | void;

type MessageTypeMethodList = {
    [type: string]: MessageTypeMethod
};

const methodList: MessageTypeMethodList = {
    text, image, sticker,
};

export default (event: WebhookEvent): Promise<void> | void => {
    const e = event as MessageEvent;
    const {type} = e.message;
    if (type in methodList) {
        methodList[type](e);
    }
};
