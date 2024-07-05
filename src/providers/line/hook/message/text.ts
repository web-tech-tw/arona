import Locale from "../../../../locales";

import {
    MessageEvent,
    TextEventMessage,
} from "@line/bot-sdk";

import {
    toCommandSource,
} from "../../utils";

import Link from "../../../../types/link";
import {
    LINESender,
} from "../../types";

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

            const sender = new LINESender({});
            text = `${sender.prefix}\n${text}`;
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

    const sender = await LINESender.fromEventSource(event.source);
    link.toBroadcastExcept("line", (provider, chatId) => {
        provider.text({sender, chatId, text});
    });
};
