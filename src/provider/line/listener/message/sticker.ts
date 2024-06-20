import {
    MessageEvent,
    StickerEventMessage,
} from "@line/bot-sdk";

import {
    getInfoFromSource,
    getStickerImageUrl,
} from "../../utils";

import {
    Sender,
} from "../../../sender";

import Link from "../../../link";

export default async (event: MessageEvent): Promise<void> => {
    const message: StickerEventMessage = event.message as StickerEventMessage;
    const {stickerId} = message;

    const {chatId} = getInfoFromSource(event.source);
    const link = Link.use("line", chatId);
    if (!link.exists()) return;

    const sender = await Sender.fromLINESource(event.source);
    const imageUrl = getStickerImageUrl(stickerId);

    link.toBroadcastExcept("line", (provider, chatId) => {
        provider.imageUrl({sender, chatId, imageUrl});
    });
};
