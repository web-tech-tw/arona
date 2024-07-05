import SenderBase from "../../types/sender";

import {
    EventSource,
    Sender as RealSender,
} from "@line/bot-sdk";

import {
    getProfileFromSource,
} from "./utils";

const providerType = "line";

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

        let chatId: string;
        let fromId: string;
        switch (source.type) {
        case "user":
            chatId = source.userId;
            fromId = source.userId;
            break;
        case "group":
            chatId = source.groupId;
            fromId = source.userId ?? "";
            break;
        case "room":
            chatId = source.roomId;
            fromId = source.userId ?? "";
            break;
        default:
            throw new Error("Invalid source type.");
        }

        return new LINESender({
            displayName: profile.displayName,
            pictureUrl: profile.pictureUrl,
            providerType,
            chatId,
            fromId,
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
