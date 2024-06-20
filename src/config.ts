import {readFileSync} from "node:fs";
import {parse} from "yaml";

type ConfigSchema = {
    deviceName: string;
    http: {
        bindHost: string;
        bindPort: number;
        baseUrl: string;
    };
    bridge: {
        public: boolean;
    };
    bridgeProvider: {
        openai: {
            enable: boolean;
            apiBaseUrl: string;
            apiKey: string;
            chatModel: string;
        };
        line: {
            enable: boolean;
            channelAccessToken: string;
            channelSecret: string;
            notifyEnable: boolean;
            notifyClientId: string;
            notifyClientSecret: string;
        };
        matrix: {
            enable: boolean;
            homeserverUrl: string;
            accessToken: string;
        };
        discord: {
            enable: boolean;
            botToken: string;
        };
        telegram: {
            enable: boolean;
            botToken: string;
        };
    };
};

const configPath = new URL("../config.yaml", import.meta.url);
const configContent = readFileSync(configPath, "utf8");

const config: ConfigSchema = parse(configContent);
export default config;
