"""
matrix-line-bridge
(c) 2021 SuperSonic (https://github.com/supersonictw)
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
"""
from nio import AsyncClient, RoomMessageText
from nio.rooms import MatrixRoom
from nio.events import Event
from ..line import push as line_push

from .. import config

config_instance = config.read()


def message_cb(room: MatrixRoom, event: Event):
    if not hasattr(event, "body"):
        return
    line_push(
        {
            "name": room.user_name(event.sender),
            "icon_url": room.avatar_url(event.sender)
        },
        config_instance["LINE"]["ROOM"],
        event.body
    )


async def poll():
    client = AsyncClient(
        config_instance["Matrix"]["HOME_SERVER"],
        config_instance["Matrix"]["USER"]
    )
    client.add_event_callback(message_cb, RoomMessageText)

    if len(config_instance["Matrix"]["PASSWORD"]) != 0:
        await client.login(config_instance["Matrix"]["PASSWORD"])
    else:
        await client.login()

    await client.sync_forever(timeout=30000)
