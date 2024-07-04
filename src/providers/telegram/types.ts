import SenderBase from "../../types/sender";

import {
    User,
} from "node-telegram-bot-api";

/**
 * Sender of Telegram
 */
export class TelegramSender extends SenderBase {
    /**
     * Create a TelegramSender.
     * @param {User} user - The user.
     * @return {TelegramSender}
     */
    public static fromMessageFromUser(user: User): TelegramSender {
        return new TelegramSender({
            providerType: "telegram",
            displayName: user.username || user.first_name,
        });
    }
}
