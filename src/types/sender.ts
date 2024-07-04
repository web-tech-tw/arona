import {
    ProviderType,
    providers,
} from "./provider";

/**
 * Sender
 */
export default class Sender {
    public displayName?: string;
    public pictureUrl?: string;
    public providerType?: ProviderType;

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
            `${this.displayName} ⬗ ${this.providerName()}` :
            "⬖ System";
    }

    /**
     * Get the provider name.
     * @return {string}
     */
    providerName(): string {
        const {providerType} = this;
        if (!providerType) {
            throw new Error("Provider is not set");
        }
        return providers[providerType];
    }
}
