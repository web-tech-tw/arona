"""
matrix-line-bridge
(c) 2021 SuperSonic (https://github.com/supersonictw)
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
"""
import asyncio

from nio import AsyncClient, RoomMessageText
from nio.events import Event
from nio.rooms import MatrixRoom

from .. import config
from ..line.push import text as line_push

config_instance = config.read()
default_icon = "https://raw.githubusercontent.com/supersonictw/matrix-line-bridge/master/img/profile.png"

client = AsyncClient(
    config_instance["Matrix"]["HOME_SERVER"],
    config_instance["Matrix"]["USER"]
)


async def message_callback(room: MatrixRoom, event: Event):
    if not hasattr(event, "body"):
        return
    mxc_icon = room.avatar_url(event.sender)
    icon = (await client.mxc_to_http(mxc_icon)) if mxc_icon else default_icon
    line_push(
        {
            "name": room.user_name(event.sender),
            "icon_url": icon
        },
        config_instance["LINE"]["ROOM"],
        event.body
    )


async def poll():
    client.add_event_callback(message_callback, RoomMessageText)

    if len(config_instance["Matrix"]["PASSWORD"]) != 0:
        await client.login(config_instance["Matrix"]["PASSWORD"])
    else:
        await client.login()

    await client.sync_forever(timeout=30000)


def run():
    asyncio.run(poll())
