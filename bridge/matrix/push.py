"""
matrix-line-bridge
(c) 2021 SuperSonic (https://github.com/supersonictw)
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
"""
from nio import AsyncClient

from .. import config

config_instance = config.read()

client = AsyncClient(
    config_instance["Matrix"]["HOME_SERVER"],
    config_instance["Matrix"]["USERNAME"]
)


async def text(content: str):
    if len(config_instance["Matrix"]["PASSWORD"]) != 0:
        await client.login(config_instance["Matrix"]["PASSWORD"])
    else:
        await client.login()

    await client.room_send(
        room_id=config_instance["Matrix"]["ROOM"],
        message_type="m.room.message",
        content={
            "msgtype": "m.text",
            "body": content
        }
    )
    await client.close()
