import Locale from "../../../../../locales";

import {
    Sender,
} from "../../../../types";

import {
    MessageEvent,
    TextualMessageEventContent,
} from "matrix-bot-sdk";

import MatrixSend from "../../../send";

import Link from "../../../../link";
import Pair from "../../../../pair";

const replyOneMessage = (chatId: string, text: string) => {
    const sender: Sender = new Sender({});
    const send = new MatrixSend();
    return send.text({sender, chatId, text});
};

type CommandMethodParameters = {
    roomId: string,
    event: MessageEvent<TextualMessageEventContent>,
    args: Array<string>,
    locale: Locale,
};
type CommandMethod = (params: CommandMethodParameters) =>
    Promise<void | undefined> | void | undefined;
type CommandMethodList = {
    [key: string]: CommandMethod
};

const commands: CommandMethodList = {
    "chatId": ({roomId, locale}) => {
        replyOneMessage(
            roomId,
            `${locale.text("chat_id_here")}:\n` +
            `${roomId}`,
        );
    },
    "pair": ({roomId, locale}) => {
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
            `${locale.text('pairing_id')}: ${pairId}\n\n` +
            `${locale.text('pairing_notice')}:\n` +
            `#pairLink ${pairId}`,
        );
    },
    "pairStatus": ({roomId, locale}) => {
        const link = Link.use("matrix", roomId);
        if (!link.exists()) {
            replyOneMessage(
                roomId,
                locale.text("pairing_not_exists"),
            );
            return;
        }
        replyOneMessage(roomId, JSON.stringify(link));
    },
    "pairLink": ({roomId, args, locale}) => {
        const pair = Pair.find(args[1]);
        if (!pair || pair.chatFrom === "matrix") {
            replyOneMessage(
                roomId,
                locale.text("pairing_id_invalid"),
            );
            return;
        }

        const link = Link.use("matrix", roomId);
        link.connect(pair.chatFrom, pair.chatId);
        link.save();
        pair.delete();

        replyOneMessage(
            roomId,
            locale.text("pairing_success"),
        );
    },
    "pairUnlink": async ({roomId, locale}) => {
        const link = Link.use("matrix", roomId);
        if (!link.exists()) {
            replyOneMessage(
                roomId,
                locale.text("pairing_not_exists"),
            );
            return;
        }
        link.disconnect("matrix");
        link.save();
        replyOneMessage(
            roomId,
            locale.text("pairing_removed"),
        );
    },
    "pairFlush": async ({roomId, locale}) => {
        const link = Link.use("matrix", roomId);
        if (!link) {
            replyOneMessage(
                roomId,
                locale.text("pairing_not_exists"),
            );
            return;
        }
        link.remove();
        replyOneMessage(
            roomId,
            locale.text("pairing_flushed"),
        );
    },
};

export default async (
    roomId: string,
    event: MessageEvent<TextualMessageEventContent>,
): Promise<undefined> => {
    const text = event.textBody;
    if (text.startsWith("#")) {
        const locale = new Locale("en");
        const args = text.substring(1).split(" ");
        const command = args[0];
        if (!(command in commands)) {
            return;
        }
        await commands[command]({
            roomId, event, args, locale,
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
