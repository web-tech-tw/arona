import {
    appConfig,
    httpConfig,
    bridgeProviderConfig,
} from "../../config";

import {
    nanoid,
} from "nanoid";

import {
    ClientConfig,
    messagingApi,
} from "@line/bot-sdk";

import axios, {
    AxiosInstance,
    AxiosRequestConfig,
} from "axios";

import {
    stringify,
} from "querystring";

import {
    store,
    cache,
} from "../../memory";

import NotifyLink from "../../types/notify_link";

const {
    deviceName,
} = appConfig();

const {
    baseUrl,
} = httpConfig();

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

/**
 * Create an authorization URL for LINE Notify.
 * @param {string} chatId The ID of the chat room.
 * @return {string}
 * @see https://notify-bot.line.me/doc/en/
 */
export function createNotifyAuthUrl(chatId: string): string {
    const {
        notifyClientId,
    } = lineConfig;

    const clientId = notifyClientId;
    const redirectUri = `${baseUrl}/hooks/line/notify`;
    const state = nanoid();
    const scope = "notify";
    const responseType = "code";

    cache.set(`notifyPair:${state}`, chatId);

    const authBaseUrl = "https://notify-bot.line.me/oauth/authorize";
    const paramsString = stringify({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: responseType,
        state,
        scope,
    });

    return `${authBaseUrl}?${paramsString}`;
}

/**
 * Authorize the LINE Notify code.
 * @param {string} state The state to authorize.
 * @param {string} code The code to authorize.
 * @return {Promise<void>}
 */
export async function authNotifyCode(
    state: string,
    code: string,
): Promise<void> {
    if (!notifyClient) {
        throw new Error("Client is not initialized.");
    }

    const {
        notifyClientId,
        notifyClientSecret,
    } = lineConfig;

    const chatId = cache.get(`notifyPair:${state}`);
    if (!chatId) {
        throw new Error("Chat ID not found.");
    }

    const clientId = notifyClientId;
    const clientSecret = notifyClientSecret;
    const redirectUri = `${baseUrl}/hooks/line/notify`;

    const authUrl = "https://notify-bot.line.me/oauth/token";
    const paramsString = stringify({
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
        code,
    });

    const result = await notifyClient.post(authUrl, paramsString);
    const {access_token: accessToken} = result.data;

    const link = NotifyLink.use(chatId as string);
    link.accessToken = accessToken;
    link.save();

    await store.write();
}
