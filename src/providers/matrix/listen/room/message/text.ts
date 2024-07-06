import Link from "../../../../../types/link";
import {
    MatrixSender,
} from "../../../types";

import {
    MessageEvent,
    TextualMessageEventContent,
} from "matrix-bot-sdk";

import {
    commandExecutor,
    textToArguments,
} from "../../../../../commands";

import {
    client,
} from "../../../client";

export default async (
    roomId: string,
    event: MessageEvent<TextualMessageEventContent>,
): Promise<undefined> => {
    const text = event.textBody;
    const sender = await MatrixSender.fromRoomEvent(roomId, event);

    const args = textToArguments(text, "/");
    if (args) {
        await commandExecutor(
            args, sender, async (text: string): Promise<void> => {
                if (!client) {
                    throw new Error("Client is not initialized");
                }

                client.sendMessage(roomId, {
                    msgtype: "m.notice",
                    body: MatrixSender.systemMessage(text),
                });
            },
        );
        return;
    }

    const link = Link.use("matrix", roomId);
    if (!link.exists()) return;
    link.toBroadcastExcept("matrix", (provider, chatId) => {
        provider.text({sender, chatId, text});
    });
};
