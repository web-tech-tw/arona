# 🪄 Configuration

To configure the Arona, you need to create a configuration file named `config.yaml` in the root directory of the project.

## Configuration File

The configuration file is a YAML file that contains the configuration for the Arona.

```yaml
deviceName: "Arona"

http:
  bindHost: 127.0.0.1
  bindPort: 3000
  baseUrl: "http://example.com"

bridge:
  public: true

bridgeProvider:
  # OpenAI
  openai:
    enable: true
    # https://github.com/ai-tech-tw/openai
    baseUrl: "https://web-tech-tw.eu.org/openai/v1"
    apiKey: "YourGeminiApiKey"
    chatModel: "gpt-3.5-turbo"

  # LINE
  line:
    enable: true
    channelAccessToken: "YourChannelAccessToken"
    channelSecret: "YourChannelSecret"
    useNotify: true
    notifyClientId: "YourClientID"
    notifyClientSecret: "YourClientSecret"

  # Matrix
  matrix:
    enable: true
    homeserverUrl: "https://matrix.org"
    accessToken: "YourSecretAccessToken"

  # Discord
  discord:
    enable: false
    appId: "YourAppId"
    botToken: "YourBotToken"

  # Telegram
  telegram:
    enable: false
    botToken: "YourBotToken"
```

## Configuration Options

The configuration file contains the following options:

| Option           | Description                        |
| ---------------- | ---------------------------------- |
| `deviceName`     | The name of the device.            |
| `http`           | The HTTP configuration.            |
| `bridge`         | The bridge configuration.          |
| `bridgeProvider` | The bridge provider configuration. |

### `deviceName`

The `deviceName` option is used to specify the name of the device.

### `http`

The `http` option is used to configure the HTTP server.

| Option     | Description              |
| ---------- | ------------------------ |
| `bindHost` | The host to bind to.     |
| `bindPort` | The port to bind to.     |
| `baseUrl`  | The base URL of the API. |

### `bridge`

The `bridge` option is used to configure the bridge.

| Option   | Description                          |
| -------- | ------------------------------------ |
| `public` | Whether the bridge is public or not. |

### `bridgeProvider`

The `bridgeProvider` option is used to configure the bridge provider.

#### OpenAI

The `openai` option is used to configure the OpenAI provider.

| Option      | Description                             |
| ----------- | --------------------------------------- |
| `enable`    | Whether the provider is enabled or not. |
| `baseUrl`   | The base URL of the OpenAI API.         |
| `apiKey`    | The API key of the OpenAI API.          |
| `chatModel` | The chat model to use.                  |

Details of OpenAI integration can be found [here](integrations/openai.md).

#### LINE

The `line` option is used to configure the LINE provider.

| Option               | Description                               |
| -------------------- | ----------------------------------------- |
| `enable`             | Whether the provider is enabled or not.   |
| `channelAccessToken` | The channel access token of the LINE API. |
| `channelSecret`      | The channel secret of the LINE API.       |
| `useNotify`          | Whether to use LINE Notify or not.        |
| `notifyClientId`     | The client ID of the LINE Notify API.     |
| `notifyClientSecret` | The client secret of the LINE Notify API. |

Details of LINE integration can be found [here](integrations/line.md).

#### Matrix

The `matrix` option is used to configure the Matrix provider.

| Option          | Description                             |
| --------------- | --------------------------------------- |
| `enable`        | Whether the provider is enabled or not. |
| `homeserverUrl` | The homeserver URL of the Matrix API    |
| `accessToken`   | The access token of the Matrix API.     |

Details of Matrix integration can be found [here](integrations/matrix.md).

#### Discord

The `discord` option is used to configure the Discord provider.

| Option     | Description                             |
| ---------- | --------------------------------------- |
| `enable`   | Whether the provider is enabled or not. |
| `appId`    | The application ID of the Discord API.  |
| `botToken` | The bot token of the Discord API.       |

Details of Discord integration can be found [here](integrations/discord.md).

#### Telegram

The `telegram` option is used to configure the Telegram provider.

| Option     | Description                             |
| ---------- | --------------------------------------- |
| `enable`   | Whether the provider is enabled or not. |
| `botToken` | The bot token of the Telegram API.      |

Details of Telegram integration can be found [here](integrations/telegram.md).
