# OpenAI

OpenAI module is used to connect to the OpenAI API to generate text, images, and more.

It's compatible with any OpenAI-compatible API service, including the self-hosted OpenAI API.

![OpenAI](../statics/brands/OpenAI.png)

## Introduction

The OpenAI integration allows you to interact with the OpenAI API to generate text, images, and more.
You can use this integration to create AI-powered workflows that generate content, answer questions, and more.

## Prerequisites

Before you can set up the OpenAI integration, you need to have the following:

- An account from an OpenAI-compatible API service
- An API key from the service

## Setting up the integration

To set up the OpenAI integration, you need to create an API key in your OpenAI account. You can do this by following these steps:

1. Log in to your OpenAI-compatible API service account.
2. Apply for an API key. If you're using the self-hosted OpenAI API, and it seems no api key is needed, you can fill in the `apiKey` field with `emptyButRequired` or any string instead (Must not be empty).
3. Copy the API key into the `apiKey` field (see the [Configure](#configure) section).
4. Use the API key in your workflows to interact with the OpenAI API.

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

If the API provider asked you to make the `apiKey` field empty, you should fill the filed with `emptyButRequired` or any string instead due to the restriction from OpenAI client module (Must not be empty).

#### `chatModel`

*type: `string`*

The chat model to use.

The default value is `gpt-3.5-turbo`, it's a Google Gemini 1.0 model (via proxy).

You can replace it with the model you want to use.

---

> The copyright of the brand logos belongs to the respective brand owners.
