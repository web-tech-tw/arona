"""
matrix-line-bridge
(c) 2021 SuperSonic (https://github.com/supersonictw)
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
"""
import asyncio
import json
import os

from nio import AsyncClient, RoomMessageText, RoomMessageMedia, InviteEvent, AsyncClientConfig
from nio.events import Event
from nio.rooms import MatrixRoom

from .. import config
from ..line.push import text as line_push
from ..line.push import image as line_image

config_instance = config.read()
default_icon = "https://raw.githubusercontent.com/supersonictw/matrix-line-bridge/master/img/profile.png"

client_config = AsyncClientConfig(
        max_limit_exceeded=0,
        max_timeouts=0,
        store_sync_tokens=True,
        encryption_enabled=True,
    )

client = AsyncClient(
    config_instance["Matrix"]["HOME_SERVER"],
    config_instance["Matrix"]["USERNAME"],
    store_path="./store/",
    config=client_config
)


async def autojoin_room(room: MatrixRoom, event: InviteEvent):
    await client.join(room.room_id)

async def message_callback(room: MatrixRoom, event: Event):
    if event.sender == config_instance["Matrix"]["USERNAME"]:
        return
    if room.room_id != config_instance["Matrix"]["ROOM"]:
        return
    mxc_icon = room.avatar_url(event.sender)
    icon = (await client.mxc_to_http(mxc_icon)) if mxc_icon else default_icon
    if hasattr(event, "url"):
        url = (await client.mxc_to_http(event.url))
        line_image(
            {
                "name": room.user_name(event.sender),
                "icon_url": icon
            },
            config_instance["LINE"]["ROOM"],
            url
        )
        return
    if not hasattr(event, "body"):
        return
    line_push(
        {
            "name": room.user_name(event.sender),
            "icon_url": icon
        },
        config_instance["LINE"]["ROOM"],
        event.body
    )


async def poll():
    if not os.path.exists("./store/"):
        os.makedirs("./store/")
    client.device_name = config_instance["Matrix"]["DEVICE_NAME"]
    client.add_event_callback(message_callback, (RoomMessageText,RoomMessageMedia))
    client.add_event_callback(autojoin_room, InviteEvent)
    if len(config_instance["Matrix"]["PASSWORD"]) != 0:
        await client.login(config_instance["Matrix"]["PASSWORD"])
    else:
        await client.login()
    if client.should_upload_keys:
        await client.keys_upload()

    await client.sync_forever(timeout=30000)


def run():
    asyncio.run(poll())
