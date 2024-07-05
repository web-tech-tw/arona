import {
    MessageEvent,
    ImageEventMessage,
} from "@line/bot-sdk";

import {
    LINESender,
} from "../../types";
import {
    ProviderType,
} from "../../../../types/provider";

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

    const sender = await LINESender.fromEventSource(event.source);
    if (!sender.roomLink.exists()) return;

    const {id: messageId} = message;
    const contentStream = await blobClient.getMessageContent(
        messageId,
    );

    const imageBuffer = await readAll(contentStream);
    sender.roomLink.toBroadcastExcept(
        sender.providerType as ProviderType,
        (provider, chatId) => {
            provider.image({sender, chatId, imageBuffer});
        },
    );
};
