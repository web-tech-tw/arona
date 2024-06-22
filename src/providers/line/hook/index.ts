import {
    bridgeProviderConfig,
} from "../../../config";

import {
    BridgeProviderType,
} from "../../../types";

import {
    HookProvider,
} from "../../types";

import {
    Router,
    Request,
    Response,
    Handler,
} from "express";

import {
    middleware,
    MiddlewareConfig,
    WebhookEvent,
} from "@line/bot-sdk";

import message from "./message";

type EventMethod = (event: WebhookEvent) =>
    Promise<void> | void;

type EventMethodList = {
    [key: string]: EventMethod
};

const eventHandlers: EventMethodList = {
    message,
};

/**
 * Run the event.
 * @param {WebhookEvent} event - The event to run.
 * @return {Promise<void>}
 */
async function runEvent(event: WebhookEvent): Promise<void> {
    const typeName: string = event.type.toString();
    if (typeName in eventHandlers) {
        eventHandlers[typeName](event);
    }
}

export default class LINEHook implements HookProvider {
    type(): BridgeProviderType {
        return "line";
    }

    async hook(router: Router): Promise<void> {
        router.post(
            "/line",
            this.middleware,
            this.controller,
        );
    }

    get middleware(): Handler {
        const {
            line: lineConfig,
        } = bridgeProviderConfig();
        const {
            channelSecret,
        } = lineConfig;
        const config: MiddlewareConfig = {
            channelSecret,
        };
        return middleware(config);
    }

    async controller(req: Request, res: Response): Promise<void> {
        
        // Get the events from the request.
        const events: WebhookEvent[] = req.body.events;
        // Try to process the events.
        try {
            // Process all of the events.
            const promises = events.map(runEvent);
            await Promise.all(promises);
            // Return a successfull message.
            res.status(200).json({
                status: "success",
            });
        } catch (err: unknown) {
            // Print the error.
            if (err instanceof Error) {
                console.error(err);
            }
            // Return an error message.
            res.status(500).json({
                status: "error",
            });
        }
    }
}
