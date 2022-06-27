// Import all dependencies, mostly using destructuring for better view.
import {
    middleware,
    MiddlewareConfig,
    WebhookEvent,
    TextMessage,
    MessageAPIResponseBase,
} from "@line/bot-sdk";
import express, {
    Application,
    Request,
    Response
} from "express";

import { 
    client,
    channelAccessToken,
    channelSecret,
 } from "./index";

const exposePort = process.env.LINE_EXPOSE_PORT || 3000;

// Create a new Express application.
const app: Application = express();

// Setup Express configurations.
const middlewareConfig: MiddlewareConfig = {
    channelAccessToken, channelSecret
};

// Function handler to receive the text.
const textEventHandler = async (
    event: WebhookEvent
): Promise<MessageAPIResponseBase | undefined> => {
    // Process all variables here.
    if (event.type !== "message" || event.message.type !== "text") {
        return;
    }

    // Process all message related variables here.
    const { replyToken } = event;
    const { text } = event.message;

    // Create a new message.
    const response: TextMessage = {
        type: "text",
        text,
    };

    // Reply to the user.
    await client.replyMessage(replyToken, response);
};

// Register the LINE middleware.
// As an alternative, you could also pass the middleware in the route handler, which is what is used here.
// app.use(middleware(middlewareConfig));

// Route handler to receive webhook events.
// This route is used to receive connection tests.
app.get("/", async (_: Request, res: Response): Promise<Response> => {
    return res.status(200).json({
        status: "success",
        message: "Connected successfully!",
    });
});

// This route is used for the Webhook.
app.post(
    "/webhook",
    middleware(middlewareConfig),
    async (req: Request, res: Response): Promise<Response> => {
        const events: WebhookEvent[] = req.body.events;

        // Process all of the received events asynchronously.
        const results = await Promise.all(
            events.map(async (event: WebhookEvent) => {
                try {
                    await textEventHandler(event);
                } catch (err: unknown) {
                    if (err instanceof Error) {
                        console.error(err);
                    }

                    // Return an error message.
                    return res.status(500).json({
                        status: "error",
                    });
                }
            })
        );

        // Return a successfull message.
        return res.status(200).json({
            status: "success",
            results,
        });
    }
);

export const loopEvent = async () => {
    // Create a server and listen to it.
    app.listen(exposePort, () => {
        console.log(`Application is live and listening on port ${exposePort}`);
    });
}
