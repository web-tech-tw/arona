import {
    MessageEvent,
    StickerEventMessage,
    MessageAPIResponseBase,
} from "@line/bot-sdk";

export default async (
    event: MessageEvent,
): Promise<MessageAPIResponseBase | undefined> => {
    const message: StickerEventMessage = event.message as StickerEventMessage;
    const {stickerId} = message;

    console.log(stickerId);
    return;
};
