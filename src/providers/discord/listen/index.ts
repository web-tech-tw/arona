import {
    Events,
} from "discord.js";

import {
    ProviderType,
    ProviderBase,
} from "../../../types/provider";

import {
    ListenProvider,
} from "../../../types/provider/listen";

import {
    chatClient,
} from "../client";

import {
    registerCommands,
} from "../client";

import interactionCreate from "./interaction_create";
import messageCreate from "./message_create";
import guildCreate from "./guild_create";

const events = {
    [Events.InteractionCreate]: interactionCreate,
    [Events.MessageCreate]: messageCreate,
    [Events.GuildCreate]: guildCreate,
};

/**
 * Listen provider for Discord.
 */
export default class DiscordListen
    extends ProviderBase
    implements ListenProvider {
    /**
     * Get the type.
     */
    public get type(): ProviderType {
        return "discord";
    }

    /**
     * Listen.
     */
    async listen(): Promise<void> {
        if (!chatClient) {
            throw new Error("Client is not initialized.");
        }

        const allGuilds = await chatClient.guilds.fetch();
        await Promise.all(Array.from(allGuilds.values()).map(
            (guild) => registerCommands(guild),
        ));

        for (const [key, trigger] of Object.entries(events)) {
            chatClient.on(key, trigger);
        }
    }
}
