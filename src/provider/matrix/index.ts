import {
    MatrixClient,
    SimpleFsStorageProvider,
    RustSdkCryptoStorageProvider,
} from "matrix-bot-sdk";

import {
    StoreType,
} from "@matrix-org/matrix-sdk-crypto-nodejs";

const dataDirectoryPath = `${__dirname}/../../../data`;

export const homeserverUrl = process.env.MATRIX_HOMESERVER_URL || "";
export const accessToken = process.env.MATRIX_ACCESS_TOKEN || "";
export const storage = new SimpleFsStorageProvider(
    `${dataDirectoryPath}/storage.json`,
);
export const crypto = new RustSdkCryptoStorageProvider(
    `${dataDirectoryPath}/crypto`,
    StoreType.Sled,
);

export const client = new MatrixClient(
    homeserverUrl,
    accessToken,
    storage,
);
