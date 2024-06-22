import {
    Sender,
} from "../../types";

import {
    AxiosResponse,
} from "axios";

import {
    notifyClient,
} from "../client";

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

/**
 * Send a message to the chat room.
 * @param {Message} message The message to send.
 * @return {Promise<AxiosResponse>}
 */
function sendMessage(message: Message): Promise<AxiosResponse> {
    return notifyClient.post("/api/notify", stringify(message));
}

/**
 * Send a text message to the chat room.
 * @param {Sender} sender - The sender of the message.
 * @param {string} chatId - The ID of the chat room.
 * @param {string} text - The text to send.
 * @return {Promise<AxiosResponse>}
 */
export function sendTextMessage(
    sender: Sender,
    chatId: string,
    text: string,
): Promise<AxiosResponse> {
    const message: Message = {
        message: `${sender.displayName}: ${text}`,
    };
    return sendMessage(message);
}

/**
 * Send an image message to the chat room.
 * @param {Sender} sender - The sender of the message.
 * @param {string} chatId - The ID of the chat room.
 * @param {string} imageUrl - The image URL.
 * @param {ImageMessageOptions} options - The options to send image message.
 * @return {Promise<AxiosResponse>}
 */
export function sendImageMessage(
    sender: Sender,
    chatId: string,
    imageUrl: string,
): Promise<AxiosResponse> {
    const message: Message = {
        message: `${sender.displayName}: Image:`,
        imageFullsize: imageUrl,
        imageThumbnail: imageUrl,
    };
    return sendMessage(message);
}
