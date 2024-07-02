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
     * Send text.
     * @param {SendTextParameters} params - The parameters
     * @return {Promise<void>}
     */
    public async text(params: SendTextParameters): Promise<void> {
        const channel = await chatClient?.channels.fetch(params.chatId);
        if (!channel || !channel.isTextBased()) {
            throw new Error("Channel is not a text channel");
        }
        channel.send(params.text);
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
        channel.send({files: [params.imageBuffer]});
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
        const markdown = `![image](${params.imageUrl})`;
        channel.send(markdown);
    }
}
