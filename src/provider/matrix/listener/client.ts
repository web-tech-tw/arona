import {
    MatrixClient,
} from "matrix-bot-sdk";

export class MatrixListenerClient extends MatrixClient {
    identity?: string;

    async start(filter?: any): Promise<any> {
        this.identity = await this.getUserId();
        return await super.start(filter);
    }
}
