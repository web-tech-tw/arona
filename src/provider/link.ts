// Import dependencies.
import {
    store,
} from "../memory";
import {
    SendProvider,
    SendProviderType,
    allSendProviders,
} from "./sender";

/**
 * The link constructor parameters.
 */
export type LinkConstructorParameters = {
    line: string,
    matrix: string,
};

/**
 * The broadcast function.
 */
export type BroadcastFunction = (
    provider: SendProvider,
    chatId: string,
) => void;

/**
 * The link class.
 */
export default class Link {
    line?: string;
    matrix?: string;

    /**
     * The constructor.
     * @param {LinkConstructorParameters} params - The parameters.
     */
    constructor(params: LinkConstructorParameters) {
        this.line = params.line;
        this.matrix = params.matrix;
    }

    /**
     * Find a link by the source ID.
     * @param {string} chatFrom - The chat type to find the link by.
     * @param {string} chatId - The chat ID to find the link by.
     * @return {Link|null} The link object.
     */
    static find(chatFrom: string, chatId: string): Link | null {
        const {links} = store.data;
        const link = links.find((link) => link[chatFrom] === chatId);
        if (!link) return null;
        return new Link(link);
    }

    /**
     * Create the link.
     * @return {Promise<void>}
     */
    create(): Promise<void> {
        return store.update(({links}) =>
            links.push(this),
        );
    }

    /**
     * Delete the link.
     * @return {void}
     */
    delete(): void {
        store.update(({links}) =>
            links.filter((link) => this === link),
        );
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
     * @param {BroadcastFunction} fn - The function to broadcast.
     */
    toBroadcast(fn: BroadcastFunction): void {
        Object.entries(allSendProviders).forEach(([name, provider]) => {
            fn(provider, this[name]);
        });
    }

    /**
     * Broadcast to all send providers except the specified one.
     * @param {SendProviderType} except - The send provider to exclude.
     * @param {BroadcastFunction} fn - The function to broadcast.
     * @return {void}
     */
    toBroadcastExcept(
        except: SendProviderType,
        fn: BroadcastFunction,
    ): void {
        Object.entries(allSendProviders).forEach(([name, provider]) => {
            if (except !== name) {
                fn(provider, this[name]);
            }
        });
    }
}
