import * as push from "./push";
import * as notify from "./notify";

import {
    MessageAPIResponseBase,
} from "@line/bot-sdk";

import {
    AxiosResponse,
} from "axios";

const client = process.env.LINE_SEND_MESSAGE_MODE === "push" ? push : notify;

/**
 * Send a text message to the chat room.
 * @param {string} text The text to send.
 * @param {string} roomId ID of the chat room.
 * @returns {Promise<MessageAPIResponseBase | AxiosResponse>}
 */
export function sendTextMessage(
    text: string,
    roomId: string
): Promise<MessageAPIResponseBase | AxiosResponse> {
    return client.sendTextMessage(text, roomId);
}

/**
 * Send an image message to the chat room.
 * @param {string} imageUrl URL of the image.
 * @param {string} roomId ID of the chat room.
 * @returns {Promise<MessageAPIResponseBase | AxiosResponse>}
 */
export function sendImageMessage(
    imageUrl: string,
    roomId: string
): Promise<MessageAPIResponseBase | AxiosResponse> {
    return client.sendImageMessage(imageUrl, roomId);
}
