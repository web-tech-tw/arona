# ✨ Get Started

Arona is a simple bridge for every messenger.

It exchanges messages between LINE, Telegram, Discord, and Matrix.

> **⚠️ Public Access From The Internet Required**
>
> To use the bridge, it's required to make the bridge can be got public access from the internet.
>
> If you don't have a public IP address, you can use a service like [ngrok](https://ngrok.com/) or [localtunnel](#localtunnel-optional) to expose your local server to the internet.

## Quick Start

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
    enable: false
    # https://github.com/ai-tech-tw/openai
    baseUrl: "https://web-tech-tw.eu.org/openai/v1"
    apiKey: "YourGeminiApiKey"
    chatModel: "gpt-3.5-turbo"

  # LINE
  line:
    enable: false
    channelAccessToken: "YourChannelAccessToken"
    channelSecret: "YourChannelSecret"
    useNotify: false
    notifyClientId: "YourClientID"
    notifyClientSecret: "YourClientSecret"

  # Matrix
  matrix:
    enable: false
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

> **⚠️ Public Access From The Internet Required**
>
> You must fill the `baseUrl` field in the `config.yaml` file with the URL that can be accessed from the internet.
>
> Otherwise, the bridge will not work properly. (Throwing an error like `Error: Cannot check the heart code...`)
>
> If you don't have a public IP address, see the [Localtunnel](#localtunnel-optional) section.

### Installation

To run the project, you can use Docker or run it natively.

#### Docker

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

#### Native

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

### Localtunnel (Optional)

If you don't have a public IP address, you can use [localtunnel](https://github.com/localtunnel/localtunnel) to expose your local server to the internet.

But when you're using [Arona with docker](#docker), it might be better to use [ngrok](https://ngrok.com/) instead of localtunnel (due to no [node.js](https://nodejs.org) required).

See the [Quickstart of ngronk](https://ngrok.com/docs/getting-started/) for more information.

To use localtunnel, run the following command in another terminal.

```sh
npx localtunnel --port 3000
```

You will get a URL like `https://your-subdomain.loca.lt`.

Fill the `baseUrl` field in the `config.yaml` file with the URL.

```yaml
http:
  baseUrl: "https://your-subdomain.loca.lt"
```

Don't forget to restart the project after changing the configuration.
