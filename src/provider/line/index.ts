import {
    ClientConfig,
    Client,
} from "@line/bot-sdk";

import axios, {
    AxiosRequestConfig,
} from "axios";

const axiosUserAgent = process.env.DEVICE_NAME || "";

export const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN || "";
export const channelSecret = process.env.LINE_CHANNEL_SECRET || "";
const notifyToken = process.env.LINE_NOTIFY_TOKEN || "";

// Configure clients
const clientConfig: ClientConfig = {
    channelAccessToken, channelSecret,
};
const notifyClientConfig: AxiosRequestConfig = {
    baseURL: "https://notify-api.line.me",
    headers: {
        "Authorization": `Bearer ${notifyToken}`,
        "User-Agent": axiosUserAgent,
    },
};

// Create a new LINE clients.
export const client = new Client(clientConfig);
export const notifyClient = axios.create(notifyClientConfig);
