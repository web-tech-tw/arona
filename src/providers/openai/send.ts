import {
    ProviderType,
    ProviderBase,
} from "../../types/provider";

import Sender from "../../types/sender";
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
        const {sender, text} = params;
        const aiChatId = sender.roomLink.bridge?.openai;
        if (!aiChatId) {
            throw new Error("OpenAI chat ID is not set");
        }
        if (!text.startsWith("Arona")) {
            return;
        }
        const response = await chatWithAI(aiChatId, text);
        const aiSender = Sender.arona();
        sender.roomLink.toBroadcastExcept(this.type, (provider, chatId) =>
            provider.text({sender: aiSender, chatId, text: response}),
        );
    }

    /**
     * Send image.
     * @param {SendImageParameters} params - The parameters
     * @return {Promise<void>}
     */
    public image(params: SendImageParameters): Promise<void> {
        const {sender} = params;
        const aiChatId = sender.roomLink.bridge?.openai;
        if (!aiChatId) {
            throw new Error("OpenAI chat ID is not set");
        }
        // TODO: Implement image sending
        // const aiSender = Sender.arona();
        // sender.roomLink.toBroadcastExcept(this.type, (provider, chatId) =>
        //     provider.text({sender: aiSender, chatId, text: ""}),
        // );
        return Promise.resolve();
    }

    /**
     * Send image URL.
     * @param {SendImageUrlParameters} params - The parameters
     * @return {Promise<void>}
     */
    public imageUrl(params: SendImageUrlParameters): Promise<void> {
        const {sender} = params;
        const aiChatId = sender.roomLink.bridge?.openai;
        if (!aiChatId) {
            throw new Error("OpenAI chat ID is not set");
        }
        // TODO: Implement image URL sending
        // const aiSender = Sender.arona();
        // sender.roomLink.toBroadcastExcept(this.type, (provider, chatId) =>
        //     provider.text({sender: aiSender, chatId, text: ""}),
        // );
        return Promise.resolve();
    }
}
