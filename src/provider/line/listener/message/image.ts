import {
    Sender,
} from "../../../../sender";

import {
    MessageEvent,
    ImageEventMessage,
    MessageAPIResponseBase,
} from "@line/bot-sdk";

import {
    getSourceIdFromEvent,
} from "../../utils";

import {
    sendImageMessage,
} from "../../../matrix/sender";

import {
    client,
} from "../../index";

const lineChatRoomId = process.env.LINE_CHAT_ROOM_ID || "";

export default async (
    event: MessageEvent,
): Promise<MessageAPIResponseBase | undefined> => {
    const message: ImageEventMessage = event.message as ImageEventMessage;
    const {id} = message;

    const [sourceId, senderId] =
        getSourceIdFromEvent(event, true) as Array<string>;
    if (sourceId !== lineChatRoomId) return;

    const senderProfile =
        await client.getGroupMemberProfile(sourceId, senderId);
    const sender: Sender = new Sender(senderProfile);

    const content = await client.getMessageContent(id);

    sendImageMessage(sender, "", sourceId);
    return;
};
