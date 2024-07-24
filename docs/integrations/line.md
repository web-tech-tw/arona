# LINE

[LINE](https://line.me) is a messaging app that allows you to send messages, make voice and video calls, and share photos, videos, and more.

It's popular in Asia and has over 200 million active users worldwide.

![LINE](../statics/brands/LINE.png)

## Introduction

LINE Messaging API allows you to add LINE to your app or website to reach your customers. You can respond to messages, send stickers, images, videos, and more.

## Prerequisites

Before you can set up the LINE integration, you need to have the following:

- A LINE account
- A LINE channel
- A LINE bot

## Setting up the integration

Here will show you how to set up the LINE integration by creating a LINE bot and adding it to a chat.

### Create a LINE bot

To set up the LINE integration, you need to create a LINE bot in your LINE account.
You can do this by following these steps:

1. Open [LINE Developers](https://developers.line.biz).
2. Log in to your LINE account.
3. Go to the LINE Developers Console.
4. Click on the "Create a new provider" button.
5. Enter the provider name and description.
6. Click on the "Create" button.
7. Enter the provider you just created.
8. Click on the "Create a new channel" button.
9. Fill in the required information for the channel.
10. Click on the "Create" button.
11. Click on the "Issue" button to generate a channel access token.
12. Copy the channel access token and channel secret into the `channelAccessToken` and `channelSecret` fields respectively (see the [Configure](#configure) section).
13. Add the LINE bot to your chat you're hoping to bridging it.
14. Start a chat with the bot and send a command to verify that it is working.

Here is the official documentation for creating a LINE bot: [LINE Messaging API](https://developers.line.biz/en/docs/messaging-api/overview/)

### Create a LINE Notify Service Provider (Optional)

To set up the LINE Notify integration, you need to create a LINE Notify service provider in your LINE account.

You can do this by following these steps:

1. Open [LINE Notify](https://notify-bot.line.me).
2. Log in to your LINE account.
3. Go to the [Manage registered services](https://notify-bot.line.me/my/services) page.
4. Click on the "Add service" button.
5. Fill in the required information for the service.
6. Submit the form with the `Agree and continue` button.
7. On the confirmation page, click on the `Add` button.
8. Verify your email address, the mail has be sent to the email you used to register the service provider.
9. After verifying your email address, click the [Manage registered services](https://notify-bot.line.me/my/services) link.
10. Open the service provider you just created.
11. Copy the client ID and client secret into the `notifyClientId` and `notifyClientSecret` fields respectively (see the [Configure](#configure) section).
12. Make the `useNotify` field `true` (see the [Configure](#configure) section).

It will be working with the LINE Notify API to send messages instead of the LINE Messaging API.

### Configure

Here are the options you can configure for the LINE integration:

| Option                                      | Description                               |
| ------------------------------------------- | ----------------------------------------- |
| [`enable`](#enable)                         | Whether the provider is enabled or not.   |
| [`channelAccessToken`](#channelaccesstoken) | The channel access token of the LINE API. |
| [`channelSecret`](#channelsecret)           | The channel secret of the LINE API.       |
| [`useNotify`](#usenotify)                   | Whether to use LINE Notify or not.        |
| [`notifyClientId`](#notifyclientid)         | The client ID of the LINE Notify API.     |
| [`notifyClientSecret`](#notifyclientsecret) | The client secret of the LINE Notify API. |

#### `enable`

*type: `boolean`*

Whether the provider is enabled or not.

#### `channelAccessToken`

*type: `string`*

The channel access token of the LINE API.

You should obtain this token from the LINE Developers Console.

More information can be found [here](https://developers.line.biz/en/docs/messaging-api/getting-started/).

#### `channelSecret`

*type: `string`*

The channel secret of the LINE API.

You should obtain this secret from the LINE Developers Console.

More information can be found [here](https://developers.line.biz/en/docs/messaging-api/getting-started/).

#### `useNotify`

*type: `boolean`*

Whether to use LINE Notify or not.

LINE Notify is a service that allows you to send notifications from your app to LINE users.

More information can be found [here](https://notify-bot.line.me/en/).

If it's enabled, it will use the LINE Notify API to send messages instead of the LINE Messaging API.

#### `notifyClientId`

*type: `string`*

The client ID of the LINE Notify API.

You should obtain this ID from the LINE Notify API.

More information can be found [here](https://notify-bot.line.me/en/).

#### `notifyClientSecret`

*type: `string`*

The client secret of the LINE Notify API.

You should obtain this secret from the LINE Notify API.

More information can be found [here](https://notify-bot.line.me/en/).

---

> The copyright of the brand logos belongs to the respective brand owners.
