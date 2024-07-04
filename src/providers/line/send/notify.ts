import Sender from "../../../types/sender";

import {
    AxiosResponse,
} from "axios";

import {
    nanoid,
} from "nanoid";

import {
    notifyClient,
} from "../client";

import {
    stringify,
} from "querystring";

import {
    store,
    cache,
} from "../../../memory";

import {
    httpConfig,
    bridgeProviderConfig,
} from "../../../config";

import NotifyLink from "../../../types/notify_link";

const {
    baseUrl,
} = httpConfig();

const {
    line: lineConfig,
} = bridgeProviderConfig();

const {
    notifyClientId,
    notifyClientSecret,
} = lineConfig;

type Message = {
    message: string;
    imageThumbnail?: string;
    imageFullsize?: string;
    imageFile?: string;
    stickerPackageId?: number;
    stickerId?: number;
    notificationDisabled?: boolean;
};

/**
 * Create an authorization URL for LINE Notify.
 * @param {string} chatId The ID of the chat room.
 * @return {string}
 * @see https://notify-bot.line.me/doc/en/
 */
export function createNotifyAuthUrl(chatId: string): string {
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

/**
 * Send a message to the chat room.
 * @param {string} chatId The ID of the chat room.
 * @param {Message} message The message to send.
 * @return {Promise<AxiosResponse>}
 */
function sendMessage(chatId: string, message: Message): Promise<AxiosResponse> {
    if (!notifyClient) {
        throw new Error("Client is not initialized.");
    }
    const link = NotifyLink.use(chatId);
    if (!link.exists()) {
        throw new Error("Link not found.");
    }
    const {accessToken} = link;
    const headers = {
        Authorization: `Bearer ${accessToken}`,
    };
    return notifyClient.post(
        "/api/notify",
        stringify(message),
        {headers},
    );
}

/**
 * Send a text message to the chat room.
 * @param {Sender} sender - The sender of the message.
 * @param {string} chatId - The ID of the chat room.
 * @param {string} text - The text to send.
 * @return {Promise<AxiosResponse>}
 */
export function sendTextMessage(
    sender: Sender,
    chatId: string,
    text: string,
): Promise<AxiosResponse> {
    const message: Message = {
        message: `${sender.prefix}\n${text}`,
    };
    return sendMessage(chatId, message);
}

/**
 * Send an image message to the chat room.
 * @param {Sender} sender - The sender of the message.
 * @param {string} chatId - The ID of the chat room.
 * @param {string} imageUrl - The image URL.
 * @param {ImageMessageOptions} options - The options to send image message.
 * @return {Promise<AxiosResponse>}
 */
export function sendImageMessage(
    sender: Sender,
    chatId: string,
    imageUrl: string,
): Promise<AxiosResponse> {
    const message: Message = {
        message: `${sender.displayName}\nSent an image.`,
        imageFullsize: imageUrl,
        imageThumbnail: imageUrl,
    };
    return sendMessage(chatId, message);
}
