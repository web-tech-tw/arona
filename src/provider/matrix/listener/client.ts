import {
    MatrixClient,
} from "matrix-bot-sdk";

/**
 * MatrixListenerClient
 */
export class MatrixListenerClient extends MatrixClient {
    identity?: string;
    e2eeMode?: boolean;

    /**
     * Starts syncing the client with an optional filter
     * @param {any} filter The filter to use, or null for none
     * @return {Promise<any>} Resolves when the client has started syncing
     */
    async start(filter?: any): Promise<any> {
        this.identity = await this.getUserId();
        this.e2eeMode = false;
        return await super.start(filter);
    }
}
