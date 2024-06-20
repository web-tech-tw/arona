import LINESend from "./line/submitter";
import MatrixSend from "./matrix/submitter";

import {getProfileFromSource} from "./line/utils";
import {client} from "./matrix/client";

import {
    EventSource,
    Sender as LINESender,
} from "@line/bot-sdk";

export type SendProviderType = "line" | "matrix";
export type SendProviderMap = {
    // eslint-disable-next-line no-unused-vars
    [key in SendProviderType]: SendProvider;
};

export type SendProviderNameMap = {
    // eslint-disable-next-line no-unused-vars
    [key in SendProviderType]: string;
};
export const SendProviderName: SendProviderNameMap = {
    line: "LINE",
    matrix: "Matrix",
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
        const name = `${this.displayName} ⬗ ${this.providerName()}`;
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
            return "Unknown";
        }
        return SendProviderName[provider];
    }
}

/**
 * SendProvider
 */
export interface SendProvider {
    text: (
        sender: Sender,
        chatId: string,
        text: string,
    ) => Promise<void>;
    image: (
        sender: Sender,
        chatId: string,
        imageBuffer: Buffer,
    ) => Promise<void>;
    imageUrl: (
        sender: Sender,
        chatId: string,
        imageUrl: string,
    ) => Promise<void>;
}

/**
 * All Send Providers
 */
export const allSendProviders: SendProviderMap = {
    line: new LINESend(),
    matrix: new MatrixSend(),
};
