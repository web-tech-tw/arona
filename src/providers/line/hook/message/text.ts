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
    messagingClient,
} from "../../client";

// Function handler to receive the text.
export default async (event: MessageEvent): Promise<void> => {
    const message: TextEventMessage = event.message as TextEventMessage;
    const sender = await LINESender.fromEventSource(event.source);
    const {text} = message;

    const args = textToArguments(text, "/");
    if (args) {
        await commandExecutor(
            args, sender, async (text: string): Promise<void> => {
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
            },
        );
        return;
    }

    if (!sender.roomLink.exists()) return;
    sender.roomLink.toBroadcastExcept("line", (provider, chatId) => {
        provider.text({sender, chatId, text});
    });
};
