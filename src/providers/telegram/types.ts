import SenderBase from "../../types/sender";

import {
    User,
    Message,
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
     * Create a Sender from Telegram Message.
     * @param {Message} message - Telegram Message
     * @return {Promise<TelegramSender>}
     */
    public static async fromMessage(
        message: Message,
    ): Promise<TelegramSender> {
        if (!message.from) {
            throw new Error("Message does not have a sender");
        }

        const providerType = "telegram";
        const displayName = message.from.username ?? message.from.first_name;
        const pictureUrl = await getAvatarUrl(message.from) ?? undefined;
        const chatId = message.chat.id.toString();
        const fromId = message.from.id.toString();

        return new TelegramSender({
            displayName,
            pictureUrl,
            providerType,
            chatId,
            fromId,
        });
    }
}
