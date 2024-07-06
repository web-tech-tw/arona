import {
    ProviderType,
    ProviderBase,
} from "../../../types/provider";

import {
    ListenProvider,
} from "../../../types/provider/listen";

import {
    client,
} from "../client";

import message from "./message";

const events = {
    "message": message,
};

/**
 * Listen provider for Telegram.
 */
export default class TelegramListen
    extends ProviderBase
    implements ListenProvider {
    /**
     * Get the type.
     */
    public get type(): ProviderType {
        return "telegram";
    }

    /**
     * Listen.
     */
    async listen(): Promise<void> {
        if (!client) {
            throw new Error("Client not initialized");
        }

        for (const [key, trigger] of Object.entries(events)) {
            client.on(key, trigger);
        }
    }
}
