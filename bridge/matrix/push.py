"""
matrix-line-bridge
(c) 2021 SuperSonic (https://github.com/supersonictw)
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
"""
import magic
from PIL import Image
import os
import aiofiles.os
from nio import UploadResponse, AsyncClient, InviteEvent, AsyncClientConfig

from .. import config

config_instance = config.read()

client_config = AsyncClientConfig(
        max_limit_exceeded=0,
        max_timeouts=0,
        store_sync_tokens=True,
        encryption_enabled=False
    )

client = AsyncClient(
    config_instance["Matrix"]["HOME_SERVER"],
    config_instance["Matrix"]["USERNAME"],
    store_path="./store/",
    config=client_config
)


async def text(name: str, content: str):
    client.device_name = config_instance["Matrix"]["DEVICE_NAME"]
    if len(config_instance["Matrix"]["PASSWORD"]) != 0:
        await client.login(config_instance["Matrix"]["PASSWORD"])
    else:
        await client.login()
    if client.should_upload_keys:
        await client.keys_upload()

    await client.room_send(
        room_id=config_instance["Matrix"]["ROOM"],
        message_type="m.room.message",
        content={
            "msgtype": "m.text",
            "body": name+": "+ content
        }
    )
    await client.close()

async def send_image(image):
    client.device_name = config_instance["Matrix"]["DEVICE_NAME"]
    if len(config_instance["Matrix"]["PASSWORD"]) != 0:
        await client.login(config_instance["Matrix"]["PASSWORD"])
    else:
        await client.login()
    if client.should_upload_keys:
        await client.keys_upload()

    room_id=config_instance["Matrix"]["ROOM"]
    """Send image to toom.

    Arguments:
    ---------
    client : Client
    room_id : str
    image : str, file name of image

    This is a working example for a JPG image.
        "content": {
            "body": "someimage.jpg",
            "info": {
                "size": 5420,
                "mimetype": "image/jpeg",
                "thumbnail_info": {
                    "w": 100,
                    "h": 100,
                    "mimetype": "image/jpeg",
                    "size": 2106
                },
                "w": 100,
                "h": 100,
                "thumbnail_url": "mxc://example.com/SomeStrangeThumbnailUriKey"
            },
            "msgtype": "m.image",
            "url": "mxc://example.com/SomeStrangeUriKey"
        }

    """
    mime_type = magic.from_file(image, mime=True)  # e.g. "image/jpeg"
    if not mime_type.startswith("image/"):
        print("Drop message because file does not have an image mime type.")
        return

    im = Image.open(image)
    (width, height) = im.size  # im.size returns (width,height) tuple

    # first do an upload of image, then send URI of upload to room
    file_stat = await aiofiles.os.stat(image)
    async with aiofiles.open(image, "r+b") as f:
        resp, maybe_keys = await client.upload(
            f,
            content_type=mime_type,  # image/jpeg
            filename=os.path.basename(image),
            filesize=file_stat.st_size)
    if (isinstance(resp, UploadResponse)):
        print("Image was uploaded successfully to server. ")
    else:
        print(f"Failed to upload image. Failure response: {resp}")

    content = {
        "body": os.path.basename(image),  # descriptive title
        "info": {
            "size": file_stat.st_size,
            "mimetype": mime_type,
            "thumbnail_info": None,  # TODO
            "w": width,  # width in pixel
            "h": height,  # height in pixel
            "thumbnail_url": None,  # TODO
        },
        "msgtype": "m.image",
        "url": resp.content_uri,
    }

    try:
        await client.room_send(
            room_id,
            message_type="m.room.message",
            content=content
        )
        print("Image was sent successfully")
    except Exception:
        print(f"Image send of file {image} failed.")
