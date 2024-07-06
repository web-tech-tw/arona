import {
    Readable,
} from "stream";

/**
 * Read all data from a stream.
 * @param {Readable} stream - The stream.
 * @return {Promise<Buffer>} The buffer.
 */
export function readAll(stream: Readable): Promise<Buffer> {
    if (!stream.readable) {
        throw new Error("Stream is not readable");
    }
    return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        stream.on("data", (chunk: Buffer) => {
            chunks.push(chunk);
        });
        stream.on("end", () => {
            resolve(Buffer.concat(chunks));
        });
        stream.on("error", reject);
    });
}
