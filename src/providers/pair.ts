// Import dependencies.
import {
    nanoid,
} from "nanoid";
import {
    cache,
} from "../memory";
import {
    BridgeProviderType,
} from "../types";

/**
 * The pair constructor parameters.
 */
type PairConstructorParameters = {
    chatFrom: BridgeProviderType,
    chatId: string,
};

/**
 * The pair object.
 */
export default class Pair {
    public pairId: string;
    public chatFrom: BridgeProviderType;
    public chatId: string;

    /**
     * The constructor.
     * @param {PairConstructorParameters} params - The parameters.
     */
    constructor(params: PairConstructorParameters) {
        this.pairId = nanoid();
        this.chatFrom = params.chatFrom;
        this.chatId = params.chatId;
    }

    /**
     * Find a pair by the chat ID.
     * @param {string} pairId - The pair ID to find the pair by.
     * @return {Pair|null} The pair object.
     */
    static find(pairId: string): Pair | null {
        const pair = cache.get(pairId);
        if (pair instanceof Pair) {
            return pair;
        }
        return null;
    }

    /**
     * Create a pair.
     * @return {string} - The pair ID.
     */
    create(): string {
        cache.set(this.pairId, this);
        return this.pairId;
    }

    /**
     * Delete a pair.
     * @return {void}
     */
    delete(): void {
        cache.del(this.pairId);
    }
}
