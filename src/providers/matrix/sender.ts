import {
    client
} from "./index";

/**
 * Send a text message to the chat room.
 * @param text The text to send.
 * @param roomId ID of the chat room.
 * @returns {Promise<string>}
 */
export function sendTextMessage(text: string, roomId: string): Promise<string> {
    return client.sendMessage(roomId, {
        "msgtype": "m.notice",
        "body": text,
    });
}

/**
 * Send an image message to the chat room.
 * @param imageUrl URL of the image.
 * @param roomId ID of the chat room.
 * @returns {Promise<string>}
 */
export function sendImageMessage(imageUrl: string, roomId: string): Promise<string> {
    return client.sendMessage(roomId, {
        "msgtype": "m.image",
        "body": imageUrl,
        "url": imageUrl,
    });
}
