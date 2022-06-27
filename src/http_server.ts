import express, {
    Application,
    Request,
    Response
} from "express";

import {
    expressMapper
} from "./provider/line/listener";

// Define the port to expose the application on.
const exposePort = process.env.HTTP_EXPOSE_PORT || 3000;

// Create a new Express application.
const app: Application = express();

// Route handler to receive webhook events.
// This route is used to receive connection tests.
app.get("/", async (_: Request, res: Response): Promise<Response> => {
    return res.status(200).json({
        status: "success",
        message: "Connected successfully!",
    });
});

const controllers = [
    expressMapper,
];

controllers.forEach(
    (c) => c(app)
);

export const loopEvent = async () => {
    // Create a server and listen to it.
    app.listen(exposePort, () => {
        console.log(`Application is live and listening on port ${exposePort}`);
    });
}
