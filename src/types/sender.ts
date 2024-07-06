import {
    httpConfig,
} from "../config";

import {
    ProviderType,
    providers,
} from "./provider";

import {
    CommandSource,
} from "../commands/types";

import Link from "./link";

/**
 * Sender
 */
export default class Sender {
    public displayName?: string;
    public pictureUrl?: string;
    public providerType?: ProviderType;
    public chatId?: string;
    public fromId?: string;

    /**
     * Constructor
     * @param {Partial<Sender>} init {displayName: string, pictureUrl: string}
     */
    constructor(init: Partial<Sender>) {
        Object.assign(this, init);
    }

    /**
     * Get the text prefix.
     * @return {string}
     */
    get prefix(): string {
        return this.providerType ?
            `${this.displayName} ⬗ ${this.providerName}` :
            "⬖ System";
    }

    /**
     * Get the provider name.
     * @return {string}
     */
    get providerName(): string {
        const {providerType} = this;
        if (!providerType) {
            throw new Error("Provider is not set");
        }
        return providers[providerType];
    }

    /**
     * Get the room link.
     * @return {Link}
     */
    get roomLink(): Link {
        if (!this.providerType || !this.chatId) {
            throw new Error("Room link is not ready");
        }
        return Link.use(this.providerType, this.chatId);
    }

    /**
     * Get the command source.
     * @return {CommandSource}
     */
    get commandSource(): CommandSource {
        if (!this.providerType || !this.chatId || !this.fromId) {
            throw new Error("Command source is not ready");
        }
        return {
            providerType: this.providerType,
            chatId: this.chatId,
            fromId: this.fromId,
        };
    }

    /**
     * Create a system sender.
     * @return {Sender}
     */
    public static system(): Sender {
        return new Sender({});
    }

    /**
     * Create an AI system sender.
     * @return {Sender}
     */
    public static arona(): Sender {
        const {baseUrl} = httpConfig();
        return new Sender({
            providerType: "openai",
            displayName: "Arona",
            pictureUrl: `${baseUrl}/static/arona.png`,
        });
    }

    /**
     * Create a system message.
     * @param {string} text - Text
     * @return {string}
     */
    public static systemMessage(text: string): string {
        const sender = this.system();
        return `${sender.prefix}\n${text}`;
    }
}
