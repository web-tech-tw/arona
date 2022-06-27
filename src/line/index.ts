import {
    ClientConfig,
    Client,
} from "@line/bot-sdk";

export const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN || "";
export const channelSecret = process.env.LINE_CHANNEL_SECRET || "";

const clientConfig: ClientConfig = {
    channelAccessToken, channelSecret
};

// Create a new LINE SDK client.
export const client = new Client(clientConfig);
