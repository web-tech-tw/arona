import {
    MatrixClient,
    SimpleFsStorageProvider,
} from "matrix-bot-sdk";

const homeserverUrl = process.env.MATRIX_HOMESERVER_URL || "";
const accessToken = process.env.MATRIX_ACCESS_TOKEN || "";
const storage = new SimpleFsStorageProvider("bot.json");

export const client = new MatrixClient(
    homeserverUrl,
    accessToken,
    storage,
);
