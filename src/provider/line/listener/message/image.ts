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
    ThumbnailInfo,
    ImageMessageOptions,
} from "../../../matrix/sender";

import {
    client as lineClient,
} from "../../index";

import {
    client as matrixClient,
} from "../../../matrix";

import images, {FILE_TYPE} from "images";
import imageType, {ImageTypeResult} from "image-type";

const matrixChatRoomId = process.env.MATRIX_CHAT_ROOM_ID || "";
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
        await lineClient.getGroupMemberProfile(sourceId, senderId);
    const sender: Sender = new Sender(senderProfile);

    const contentStream = await lineClient.getMessageContent(id);
    const contentChunks: Buffer[] = [];
    for await (const chunk of contentStream) {
        contentChunks.push(chunk as never);
    }

    const imageBuffer = Buffer.concat(contentChunks);
    const image = images(imageBuffer);
    const imageSize = image.size();
    const {ext, mime: imageMIME} = imageType(imageBuffer) as ImageTypeResult;

    const thumbnailSize = {
        width: Math.floor(imageSize.width / 2),
        height: Math.floor(imageSize.height / 2),
    };
    const thumbnail = image.copyFromImage(image).resize(
        thumbnailSize.width,
        thumbnailSize.height,
    );
    const thumbnailBuffer: Buffer =
        thumbnail.toBuffer(ext as FILE_TYPE);
    const thumbnailMxcUrl: string =
        await matrixClient.uploadContent(thumbnailBuffer);

    const thumbnailInfo: ThumbnailInfo = {
        mimetype: imageMIME,
        size: Buffer.byteLength(thumbnailBuffer),
        width: thumbnailSize.width,
        height: thumbnailSize.height,
    };

    const sendOptions: ImageMessageOptions = {
        mimetype: imageMIME,
        size: Buffer.byteLength(imageBuffer),
        width: imageSize.width,
        height: imageSize.height,
        thumbnailUrl: thumbnailMxcUrl,
        thumbnailInfo,
    };

    const mxcUrl: string = await matrixClient.uploadContent(imageBuffer);
    sendImageMessage(sender, mxcUrl, matrixChatRoomId, sendOptions);
};
