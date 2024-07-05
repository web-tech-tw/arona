import {
    ProviderType,
} from "../types/provider";

import Locale from "../locales";

export type CommandSource = {
    providerType: ProviderType,
    chatId: string,
    fromId: string,
};

export type CommandReply = (
    text: string,
) => Promise<void> | void;

export type CommandMethodParameters = {
    source: CommandSource,
    args: Array<string>,
    reply: CommandReply,
    locale: Locale,
};

export type CommandMethod = (
    params: CommandMethodParameters,
) => Promise<void> | void;

export type CommandMethodOption = {
    name: string,
    description: string,
    type: "string" | "number" | "boolean",
    required: boolean,
};

export type CommandMethodList = {
    [key: string]: {
        description: string,
        method: CommandMethod,
        options?: Array<CommandMethodOption>,
    }
};
