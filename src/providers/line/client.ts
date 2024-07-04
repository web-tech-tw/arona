import {
    appConfig,
    bridgeProviderConfig,
} from "../../config";

import {
    ClientConfig,
    messagingApi,
} from "@line/bot-sdk";

import axios, {
    AxiosInstance,
    AxiosRequestConfig,
} from "axios";

const {
    deviceName,
} = appConfig();

const {
    line: lineConfig,
} = bridgeProviderConfig();

/**
 * Get the LINE client configuration.
 * @return {ClientConfig}
 */
function getMessagingClientConfig(): ClientConfig {
    const {
        channelAccessToken,
        channelSecret,
    } = lineConfig;

    return {
        channelAccessToken, channelSecret,
    };
}

/**
 * Create a new LINE client.
 * @return {messagingApi.MessagingApiClient}
 */
function newMessagingApiClient(): messagingApi.MessagingApiClient {
    const {MessagingApiClient} = messagingApi;
    const clientConfig = getMessagingClientConfig();
    return new MessagingApiClient(clientConfig);
}

/**
 * Create a new LINE client.
 * @return {messagingApi.MessagingApiBlobClient}
 */
function newMessagingApiBlobClient(): messagingApi.MessagingApiBlobClient {
    const {MessagingApiBlobClient} = messagingApi;
    const clientConfig = getMessagingClientConfig();
    return new MessagingApiBlobClient(clientConfig);
}

/**
 * Create a new LINE client.
 * @return {AxiosInstance}
 */
function newNotifyClient(): AxiosInstance {
    // Configure client
    const notifyClientConfig: AxiosRequestConfig = {
        baseURL: "https://notify-api.line.me",
        headers: {
            "User-Agent": deviceName,
        },
    };

    // Create a new LINE client.
    return axios.create(notifyClientConfig);
}

const {
    enable: isEnabled,
} = lineConfig;

/**
 * The LINE client.
 */
export const messagingClient = isEnabled ?
    newMessagingApiClient() :
    null;

/**
 * The LINE client.
 */
export const messagingBlobClient = isEnabled ?
    newMessagingApiBlobClient() :
    null;

/**
 * The LINE client.
 */
export const notifyClient = isEnabled ?
    newNotifyClient() :
    null;
