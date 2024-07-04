import SenderBase from "../../../types/sender";
import {
    LINESender,
} from "../types";

import {
    Sender as RealSender,
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
 * @param {SenderBase} sender - The sender of the message.
 * @param {string} chatId - The ID of the chat room.
 * @param {string} text - The text to send.
 * @return {Promise<messagingApi.PushMessageResponse>}
 */
export function sendTextMessage(
    sender: SenderBase,
    chatId: string,
    text: string,
): Promise<messagingApi.PushMessageResponse> {
    if (!chatClient) {
        throw new Error("Client is not initialized.");
    }
    const message: TextMessage = {type: "text", text};
    if (sender.prefix.length <= 20) {
        message.sender = new LINESender(sender).toLINE();
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
 * @param {SenderBase} sender - The sender of the message.
 * @param {string} chatId - The ID of the chat room.
 * @param {string} imageUrl - The image URL.
 * @param {ImageMessageOptions} options - The options to send image message.
 * @return {Promise<messagingApi.PushMessageResponse>}
 */
export function sendImageMessage(
    sender: SenderBase,
    chatId: string,
    imageUrl: string,
    options: ImageMessageOptions = {},
): Promise<messagingApi.PushMessageResponse> {
    if (!chatClient) {
        throw new Error("Client is not initialized.");
    }
    const message: ImageMessage = {
        type: "image",
        originalContentUrl: imageUrl,
        previewImageUrl: options.thumbnailUrl || imageUrl,
    };
    return chatClient.pushMessage({
        to: chatId,
        messages: [message],
    });
}
