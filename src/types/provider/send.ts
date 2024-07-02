import Sender from "../sender";

import {
    BaseProvider,
} from "../provider";

/**
 * @param {Sender} sender - The sender of the message.
 * @param {string} chatId - The ID of the chat room.
 * @param {string} text - The text to send.
 */
export type SendTextParameters = {
    sender: Sender,
    chatId: string,
    text: string,
}

/**
 * @param {Sender} sender - The sender of the message.
 * @param {string} chatId - The ID of the chat room.
 * @param {Buffer} imageBuffer - The image buffer.
 */
export type SendImageParameters = {
    sender: Sender,
    chatId: string,
    imageBuffer: Buffer,
}

/**
 * @param {Sender} sender - The sender of the message.
 * @param {string} chatId - The ID of the chat room.
 * @param {string} imageUrl - The image URL.
 */
export type SendImageUrlParameters = {
    sender: Sender,
    chatId: string,
    imageUrl: string,
}

/**
 * SendProvider
 * @interface
 * @property {Function} text - Send a text message to the chat room.
 * @property {Function} image - Send an image message to the chat room.
 * @property {Function} imageUrl - Send an image message to the chat room.
 */
export interface SendProvider extends BaseProvider {
    text: (params: SendTextParameters) => Promise<void>;
    image: (params: SendImageParameters) => Promise<void>;
    imageUrl: (params: SendImageUrlParameters) => Promise<void>;
}
