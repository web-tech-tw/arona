import {
    ProviderType,
    providers,
} from "./provider";

import {
    EventSource,
    Sender as LINESender,
} from "@line/bot-sdk";

import {
    getProfileFromSource,
} from "../providers/line/utils";
import {
    client as matrixClient,
} from "../providers/matrix/client";

/**
 * Sender
 */
export default class Sender {
    public displayName?: string;
    public pictureUrl?: string;
    public providerType?: ProviderType;

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
        return this.providerType ?
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
            providerType: "line",
        });
    }

    /**
     * Create a Sender from Matrix Sender.
     * @param {string} sender - Matrix Sender
     * @return {Promise<Sender>}
     */
    static async fromMatrixSender(sender: string): Promise<Sender> {
        if (!matrixClient) {
            throw new Error("Client is not initialized");
        }

        const profile = await matrixClient.getUserProfile(sender);
        const displayName = profile.displayname;
        const pictureUrl = matrixClient.mxcToHttp(profile.avatar_url);
        const providerType: ProviderType = "matrix";
        return new Sender({displayName, pictureUrl, providerType});
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
        const {providerType} = this;
        if (!providerType) {
            throw new Error("Provider is not set");
        }
        return providers[providerType];
    }
}
