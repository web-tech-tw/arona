# Discord

[Discord](https://discord.com) is a communication platform that allows you to communicate with your team in real-time.

It's popular among gamers, developers, and other communities.

![Discord](../statics/brands/Discord.png)

## Introduction

The Discord integration allows you to send notifications to a Discord channel.
You can use this integration to send notifications from your workflows to your Discord channel.

## Prerequisites

Before you can set up the Discord integration, you need to have the following:

- A Discord account
- A Discord server
- A Discord channel

## Setting up the integration

Here will show you how to set up the Discord integration by creating a Discord bot and adding it to a channel.

### Create a Discord bot

To set up the Discord integration, you need to create a webhook in your Discord channel.
You can do this by following these steps:

1. Open [Discord Developer Portal](https://discord.com/developers).
2. Click "New Application".
3. Enter the name of your application.
4. Click "Create" and accept the terms.
5. Click on the "Bot" tab.
6. Make all of "Privileged Gateway Intents" to be "ON".
7. Here is the permissions you need to give to the bot (not minimum, but might be used in the future):
   - `Add Reactions`
   - `Attach Files`
   - `Embed Links`
   - `Read Message History`
   - `Send Messages`
   - `Send TTS Messages`
   - `Use External Emojis`
   - `Use External Stickers`
8. Click on the "Copy" button to copy the appid and token.
9. Go to OAuth2 tab.
10. Use the "OAuth2 URL Generator" to generate the URL with the permissions you need.
11. Open the generated URL in your browser.
12. Select the server you want to add the bot to.
13. Click "Authorize".
14. Go to the channel you're hoping to bridging it.
15. Start a chat with the bot and send a command to verify that it is working.

Here is the official documentation for creating a Discord bot: [Discord Developer Portal](https://discord.com/developers/docs/intro)
