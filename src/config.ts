import { readFileSync } from "node:fs";
import { parse } from "yaml";

import {
    BridgeProviderType,
} from "./types";

export type HttpConfigSchema = {
    bindHost: string;
    bindPort: number;
    baseUrl: string;
};

export type BridgeConfigSchema = {
    public: boolean;
};

export type BridgeProviderSchema<T extends BridgeProviderType> = {
    [K in T]: K extends 'openai' ? BridgeProviderOpenaiConfigSchema :
              K extends 'line' ? BridgeProviderLineConfigSchema :
              K extends 'matrix' ? BridgeProviderMatrixConfigSchema :
              K extends 'discord' ? BridgeProviderDiscordConfigSchema :
              BridgeProviderTelegramConfigSchema;
};

export type BridgeProviderOpenaiConfigSchema = {
    enable: boolean;
    apiBaseUrl: string;
    apiKey: string;
    chatModel: string;
};

export type BridgeProviderLineConfigSchema = {
    enable: boolean;
    channelAccessToken: string;
    channelSecret: string;
    notifyEnable: boolean;
    notifyClientId: string;
    notifyClientSecret: string;
};

export type BridgeProviderMatrixConfigSchema = {
    enable: boolean;
    homeserverUrl: string;
    accessToken: string;
};

export type BridgeProviderDiscordConfigSchema = {
    enable: boolean;
    botToken: string;
};

export type BridgeProviderTelegramConfigSchema = {
    enable: boolean;
    botToken: string;
};

export type AppConfigSchema = {
    deviceName: string;
    http: HttpConfigSchema;
    bridge: BridgeConfigSchema;
    bridgeProvider: BridgeProviderSchema<BridgeProviderType>;
};

const configPath = new URL("../config.yaml", import.meta.url);
const configContent = readFileSync(configPath, "utf8");

const config: AppConfigSchema = parse(configContent);

export function appConfig(): AppConfigSchema {
    return config;
}

export function httpConfig(): HttpConfigSchema {
    return config.http;
}

export function bridgeConfig(): BridgeConfigSchema {
    return config.bridge;
}

export function bridgeProviderConfig(): BridgeProviderSchema<BridgeProviderType> {
    return config.bridgeProvider;
}
