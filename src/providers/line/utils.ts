import {
    EventSource,
} from "@line/bot-sdk";

import {
    Profile,
} from "./types";

import {
    messagingClient,
} from "./client";

/**
 * Get a profile from the source.
 * @param {EventSource} source
 * @return {Promise<Profile | null>}
 */
export async function getProfileFromSource(
    source: EventSource,
): Promise<Profile | null> {
    if (!messagingClient) {
        throw new Error("Client is not initialized");
    }
    if (!source.userId) {
        return null;
    }
    switch (source.type) {
    case "user": {
        const profile = await messagingClient.getProfile(
            source.userId,
        );
        return {
            displayName: profile.displayName,
            userId: profile.userId,
            pictureUrl: profile.pictureUrl,
        };
    }
    case "group": {
        const profile = await messagingClient.getGroupMemberProfile(
            source.groupId,
            source.userId,
        );
        return {
            displayName: profile.displayName,
            userId: profile.userId,
            pictureUrl: profile.pictureUrl,
        };
    }
    case "room": {
        const profile = await messagingClient.getRoomMemberProfile(
            source.roomId,
            source.userId,
        );
        return {
            displayName: profile.displayName,
            userId: profile.userId,
            pictureUrl: profile.pictureUrl,
        };
    }
    default: {
        return null;
    }
    }
}

/**
 * Get a sticker image URL from the sticker shop.
 * @param {string} stickerId
 * @return {string}
 */
export function getStickerImageUrl(stickerId: string): string {
    const remoteHostname = "https://stickershop.line-scdn.net";
    const remoteFilename =
        `/stickershop/v1/sticker/${stickerId}/android/sticker.png`;
    return remoteHostname + remoteFilename;
}
