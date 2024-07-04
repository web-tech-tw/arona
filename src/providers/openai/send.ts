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
    chatWithAI,
} from "./client";

/**
 * Send provider for OpenAI.
 */
export default class OpenaiSend extends ProviderBase implements SendProvider {
    /**
     * Get the type.
     */
    public get type(): ProviderType {
        return "openai";
    }

    /**
     * Ensure the provider is ready.
     * @return {Promise<void>}
     */
    ensure(): Promise<void> {
        return Promise.resolve();
    }

    /**
     * Send text.
     * @param {SendTextParameters} params - The parameters
     * @return {Promise<void>}
     */
    public async text(params: SendTextParameters): Promise<void> {
        const {chatId, text} = params;
        const response = await chatWithAI(chatId, text);
        console.log(response);
    }

    /**
     * Send image.
     * @param {SendImageParameters} params - The parameters
     * @return {Promise<void>}
     */
    public image(params: SendImageParameters): Promise<void> {
        console.log(`Sending image to OpenAI: ${params.chatId}`);
        return Promise.resolve();
    }

    /**
     * Send image URL.
     * @param {SendImageUrlParameters} params - The parameters
     * @return {Promise<void>}
     */
    public imageUrl(params: SendImageUrlParameters): Promise<void> {
        console.log(`Sending image URL to OpenAI: ${params.chatId}`);
        return Promise.resolve();
    }
}
