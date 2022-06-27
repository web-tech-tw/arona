import {
    AutojoinRoomsMixin,
} from "matrix-bot-sdk";

import {
    client
} from "../index";

import roomMessage from "./room/message";

AutojoinRoomsMixin.setupOnClient(client);

const events = [
    roomMessage,
];

events.forEach(
    (e) => e(client)
);

export const loopEvent = () => {
    client
        .start()
        .then(() => console.log("Client started!"))
        .catch((e) => console.error(e));
};
