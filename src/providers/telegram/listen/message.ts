import {
    Message,
} from "node-telegram-bot-api";

import {
    textToArguments,
    commandExecutor,
} from "../../../commands";

import {
    CommandMethodParameters,
} from "../../../commands/types";

import {
    TelegramSender,
} from "../types";
import {
    ProviderType,
} from "../../../types/provider";

import {
    client,
} from "../client";

import {
    readAll,
} from "../../../utils";

export default async (message: Message) => {
    if (!client) {
        throw new Error("Client is not initialized");
    }
    if (!message.from) {
        throw new Error("Message does not have a sender");
    }

    const sender = await TelegramSender.fromMessage(message);
    const text = message.text ?? "";

    const args = textToArguments(text, "/");
    if (args) {
        const locale = sender.roomLink.locale;
        const source = sender.commandSource;
        const reply = async (text: string): Promise<void> => {
            if (!client) {
                throw new Error("Client is not initialized");
            }
            if (!sender.chatId) {
                throw new Error("Chat ID is not set");
            }
            client.sendMessage(
                sender.chatId,
                TelegramSender.systemMessage(text),
            );
        };
        const params: CommandMethodParameters = {
            args, source, locale, reply, sender,
        };
        await commandExecutor(params);
        return;
    }

    if (!sender.roomLink.exists()) return;

    if (text) {
        sender.roomLink.toBroadcastExcept(
            sender.providerType as ProviderType,
            (provider, chatId) => {
                provider.text({sender, chatId, text});
            },
        );
    }

    if (message.photo) {
        const photo = message.photo[message.photo.length - 1];
        const stream = client.getFileStream(photo.file_id);
        if (!stream) {
            throw new Error("Failed to get file stream");
        }
        const imageBuffer = await readAll(stream);
        sender.roomLink.toBroadcastExcept(
            sender.providerType as ProviderType,
            (provider, chatId) => {
                provider.image({sender, chatId, imageBuffer});
            },
        );
    }
};
