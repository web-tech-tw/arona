import {
    Sender,
} from "../../../sender";

import {
    AxiosResponse,
} from "axios";

import {
    notifyClient,
} from "../index";

import {
    ImageMessageOptions,
} from "./index";

import {
    stringify,
} from "querystring";

type Message = {
    message: string;
    imageThumbnail?: string;
    imageFullsize?: string;
    imageFile?: string;
    stickerPackageId?: number;
    stickerId?: number;
    notificationDisabled?: boolean;
};

const sendMessage =
    (message: Message): Promise<AxiosResponse> =>
        notifyClient.post("/api/notify", stringify(message));

/**
 * Send a text message to the chat room.
 * @param {Sender} sender The sender of the message.
 * @param {string} text The text to send.
 * @return {Promise<AxiosResponse>}
 */
export function sendTextMessage(
    sender: Sender,
    text: string,
): Promise<AxiosResponse> {
    const message: Message = {
        message: `${sender.displayName}: ${text}`,
    };
    return sendMessage(message);
}

/**
 * Send an image message to the chat room.
 * @param {Sender} sender The sender of the message.
 * @param {string} imageUrl URL of the image.
 * @return {Promise<AxiosResponse>}
 */
export function sendImageMessage(
    sender: Sender,
    imageUrl: string,
    _: string,
    options: ImageMessageOptions = {},
): Promise<AxiosResponse> {
    const message: Message = {
        message: `${sender.displayName}: Image:`,
        imageFullsize: imageUrl,
        imageThumbnail: options.thumbnailUrl || imageUrl,
    };
    return sendMessage(message);
}
