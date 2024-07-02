import OpenAI from "openai";
import {bridgeProviderConfig} from "../../config";

const {
    openai: openaiConfig,
} = bridgeProviderConfig();

const {
    apiKey,
    baseUrl: baseURL,
    chatModel,
} = openaiConfig;

const client = new OpenAI({baseURL, apiKey});

const chatHistoryMapper = new Map();

/**
 * Randomly choose an element from an array.
 * @param {Array<any>} choices The array of choices.
 * @return {any} The randomly chosen element.
 */
function choose(choices: Array<any>): any {
    const seed = Math.random();
    const index = Math.floor(seed * choices.length);
    return choices[index];
}

/**
 * Chat with the AI.
 * @param {string} chatId The chat ID to chat with the AI.
 * @param {string} prompt The prompt to chat with the AI.
 * @return {Promise<string>} The response from the AI.
 */
export async function chatWithAI(
    chatId: string,
    prompt: string,
): Promise<string> {
    if (!chatHistoryMapper.has(chatId)) {
        chatHistoryMapper.set(chatId, []);
    }

    const chatHistory = chatHistoryMapper.get(chatId);
    const userPromptMessage = {
        role: "user",
        content: prompt,
    };

    const response = await client.chat.completions.create({
        model: chatModel,
        messages: [
            // ...prependPrompts,
            ...chatHistory,
            userPromptMessage,
        ],
    });

    const choice = choose(response.choices);
    const reply = choice.message.content;
    const assistantReplyMessage = {
        role: "assistant",
        content: reply,
    };

    chatHistory.push(
        userPromptMessage,
        assistantReplyMessage,
    );
    if (chatHistory.length > 30) {
        chatHistory.shift();
        chatHistory.shift();
    }

    return reply;
}

/**
 * Slice the message content into multiple snippets.
 * @param {string} content - The content to slice.
 * @param {number} maxLength - The maximum length of each snippet.
 * @param {string} separator - The separator to split the content.
 * @return {Array<string>} The sliced snippets.
 */
export function sliceContent(
    content: string,
    maxLength: number,
    separator: string = "\n",
): Array<string> {
    const substrings = content.split(separator);
    const snippets: Array<string> = [];

    let lastSnippet = "";
    for (const text of substrings) {
        if (!text) {
            lastSnippet += separator;
            continue;
        }
        if (text.length + lastSnippet.length < maxLength) {
            lastSnippet += text;
            continue;
        }
        snippets.push(lastSnippet.trim());
        lastSnippet = "";
    }
    if (lastSnippet) {
        snippets.push(lastSnippet.trim());
    }

    return snippets;
}
