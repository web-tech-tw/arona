// Purpose: Main entry point for the application.

// Import the configuration.
import {
    httpConfig,
} from "./src/config";

// Import the application.
import {
    app,
    indexHandler,
    heartHandler,
    staticHandler,
    checkHeartCode,
} from "./src/server";

// Import listen providers.
import MatrixListen from "./src/providers/matrix/listen";
import DiscordListen from "./src/providers/discord/listen";
import TelegramListen from "./src/providers/telegram/listen";

// Import hook providers.
import LINEHook from "./src/providers/line/hook";

// Import send providers.
import LINESend from "./src/providers/line/send";
import MatrixSend from "./src/providers/matrix/send";
import DiscordSend from "./src/providers/discord/send";
import TelegramSend from "./src/providers/telegram/send";
import OpenaiSend from "./src/providers/openai/send";

import {
    hookRouter,
    registerSendProviders,
    registerHookProviders,
    registerListenProviders,
} from "./src/registry";

// Register all senders.
await registerSendProviders([
    new LINESend(),
    new MatrixSend(),
    new DiscordSend(),
    new TelegramSend(),
    new OpenaiSend(),
]);

// Register all listeners.
await registerListenProviders([
    new MatrixListen(),
    new DiscordListen(),
    new TelegramListen(),
]);

// Register all Hookers.
await registerHookProviders([
    new LINEHook(),
]);

// This route is used to handle the index.
app.get("/", indexHandler);

// This route is used to serve static files.
app.use("/static", staticHandler);

// This route is used to handle the heart.
app.get("/heart", heartHandler);

// This route is used to handle the hooks.
app.use("/hooks", hookRouter);

// Define the port to expose the application on.
const {
    bindHost,
    bindPort,
} = httpConfig();

// Create a server and listen to it.
app.listen(bindPort, bindHost, () => {
    console.info("Arona");
    console.info("===");
    console.info("A simple bridge for every messenger.");
    console.info(`Listening on http://${bindHost}:${bindPort}`);
    checkHeartCode();
});
