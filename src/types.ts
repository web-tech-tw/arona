export const bridgeProviders = {
    line: "LINE",
    matrix: "Matrix",
    discord: "Discord",
    telegram: "Telegram",
    openai: "OpenAI",
};
export type BridgeProviderType = keyof typeof bridgeProviders;
