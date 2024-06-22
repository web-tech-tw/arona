import {
    BridgeProviderType,
} from "../../../types";

import {
    client,
} from "../client";

import roomFailedDecryption from "./room/failed_decryption";
import roomMessage from "./room/message";

const events = {
    "room.failed_decryption": roomFailedDecryption,
    "room.message": roomMessage,
};

export default class MatrixListen {
    type(): BridgeProviderType {
        return "matrix";
    }

    async listen(): Promise<void> {
        Object.entries(events).forEach(([name, handler]) => {
            client.on(name, handler);
        });
        client.start();
    }
};
