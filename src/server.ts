// Purpose: Define the HTTP server.

// Import configuration.
import {
    httpConfig,
} from "./config";

// Import dependencies.
import axios from "axios";

import express, {
    Application,
    Request,
    Response,
    static as staticMiddleware,
} from "express";

import {
    nanoid,
} from "nanoid";

import {
    existsSync,
} from "node:fs";

import {
    readFile,
    writeFile,
    unlink,
} from "node:fs/promises";

// Create a new Express application.
export const app: Application = express();

// Define the index handler.
export const indexHandler = async (
    _req: Request,
    res: Response,
): Promise<Response> => {
    return res.status(200).send(`
        <div>
            <b>Arona</b><br />
            A simple bridge for every messenger.<br />
            <a href="https://github.com/web-tech-tw/arona">GitHub</a>
        </div>
    `);
};

// Define the heart code.
const heartCode = nanoid();

// Define the heart handler.
export const heartHandler = async (
    _req: Request,
    res: Response,
): Promise<Response> => {
    return res.status(200).json({
        heart: heartCode,
    });
};

/**
 * Check if the heart code is correct.
 * @return {Promise<void>}
 */
export async function checkHeartCode(): Promise<void> {
    const {baseUrl} = httpConfig();
    let heartCodeActual = "";
    try {
        const response = await axios.get(`${baseUrl}/heart`);
        heartCodeActual = response.data.heart;
    } catch (error: unknown) {
        console.error(error);
        throw new Error(
            "Cannot check the heart code, " +
            "base URL might be incorrect, " +
            "or the server is not running, " +
            "please check the configuration.",
        );
    }
    if (heartCodeActual !== heartCode) {
        throw new Error(
            "Heart code is incorrect, " +
            "the api server of base URL pointed " +
            "might be not the same to this one, " +
            "please check the configuration.",
        );
    }
}

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
 * Check if a static file exists.
 * @param {string} filename - The filename.
 * @return {boolean} - The result.
 */
export function existsStaticFile(
    filename: string,
): boolean {
    const name = `file_${filename}`;
    const pathUrl = new URL(name, staticBasePathUrl);
    return existsSync(pathUrl);
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
