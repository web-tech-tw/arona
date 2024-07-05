import SenderBase from "../../types/sender";

import {
    User,
    PhotoSize,
} from "node-telegram-bot-api";

import {
    staticFileHttpUrl,
    existsStaticFile,
    writeStaticFile,
} from "../../server";

import {
    client,
} from "./client";

import {
    readAll,
} from "../../utils";

/**
 * Get the avatar URL of a user.
 * @param {User} user - The user.
 * @return {Promise<string|null>}
 */
export async function getAvatarUrl(user: User): Promise<string|null> {
    if (!client) {
        throw new Error("Client is not initialized");
    }

    const filename = `tgavatar-${user.id}`;
    if (!existsStaticFile(filename)) {
        const {photos} = await client.getUserProfilePhotos(user.id);
        if (!photos || photos.length === 0) {
            return null;
        }
        const photo: PhotoSize = photos[0][0];

        const stream = client.getFileStream(photo.file_id);
        if (!stream) {
            throw new Error("Failed to get file stream");
        }
        const imageBuffer = await readAll(stream);
        await writeStaticFile(filename, imageBuffer);
    }

    return staticFileHttpUrl(filename);
}

/**
 * Sender of Telegram
 */
export class TelegramSender extends SenderBase {
    /**
     * Create a TelegramSender.
     * @param {User} user - The user.
     * @return {Promise<TelegramSender>}
     */
    public static async fromMessageFromUser(
        user: User,
    ): Promise<TelegramSender> {
        const displayName = user.username ?? user.first_name;
        const pictureUrl = await getAvatarUrl(user) ?? undefined;
        return new TelegramSender({
            providerType: "telegram",
            displayName,
            pictureUrl,
        });
    }
}
