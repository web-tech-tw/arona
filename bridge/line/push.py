"""
matrix-line-bridge
(c) 2021 SuperSonic (https://github.com/supersonictw)
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
"""
from linebot import LineBotApi
from linebot.models import TextSendMessage, Sender

client = LineBotApi('YOUR_CHANNEL_ACCESS_TOKEN')


def push(sender: dict, receiver: str, content: str):
    sender = Sender(**sender)
    client.push_message(
        receiver,
        TextSendMessage(
            sender=sender,
            text=content
        )
    )
