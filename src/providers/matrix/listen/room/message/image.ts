import Link from "../../../../../types/link";
import {
    MatrixSender,
} from "../../../types";

import {
    MessageEvent,
    FileMessageEventContent,
} from "matrix-bot-sdk";

import {
    client,
} from "../../../client";

export default async (
    roomId: string,
    event: MessageEvent<FileMessageEventContent>,
): Promise<undefined> => {
    if (!client) {
        throw new Error("Client is not initialized");
    }

    const link = Link.use("matrix", roomId);
    if (!link.exists()) return;

    const sender = await MatrixSender.fromSenderId(event.sender);
    const imageUrl = client.mxcToHttp(event.content.url);

    link.toBroadcastExcept("matrix", (provider, chatId) => {
        provider.imageUrl({sender, chatId, imageUrl});
    });
};
