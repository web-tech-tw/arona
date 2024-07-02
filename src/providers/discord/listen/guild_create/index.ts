import {
    Guild,
} from "discord.js";

import {
    registerCommands,
} from "../interaction_create/commands";

/**
 * @param {Guild} guild
 * @return {Promise<void>}
 */
export default async (guild: Guild): Promise<void> => {
    await registerCommands(guild);
};
