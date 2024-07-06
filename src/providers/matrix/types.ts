import SenderBase from "../../types/sender";

import {
    client,
} from "./client";

import {
    MatrixClient,
    MessageEvent,
    MessageEventContent,
} from "matrix-bot-sdk";

const providerType = "matrix";

/**
 * MatrixListenerClient
 */
export class MatrixListenerClient extends MatrixClient {
    public identity?: string;

    /**
     * Starts syncing the client with an optional filter
     * @override
     * @param {unknown} filter The filter to use, or null for none
     * @return {Promise<unknown>} Resolves when the client has started syncing
     */
    async start(filter?: unknown): Promise<unknown> {
        this.identity = await this.getUserId();
        const joinedRooms = await this.getJoinedRooms();
        await this.crypto.prepare(joinedRooms);
        return await super.start(filter);
    }
}

/**
 * Sender of Matrix
 */
export class MatrixSender extends SenderBase {
    /**
     * Creates a new MatrixSender from a Matrix Room Event
     * @param {string} roomId - Matrix Room ID
     * @param {MessageEvent} event - Matrix Message Event
     * @return {Promise<Sender>}
     */
    static async fromRoomEvent(
        roomId: string,
        event: MessageEvent<MessageEventContent>,
    ): Promise<MatrixSender> {
        if (!client) {
            throw new Error("Client is not initialized");
        }

        const profile = await client.getUserProfile(event.sender);
        const displayName = profile.displayname;
        const pictureUrl = client.mxcToHttp(profile.avatar_url);
        const chatId = roomId;
        const fromId = event.sender;

        return new MatrixSender({
            displayName,
            pictureUrl,
            providerType,
            chatId,
            fromId,
        });
    }
}
