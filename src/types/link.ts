// Import dependencies.
import {
    ProviderType,
} from "./provider";
import {
    store,
} from "../memory";
import {
    nanoid,
} from "nanoid";
import {
    SendProvider,
} from "./provider/send";
import {
    senders,
} from "../registry";

/**
 * The callback to send message.
 */
export type SendMessageCallback = (
    provider: SendProvider,
    chatId: string,
) => void;

// eslint-disable-next-line no-unused-vars
type LinkBridgeMapping = {[T in ProviderType]: string};

/**
 * The link class.
 */
export default class Link {
    public key: string;
    public bridge?: LinkBridgeMapping;

    /**
     * The constructor.
     * @param {Partial<Link>} params - The parameters.
     */
    constructor(params: Partial<Link>) {
        Object.assign(this, params);
    }

    /**
     * Find the link by chat type and chat ID, new one if not found.
     * @param {ProviderType} chatTo - The chat type.
     * @param {string} chatId - The chat ID.
     * @return {Link} The link.
     */
    static use(chatTo: ProviderType, chatId: string): Link {
        const {links} = store.data;
        const matcher = (link: Link) => {
            return link && link.bridge && link.bridge[chatTo] === chatId;
        };
        const link = links.find(matcher);
        if (link) {
            // Construct the link.
            return new Link(link);
        }

        // New link.
        const key = nanoid();
        const bridge = {
            [chatTo]: chatId,
        } as LinkBridgeMapping;
        return new Link({key, bridge});
    }

    /**
     * Get the chat ID.
     * @param {ProviderType} chatTo - The chat type.
     * @return {string|null} The chat ID.
     */
    chat(chatTo: ProviderType): string | null {
        if (!this.bridge || !this.bridge[chatTo]) {
            return null;
        }
        return this.bridge[chatTo];
    }

    /**
     * Connect the chat.
     * @param {ProviderType} chatTo - The chat type.
     * @param {string} chatId - The chat ID to set.
     * @return {void}
     */
    connect(chatTo: ProviderType, chatId: string): void {
        if (!this.bridge) {
            const newMapping = {[chatTo]: chatId};
            this.bridge = newMapping as LinkBridgeMapping;
        } else {
            this.bridge[chatTo] = chatId;
        }
    }

    /**
     * Disconnect the chat.
     * @param {ProviderType} chatTo - The chat type.
     * @return {void}
     */
    disconnect(chatTo: ProviderType): void {
        if (!this.bridge || !this.bridge[chatTo]) {
            return;
        }
        delete this.bridge[chatTo];
    }

    /**
     * Get the index of the link, returns -1 if not found.
     * @return {number} The index.
     */
    index(): number {
        const {links} = store.data;
        const matcher = (link: Link) => link && link.key === this.key;
        return links.findIndex(matcher);
    }

    /**
     * Check if the link exists.
     * @return {boolean} The result.
     */
    exists(): boolean {
        return this.index() !== -1;
    }

    /**
     * Save the link.
     * @return {void}
     */
    save(): void {
        if (this.exists()) {
            this.remove();
        }
        if (!this.bridge || Object.keys(this.bridge).length < 1) {
            return;
        }
        store.data.links = [...store.data.links, this];
        store.write();
    }

    /**
     * Remove the link.
     * @return {void}
     */
    remove(): void {
        if (!this.exists()) {
            return;
        }
        const matcher = (link: Link) => link && link.key !== this.key;
        store.data.links = [...store.data.links.filter(matcher)];
        store.write();
    }

    /**
     * Send to the specified send provider.
     * @param {ProviderType} chatType - The chat type.
     * @param {SendMessageCallback} callback - The callback to send.
     * @return {void}
     */
    toSend(
        chatType: ProviderType,
        callback: SendMessageCallback,
    ): void {
        const matcher = (i: SendProvider) => i.type === chatType;
        const sender = senders.find(matcher) ?? null;
        if (!sender) {
            return;
        }
        const chatId = this.chat(chatType);
        if (!chatId) {
            return;
        }
        callback(sender, chatId);
    }

    /**
     * Broadcast to all send providers.
     * @param {SendMessageCallback} callback - The callback to send.
     */
    toBroadcast(callback: SendMessageCallback): void {
        if (!this.bridge) {
            return;
        }
        Object.entries(this.bridge).forEach(([chatType, chatId]) => {
            const matcher = (i: SendProvider) => i.type === chatType;
            const sender = senders.find(matcher) ?? null;
            if (!sender) {
                return;
            }
            callback(sender, chatId);
        });
    }

    /**
     * Broadcast to all send providers except the specified one.
     * @param {ProviderType} except - The send provider to exclude.
     * @param {SendMessageCallback} callback - The callback to send.
     * @return {void}
     */
    toBroadcastExcept(
        except: ProviderType,
        callback: SendMessageCallback,
    ): void {
        this.toBroadcast((provider, chatId) => {
            if (provider.type !== except) {
                callback(provider, chatId);
            }
        });
    }
}
