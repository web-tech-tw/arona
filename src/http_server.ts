// Purpose: Define the HTTP server.

// Import dependencies.
import express, {
    Application,
    Request,
    Response,
} from "express";

import {
    readFile,
    writeFile,
    unlink,
} from "fs/promises";

// Import LINE listener.
import {
    expressMapper,
} from "./provider/line/listener";

// Define the static directory path.
export const {
    pathname: staticDirectoryPath,
} = new URL("../static", import.meta.url);

/**
 * Get the HTTP URL of a static file.
 * @param {string} filename - The filename.
 * @return {string} - The HTTP URL.
 */
export function staticFileHttpUrl(
    filename: string,
): string {
    const name = `file_${filename}`;
    const {HTTP_BASE_URL: baseUrl} = process.env;
    return `${baseUrl}/static/${name}`;
}

/**
 * Read a static file.
 * @param {string} filename - The filename.
 * @return {Promise<Buffer>} - The file buffer.
 */
export async function readStaticFile(
    filename: string,
): Promise<Buffer> {
    const name = `file_${filename}`;
    const path = new URL(name, staticDirectoryPath);
    const file = await readFile(path);
    return Buffer.from(file);
}

/**
 * Write a static file.
 * @param {string} filename - The filename.
 * @param {Buffer} buffer - The file buffer.
 * @return {Promise<string>}
 */
export async function writeStaticFile(
    filename: string,
    buffer: Buffer,
): Promise<string> {
    const name = `file_${filename}`;
    const path = new URL(name, staticDirectoryPath);
    await writeFile(path, buffer);
    return staticFileHttpUrl(filename);
}

/**
 * Delete a static file.
 * @param {string} filename - The filename.
 * @return {Promise<void>}
 */
export async function deleteStaticFile(
    filename: string,
): Promise<void> {
    const name = `file_${filename}`;
    const path = new URL(name, staticDirectoryPath);
    await unlink(path);
}

// Create a new Express application.
export const app: Application = express();

// This route is used to receive connection tests.
app.get("/", async (_: Request, res: Response): Promise<Response> => {
    return res.status(200).json({
        status: "success",
        message: "Connected successfully!",
    });
});

// This route is used to serve the static files.
app.use("/static", express.static(
    staticDirectoryPath,
));

// Define controllers.
const controllers = [
    expressMapper,
];

// Register controllers.
controllers.forEach(
    (c) => c(app),
);
