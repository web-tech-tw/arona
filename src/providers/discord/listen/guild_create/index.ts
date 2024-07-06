import {
    Guild,
} from "discord.js";

import {
    registerCommands,
} from "../../client";

/**
 * @param {Guild} guild
 * @return {Promise<void>}
 */
export default async (guild: Guild): Promise<void> => {
    await registerCommands(guild);
};
