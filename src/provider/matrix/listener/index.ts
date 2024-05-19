import {
    AutojoinRoomsMixin,
} from "matrix-bot-sdk";

import {
    MatrixListenerClient,
} from "./client";

import {
    homeserverUrl,
    accessToken,
    storage,
    crypto,
} from "../index";

import roomMessage from "./room_message";

const listenerClient = new MatrixListenerClient(
    homeserverUrl,
    accessToken,
    storage,
    crypto,
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
    console.info("Client started!");
};
