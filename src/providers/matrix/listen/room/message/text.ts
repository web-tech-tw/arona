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
    CommandMethodParameters,
} from "../../../../../commands/types";

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
        const locale = sender.roomLink.locale;
        const source = sender.commandSource;
        const reply = async (text: string): Promise<void> => {
            if (!client) {
                throw new Error("Client is not initialized");
            }

            client.sendMessage(roomId, {
                msgtype: "m.notice",
                body: MatrixSender.systemMessage(text),
            });
        };
        const params: CommandMethodParameters = {
            args, source, locale, reply, sender,
        };
        await commandExecutor(params);
        return;
    }

    const link = Link.use("matrix", roomId);
    if (!link.exists()) return;
    link.toBroadcastExcept("matrix", (provider, chatId) => {
        provider.text({sender, chatId, text});
    });
};
