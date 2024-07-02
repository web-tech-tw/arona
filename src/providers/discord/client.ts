import {
    REST,
} from "@discordjs/rest";

import {
    Client,
    Partials,
    GatewayIntentBits,
} from "discord.js";

import {
    bridgeProviderConfig,
} from "../../config";

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
