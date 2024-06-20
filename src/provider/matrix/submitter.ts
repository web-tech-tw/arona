import {
    Sender,
    SendProvider,
} from "../sender";

import {
    client,
} from "./client";

export type ThumbnailInfo = {
    mimetype?: string;
    size?: number;
    width?: number;
    height?: number;
};

export type ImageMessageOptions = {
    mimetype?: string;
    size?: number;
    width?: number;
    height?: number;
    thumbnailUrl?: string;
    thumbnailInfo?: ThumbnailInfo;
};

/**
 * SendProvider
 */
export default class MatrixSend implements SendProvider {
    /**
     * Send a text message to the chat room.
     * @param {Sender} sender The sender of the message.
     * @param {string} roomId ID of the chat room.
     * @param {string} text The text to send.
     * @return {Promise<void>}
     */
    async text(
        sender: Sender,
        roomId: string,
        text: string,
    ): Promise<void> {
        const displayName = sender.displayName;
        const providerName = sender.providerName();
        client.sendMessage(roomId, {
            "msgtype": "m.text",
            "body": `${displayName} ⬗ ${providerName}\n${text}`,
        });
    }

    /**
     * Send an image message to the chat room.
     * @param {Sender} sender - The sender of the message.
     * @param {string} chatId - The ID of the chat room.
     * @param {Buffer} imageBuffer - The image buffer.
     * @return {Promise<void>}
     */
    async image(
        sender: Sender,
        chatId: string,
        imageBuffer: Buffer,
    ): Promise<void> {
        const displayName = sender.displayName;
        const providerName = sender.providerName();
        this.text(sender, chatId, "Sent an image.");
        client.sendMessage(chatId, {
            "msgtype": "m.image",
            "url": await client.uploadContent(imageBuffer),
            "body": `${displayName} ⬗ ${providerName}`,
        });
    }

    /**
     * Send an image message to the chat room.
     * @param {Sender} sender - The sender of the message.
     * @param {string} chatId - The ID of the chat room.
     * @param {string} imageUrl - The image URL.
     * @return {Promise<void>}
     */
    async imageUrl(
        sender: Sender,
        chatId: string,
        imageUrl: string,
    ): Promise<void> {
        const displayName = sender.displayName;
        const providerName = sender.providerName();
        this.text(sender, chatId, "Sent an image.");
        client.sendMessage(chatId, {
            "msgtype": "m.image",
            "url": await client.uploadContentFromUrl(imageUrl),
            "body": `${displayName} ⬗ ${providerName}`,
        });
    }
}
