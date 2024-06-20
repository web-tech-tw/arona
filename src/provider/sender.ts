import LINESend from "./line/submitter";
import MatrixSend from "./matrix/submitter";

import {getProfileFromSource} from "./line/utils";
import {client} from "./matrix/client";

import {
    EventSource,
    Sender as LINESender,
} from "@line/bot-sdk";

export type SendProviderType =
    "line" | "matrix" | "discord" | "telegram" | "openai";
export type SendProviderNameMap = {
    // eslint-disable-next-line no-unused-vars
    [key in SendProviderType]: string;
};
export const SendProviderName: SendProviderNameMap = {
    line: "LINE",
    matrix: "Matrix",
    discord: "Discord",
    telegram: "Telegram",
    openai: "OpenAI",
};

/**
 * Sender
 */
export class Sender {
    displayName?: string;
    pictureUrl?: string;
    provider?: SendProviderType;

    /**
     * Constructor
     * @param {Partial<Sender>} init {displayName: string, pictureUrl: string}
     */
    constructor(init: Partial<Sender>) {
        Object.assign(this, init);
    }

    /**
     * Get the text prefix.
     * @return {string}
     */
    get prefix(): string {
        return this.provider ?
            `${this.displayName} ⬗ ${this.providerName()}` :
            "⬖ System";
    }

    /**
     * Create a Sender from LINE Source.
     * @param {EventSource} source - LINE Event Source
     * @return {Promise<Sender>}
     */
    static async fromLINESource(source: EventSource): Promise<Sender> {
        const profile = await getProfileFromSource(source);
        if (!profile) {
            throw new Error("Failed to get profile from source");
        }
        return new Sender({
            displayName: profile.displayName,
            pictureUrl: profile.pictureUrl,
            provider: "line",
        });
    }

    /**
     * Create a Sender from Matrix Sender.
     * @param {string} sender - Matrix Sender
     * @return {Promise<Sender>}
     */
    static async fromMatrixSender(sender: string): Promise<Sender> {
        const profile = await client.getUserProfile(sender);
        const displayName = profile.displayname;
        const pictureUrl = client.mxcToHttp(profile.avatar_url);
        const provider: SendProviderType = "matrix";
        return new Sender({displayName, pictureUrl, provider});
    }

    /**
     * Export as LINE Sender.
     * @return {LINESender}
     */
    toLINE(): LINESender {
        const name = this.prefix;
        const iconUrl = this.pictureUrl;
        return {name, iconUrl};
    }

    /**
     * Get the provider name.
     * @return {string}
     */
    providerName(): string {
        const {provider} = this;
        if (!provider) {
            throw new Error("Provider is not set");
        }
        return SendProviderName[provider];
    }
}

/**
 * @param {Sender} sender - The sender of the message.
 * @param {string} chatId - The ID of the chat room.
 * @param {string} text - The text to send.
 */
export type SendTextParameters = {
    sender: Sender,
    chatId: string,
    text: string,
}

/**
 * @param {Sender} sender - The sender of the message.
 * @param {string} chatId - The ID of the chat room.
 * @param {Buffer} imageBuffer - The image buffer.
 */
export type SendImageParameters = {
    sender: Sender,
    chatId: string,
    imageBuffer: Buffer,
}

/**
 * @param {Sender} sender - The sender of the message.
 * @param {string} chatId - The ID of the chat room.
 * @param {string} imageUrl - The image URL.
 */
export type SendImageUrlParameters = {
    sender: Sender,
    chatId: string,
    imageUrl: string,
}

/**
 * SendProvider
 */
export interface SendProvider {
    type(): SendProviderType;
    text: (params: SendTextParameters) => Promise<void>;
    image: (params: SendImageParameters) => Promise<void>;
    imageUrl: (params: SendImageUrlParameters) => Promise<void>;
}

/**
 * The list of SendProvider.
 */
export const sendProviderList: Array<SendProvider> = [
    new LINESend(),
    new MatrixSend(),
];
