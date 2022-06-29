import {
    AutojoinRoomsMixin,
} from "matrix-bot-sdk";

import {
    MatrixLintenerClient,
} from "./client";

import {
    homeserverUrl,
    accessToken,
    storage,
} from "../index";

import roomMessage from "./room/message";

const listenerClient = new MatrixLintenerClient(
    homeserverUrl,
    accessToken,
    storage,
);

AutojoinRoomsMixin.setupOnClient(listenerClient);

const events = [
    roomMessage,
];

events.forEach(
    (e) => e(listenerClient),
);

export const loopEvent = async () => {
    await listenerClient.start();
    console.log("Client started!");
};
