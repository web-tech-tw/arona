import {
    EventSource,
} from "@line/bot-sdk";

import {
    Profile,
    SourceInfo,
} from "./types";

import {
    messagingClient as chatClient,
} from "./client";

/**
 * Get a profile from the source.
 * @param {EventSource} source
 * @return {Promise<Profile | null>}
 */
export async function getProfileFromSource(
    source: EventSource,
): Promise<Profile | null> {
    if (!source.userId) {
        return null;
    }
    switch (source.type) {
    case "user": {
        const profile = await chatClient.getProfile(
            source.userId,
        );
        return {
            displayName: profile.displayName,
            userId: profile.userId,
            pictureUrl: profile.pictureUrl,
        };
    }
    case "group": {
        const profile = await chatClient.getGroupMemberProfile(
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
        const profile = await chatClient.getRoomMemberProfile(
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

/**
 * Get the IDs from the source.
 * @param {EventSource} source
 * @return {SourceInfo}
 */
export function getInfoFromSource(source: EventSource): SourceInfo {
    switch (source.type) {
    case "user":
        return {
            chatId: source.userId,
            fromId: source.userId,
        };
    case "group":
        return {
            chatId: source.groupId,
            fromId: source.userId,
        };
    case "room":
        return {
            chatId: source.roomId,
            fromId: source.userId,
        };
    default:
        throw new Error("Invalid source type.");
    }
}
