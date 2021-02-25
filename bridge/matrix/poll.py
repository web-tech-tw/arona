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


def message_cb(room: MatrixRoom, event: Event):
    line_push(
        {"name":room.user_name(event.sender)},
        "",
        event.body
    )


async def poll():
    client = AsyncClient("https://example.org", "@alice:example.org")
    client.add_event_callback(message_cb, RoomMessageText)

    await client.login("hunter1")
    await client.sync_forever(timeout=30000)
