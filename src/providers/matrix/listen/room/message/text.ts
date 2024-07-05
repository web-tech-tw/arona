import Locale from "../../../../../locales";

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
    CommandSource,
} from "../../../../../commands/types";

import {
    client,
} from "../../../client";

export default async (
    roomId: string,
    event: MessageEvent<TextualMessageEventContent>,
): Promise<undefined> => {
    const text = event.textBody;

    const args = textToArguments(text, "/");
    const source: CommandSource = {
        providerType: "matrix",
        chatId: roomId,
        fromId: event.sender,
    };
    if (args) {
        const locale = new Locale("en");
        const reply = async (text: string): Promise<void> => {
            if (!client) {
                throw new Error("Client is not initialized");
            }

            const sender = new MatrixSender({});
            text = `${sender.prefix}\n${text}`;
            client.sendMessage(roomId, {
                msgtype: "m.notice",
                body: text,
            });
        };
        const params: CommandMethodParameters = {
            args, source, locale, reply,
        };
        await commandExecutor(params);
        return;
    }

    const link = Link.use("matrix", roomId);
    if (!link.exists()) return;

    const sender = await MatrixSender.fromSenderId(event.sender);
    link.toBroadcastExcept("matrix", (provider, chatId) => {
        provider.text({sender, chatId, text});
    });
};
