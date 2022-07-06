import fs from "fs";

import {
    EventBase,
} from "@line/bot-sdk";

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
 * Get source ID from event.
 * @param {EventBase} event
 * @param {boolean} [withOrigin=false]
 * @return {string | null | undefined | Array<string | null | undefined>}
 */
export function getSourceIdFromEvent(
    event: EventBase,
    withOrigin = false,
): string | null | undefined | Array<string | null | undefined> {
    switch (event.source.type) {
        case "user":
            return withOrigin ?
                [event.source.userId, event.source.userId] :
                event.source.userId;
        case "group":
            return withOrigin ?
                [event.source.groupId, event.source.userId] :
                event.source.groupId;
        case "room":
            return withOrigin ?
                [event.source.roomId, event.source.userId] :
                event.source.roomId;
        default:
            return withOrigin ? [null, null] : null;
    }
}
