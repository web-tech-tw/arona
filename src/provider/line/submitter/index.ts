import {
    Sender,
    SendProvider,
} from "../../sender";

import {
    writeStaticFile,
} from "../../../http_server";

import {
    nanoid,
} from "nanoid";

import * as push from "./push";
import * as notify from "./notify";

const isPushMode = process.env.LINE_SEND_MESSAGE_MODE === "push";

export type ImageMessageOptions = {
    thumbnailUrl?: string;
};

/**
 * SendProvider
 */
export default class LINESend implements SendProvider {
    /**
     * Send a text message to the chat room.
     * @param {Sender} sender - The sender of the message.
     * @param {string} chatId - The ID of the chat room.
     * @param {string} text - The text to send.
     * @return {Promise<void>}
     */
    async text(
        sender: Sender,
        chatId: string,
        text: string,
    ): Promise<void> {
        if (isPushMode) {
            push.sendTextMessage(sender, chatId, text);
        } else {
            notify.sendTextMessage(sender, chatId, text);
        }
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
        const filename = nanoid();
        const imageUrl = await writeStaticFile(
            filename,
            imageBuffer,
        );
        this.imageUrl(sender, chatId, imageUrl);
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
        if (isPushMode) {
            push.sendImageMessage(sender, chatId, imageUrl);
        } else {
            notify.sendImageMessage(sender, chatId, imageUrl);
        }
    }
}
