import config from "../../../../../config";

import {
    Sender,
} from "../../../../sender";

import {
    MessageEvent,
    TextualMessageEventContent,
} from "matrix-bot-sdk";

import MatrixSend from "../../../submitter";

import Link from "../../../../link";
import Pair from "../../../../pair";

const systemName = config.deviceName || "System";
const replyOneMessage = (chatId: string, text: string) => {
    const sender: Sender = new Sender({
        displayName: systemName,
    });
    const send = new MatrixSend();
    return send.text({sender, chatId, text});
};

type CommandMethodParameters = {
    roomId: string,
    event: MessageEvent<TextualMessageEventContent>,
    args: Array<string>,
};
type CommandMethod = (params: CommandMethodParameters) =>
    Promise<void | undefined> | void | undefined;
type CommandMethodList = {
    [key: string]: CommandMethod
};

const commands: CommandMethodList = {
    "chatId": ({roomId}) => {
        replyOneMessage(roomId, roomId);
    },
    "pair": ({roomId}) => {
        const link = Link.use("matrix", roomId);
        if (link.exists()) {
            replyOneMessage(roomId, "Already paired");
            return;
        }

        const pairId = new Pair({
            chatFrom: "matrix",
            chatId: roomId,
        }).create();
        replyOneMessage(
            roomId,
            `Pairing ID: ${pairId}\n\n` +
            "Please send the following command to the target chat room:\n" +
            `#pairLink ${pairId}`,
        );
    },
    "pairStatus": ({roomId}) => {
        const link = Link.use("matrix", roomId);
        if (!link.exists()) {
            replyOneMessage(roomId, "Not paired");
            return;
        }
        replyOneMessage(roomId, JSON.stringify(link));
    },
    "pairLink": ({roomId, args}) => {
        const pair = Pair.find(args[1]);
        if (!pair || pair.chatFrom === "matrix") {
            replyOneMessage(roomId, "Invalid pair ID");
            return;
        }

        const link = Link.use("matrix", roomId);
        link.connect(pair.chatFrom, pair.chatId);
        link.save();
        pair.delete();

        replyOneMessage(roomId, "OK");
    },
    "pairUnlink": async ({roomId}) => {
        const link = Link.use("matrix", roomId);
        if (!link.exists()) {
            replyOneMessage(roomId, "Not paired");
            return;
        }
        link.disconnect("matrix");
        link.save();
        replyOneMessage(roomId, "Unpaired");
    },
    "pairFlush": async ({roomId}) => {
        const link = Link.use("matrix", roomId);
        if (!link) {
            replyOneMessage(roomId, "Not paired");
            return;
        }
        link.remove();
        replyOneMessage(roomId, "Flushed");
    },
};

export default async (
    roomId: string,
    event: MessageEvent<TextualMessageEventContent>,
): Promise<undefined> => {
    const text = event.textBody;
    if (text.startsWith("#")) {
        const args = text.substring(1).split(" ");
        const command = args[0];
        if (!(command in commands)) {
            return;
        }
        await commands[command]({
            roomId, event, args,
        });
        return;
    }

    const link = Link.use("matrix", roomId);
    if (!link.exists()) return;

    const sender = await Sender.fromMatrixSender(event.sender);
    link.toBroadcastExcept("matrix", (provider, chatId) => {
        provider.text({sender, chatId, text});
    });
};
