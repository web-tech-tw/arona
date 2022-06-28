import {
    AutojoinRoomsMixin,
    MatrixClient,
} from "matrix-bot-sdk";

import {
    client as prototypeClient
} from "../index";

import roomMessage from "./room/message";

export interface MatrixLintenerClient extends MatrixClient {
    identity: string;
};

const listenerClient =
    prototypeClient as MatrixLintenerClient;

AutojoinRoomsMixin.setupOnClient(listenerClient);

const events = [
    roomMessage,
];

events.forEach(
    (e) => e(listenerClient)
);

export const loopEvent = async () => {
    listenerClient.identity =
        await listenerClient.getUserId();
    await listenerClient.start();
    console.log("Client started!");
};
