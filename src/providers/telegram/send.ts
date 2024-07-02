import {
    ProviderType,
    ProviderBase,
} from "../../types/provider";

import {
    SendProvider,
    SendTextParameters,
    SendImageParameters,
    SendImageUrlParameters,
} from "../../types/provider/send";

import {client} from "./client";

/**
 * Send provider for Telegram.
 */
export default class TelegramSend extends ProviderBase implements SendProvider {
    /**
     * Get the type.
     */
    public get type(): ProviderType {
        return "telegram";
    }

    /**
     * Send text.
     * @param {SendTextParameters} params - The parameters
     * @return {Promise<void>}
     */
    public async text(params: SendTextParameters): Promise<void> {
        if (!client) {
            throw new Error("Client is not initialized.");
        }
        client.sendMessage(params.chatId, params.text);
    }

    /**
     * Send image.
     * @param {SendImageParameters} params - The parameters
     * @return {Promise<void>}
     */
    public async image(params: SendImageParameters): Promise<void> {
        if (!client) {
            throw new Error("Client is not initialized.");
        }
        client.sendPhoto(params.chatId, params.imageBuffer);
    }

    /**
     * Send image URL.
     * @param {SendImageUrlParameters} params - The parameters
     * @return {Promise<void>}
     */
    public async imageUrl(params: SendImageUrlParameters): Promise<void> {
        if (!client) {
            throw new Error("Client is not initialized.");
        }
        client.sendPhoto(params.chatId, params.imageUrl);
    }
}
