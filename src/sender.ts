import {
    Sender as LINESender,
} from "@line/bot-sdk";

/**
 * Sender
 */
export class Sender {
    displayName?: string;
    pictureUrl?: string;

    /**
     * Constructor
     * @param {Partial<Sender>} init {displayName: string, pictureUrl: string}
     */
    constructor(init: Partial<Sender>) {
        Object.assign(this, init);
    }

    /**
     * Export as LINE Sender.
     * @return {LINESender}
     */
    toLINE(): LINESender {
        return {
            name: this.displayName,
            iconUrl: this.pictureUrl,
        };
    }
}
