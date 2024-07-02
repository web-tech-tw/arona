import {
    ProviderBase,
    ProviderType,
} from "../../../types/provider";

import {
    ListenProvider,
} from "../../../types/provider/listen";

import {
    client,
} from "../client";

import roomFailedDecryption from "./room/failed_decryption";
import roomMessage from "./room/message";

const events = {
    "room.failed_decryption": roomFailedDecryption,
    "room.message": roomMessage,
};

/**
 * Listen provider for Matrix.
 */
export default class MatrixListen
    extends ProviderBase
    implements ListenProvider {
    /**
     * Get the type.
     */
    public get type(): ProviderType {
        return "matrix";
    }

    /**
     * Listen.
     */
    async listen(): Promise<void> {
        if (!client) {
            throw new Error("Client is not initialized");
        }
        for (const [event, handler] of Object.entries(events)) {
            client.on(event, handler);
        }
        client.start();
    }
}
