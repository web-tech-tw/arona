// Import dependencies.
import {
    store,
} from "../memory";
import {
    nanoid,
} from "nanoid";
import {
    SendProvider,
    SendProviderType,
    allSendProviders,
} from "./sender";

/**
 * The broadcast function.
 */
export type BroadcastCallback = (
    provider: SendProvider,
    chatId: string,
) => void;

// eslint-disable-next-line no-unused-vars
type LinkBridgeMapping = {[T in SendProviderType]: string};
type LinkConstructorParameters = {
    key: string,
    bridge?: LinkBridgeMapping,
};

/**
 * The link class.
 */
export default class Link {
    key: string;
    bridge?: LinkBridgeMapping;

    /**
     * The constructor.
     * @param {LinkConstructorParameters} params - The parameters.
     */
    constructor(params: LinkConstructorParameters) {
        Object.assign(this, params);
    }

    /**
     * Find the link by chat type and chat ID, new one if not found.
     * @param {SendProviderType} chatTo - The chat type.
     * @param {string} chatId - The chat ID.
     * @return {Link} The link.
     */
    static use(chatTo: SendProviderType, chatId: string): Link {
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
     * @param {SendProviderType} chatTo - The chat type.
     * @return {string|null} The chat ID.
     */
    chat(chatTo: SendProviderType): string | null {
        if (!this.bridge || !this.bridge[chatTo]) {
            return null;
        }
        return this.bridge[chatTo];
    }

    /**
     * Connect the chat.
     * @param {SendProviderType} chatTo - The chat type.
     * @param {string} chatId - The chat ID to set.
     * @return {void}
     */
    connect(chatTo: SendProviderType, chatId: string): void {
        if (!this.bridge) {
            const newMapping = {[chatTo]: chatId};
            this.bridge = newMapping as LinkBridgeMapping;
        } else {
            this.bridge[chatTo] = chatId;
        }
    }

    /**
     * Disconnect the chat.
     * @param {SendProviderType} chatTo - The chat type.
     * @return {void}
     */
    disconnect(chatTo: SendProviderType): void {
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
     * Get a send provider with the chat type.
     * @param {SendProviderType} chatType - The chat type.
     * @return {SendProvider} The send provider.
     */
    toSend(chatType: SendProviderType): SendProvider {
        return allSendProviders[chatType];
    }

    /**
     * Broadcast to all send providers.
     * @param {BroadcastCallback} callback - The callback to broadcast.
     */
    toBroadcast(callback: BroadcastCallback): void {
        if (!this.bridge) {
            return;
        }
        Object.entries(this.bridge).forEach(([key, chatId]) => {
            const senderTypeName = key as SendProviderType;
            const matcher = (i: SendProvider) => i.type() === senderTypeName;
            const sender = allSendProviders.find(matcher);
            if (sender) {
                callback(sender, chatId);
            }
        });
    }

    /**
     * Broadcast to all send providers except the specified one.
     * @param {SendProviderType} except - The send provider to exclude.
     * @param {BroadcastCallback} callback - The callback to broadcast.
     * @return {void}
     */
    toBroadcastExcept(
        except: SendProviderType,
        callback: BroadcastCallback,
    ): void {
        this.toBroadcast((provider, chatId) => {
            if (provider.type() !== except) {
                callback(provider, chatId);
            }
        });
    }
}
