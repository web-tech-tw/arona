import {
    Sender,
} from "../../../sender";

import {
    Sender as LINESender,
    TextMessage,
    ImageMessage,
    MessageAPIResponseBase,
} from "@line/bot-sdk";

import {
    client,
} from "../index";

import {
    ImageMessageOptions,
} from "./index";

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
    const lineSender: LINESender = sender.toLINE();
    const message: TextMessage = {
        type: "text",
        sender: lineSender,
        text,
    };
    return client.pushMessage(roomId, message);
}

/**
 * Send an image message to the chat room.
 * @param {Sender} sender The sender of the message.
 * @param {string} imageUrl URL of the image.
 * @param {string} roomId ID of the chat room.
 * @param {ImageMessageOptions} options The options to send image message.
 * @return {Promise<MessageAPIResponseBase>}
 */
export function sendImageMessage(
    sender: Sender,
    imageUrl: string,
    roomId: string,
    options: ImageMessageOptions = {},
): Promise<MessageAPIResponseBase> {
    const lineSender: LINESender = sender.toLINE();
    const message: ImageMessage = {
        type: "image",
        sender: lineSender,
        originalContentUrl: imageUrl,
        previewImageUrl: options.thumbnailUrl || imageUrl,
    };
    return client.pushMessage(roomId, message);
}
