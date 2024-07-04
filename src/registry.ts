// Import the router.
import {
    Router as createRouter,
} from "express";

// Import all provider types.
import {
    SendProvider,
} from "./types/provider/send";
import {
    HookProvider,
} from "./types/provider/hook";
import {
    ListenProvider,
} from "./types/provider/listen";

// Define the routers.
export const hookRouter = createRouter();

// Define the senders, hookers, and listeners.
export const senders: Array<SendProvider> = [];
export const hookers: Array<HookProvider> = [];
export const listeners: Array<ListenProvider> = [];

/**
 * Register send providers.
 * @param {Array<SendProvider>} providers - The send providers to register.
 * @return {Promise<void[]>}
 */
export function registerSendProviders(
    providers: Array<SendProvider>,
): Promise<void[]> {
    const enabledProviders = providers.filter(
        (provider: SendProvider) => provider && provider.enabled,
    );
    senders.push(...enabledProviders);
    return Promise.all(enabledProviders.map(
        (provider: SendProvider) => {
            return provider.ensure();
        },
    ));
}

/**
 * Register hook providers.
 * @param {Array<HookProvider>} providers - The hook providers to register.
 * @return {Promise<void[]>}
 */
export function registerHookProviders(
    providers: Array<HookProvider>,
): Promise<void[]> {
    const enabledProviders = providers.filter(
        (provider: HookProvider) => provider && provider.enabled,
    );
    hookers.push(...enabledProviders);
    return Promise.all(enabledProviders.map(
        (provider: HookProvider) => {
            return provider.hook(hookRouter);
        },
    ));
}

/**
 * Register listen providers.
 * @param {Array<ListenProvider>} providers - The listen providers to register.
 * @return {Promise<void[]>}
 */
export function registerListenProviders(
    providers: Array<ListenProvider>,
): Promise<void[]> {
    const enabledProviders = providers.filter(
        (provider: ListenProvider) => provider && provider.enabled,
    );
    listeners.push(...enabledProviders);
    return Promise.all(enabledProviders.map(
        (provider: ListenProvider) => {
            return provider.listen();
        },
    ));
}
