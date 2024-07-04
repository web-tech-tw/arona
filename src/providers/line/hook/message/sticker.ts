import {
    MessageEvent,
    StickerEventMessage,
} from "@line/bot-sdk";

import {
    toCommandSource,
    getStickerImageUrl,
} from "../../utils";

import Link from "../../../../types/link";
import {
    LINESender,
} from "../../types";

export default async (event: MessageEvent): Promise<void> => {
    const message: StickerEventMessage = event.message as StickerEventMessage;
    const {stickerId} = message;

    const {chatId} = toCommandSource(event.source);
    const link = Link.use("line", chatId);
    if (!link.exists()) return;

    const sender = await LINESender.fromEventSource(event.source);
    const imageUrl = getStickerImageUrl(stickerId);

    link.toBroadcastExcept("line", (provider, chatId) => {
        provider.imageUrl({sender, chatId, imageUrl});
    });
};
