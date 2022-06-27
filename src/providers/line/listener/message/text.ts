import {
    MessageEvent,
    TextEventMessage,
    TextMessage,
    MessageAPIResponseBase,
} from "@line/bot-sdk";

import {
    client,
} from "../../index";

// Function handler to receive the text.
export default async (
    event: MessageEvent
): Promise<MessageAPIResponseBase | undefined> => {
    // Process all message related variables here.
    const { replyToken } = event;
    const message: TextEventMessage = <TextEventMessage>event.message;
    const { text } = message;

    // Create a new message.
    const response: TextMessage = {
        type: "text",
        text,
    };

    // Reply to the user.
    return await client.replyMessage(replyToken, response);
};
