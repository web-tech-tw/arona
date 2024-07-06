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
     * Ensure the provider is ready.
     * @return {Promise<void>}
     */
    ensure(): Promise<void> {
        return new Promise((resolve) => {
            if (!client) {
                throw new Error("Client is not initialized.");
            }
            resolve();
        });
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
        const message = `${params.sender.prefix}\n${params.text}`;
        client.sendMessage(params.chatId, message);
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
        const {sender, chatId, imageBuffer} = params;
        const text = "Sent an image.";
        this.text({sender, chatId, text});
        client.sendPhoto(chatId, imageBuffer);
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
        const {sender, chatId, imageUrl} = params;
        const text = "Sent an image.";
        this.text({sender, chatId, text});
        client.sendPhoto(chatId, imageUrl);
    }
}
