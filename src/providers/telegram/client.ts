import TelegramBot from "node-telegram-bot-api";

import {
    bridgeProviderConfig,
} from "../../config";

const {
    telegram: telegramConfig,
} = bridgeProviderConfig();

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

const {
    enable: isEnabled,
} = telegramConfig;

/**
 * The Telegram client.
 */
export const client = isEnabled ?
    newClient() :
    null;
