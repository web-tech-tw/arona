# ✨ Get Started

Arona is a simple bridge for every messenger.

It exchanges messages between LINE, Telegram, Discord, and Matrix.

## Configuration

Create a `config.yaml` file in the root directory.

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

To get detailed information about the configuration, please refer to the [Configuration](./configuration.md) page.

## Installation

To run the project, you can use Docker or run it natively.

### Docker

Create a `docker-compose.yml` file in the root directory.

Copy the following content to the `docker-compose.yml` file.

```yaml
version: 3
services:
  arona:
    image: ghcr.io/web-tech-tw/arona:main
    ports:
      - 127.0.0.1:3000:3000
    volumes:
      - ./config.yaml:/workplace/config.yaml:ro
    restart: always
```

Run the following command to start the project.

```bash
docker-compose up -d
```

### Native

Run the following commands to start the project.

Clone the repository.

```bash
git clone https://github.com/web-tech-tw/arona.git
cd arona
```

Install the dependencies and start the project.

```bash
npm install
npm start
```
