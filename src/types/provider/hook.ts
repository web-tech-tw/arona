import {
    BaseProvider,
} from "./index";

import {
    Router,
} from "express";

/**
 * HookProvider
 * @interface
 * @property {Function} hook - Hook the provider.
 */
export interface HookProvider extends BaseProvider {
    hook(router: Router): void;
}
