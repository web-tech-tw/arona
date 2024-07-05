import Sender from "../../../types/sender";

import {
    AxiosResponse,
} from "axios";

import {
    notifyClient,
} from "../client";

import {
    stringify,
} from "querystring";

import NotifyLink from "../../../types/notify_link";

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
 * @param {string} chatId The ID of the chat room.
 * @param {Message} message The message to send.
 * @return {Promise<AxiosResponse>}
 */
function sendMessage(chatId: string, message: Message): Promise<AxiosResponse> {
    if (!notifyClient) {
        throw new Error("Client is not initialized.");
    }
    const link = NotifyLink.use(chatId);
    if (!link.exists()) {
        throw new Error("Link not found.");
    }
    const {accessToken} = link;
    const headers = {
        Authorization: `Bearer ${accessToken}`,
    };
    return notifyClient.post(
        "/api/notify",
        stringify(message),
        {headers},
    );
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
        message: `${sender.prefix}\n${text}`,
    };
    return sendMessage(chatId, message);
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
        message: `${sender.prefix}\nSent an image.`,
        imageFullsize: imageUrl,
        imageThumbnail: imageUrl,
    };
    return sendMessage(chatId, message);
}
