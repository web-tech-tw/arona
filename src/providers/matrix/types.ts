/* eslint-disable @typescript-eslint/no-explicit-any */
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
