import {
    WebhookEvent,
} from "@line/bot-sdk";

import {
    Request,
    Response,
} from "express";

import message from "./message";

const eventHandlers = {
    message,
}

// Handle single event.
const eventHandler = (event: WebhookEvent) => {
    return eventHandlers[event.type](event);
};

// Process all of the received events asynchronously.
const eventsDispatcher = async (req: Request, res: Response): Promise<Response> => {
    const events: WebhookEvent[] = req.body.events;

    try {
        // Return a successfull message.
        return res.status(200).json({
            status: "success",
            results: await Promise.all(
                events.map(eventHandler)
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
}

export default eventsDispatcher;
