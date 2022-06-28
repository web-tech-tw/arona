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
 * @param {string} text The text to send.
 * @returns {Promise<AxiosResponse>}
 */
export function sendTextMessage(
    sender: Sender,
    text: string
): Promise<AxiosResponse> {
    const message = {
        message: `${sender.name}: ${text}`,
    };
    return sendMessage(message);
}

/**
 * Send an image message to the chat room.
 * @param {string} imageUrl URL of the image.
 * @returns {Promise<AxiosResponse>}
 */
export function sendImageMessage(
    sender: Sender,
    imageUrl: string
): Promise<AxiosResponse> {
    (async () => sendTextMessage(sender, "Image:"))();
    const message = {
        type: "image",
        originalContentUrl: imageUrl,
        previewImageUrl: imageUrl,
    };
    return sendMessage(message);
}
