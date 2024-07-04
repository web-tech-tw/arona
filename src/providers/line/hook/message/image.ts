import {
    MessageEvent,
    ImageEventMessage,
} from "@line/bot-sdk";

import {
    toCommandSource,
} from "../../utils";

import Link from "../../../../types/link";
import {
    LINESender,
} from "../../types";

import {
    messagingBlobClient as blobClient,
} from "../../client";

export default async (event: MessageEvent): Promise<void> => {
    if (!blobClient) {
        throw new Error("Client is not initialized.");
    }

    const message: ImageEventMessage = event.message as ImageEventMessage;

    const {chatId} = toCommandSource(event.source);
    const link = Link.use("line", chatId);
    if (!link.exists()) return;

    const {id: messageId} = message;
    const contentStream = await blobClient.getMessageContent(
        messageId,
    );

    const contentChunks: Buffer[] = [];
    for await (const chunk of contentStream) {
        contentChunks.push(chunk as never);
    }

    const sender = await LINESender.fromEventSource(event.source);
    const imageBuffer = Buffer.concat(contentChunks);

    link.toBroadcastExcept("line", (provider, chatId) =>
        provider.image({sender, chatId, imageBuffer}),
    );
};
