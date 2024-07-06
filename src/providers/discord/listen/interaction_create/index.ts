import {
    Interaction,
} from "discord.js";

import {
    DiscordSender,
} from "../../types";

import {
    commands,
} from "../../../../commands";

const snakeToCamelCase = (str) =>
    str.toLowerCase().replace(/([-_][a-z])/g, (group) =>
        group
            .toUpperCase()
            .replace("-", "")
            .replace("_", ""),
    );

/**
 * @param {Interaction} interaction
 * @return {void}
 */
export default async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;

    const sender = DiscordSender.fromInteraction(interaction);
    const actionName = snakeToCamelCase(interaction.commandName);
    if (actionName in commands) {
        const locale = sender.roomLink.locale;
        const args = [actionName, ...interaction.options.data.map(
            (option) => option.value?.toString() ?? "",
        )];
        const source = sender.commandSource;
        const reply = async (text: string) => {
            await interaction.reply(
                DiscordSender.systemMessage(text),
            );
        };
        const params = {locale, args, source, reply, sender};
        commands[actionName].method(params);
    } else {
        await interaction.reply("Command not found.");
    }
};
