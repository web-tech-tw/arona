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

import {
    readAll,
} from "../../../../utils";

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

    const sender = await LINESender.fromEventSource(event.source);
    const imageBuffer = await readAll(contentStream);
    link.toBroadcastExcept("line", (provider, chatId) =>
        provider.image({sender, chatId, imageBuffer}),
    );
};
