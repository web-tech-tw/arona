import TelegramBot from "node-telegram-bot-api";

import {
    bridgeProviderConfig,
} from "../../config";

import {
    commands,
} from "../../commands";

const {
    telegram: telegramConfig,
} = bridgeProviderConfig();

const {
    enable: isEnabled,
} = telegramConfig;

/**
 * Create a new Telegram client.
 * @return {TelegramBot}
 */
function newClient(): TelegramBot {
    const {
        botToken,
    } = telegramConfig;

    const client = new TelegramBot(
        botToken, {polling: true},
    );

    return client;
}

/**
 * The Telegram client.
 */
export const client = isEnabled ?
    newClient() :
    null;

/**
 * Registers commands with the Telegram API.
 * @return {Promise<void>}
 */
export async function registerCommands(): Promise<void> {
    if (!client) {
        throw new Error("Client is not initialized.");
    }

    const camelToSnakeCase = (str: string) =>
        str.replace(/[A-Z]/g, (group) =>
            `_${group.toLowerCase()}`,
        );

    const telegramCommands = Object.entries(commands).map(([key, item]) => ({
        command: camelToSnakeCase(key),
        description: item.description,
    }));

    await client.setMyCommands(telegramCommands);
}
