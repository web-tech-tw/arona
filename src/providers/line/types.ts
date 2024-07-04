import SenderBase from "../../types/sender";

import {
    EventSource,
    Sender as RealSender,
} from "@line/bot-sdk";

import {
    getProfileFromSource,
} from "./utils";

export type Profile = {
    displayName: string;
    userId: string;
    pictureUrl?: string;
};

/**
 * Sender of LINE
 */
export class LINESender extends SenderBase {
    /**
     * Create a Sender from LINE Source.
     * @param {EventSource} source - LINE Event Source
     * @return {Promise<Sender>}
     */
    static async fromEventSource(source: EventSource): Promise<LINESender> {
        const profile = await getProfileFromSource(source);
        if (!profile) {
            throw new Error("Failed to get profile from source");
        }
        return new LINESender({
            displayName: profile.displayName,
            pictureUrl: profile.pictureUrl,
            providerType: "line",
        });
    }

    /**
     * Export as LINE Sender.
     * @return {RealSender}
     */
    toLINE(): RealSender {
        const name = this.prefix;
        const iconUrl = this.pictureUrl;
        return {name, iconUrl};
    }
}
