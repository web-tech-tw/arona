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

import Link from "../../../types/link";
import {
    TelegramSender,
} from "../types";

import {
    client,
} from "../client";

import {
    readAll,
} from "../../../utils";

import Locale from "../../../locales";

export default async (message: Message) => {
    if (!client) {
        throw new Error("Client is not initialized");
    }
    if (!message.from) {
        throw new Error("Message does not have a sender");
    }

    const text = message.text ?? "";

    const args = textToArguments(text, "/");
    const source: CommandSource = {
        providerType: "telegram",
        chatId: message.chat.id.toString(),
        fromId: message.from?.id.toString() ?? "",
    };
    if (args) {
        const locale = new Locale("en");
        const reply = async (text: string): Promise<void> => {
            if (!client) {
                throw new Error("Client is not initialized");
            }
            const sender = new TelegramSender({});
            text = `${sender.prefix}\n${text}`;
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

    const sender = await TelegramSender.fromMessageFromUser(message.from);
    if (text) {
        link.toBroadcastExcept(providerType, (provider, chatId) => {
            provider.text({sender, chatId, text});
        });
    }

    if (message.photo) {
        const photo = message.photo[message.photo.length - 1];
        const stream = client.getFileStream(photo.file_id);
        if (!stream) {
            throw new Error("Failed to get file stream");
        }
        const imageBuffer = await readAll(stream);
        link.toBroadcastExcept(providerType, (provider, chatId) => {
            provider.image({sender, chatId, imageBuffer});
        });
    }
};
