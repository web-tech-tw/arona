import {
    Message,
} from "discord.js";

import {
    DiscordSender,
} from "../../types";
import {
    ProviderType,
} from "../../../../types/provider";

/**
 * @param {Message} message
 * @return {Promise<void>}
 */
export default async (message: Message): Promise<void> => {
    if (message.author.bot) return;

    const sender = DiscordSender.fromMessage(message);
    if (!sender.roomLink.exists()) return;

    const {content: text} = message;
    if (text) {
        sender.roomLink.toBroadcastExcept(
            sender.providerType as ProviderType,
            (provider, chatId) => {
                provider.text({sender, chatId, text});
            },
        );
    }

    if (message.attachments.size > 0) {
        for (const attachment of message.attachments.values()) {
            sender.roomLink.toBroadcastExcept(
                sender.providerType as ProviderType,
                (provider, chatId) => {
                    const imageUrl = attachment.url;
                    provider.imageUrl({sender, chatId, imageUrl});
                },
            );
        }
    }
};
