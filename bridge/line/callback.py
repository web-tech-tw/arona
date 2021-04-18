"""
matrix-line-bridge
(c) 2021 SuperSonic (https://github.com/supersonictw)
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
"""
import asyncio

from flask import Flask, request, abort
from linebot import LineBotApi, WebhookHandler
from linebot.exceptions import InvalidSignatureError
from linebot.models import MessageEvent, TextSendMessage, TextMessage, ImageMessage

from .. import config
from ..matrix.push import text as matrix_push
from ..matrix.push import send_image as matrix_image

app = Flask(__name__)
config_instance = config.read()

line_bot_api = LineBotApi(config_instance["LINE"]["CHANNEL_ACCESS_TOKEN"])
handler = WebhookHandler(config_instance["LINE"]["CHANNEL_SECRET"])


@app.route("/callback", methods=['POST'])
def callback():
    signature = request.headers['X-Line-Signature']
    body = request.get_data(as_text=True)
    app.logger.info("Request body: " + body)
    try:
        handler.handle(body, signature)
    except InvalidSignatureError:
        print("Invalid signature. Please check your channel access token/channel secret.")
        abort(400)
    return 'OK'


@handler.add(MessageEvent, message=TextMessage)
@handler.add(MessageEvent, message=ImageMessage)
def handle_message(event):
    if event.source.type == "group":
        if event.source.group_id == config_instance["LINE"]["ROOM"]:
            if event.type == "message":
                if event.message.type == "image":
                    message_content = line_bot_api.get_message_content(event.message.id)
                    with open("img/"+event.message.id+".jpg", 'wb') as fd:
                        for chunk in message_content.iter_content():
                                fd.write(chunk)
                    asyncio.run(matrix_image("img/"+event.message.id+".jpg"))
                if event.message.type == "text":
                    profile = line_bot_api.get_group_member_profile(event.source.group_id, event.source.user_id)
                    asyncio.run(matrix_push(profile.display_name, event.message.text))
        else:
            line_bot_api.reply_message(
                event.reply_token,
                TextSendMessage(text=event.source.group_id)
            )


def run():
    app.run(
        host=config_instance["LINE"]["EXPOSE_HOST"],
        port=config_instance["LINE"]["EXPOSE_PORT"]
    )
