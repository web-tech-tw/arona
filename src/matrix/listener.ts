import {
    AutojoinRoomsMixin,
} from "matrix-bot-sdk";

import {
    client
} from "./index";

AutojoinRoomsMixin.setupOnClient(client);

export const loopEvent = () => {
    client
        .start()
        .then(() => console.log("Client started!"))
        .catch((e) => console.error(e));
}
