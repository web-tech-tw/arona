"""
matrix-line-bridge
(c) 2021 SuperSonic (https://github.com/supersonictw)
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
"""
from nio import AsyncClient

client = AsyncClient("https://example.org", "@alice:example.org")


async def push(content: str):
    await client.login("hunter1")
    await client.room_send(
        room_id="!test:example.org",
        message_type="m.room.message",
        content={
            "msgtype": "m.text",
            "body": content
        }
    )
    await client.close()
