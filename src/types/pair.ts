// Import dependencies.
import {
    nanoid,
} from "nanoid";
import {
    cache,
} from "../memory";
import {
    ProviderType,
} from "./provider";

/**
 * The pair constructor parameters.
 */
type PairConstructorParameters = {
    chatFrom: ProviderType,
    chatId: string,
};

/**
 * The pair object.
 */
export default class Pair {
    public pairId: string;
    public chatFrom: ProviderType;
    public chatId: string;

    /**
     * The constructor.
     * @param {PairConstructorParameters} params - The parameters.
     */
    public constructor(params: PairConstructorParameters) {
        this.pairId = nanoid();
        this.chatFrom = params.chatFrom;
        this.chatId = params.chatId;
    }

    /**
     * Find a pair by the chat ID.
     * @param {string} pairId - The pair ID to find the pair by.
     * @return {Pair|null} The pair object.
     */
    public static find(pairId: string): Pair | null {
        const pair = cache.get(`pair:${pairId}`);
        if (pair instanceof Pair) {
            return pair;
        }
        return null;
    }

    /**
     * Create a pair.
     * @return {string} - The pair ID.
     */
    public create(): string {
        const {pairId} = this;
        cache.set(`pair:${pairId}`, this);
        return pairId;
    }

    /**
     * Delete a pair.
     * @return {void}
     */
    public delete(): void {
        const {pairId} = this;
        cache.del(`pair:${pairId}`);
    }
}
