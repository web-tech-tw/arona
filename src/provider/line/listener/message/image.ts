import {
    MessageEvent,
    ImageEventMessage,
} from "@line/bot-sdk";

import {
    getInfoFromSource,
} from "../../utils";

import {
    Sender,
} from "../../../sender";

import {
    messagingBlobClient as bloblient,
} from "../../client";

import Link from "../../../link";

export default async (event: MessageEvent): Promise<void> => {
    const message: ImageEventMessage = event.message as ImageEventMessage;

    const {chatId} = getInfoFromSource(event.source);
    const link = Link.find("line", chatId);
    if (!link) return;

    const {id: messageId} = message;
    const contentStream = await bloblient.getMessageContent(
        messageId,
    );

    const contentChunks: Buffer[] = [];
    for await (const chunk of contentStream) {
        contentChunks.push(chunk as never);
    }

    const sender = await Sender.fromLINESource(event.source);
    const imageBuffer = Buffer.concat(contentChunks);

    link.toBroadcastExcept("line", (provider, chatId) =>
        provider.image(sender, chatId, imageBuffer),
    );
};
