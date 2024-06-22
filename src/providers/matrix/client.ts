import {
    bridgeProviderConfig,
} from "../../config";

import {
    SimpleFsStorageProvider,
    RustSdkCryptoStorageProvider,
    AutojoinRoomsMixin,
} from "matrix-bot-sdk";

import {
    StoreType,
} from "@matrix-org/matrix-sdk-crypto-nodejs";

import {
    MatrixListenerClient,
} from "./types";

const {
    pathname: dataDirectoryPath,
} = new URL("../../../data", import.meta.url);

const {
    matrix: matrixConfig,
} = bridgeProviderConfig();

const {
    homeserverUrl,
    accessToken,
} = matrixConfig;

export const storage = new SimpleFsStorageProvider(
    `${dataDirectoryPath}/storage.json`,
);
export const crypto = new RustSdkCryptoStorageProvider(
    `${dataDirectoryPath}/crypto`,
    StoreType.Sled,
);

export const client = new MatrixListenerClient(
    homeserverUrl,
    accessToken,
    storage,
    crypto,
);
AutojoinRoomsMixin.setupOnClient(client);
