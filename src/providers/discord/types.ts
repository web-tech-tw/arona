import SenderBase from "../../types/sender";

import {
    Message,
    Interaction,
} from "discord.js";

const providerType = "discord";

/**
 * Sender of Discord
 */
export class DiscordSender extends SenderBase {
    /**
     * Create a DiscordSender from a message
     * @param {Message} message - The message
     * @return {DiscordSender}
     */
    public static fromMessage(message: Message): DiscordSender {
        return new DiscordSender({
            providerType,
            displayName: message.author.username,
            chatId: message.channel.id,
            fromId: message.author.id,
        });
    }

    /**
     * Create a DiscordSender from an interaction
     * @param {Interaction} interaction - The interaction
     * @return {DiscordSender}
     */
    public static fromInteraction(interaction: Interaction): DiscordSender {
        return new DiscordSender({
            providerType,
            displayName: interaction.user.username,
            chatId: interaction.channelId || interaction.user.id,
            fromId: interaction.user.id,
        });
    }
}
