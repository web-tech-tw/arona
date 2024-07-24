# OpenAI

OpenAI is a research lab consisting of the for-profit OpenAI LP and the non-profit OpenAI Inc. The organization aims to ensure that artificial general intelligence (AGI) benefits all of humanity. OpenAI is funded by a group of technology executives and investors, including Elon Musk, Reid Hoffman, and Peter Thiel.

![OpenAI](../statics/brands/OpenAI.png)

## Introduction

The OpenAI integration allows you to interact with the OpenAI API to generate text, images, and more. You can use this integration to create AI-powered workflows that generate content, answer questions, and more.

## Prerequisites

Before you can set up the OpenAI integration, you need to have the following:

- An OpenAI account
- An OpenAI API key
- An understanding of how to use the OpenAI API

## Setting up the integration

To set up the OpenAI integration, you need to create an API key in your OpenAI account. You can do this by following these steps:

1. Log in to your OpenAI account.
2. Go to the API section of your account.
3. Click on the "Create API key" button.
4. Copy the API key into the `apiKey` field (see the [Configure](#configure) section).
5. Use the API key in your workflows to interact with the OpenAI API.

### Configure

Here are the options you can configure for the OpenAI integration:

| Option                    | Description                             |
| ------------------------- | --------------------------------------- |
| [`enable`](#enable)       | Whether the provider is enabled or not. |
| [`baseUrl`](#baseurl)     | The base URL of the OpenAI API.         |
| [`apiKey`](#apikey)       | The API key of the OpenAI API.          |
| [`chatModel`](#chatmodel) | The chat model to use.                  |

#### `enable`

*type: `boolean`*

Whether the provider is enabled or not.

#### `baseUrl`

*type: `string`*

The base URL of the OpenAI API.

The default value is `https://web-tech-tw.eu.org/openai/v1`, it's a Google Gemini API proxy.

To get more infomaion about the proxy, you can visit the [OpenAI <=> Gemini API Protocol Conversion Gateway](https://github.com/ai-tech-tw/openai).

You can replace it with the OpenAI API URL or your own proxy/server instance.

#### `apiKey`

*type: `string`*

The API key of the OpenAI API.

You should obtain this key from the provider you filled in the `baseUrl` field.

If you're using the default value, you can get the key from the [Get API key | Google AI Studio](https://aistudio.google.com/botToken).

If the API provider asked you to make the `apiKey` field empty, it's better to fill the filed with `null` or anything instead due to the OpenAI client module limition.

#### `chatModel`

*type: `string`*

The chat model to use.

The default value is `gpt-3.5-turbo`, it's a Google Gemini 1.0 model (via proxy).

You can replace it with the model you want to use.

---

> The copyright of the brand logos belongs to the respective brand owners.
