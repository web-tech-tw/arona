import config from "../../../config";

import {
    Application,
    Request,
    Response,
} from "express";

import {
    middleware,
    MiddlewareConfig,
    WebhookEvent,
} from "@line/bot-sdk";

import message from "./message";

const {
    channelSecret,
} = config.bridgeProvider.line;

const middlewareConfig: MiddlewareConfig = {
    channelSecret,
};

export const expressMapper = (app: Application) => {
    // This route is used for the Webhook.
    app.post(
        "/webhook",
        middleware(middlewareConfig),
        eventsDispatcher,
    );
};

type EventMethod = (event: WebhookEvent) =>
    Promise<void> | void;

type EventMethodList = {
    [key: string]: EventMethod
};

const eventHandlers: EventMethodList = {
    message,
};

// Handle single event.
const eventHandler = (
    event: WebhookEvent,
): Promise<void> | void => {
    const typeName: string = event.type.toString();
    if (typeName in eventHandlers) {
        (eventHandlers[typeName])(event);
    }
};

// Process all of the received events asynchronously.
const eventsDispatcher = async (
    req: Request, res: Response,
): Promise<Response> => {
    const events: WebhookEvent[] = req.body.events;

    try {
        // Process all of the events.
        await Promise.all(
            events.map(eventHandler),
        );
        // Return a successfull message.
        return res.status(200).json({
            status: "success",
        });
    } catch (err: unknown) {
        // Print the error.
        if (err instanceof Error) {
            console.error(err);
        }

        // Return an error message.
        return res.status(500).json({
            status: "error",
        });
    }
};
