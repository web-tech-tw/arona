import {
    Events,
} from "discord.js";

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

import {
    chatClient,
} from "./client";

/**
 * Send provider for Discord.
 */
export default class DiscordSend extends ProviderBase implements SendProvider {
    /**
     * Get the type.
     */
    public get type(): ProviderType {
        return "discord";
    }

    /**
     * Ensure the provider is ready.
     * @return {Promise<void>}
     */
    ensure(): Promise<void> {
        return new Promise((resolve) => {
            if (!chatClient) {
                throw new Error("Client is not initialized.");
            }
            chatClient.once(Events.ClientReady, () => {
                resolve();
            });
        });
    }

    /**
     * Send text.
     * @param {SendTextParameters} params - The parameters
     * @return {Promise<void>}
     */
    public async text(params: SendTextParameters): Promise<void> {
        const channel = await chatClient?.channels.fetch(params.chatId);
        if (!channel || !channel.isTextBased()) {
            throw new Error("Channel is not a text channel");
        }
        const message = `${params.sender.prefix}\n${params.text}`;
        channel.send(message);
    }

    /**
     * Send image.
     * @param {SendImageParameters} params - The parameters
     * @return {Promise<void>}
     */
    public async image(params: SendImageParameters): Promise<void> {
        const channel = await chatClient?.channels.fetch(params.chatId);
        if (!channel || !channel.isTextBased()) {
            throw new Error("Channel is not a text channel");
        }
        channel.send({
            content: params.sender.prefix,
            files: [params.imageBuffer],
        });
    }

    /**
     * Send image URL.
     * @param {SendImageUrlParameters} params - The parameters
     * @return {Promise<void>}
     */
    public async imageUrl(params: SendImageUrlParameters): Promise<void> {
        const channel = await chatClient?.channels.fetch(params.chatId);
        if (!channel || !channel.isTextBased()) {
            throw new Error("Channel is not a text channel");
        }
        channel.send(`${params.sender.prefix}\n${params.imageUrl}`);
    }
}
