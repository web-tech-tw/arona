import {ProviderType} from "../../types";
import {
    ProviderBase,
    SendProvider,
    SendTextParameters,
    SendImageParameters,
    SendImageUrlParameters,
} from "../types";

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
     * Send text.
     * @param {SendTextParameters} params - The parameters
     * @return {Promise<void>}
     */
    public text(params: SendTextParameters): Promise<void> {
        console.log(`Sending text to OpenAI: ${params.chatId}`);
        return Promise.resolve();
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
