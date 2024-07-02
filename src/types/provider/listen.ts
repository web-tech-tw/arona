import {
    BaseProvider,
} from "./index";

/**
 * ListenProvider
 * @interface
 * @property {Function} listen - Listen to the provider.
 */
export interface ListenProvider extends BaseProvider {
    listen(): void;
}
