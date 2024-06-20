import {
    SendProvider,
    SendProviderType,
    SendTextParameters,
    SendImageParameters,
    SendImageUrlParameters,
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
     * Get the provider type.
     * @return {SendProviderType}
     */
    type(): SendProviderType {
        return "matrix";
    }

    /**
     * Send a text message to the chat room.
     * @param {SendTextParameters} params - The parameters.
     * @return {Promise<void>}
     */
    async text(params: SendTextParameters): Promise<void> {
        const {sender, chatId, text} = params;
        const {prefix} = sender;
        client.sendMessage(chatId, {
            "msgtype": "m.text",
            "body": `${prefix}\n${text}`,
        });
    }

    /**
     * Send an image message to the chat room.
     * @param {SendImageParameters} params - The parameters.
     * @return {Promise<void>}
     */
    async image(params: SendImageParameters): Promise<void> {
        const {sender, chatId, imageBuffer} = params;
        const {prefix} = sender;
        const text = "Sent an image.";
        this.text({sender, chatId, text});
        client.sendMessage(chatId, {
            "msgtype": "m.image",
            "url": await client.uploadContent(imageBuffer),
            "body": prefix,
        });
    }

    /**
     * Send an image message to the chat room.
     * @param {SendImageUrlParameters} params - The parameters.
     * @return {Promise<void>}
     */
    async imageUrl(params: SendImageUrlParameters): Promise<void> {
        const {sender, chatId, imageUrl} = params;
        const {prefix} = sender;
        const text = "Sent an image.";
        this.text({sender, chatId, text});
        client.sendMessage(chatId, {
            "msgtype": "m.image",
            "url": await client.uploadContentFromUrl(imageUrl),
            "body": prefix,
        });
    }
}
