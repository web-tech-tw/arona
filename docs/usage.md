# 🎯 Usage

Supported messengers:

- [LINE](./integrations/line.md)
- [Telegram](./integrations/telegram.md)
- [Discord](./integrations/discord.md)
- [Matrix](./integrations/matrix.md)

Here are some common use cases and procedures for Arona.

## Bridge messages between messengers

Arona can bridge messages between messengers. For example, you can bridge messages between LINE, Telegram, Discord, and Matrix.

1. To bridge messages between messengers, you need to create a bot for each messenger and add them to a chat.
2. Send `/pair` command to the bot to pair the bot first, then confirm the pairing by sending `/pairConfirm THE_PAIRING_CODE` command in another chat.
3. It will make the chat can be bridged to the chat of the other messenger you confirmed in the previous step.
