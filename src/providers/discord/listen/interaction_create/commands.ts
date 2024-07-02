import {
    Guild,
    Routes,
} from "discord.js";

import {
    bridgeProviderConfig,
} from "../../../../config";

const {
    discord: discordConfig,
} = bridgeProviderConfig();

import {
    restClient,
} from "../../client";

import {
    commands,
} from "../../../../commands/index";

/**
 * Registers commands with the Discord API.
 * @param {Guild} guild The guild to register commands in.
 * @return {Promise<void>}
 */
export async function registerCommands(guild: Guild): Promise<void> {
    const {appId} = discordConfig;
    const {id: guildId} = guild;

    const camelToSnakeCase = (str) =>
        str.replace(/[A-Z]/g, (group) =>
            `_${group.toLowerCase()}`,
        );

    const commandList = Object.entries(commands).map(([i, j]) => ({
        name: camelToSnakeCase(i),
        description: j.description,
        options: j.options?.map((k) => ({
            name: camelToSnakeCase(k.name),
            description: k.description,
            type:
                k.type === "string" ? 3 :
                    k.type === "number" ? 4 :
                        k.type === "boolean" ? 5 :
                            3,
            required: k.required,
        })) || null,
    }));

    await restClient?.put(
        Routes.applicationGuildCommands(appId, guildId),
        {body: commandList},
    );
}
