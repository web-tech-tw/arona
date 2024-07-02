// Purpose: Memory management for the application.

// Import dependencies.
import NodeCache from "node-cache";
import {
    JSONFilePreset as jsonFilePreset,
} from "lowdb/node";

// Import types for the store.
import Link from "./types/link";

/**
 * The cache, for temporary storage.
 */
export const cache = new NodeCache({
    stdTTL: 100,
});

/**
 * The store, for persistent storage.
 */
export const store = await jsonFilePreset(
    "data/store.json", {
        links: [] as Array<Link>,
    },
);
