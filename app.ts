require("dotenv").config();

import {
    loopEvent as httpServerLoop
} from "./src/http_server";

import {
    loopEvent as matrixListenerLoop
} from "./src/provider/matrix/listener";

(async () => {
    const events = [
        httpServerLoop,
        matrixListenerLoop,
    ];
    await Promise.all(
        events.map((e) => e())
    );
})();
