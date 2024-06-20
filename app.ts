// Purpose: Main entry point for the application.

// Import the environment variables.
import "dotenv/config";

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
const exposePort = process.env.HTTP_EXPOSE_PORT || 3000;

// Create a server and listen to it.
app.listen(exposePort, () => {
    console.info("Arona");
    console.info("===");
    console.info(`Listening on port ${exposePort}`);
});
