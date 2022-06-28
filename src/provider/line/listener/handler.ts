import {
    WebhookEvent,
    MessageAPIResponseBase,
} from "@line/bot-sdk";

import {
    Request,
    Response,
} from "express";

import message from "./message";

type EventMethod = (event: WebhookEvent) =>
    Promise<MessageAPIResponseBase | undefined> | undefined;

type EventMethodList = {
    [key: string]: EventMethod
};

const eventHandlers: EventMethodList = {
    message,
};

// Handle single event.
const eventHandler = (
    event: WebhookEvent,
): Promise<MessageAPIResponseBase | undefined> | undefined => {
    const typeName: string = event.type.toString();
    if (typeName in eventHandlers) {
        return (eventHandlers[typeName])(event);
    }
};

// Process all of the received events asynchronously.
const eventsDispatcher = async (
    req: Request, res: Response,
): Promise<Response> => {
    const events: WebhookEvent[] = req.body.events;

    try {
        // Return a successfull message.
        return res.status(200).json({
            status: "success",
            results: await Promise.all(
                events.map(eventHandler),
            ),
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

export default eventsDispatcher;
