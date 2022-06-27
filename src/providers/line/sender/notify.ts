import {
    AxiosResponse,
} from 'axios';

import {
    notifyClient,
} from '../index';

const sendMessage =
    (message: Object): Promise<AxiosResponse> =>
        notifyClient.post("/api/notify", message);

/**
 * Send a text message to the chat room.
 * @param {string} text The text to send.
 * @returns {Promise<AxiosResponse>}
 */
export function sendTextMessage(
    text: string
): Promise<AxiosResponse> {
    const message = {
        type: "text",
        text,
    };
    return sendMessage(message);
}

/**
 * Send an image message to the chat room.
 * @param {string} imageUrl URL of the image.
 * @returns {Promise<AxiosResponse>}
 */
export function sendImageMessage(
    imageUrl: string
): Promise<AxiosResponse> {
    const message = {
        type: "image",
        originalContentUrl: imageUrl,
        previewImageUrl: imageUrl,
    };
    return sendMessage(message);
}
