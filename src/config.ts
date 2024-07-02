import {readFileSync} from "node:fs";
import {parse} from "yaml";

import {
    ProviderType,
} from "./types/provider";

export type HttpConfigSchema = {
    bindHost: string;
    bindPort: number;
    baseUrl: string;
};

export type BridgeConfigSchema = {
    public: boolean;
};

export type BridgeProviderConfigSchema<T extends ProviderType> = {
    [K in T]: K extends "openai" ? BridgeProviderOpenaiConfigSchema :
              K extends "line" ? BridgeProviderLineConfigSchema :
              K extends "matrix" ? BridgeProviderMatrixConfigSchema :
              K extends "discord" ? BridgeProviderDiscordConfigSchema :
              K extends "telegram" ? BridgeProviderTelegramConfigSchema :
              never;
};

export type BridgeProviderBaseConfigSchema = {
    enable: boolean;
};

export type BridgeProviderOpenaiConfigSchema = {
    enable: boolean;
    baseUrl: string;
    apiKey: string;
    chatModel: string;
} & BridgeProviderBaseConfigSchema;

export type BridgeProviderLineConfigSchema = {
    enable: boolean;
    channelAccessToken: string;
    channelSecret: string;
    notifyEnable: boolean;
    notifyClientId: string;
    notifyClientSecret: string;
} & BridgeProviderBaseConfigSchema;

export type BridgeProviderMatrixConfigSchema = {
    enable: boolean;
    homeserverUrl: string;
    accessToken: string;
} & BridgeProviderBaseConfigSchema;

export type BridgeProviderDiscordConfigSchema = {
    enable: boolean;
    appId: string;
    botToken: string;
} & BridgeProviderBaseConfigSchema;

export type BridgeProviderTelegramConfigSchema = {
    enable: boolean;
    botToken: string;
} & BridgeProviderBaseConfigSchema;

export type AppConfigSchema = {
    deviceName: string;
    http: HttpConfigSchema;
    bridge: BridgeConfigSchema;
    bridgeProvider: BridgeProviderConfigSchema<ProviderType>;
} & BridgeProviderBaseConfigSchema;

const configPath = new URL("../config.yaml", import.meta.url);
const configContent = readFileSync(configPath, "utf8");

const config: AppConfigSchema = parse(configContent);

/**
 * Get the app config.
 * @return {AppConfigSchema}
 */
export function appConfig(): AppConfigSchema {
    return config;
}

/**
 * Get the HTTP config.
 * @return {HttpConfigSchema}
 */
export function httpConfig(): HttpConfigSchema {
    return config.http;
}

/**
 * Get the bridge config.
 * @return {BridgeConfigSchema}
 */
export function bridgeConfig(): BridgeConfigSchema {
    return config.bridge;
}

/**
 * Get the bridge provider config.
 * @return {BridgeProviderConfigSchema<ProviderType>}
 */
export function bridgeProviderConfig(
): BridgeProviderConfigSchema<ProviderType> {
    return config.bridgeProvider;
}
