import {
    appConfig,
    bridgeProviderConfig,
} from "../../config";

import {
    ClientConfig,
    messagingApi,
} from "@line/bot-sdk";

import axios, {
    AxiosRequestConfig,
} from "axios";

const {
    deviceName,
} = appConfig();

const {
    line: lineConfig,
} = bridgeProviderConfig();

const {
    channelAccessToken,
    channelSecret,
    notifyClientSecret,
} = lineConfig;

const {
    MessagingApiClient,
    MessagingApiBlobClient,
} = messagingApi;

// Configure clients
const clientConfig: ClientConfig = {
    channelAccessToken, channelSecret,
};
const notifyClientConfig: AxiosRequestConfig = {
    baseURL: "https://notify-api.line.me",
    headers: {
        "Authorization": `Bearer ${notifyClientSecret}`,
        "User-Agent": deviceName,
    },
};

// Create a new LINE clients.
export const messagingClient = new MessagingApiClient(clientConfig);
export const messagingBlobClient = new MessagingApiBlobClient(clientConfig);
export const notifyClient = axios.create(notifyClientConfig);
