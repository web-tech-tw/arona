import {
    Sender,
} from "../../sender";

import {
    client,
} from "./index";

export type ThumbnailInfo = {
    mimetype?: string;
    size?: number;
    width?: number;
    height?: number;
};

export type ImageMessageOptions = {
    mimetype?: string;
    size?: number;
    width?: number;
    height?: number;
    thumbnailUrl?: string;
    thumbnailInfo?: ThumbnailInfo;
};

/**
 * Send a text message to the chat room.
 * @param {Sender} sender The sender of the message.
 * @param {string} text The text to send.
 * @param {string} roomId ID of the chat room.
 * @return {Promise<string>}
 */
export function sendTextMessage(
    sender: Sender,
    text: string,
    roomId: string,
): Promise<string> {
    return client.sendMessage(roomId, {
        "msgtype": "m.text",
        "body": `${sender.displayName}: ${text}`,
    });
}

/**
 * Send an image message to the chat room.
 * @param {Sender} sender The sender of the message.
 * @param {string} imageUrl URL of the image.
 * @param {string} roomId ID of the chat room.
 * @param {ImageMessageOptions} options The options to send image message.
 * @return {Promise<string>}
 */
export function sendImageMessage(
    sender: Sender,
    imageUrl: string,
    roomId: string,
    options: ImageMessageOptions = {},
): Promise<string> {
    (async () => sendTextMessage(sender, "Image:", roomId))();
    return client.sendMessage(roomId, {
        "msgtype": "m.image",
        "url": imageUrl,
        "body": `${sender.displayName}: Image:`,
        "info": {
            "mimetype": options.mimetype,
            "size": options.size,
            "w": options.width,
            "h": options.height,
            "thumbnail_url": options.thumbnailUrl || imageUrl,
            "thumbnail_info": options.thumbnailInfo,
        },
    });
}
