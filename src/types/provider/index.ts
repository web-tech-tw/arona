import {
    bridgeProviderConfig,
} from "../../config";

export const providers = {
    line: "LINE",
    matrix: "Matrix",
    discord: "Discord",
    telegram: "Telegram",
    openai: "OpenAI",
};

export type ProviderType = (
    keyof typeof providers
);

/**
 * ProviderBase
 */
export class ProviderBase implements BaseProvider {
    /**
     * Get the provider type.
     */
    public get type(): ProviderType {
        throw new Error("Not implemented");
    }

    /**
     * Get the provider name.
     * @return {string}
     */
    public get name(): string {
        const {type} = this;
        return providers[type];
    }

    /**
     * Get the provider enable status.
     * @return {boolean}
     */
    public get enabled(): boolean {
        const {type} = this;
        const bridgeProviderConfigs = bridgeProviderConfig();
        const providerConfig = bridgeProviderConfigs[type];
        return providerConfig.enable;
    }
}

/**
 * BaseProvider
 * @property {ProviderType} type - Get the provider type.
 */
export interface BaseProvider {
    type: ProviderType;
    name: string;
    enabled: boolean;
}
