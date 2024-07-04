import {
    bridgeProviderConfig,
} from "../../../config";

import {
    ProviderType,
    ProviderBase,
} from "../../../types/provider";

import {
    SendProvider,
    SendTextParameters,
    SendImageParameters,
    SendImageUrlParameters,
} from "../../../types/provider/send";

import {
    writeStaticFile,
} from "../../../server";

import {
    nanoid,
} from "nanoid";

import * as push from "./push";
import * as notify from "./notify";

const {
    line: lineConfig,
} = bridgeProviderConfig();

const {
    notifyEnable,
} = lineConfig;

export type ImageMessageOptions = {
    thumbnailUrl?: string;
};

/**
 * SendProvider
 */
export default class LINESend extends ProviderBase implements SendProvider {
    /**
     * Get the provider type.
     * @return {ProviderType}
     */
    get type(): ProviderType {
        return "line";
    }

    /**
     * Ensure the provider is ready.
     * @return {Promise<void>}
     */
    ensure(): Promise<void> {
        return Promise.resolve();
    }

    /**
     * Send a text message to the chat room.
     * @param {SendTextParameters} params - The parameters.
     * @return {Promise<void>}
     */
    async text(params: SendTextParameters): Promise<void> {
        const {sender, chatId, text} = params;
        if (!notifyEnable) {
            push.sendTextMessage(sender, chatId, text);
        } else {
            notify.sendTextMessage(sender, chatId, text);
        }
    }

    /**
     * Send an image message to the chat room.
     * @param {SendImageParameters} params - The parameters.
     * @return {Promise<void>}
     */
    async image(params: SendImageParameters): Promise<void> {
        const {sender, chatId, imageBuffer} = params;
        const filename = nanoid();
        const imageUrl = await writeStaticFile(
            filename,
            imageBuffer,
        );
        this.imageUrl({sender, chatId, imageUrl});
    }

    /**
     * Send an image message to the chat room.
     * @param {SendImageUrlParameters} params - The parameters.
     * @return {Promise<void>}
     */
    async imageUrl(params: SendImageUrlParameters): Promise<void> {
        const {sender, chatId, imageUrl} = params;
        if (!notifyEnable) {
            push.sendImageMessage(sender, chatId, imageUrl);
        } else {
            notify.sendImageMessage(sender, chatId, imageUrl);
        }
    }
}
