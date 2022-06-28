import {
    Sender,
    TextMessage,
    ImageMessage,
    MessageAPIResponseBase,
} from "@line/bot-sdk";

import {
    client,
} from "../index";

/**
 * Send a text message to the chat room.
 * @param {Sender} sender The sender of the message.
 * @param {string} text The text to send.
 * @param {string} roomId ID of the chat room.
 * @return {Promise<MessageAPIResponseBase>}
 */
export function sendTextMessage(
    sender: Sender,
    text: string,
    roomId: string,
): Promise<MessageAPIResponseBase> {
    const message: TextMessage = {
        type: "text",
        text,
        sender,
    };
    return client.pushMessage(roomId, message);
}

/**
 * Send an image message to the chat room.
 * @param {Sender} sender The sender of the message.
 * @param {string} imageUrl URL of the image.
 * @param {string} roomId ID of the chat room.
 * @return {Promise<MessageAPIResponseBase>}
 */
export function sendImageMessage(
    sender: Sender,
    imageUrl: string,
    roomId: string,
): Promise<MessageAPIResponseBase> {
    const message: ImageMessage = {
        type: "image",
        originalContentUrl: imageUrl,
        previewImageUrl: imageUrl,
        sender,
    };
    return client.pushMessage(roomId, message);
}
