import {
    readFileSync,
} from "node:fs";

const packageBasePathUrl = new URL("./packages/", import.meta.url);

const fallbackLocaleCode = "en";
const supportedLocaleCodes = ["en", "zh-TW"];

/**
 * Locale
 */
export default class Locale {
    private localeCode: string;
    private localePackage: Record<string, string> = {};

    /**
     * Constructor
     * @param {string} localeCode - The locale code
     */
    constructor(localeCode: string) {
        if (supportedLocaleCodes.includes(localeCode)) {
            this.localeCode = localeCode;
        } else {
            this.localeCode = fallbackLocaleCode;
        }
        const packagePath = new URL(
            `${this.localeCode}.json`,
            packageBasePathUrl,
        );
        const packageContent = readFileSync(packagePath, "utf-8");
        this.localePackage = JSON.parse(packageContent);
    }

    /**
     * Get the text for a key
     * @param {string} key - The key
     * @return {string} The text
     */
    public text(key: string): string {
        return this.localePackage[key] || key;
    }

    /**
     * Get the code
     * @return {string} The code
     */
    public code(): string {
        return this.localeCode;
    }

    /**
     * Check if the code is supported
     * @param {string} localeCode - The locale code
     * @return {boolean}
     */
    public static checkCodeSupported(localeCode: string): boolean {
        return supportedLocaleCodes.includes(localeCode);
    }
}
