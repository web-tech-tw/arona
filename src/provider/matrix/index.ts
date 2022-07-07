import {
    MatrixClient,
    SimpleFsStorageProvider,
} from "matrix-bot-sdk";

const dataDirectoryPath = `${__dirname}/../../../data`;

export const homeserverUrl = process.env.MATRIX_HOMESERVER_URL || "";
export const accessToken = process.env.MATRIX_ACCESS_TOKEN || "";
export const storage = new SimpleFsStorageProvider(
    `${dataDirectoryPath}/bot.json`,
);

export const client = new MatrixClient(
    homeserverUrl,
    accessToken,
    storage,
);
