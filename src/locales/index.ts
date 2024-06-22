import {
    readFileSync,
} from "node:fs";

const packageBasePathUrl = new URL("./packages/", import.meta.url);

const fallbackLocaleCode = "en";
const supportedLocaleCodes = ["en", "fr"];

export default class Locale {
    private localeCode: string;
    private localePackage: Record<string, string> = {};

    constructor(localeCode: string) {
        if (supportedLocaleCodes.includes(localeCode)) {
            this.localeCode = localeCode;
        } else {
            this.localeCode = fallbackLocaleCode;
        }
        const packagePath = new URL(`${this.localeCode}.json`, packageBasePathUrl);
        const packageContent = readFileSync(packagePath, "utf-8");
        this.localePackage = JSON.parse(packageContent);
    }

    text(key: string): string {
        return this.localePackage[key] || key;
    }

    code(): string {
        return this.localeCode;
    }
};
