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

// This route is used to receive connection tests.
app.get("/", async (_: Request, res: Response): Promise<Response> => {
    return res.status(200).json({
        status: "success",
        message: "Connected successfully!",
    });
});

// This route is used to serve the static files.
app.use("/static", express.static(
    `${__dirname}/../static`
));

// Define controllers.
const controllers = [
    expressMapper,
];

// Register controllers.
controllers.forEach(
    (c) => c(app)
);

// Export loopEventHandler.
export const loopEvent = async () => {
    // Create a server and listen to it.
    app.listen(exposePort, () => {
        console.log(`Application is live and listening on port ${exposePort}`);
    });
};
