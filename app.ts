require("dotenv").config();

import {
    loopEvent as lineLoop
} from "./src/line/listener";

import {
    loopEvent as matrixLoop
} from "./src/matrix/listener";

(async () => {
    const events = [
        lineLoop,
        matrixLoop
    ];
    await Promise.all(
        events.map((e) => e())
    );
})
