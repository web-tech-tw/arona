import {
    MatrixClient,
} from "matrix-bot-sdk";

export class MatrixListenerClient extends MatrixClient {
    identity?: string;
    e2eeMode?: boolean;

    async start(filter?: any): Promise<any> {
        this.identity = await this.getUserId();
        this.e2eeMode = false;
        return await super.start(filter);
    }
}
