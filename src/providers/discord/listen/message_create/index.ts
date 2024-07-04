import {
    Message,
} from "discord.js";

import {
    CommandSource,
} from "../../../../commands/types";

import Sender from "../../../../types/sender";
import Link from "../../../../types/link";

/**
 * @param {Message} message
 * @return {Promise<void>}
 */
export default async (message: Message): Promise<void> => {
    if (message.author.bot) return;

    const source: CommandSource = {
        providerType: "discord",
        chatId: message.channel.id,
        fromId: message.author.id,
    };

    const providerType = "discord";
    const {
        content: text,
    } = message;

    const link = Link.use(providerType, source.chatId);
    if (!link.exists()) return;

    const sender = new Sender({
        providerType: providerType,
        displayName: message.author.username,
    });

    if (text) {
        link.toBroadcastExcept(providerType, (provider, chatId) => {
            provider.text({sender, chatId, text});
        });
    }

    if (message.attachments.size > 0) {
        for (const attachment of message.attachments.values()) {
            link.toBroadcastExcept(providerType, (provider, chatId) => {
                provider.imageUrl({sender, chatId, imageUrl: attachment.url});
            });
        }
    }
};
