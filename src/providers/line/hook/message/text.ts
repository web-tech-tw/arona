import {
    MessageEvent,
    TextEventMessage,
} from "@line/bot-sdk";

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
    const sender = await LINESender.fromEventSource(event.source);
    const {text} = message;

    const args = textToArguments(text, "/");
    if (args) {
        const locale = sender.roomLink.locale;
        const source = sender.commandSource;
        const reply = async (text: string): Promise<void> => {
            if (!messagingClient) {
                throw new Error("Client is not initialized");
            }

            messagingClient.replyMessage({
                replyToken: event.replyToken,
                messages: [{
                    type: "text",
                    text: LINESender.systemMessage(text),
                }],
            });
        };
        const params: CommandMethodParameters = {
            args, source, locale, reply, sender,
        };
        await commandExecutor(params);
        return;
    }

    if (!sender.roomLink.exists()) return;
    sender.roomLink.toBroadcastExcept("line", (provider, chatId) => {
        provider.text({sender, chatId, text});
    });
};
