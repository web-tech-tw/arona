import fs from "fs";

import {
    EventBase,
} from "@line/bot-sdk";

import axios, {
    AxiosRequestConfig,
} from "axios";

const axiosUserAgent = process.env.DEVICE_NAME || "";

const scdnClient = (() => {
    const config: AxiosRequestConfig = {
        baseURL: "https://stickershop.line-scdn.net",
        headers: {
            "User-Agent": axiosUserAgent,
        },
    };
    return axios.create(config);
})();

/**
 *
 * @param stickerId
 */
export async function downloadStickerImage(stickerId: number): Promise<void> {
    const remoteFilename =
        `stickershop/v1/sticker/${stickerId}/android/sticker.png`;
    const localFilename = `stickers/${stickerId}.png`;
    const response = await scdnClient.get(remoteFilename);
    response.data.pipe(fs.createWriteStream(localFilename));
}

/**
 *
 * @param event
 * @param withOrigin
 * @returns
 */
export function getSourceIdFromEvent(
    event: EventBase, withOrigin = false,
): string | null | Array<string | null | undefined> {
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
