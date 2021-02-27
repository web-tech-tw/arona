"""
matrix-line-bridge
(c) 2021 SuperSonic (https://github.com/supersonictw)
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
"""
from linebot import LineBotApi
from linebot.models import TextSendMessage, Sender

from .. import config

config_instance = config.read()

client = LineBotApi(config_instance["LINE"]["CHANNEL_ACCESS_TOKEN"])


def text(sender: dict, receiver: str, content: str):
    sender = Sender(**sender)
    client.push_message(
        receiver,
        TextSendMessage(
            sender=sender,
            text=content
        )
    )
