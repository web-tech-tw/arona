// Purpose: Main entry point for the application.

// Import the configuration.
import config from "./src/config";

// Import the application.
import {app} from "./src/http_server";

// Import all listeners.
import matrixListener from "./src/provider/matrix/listener";

// Define all listeners.
const listeners = [
    matrixListener,
];

// Run all listeners.
Promise.all(listeners.map(
    (handler) => handler(),
));

// Define the port to expose the application on.
const {
    bindHost,
    bindPort,
} = config.http;

// Create a server and listen to it.
app.listen(bindPort, bindHost, () => {
    const url = `http://${bindHost}:${bindPort}`;

    console.info("Arona");
    console.info("===");
    console.info(`Listening on ${url}`);
});
