```ini
[LINE]
EXPOSE_HOST = 127.0.0.1
EXPOSE_PORT = 80
CHANNEL_ACCESS_TOKEN =
CHANNEL_SECRET =
ROOM =

[Matrix]
HOME_SERVER =
USERNAME =
PASSWORD =
ROOM =
```

## LINE

`LINE Messaging API` is using [Webhook](https://en.wikipedia.org/wiki/Webhook), which is required the host of bridge exposed on Internet.

Please make sure your server can be visible external, and the port you configured(`EXPOSE_PORT`) is available.

- EXPOSE_HOST

As known as the address for exposing your LINE bridge on specific network, default value is `127.0.0.1`.

- EXPOSE_PORT

The port which is used to expose on Internet for `LINE Webhook Agent` visiting, default value is `80`.

- CHANNEL_ACCESS_TOKEN and CHANNEL_SECRET

Both of them are required to identity your BOT and verify the events incoming, more detail please check

https://developers.line.biz/en/docs/messaging-api/getting-started

- ROOM

ROOM is the ID of target(LINE's) which is fixed for transporting the messages from Matrix.

https://developers.line.biz/en/faq/#what-are-user-id-groupid-roomid

# Matrix

- HOME_SERVER

Introduce:

https://matrix.org/faq/#what-is-a-homeserver%3F

- USERNAME

The ID for you to login the network of Matrix.

https://matrix.org/faq/#what-is-a-mxid%3F

example:
`@supersonictw:matrix.org`

- PASSWORD

Your password.

- ROOM

ROOM is the ID of target(Matrix's) which is fixed for transporting the messages from LINE.

example:
`!yTRzUDNyviBhrMwYGG:matrix.org`

## Note

```
Under the wiki, please mention the user/pass for Matrix should not be the user you will use to chat.
The ID for you to login the network of Matrix. Set up a new user to act as your bridge puppet, as the bridge will not relay messages sent by this user. Add this user to the groups that are bridged to a line room.

Also worth mentioning the Line chat bot must be added to the line room.
Matrix group should be unencrypted
```

## Next Step

[Execute](Execute)
