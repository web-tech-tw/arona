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
    matrix: matrixConfig,
} = bridgeProviderConfig();

/**
 * Create a new Matrix client.
 * @return {MatrixListenerClient}
 */
function newClient(): MatrixListenerClient {
    const {
        homeserverUrl,
        accessToken,
    } = matrixConfig;

    const {
        pathname: dataDirectoryPath,
    } = new URL("../../../data", import.meta.url);

    const storage = new SimpleFsStorageProvider(
        `${dataDirectoryPath}/storage.json`,
    );
    const crypto = new RustSdkCryptoStorageProvider(
        `${dataDirectoryPath}/crypto`,
        StoreType.Sled,
    );

    const client = new MatrixListenerClient(
        homeserverUrl,
        accessToken,
        storage,
        crypto,
    );
    AutojoinRoomsMixin.setupOnClient(client);

    return client;
}

const {
    enable: isEnabled,
} = matrixConfig;

/**
 * The Matrix client.
 */
export const client = isEnabled ?
    newClient() :
    null;
