import {
    Sender,
} from "../../../../sender";

import {
    MessageEvent,
    StickerEventMessage,
    MessageAPIResponseBase,
} from "@line/bot-sdk";

import {
    getStickerImageUrl,
    getSourceIdFromEvent,
} from "../../utils";

import {
    sendImageMessage,
} from "../../../matrix/sender";

import {
    client as lineClient,
} from "../../index";

import {
    client as matrixClient,
} from "../../../matrix";

const matrixChatRoomId = process.env.MATRIX_CHAT_ROOM_ID || "";
const lineChatRoomId = process.env.LINE_CHAT_ROOM_ID || "";

export default async (
    event: MessageEvent,
): Promise<MessageAPIResponseBase | undefined> => {
    const message: StickerEventMessage = event.message as StickerEventMessage;
    const {stickerId} = message;

    const [sourceId, senderId] =
        getSourceIdFromEvent(event, true) as Array<string>;
    if (sourceId !== lineChatRoomId) return;

    const senderProfile =
        await lineClient.getGroupMemberProfile(sourceId, senderId);
    const sender: Sender = new Sender(senderProfile);

    const sourceImageUrl = getStickerImageUrl(stickerId);
    const mxcUrl: string = await matrixClient.uploadContentFromUrl(sourceImageUrl);
    sendImageMessage(sender, mxcUrl, matrixChatRoomId);
};
