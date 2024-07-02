import Locale from "../../../../locales";

import {
    MessageEvent,
    TextEventMessage,
} from "@line/bot-sdk";

import {
    toCommandSource,
} from "../../utils";

import Sender from "../../../../types/sender";
import Link from "../../../../types/link";

import {
    textToArguments,
    commandExecutor,
} from "../../../../commands";
import {
    CommandMethodParameters,
} from "../../../../commands/types";

import {
    messagingClient,
} from "../../client";

// Function handler to receive the text.
export default async (event: MessageEvent): Promise<void> => {
    const message: TextEventMessage = event.message as TextEventMessage;
    const {text} = message;

    const args = textToArguments(text, "/");
    const source = toCommandSource(event.source);
    if (args) {
        const locale = new Locale("en");
        const reply = async (text: string): Promise<void> => {
            if (!messagingClient) {
                throw new Error("Client is not initialized");
            }

            messagingClient.replyMessage({
                replyToken: event.replyToken,
                messages: [{
                    type: "text",
                    text,
                }],
            });
        };
        const params: CommandMethodParameters = {
            args, source, locale, reply,
        };
        await commandExecutor(params);
        return;
    }

    const {chatId} = source;
    const link = Link.use("line", chatId);
    if (!link.exists()) return;

    const sender = await Sender.fromLINESource(event.source);
    link.toBroadcastExcept("line", (provider, chatId) => {
        provider.text({sender, chatId, text});
    });
};
