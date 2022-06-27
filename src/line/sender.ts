import {
    TextMessage,
    ImageMessage,
} from "@line/bot-sdk"
import { client } from './index';

export function sendTextMessage(text: string, roomId: string) {
    const message: TextMessage = {
        type: "text",
        text,
    };
    return client.pushMessage(roomId, message);
}

export function sendImageMessage(imageUrl: string, roomId: string) {
    const message: ImageMessage = {
        type: "image",
        originalContentUrl: imageUrl,
        previewImageUrl: imageUrl,
    };
    return client.pushMessage(roomId, message);
}
