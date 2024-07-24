import{_ as e,o,c as t,a5 as i}from"./chunks/framework.CoMpdP9h.js";const r="/arona/assets/Discord.Ddw9iynx.png",m=JSON.parse('{"title":"Discord","description":"","frontmatter":{},"headers":[],"relativePath":"integrations/discord.md","filePath":"integrations/discord.md"}'),a={name:"integrations/discord.md"},n=i('<h1 id="discord" tabindex="-1">Discord <a class="header-anchor" href="#discord" aria-label="Permalink to &quot;Discord&quot;">​</a></h1><p><a href="https://discord.com" target="_blank" rel="noreferrer">Discord</a> is a communication platform that allows you to communicate with your team in real-time.</p><p>It&#39;s popular among gamers, developers, and other communities.</p><p><img src="'+r+'" alt="Discord"></p><h2 id="introduction" tabindex="-1">Introduction <a class="header-anchor" href="#introduction" aria-label="Permalink to &quot;Introduction&quot;">​</a></h2><p>The Discord integration allows you to send notifications to a Discord channel. You can use this integration to send notifications from your workflows to your Discord channel.</p><h2 id="prerequisites" tabindex="-1">Prerequisites <a class="header-anchor" href="#prerequisites" aria-label="Permalink to &quot;Prerequisites&quot;">​</a></h2><p>Before you can set up the Discord integration, you need to have the following:</p><ul><li>A Discord account</li><li>A Discord server</li><li>A Discord channel</li></ul><h2 id="setting-up-the-integration" tabindex="-1">Setting up the integration <a class="header-anchor" href="#setting-up-the-integration" aria-label="Permalink to &quot;Setting up the integration&quot;">​</a></h2><p>Here will show you how to set up the Discord integration by creating a Discord bot and adding it to a channel.</p><h3 id="create-a-discord-bot" tabindex="-1">Create a Discord bot <a class="header-anchor" href="#create-a-discord-bot" aria-label="Permalink to &quot;Create a Discord bot&quot;">​</a></h3><p>To set up the Discord integration, you need to create a webhook in your Discord channel. You can do this by following these steps:</p><ol><li>Open <a href="https://discord.com/developers" target="_blank" rel="noreferrer">Discord Developer Portal</a>.</li><li>Click &quot;New Application&quot;.</li><li>Enter the name of your application.</li><li>Click &quot;Create&quot; and accept the terms.</li><li>Click on the &quot;Bot&quot; tab.</li><li>Make all of &quot;Privileged Gateway Intents&quot; to be &quot;ON&quot;.</li><li>Here is the permissions you need to give to the bot (not minimum, but might be used in the future): <ul><li><code>Add Reactions</code></li><li><code>Attach Files</code></li><li><code>Embed Links</code></li><li><code>Read Message History</code></li><li><code>Send Messages</code></li><li><code>Send TTS Messages</code></li><li><code>Use External Emojis</code></li><li><code>Use External Stickers</code></li></ul></li><li>Click on the &quot;Copy&quot; button to copy the appid and token, fill in the <code>appId</code> and <code>botToken</code> fields (see the <a href="#configure">Configure</a> section).</li><li>Go to OAuth2 tab.</li><li>Use the &quot;OAuth2 URL Generator&quot; to generate the URL with the permissions you need.</li><li>Open the generated URL in your browser.</li><li>Select the server you want to add the bot to.</li><li>Click &quot;Authorize&quot;.</li><li>Go to the channel you&#39;re hoping to bridging it.</li><li>Start a chat with the bot and send a command to verify that it is working.</li></ol><p>Here is the official documentation for creating a Discord bot: <a href="https://discord.com/developers/docs/intro" target="_blank" rel="noreferrer">Discord Developer Portal</a></p><h3 id="configure" tabindex="-1">Configure <a class="header-anchor" href="#configure" aria-label="Permalink to &quot;Configure&quot;">​</a></h3><p>Here are the options you can configure for the Discord integration:</p><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><a href="#enable"><code>enable</code></a></td><td>Whether the provider is enabled or not.</td></tr><tr><td><a href="#appid"><code>appId</code></a></td><td>The application ID of the Discord API.</td></tr><tr><td><a href="#bottoken"><code>botToken</code></a></td><td>The bot token of the Discord API.</td></tr></tbody></table><h4 id="enable" tabindex="-1"><code>enable</code> <a class="header-anchor" href="#enable" aria-label="Permalink to &quot;`enable`&quot;">​</a></h4><p><em>type: <code>boolean</code></em></p><p>Whether the provider is enabled or not.</p><h3 id="appid" tabindex="-1"><code>appId</code> <a class="header-anchor" href="#appid" aria-label="Permalink to &quot;`appId`&quot;">​</a></h3><p><em>type: <code>string</code></em></p><p>The application ID of the Discord API.</p><p>You should obtain this from the Discord Developer Portal.</p><p>More information can be found <a href="https://discord.com/developers/docs/intro" target="_blank" rel="noreferrer">here</a>.</p><h3 id="bottoken" tabindex="-1"><code>botToken</code> <a class="header-anchor" href="#bottoken" aria-label="Permalink to &quot;`botToken`&quot;">​</a></h3><p><em>type: <code>string</code></em></p><p>The bot token of the Discord API.</p><p>You should obtain this from the Discord Developer Portal.</p><p>More information can be found <a href="https://discord.com/developers/docs/intro" target="_blank" rel="noreferrer">here</a>.</p><hr><blockquote><p>The copyright of the brand logos belongs to the respective brand owners.</p></blockquote>',33),d=[n];function c(s,l,h,p,u,b){return o(),t("div",{"data-pagefind-body":!0},d)}const g=e(a,[["render",c]]);export{m as __pageData,g as default};
