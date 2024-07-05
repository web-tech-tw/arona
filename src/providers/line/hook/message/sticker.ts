import {
    MessageEvent,
    StickerEventMessage,
} from "@line/bot-sdk";

import {
    getStickerImageUrl,
} from "../../utils";

import {
    LINESender,
} from "../../types";

export default async (event: MessageEvent): Promise<void> => {
    const message: StickerEventMessage = event.message as StickerEventMessage;
    const {stickerId} = message;

    const sender = await LINESender.fromEventSource(event.source);
    if (!sender.roomLink.exists()) return;

    const imageUrl = getStickerImageUrl(stickerId);
    sender.roomLink.toBroadcastExcept("line", (provider, chatId) => {
        provider.imageUrl({sender, chatId, imageUrl});
    });
};
