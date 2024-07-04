/* eslint-disable @typescript-eslint/no-explicit-any */
import SenderBase from "../../types/sender";

import {
    client,
} from "./client";

import {
    MatrixClient,
} from "matrix-bot-sdk";

/**
 * MatrixListenerClient
 */
export class MatrixListenerClient extends MatrixClient {
    public identity?: string;

    /**
     * Starts syncing the client with an optional filter
     * @override
     * @param {any} filter The filter to use, or null for none
     * @return {Promise<any>} Resolves when the client has started syncing
     */
    async start(filter?: any): Promise<any> {
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
     * Create a Sender from Matrix Sender.
     * @param {string} senderId - Matrix Sender
     * @return {Promise<Sender>}
     */
    static async fromSenderId(senderId: string): Promise<MatrixSender> {
        if (!client) {
            throw new Error("Client is not initialized");
        }

        const profile = await client.getUserProfile(senderId);
        const displayName = profile.displayname;
        const pictureUrl = client.mxcToHttp(profile.avatar_url);
        return new MatrixSender({
            displayName,
            pictureUrl,
            providerType: "matrix",
        });
    }
}
