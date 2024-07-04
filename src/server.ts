// Purpose: Define the HTTP server.

// Import configuration.
import {
    httpConfig,
} from "./config";

// Import dependencies.
import express, {
    Application,
    Request,
    Response,
    static as staticMiddleware,
} from "express";

import {
    readFile,
    writeFile,
    unlink,
} from "fs/promises";

// Create a new Express application.
export const app: Application = express();

// Define the index handler.
export const indexHandler = async (
    _req: Request,
    res: Response,
): Promise<Response> => {
    return res.status(200).json({
        status: "success",
        message: "Connected successfully!",
    });
};

// Define the static directory path.
export const staticBasePathUrl = new URL("../static/", import.meta.url);
export const {pathname: staticBasePath} = staticBasePathUrl;

// Define the static handler.
export const staticHandler = staticMiddleware(staticBasePath);

/**
 * Get the HTTP URL of a static file.
 * @param {string} filename - The filename.
 * @return {string} - The HTTP URL.
 */
export function staticFileHttpUrl(
    filename: string,
): string {
    const name = `file_${filename}`;
    const {baseUrl} = httpConfig();
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
    const pathUrl = new URL(name, staticBasePathUrl);
    const file = await readFile(pathUrl);
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
    const pathUrl = new URL(name, staticBasePathUrl);
    await writeFile(pathUrl, buffer);
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
    const pathUrl = new URL(name, staticBasePathUrl);
    await unlink(pathUrl);
}
