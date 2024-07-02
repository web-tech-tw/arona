// Purpose: Main entry point for the application.

// Import the configuration.
import {
    httpConfig,
} from "./src/config";

// Import the application.
import {app, indexHandler, staticHandler} from "./src/server";

// Import the router.
import {
    Router as createRouter,
} from "express";

// Import all provider types.
import {
    ListenProvider,
    HookProvider,
} from "./src/providers/types";

// Import listen providers.
import MatrixListen from "./src/providers/matrix/listen";
import DiscordListen from "./src/providers/discord/listen";
import TelegramListen from "./src/providers/telegram/listen";

// Import hook providers.
import LINEHook from "./src/providers/line/hook";

// Define all listeners.
const listeners: Array<ListenProvider> = [
    new MatrixListen(),
    new DiscordListen(),
    new TelegramListen(),
];

// Define all Hookers.
const hookers: Array<HookProvider> = [
    new LINEHook(),
];

// Run all listeners.
await Promise.all(listeners.map(
    (provider: ListenProvider) => {
        if (!provider || !provider.enabled) {
            return;
        }
        provider.listen();
    },
));

// Run all Hookers.
const hookRouter = createRouter();
await Promise.all(hookers.map(
    (provider: HookProvider) => {
        if (!provider || !provider.enabled) {
            return;
        }
        provider.hook(hookRouter);
    },
));

// This route is used to handle the index.
app.get("/", indexHandler);

// This route is used to serve static files.
app.use("/static", staticHandler);

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
    console.info("The perfectest bridging for every messenger.");
    console.info(`Listening on http://${bindHost}:${bindPort}`);
});
