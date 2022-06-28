import {
    Sender,
} from "@line/bot-sdk";

import {
    AxiosResponse,
} from 'axios';

import {
    notifyClient,
} from '../index';

import {
    stringify,
} from 'querystring';

const sendMessage =
    (message: any): Promise<AxiosResponse> =>
        notifyClient.post("/api/notify", stringify(message));

/**
 * Send a text message to the chat room.
 * @param {Sender} sender The sender of the message.
 * @param {string} text The text to send.
 * @returns {Promise<AxiosResponse>}
 */
export function sendTextMessage(
    sender: Sender,
    text: string
): Promise<AxiosResponse> {
    return sendMessage({
        message: `${sender.name}: ${text}`,
    });
}

/**
 * Send an image message to the chat room.
 * @param {Sender} sender The sender of the message.
 * @param {string} imageUrl URL of the image.
 * @returns {Promise<AxiosResponse>}
 */
export function sendImageMessage(
    sender: Sender,
    imageUrl: string
): Promise<AxiosResponse> {
    (async () => sendTextMessage(sender, "Image:"))();
    return sendMessage({
        type: "image",
        originalContentUrl: imageUrl,
        previewImageUrl: imageUrl,
    });
}
