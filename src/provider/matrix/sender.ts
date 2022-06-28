import {
    Sender,
} from "@line/bot-sdk";

import {
    client
} from "./index";

/**
 * Send a text message to the chat room.
 * @param {Sender} sender The sender of the message.
 * @param text The text to send.
 * @param roomId ID of the chat room.
 * @returns {Promise<string>}
 */
export function sendTextMessage(
    sender: Sender,
    text: string,
    roomId: string
): Promise<string> {
    return client.sendMessage(roomId, {
        "msgtype": "m.notice",
        "body": `${sender.name}: ${text}`,
    });
}

/**
 * Send an image message to the chat room.
 * @param {Sender} sender The sender of the message.
 * @param imageUrl URL of the image.
 * @param roomId ID of the chat room.
 * @returns {Promise<string>}
 */
export function sendImageMessage(
    sender: Sender,
    imageUrl: string,
    roomId: string
): Promise<string> {
    (async () => sendTextMessage(sender, "Image:", roomId))();
    return client.sendMessage(roomId, {
        "msgtype": "m.image",
        "body": imageUrl,
        "url": imageUrl,
    });
}
