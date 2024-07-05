import {
    Interaction,
} from "discord.js";

import {
    commands,
} from "../../../../commands";

import {
    CommandSource,
} from "../../../../commands/types";

import Locale from "../../../../locales";
import Sender from "../../../../types/sender";

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

    const actionName = snakeToCamelCase(interaction.commandName);
    if (actionName in commands) {
        const locale = new Locale("en");
        const args = [actionName, ...interaction.options.data.map(
            (option) => option.value?.toString() ?? "",
        )];
        const source: CommandSource = {
            providerType: "discord",
            chatId: interaction.channelId,
            fromId: interaction.user.id,
        };
        const reply = async (text: string) => {
            const sender = new Sender({});
            text = `${sender.prefix}\n${text}`;
            await interaction.reply(text);
        };
        const params = {locale, args, source, reply};
        commands[actionName].method(params);
    } else {
        await interaction.reply("無法存取該指令");
    }
};
