import {
    Sender,
} from "../../sender";

import {
    client,
} from "./index";

export type ImageMessageOptions = {
    thumbnailUrl?: string;
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
 *
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
        "body": null,
        "info": {
            "w": null,
            "h": null,
            "size": null,
            "mimetype": null,
            "thumbnail_info": null,
            "thumbnail_url": options.thumbnailUrl,
        },
    });
}
