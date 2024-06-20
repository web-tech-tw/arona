import {
    Sender,
} from "../../../../sender";

import Link from "../../../../link";

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
    const link = Link.find("matrix", roomId);
    if (!link) return;

    const sender = await Sender.fromMatrixSender(event.sender);
    const imageUrl = client.mxcToHttp(event.content.url);

    link.toBroadcastExcept("matrix", (provider, chatId) => {
        provider.imageUrl(sender, chatId, imageUrl);
    });
};
