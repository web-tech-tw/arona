import {
    Message,
} from "node-telegram-bot-api";

import {
    textToArguments,
    commandExecutor,
} from "../../../commands";

import {
    CommandSource,
    CommandMethodParameters,
} from "../../../commands/types";

import Sender from "../../../types/sender";
import Link from "../../../types/link";

import {
    client,
} from "../client";

import Locale from "../../../locales";

export default async (message: Message) => {
    const {text} = message;
    if (!text) {
        return;
    }

    const args = textToArguments(text, "/");
    const source: CommandSource = {
        providerType: "telegram",
        chatId: message.chat.id.toString(),
        fromId: message.from?.id.toString() || "",
    };
    if (args) {
        const locale = new Locale("en");
        const reply = async (text: string): Promise<void> => {
            if (!client) {
                throw new Error("Client is not initialized");
            }
            client.sendMessage(
                source.chatId,
                text,
            );
        };
        const params: CommandMethodParameters = {
            args, source, locale, reply,
        };
        await commandExecutor(params);
        return;
    }

    const providerType = "telegram";

    const link = Link.use(providerType, source.chatId);
    if (!link.exists()) return;

    const sender = new Sender({
        providerType: providerType,
        displayName: message.from?.first_name,
    });
    link.toBroadcastExcept(providerType, (provider, chatId) => {
        provider.text({sender, chatId, text});
    });
};
