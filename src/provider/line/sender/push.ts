import {
    TextMessage,
    ImageMessage,
    MessageAPIResponseBase,
} from "@line/bot-sdk";

import {
    client
} from '../index';

/**
 * Send a text message to the chat room.
 * @param {string} text The text to send.
 * @param {string} roomId ID of the chat room.
 * @returns {Promise<MessageAPIResponseBase>}
 */
export function sendTextMessage(
    text: string,
    roomId: string
): Promise<MessageAPIResponseBase> {
    const message: TextMessage = {
        type: "text",
        text,
    };
    return client.pushMessage(roomId, message);
}

/**
 * Send an image message to the chat room.
 * @param {string} imageUrl URL of the image.
 * @param {string} roomId ID of the chat room.
 * @returns {Promise<MessageAPIResponseBase>}
 */
export function sendImageMessage(
    imageUrl: string,
    roomId: string
): Promise<MessageAPIResponseBase> {
    const message: ImageMessage = {
        type: "image",
        originalContentUrl: imageUrl,
        previewImageUrl: imageUrl,
    };
    return client.pushMessage(roomId, message);
}
