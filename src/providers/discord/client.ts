import {
    REST,
} from "@discordjs/rest";

import {
    BaseGuild,
    Routes,
    Client,
    Partials,
    GatewayIntentBits,
} from "discord.js";

import {
    bridgeProviderConfig,
} from "../../config";

import {
    commands,
} from "../../commands";
import {
    CommandMethodOption,
} from "../../commands/types";

const {
    discord: discordConfig,
} = bridgeProviderConfig();

/**
 * Create a new REST client.
 * @return {REST}
 */
function newRestClient(): REST {
    const {
        botToken,
    } = discordConfig;

    const restClient = new REST({version: "10"});
    restClient.setToken(botToken);

    return restClient;
}

/**
 * Create a new chat client.
 * @return {Client}
 */
function newChatClient(): Client {
    const {
        botToken,
    } = discordConfig;

    const chatClient = new Client({
        partials: [
            Partials.Channel,
            Partials.Message,
            Partials.Reaction,
        ],
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.DirectMessageTyping,
            GatewayIntentBits.MessageContent,
        ],
    });
    chatClient.login(botToken);

    return chatClient;
}

const {
    enable: isEnabled,
} = discordConfig;

/**
 * The Discord client.
 */
export const restClient = isEnabled ?
    newRestClient() :
    null;

/**
 * The Discord client.
 */
export const chatClient = isEnabled ?
    newChatClient() :
    null;

/**
 * Registers commands with the Discord API.
 * @param {Guild} guild The guild to register commands in.
 * @return {Promise<void>}
 */
export async function registerCommands(guild: BaseGuild): Promise<void> {
    if (!restClient) {
        throw new Error("Client is not initialized.");
    }

    const {appId} = discordConfig;
    const {id: guildId} = guild;

    const camelToSnakeCase = (str) =>
        str.replace(/[A-Z]/g, (group) =>
            `_${group.toLowerCase()}`,
        );

    const optionType = (option: CommandMethodOption) => {
        switch (option.type) {
        case "string":
            return 3;
        case "number":
            return 4;
        case "boolean":
            return 5;
        default:
            return 3;
        }
    };

    const discordCommands = Object.entries(commands).map(([i, j]) => ({
        name: camelToSnakeCase(i),
        description: j.description,
        options: j.options?.map((k) => ({
            name: camelToSnakeCase(k.name),
            description: k.description,
            type: optionType(k),
            required: k.required,
        })) || null,
    }));

    const route = Routes.applicationGuildCommands(appId, guildId);
    const options = {body: discordCommands};
    await restClient.put(route, options);
}
