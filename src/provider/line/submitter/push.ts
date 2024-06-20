import {
    Sender,
} from "../../sender";

import {
    Sender as LINESender,
    TextMessage,
    ImageMessage,
    messagingApi,
} from "@line/bot-sdk";

import {
    messagingClient as chatClient,
} from "../client";

import {
    ImageMessageOptions,
} from ".";

/**
 * Send a text message to the chat room.
 * @param {Sender} sender - The sender of the message.
 * @param {string} chatId - The ID of the chat room.
 * @param {string} text - The text to send.
 * @return {Promise<messagingApi.PushMessageResponse>}
 */
export function sendTextMessage(
    sender: Sender,
    chatId: string,
    text: string,
): Promise<messagingApi.PushMessageResponse> {
    const message: TextMessage = {type: "text", text};
    if (sender.prefix.length <= 20) {
        message.sender = sender.toLINE();
    } else {
        message.text = `${sender.prefix}\n${message.text}`;
    }
    return chatClient.pushMessage({
        to: chatId,
        messages: [message],
    });
}

/**
 * Send an image message to the chat room.
 * @param {Sender} sender - The sender of the message.
 * @param {string} chatId - The ID of the chat room.
 * @param {string} imageUrl - The image URL.
 * @param {ImageMessageOptions} options - The options to send image message.
 * @return {Promise<messagingApi.PushMessageResponse>}
 */
export function sendImageMessage(
    sender: Sender,
    chatId: string,
    imageUrl: string,
    options: ImageMessageOptions = {},
): Promise<messagingApi.PushMessageResponse> {
    const lineSender: LINESender = sender.toLINE();
    const message: ImageMessage = {
        type: "image",
        sender: lineSender,
        originalContentUrl: imageUrl,
        previewImageUrl: options.thumbnailUrl || imageUrl,
    };
    return chatClient.pushMessage({
        to: chatId,
        messages: [message],
    });
}
