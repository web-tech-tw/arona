import{_ as i,c as t,o as s,a2 as e}from"./chunks/framework.BLHWSx9w.js";const g=JSON.parse('{"title":"🪄 Configuration","description":"","frontmatter":{},"headers":[],"relativePath":"configuration.md","filePath":"configuration.md"}'),a={name:"configuration.md"},n=e(`<h1 id="🪄-configuration" tabindex="-1">🪄 Configuration <a class="header-anchor" href="#🪄-configuration" aria-label="Permalink to &quot;🪄 Configuration&quot;">​</a></h1><p>To configure the Arona, you need to create a configuration file named <code>config.yaml</code> in the root directory of the project.</p><h2 id="configuration-file" tabindex="-1">Configuration File <a class="header-anchor" href="#configuration-file" aria-label="Permalink to &quot;Configuration File&quot;">​</a></h2><p>The configuration file is a YAML file that contains the configuration for the Arona.</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">deviceName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Arona&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">http</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  bindHost</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127.0.0.1</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  bindPort</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3000</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  baseUrl</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;http://example.com&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">bridge</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  public</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">bridgeProvider</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # OpenAI</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  openai</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    enable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # https://github.com/ai-tech-tw/openai</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    baseUrl</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://web-tech-tw.eu.org/openai/v1&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    apiKey</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;YourGeminiApiKey&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    chatModel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;gpt-3.5-turbo&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # LINE</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  line</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    enable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    channelAccessToken</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;YourChannelAccessToken&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    channelSecret</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;YourChannelSecret&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    useNotify</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    notifyClientId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;YourClientID&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    notifyClientSecret</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;YourClientSecret&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # Matrix</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  matrix</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    enable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    homeserverUrl</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://matrix.org&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    accessToken</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;YourSecretAccessToken&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # Discord</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  discord</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    enable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    appId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;YourAppId&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    botToken</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;YourBotToken&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # Telegram</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  telegram</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    enable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    botToken</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;YourBotToken&quot;</span></span></code></pre></div><h2 id="configuration-options" tabindex="-1">Configuration Options <a class="header-anchor" href="#configuration-options" aria-label="Permalink to &quot;Configuration Options&quot;">​</a></h2><p>The configuration file contains the following options:</p><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><code>deviceName</code></td><td>The name of the device.</td></tr><tr><td><code>http</code></td><td>The HTTP configuration.</td></tr><tr><td><code>bridge</code></td><td>The bridge configuration.</td></tr><tr><td><code>bridgeProvider</code></td><td>The bridge provider configuration.</td></tr></tbody></table><h3 id="devicename" tabindex="-1"><code>deviceName</code> <a class="header-anchor" href="#devicename" aria-label="Permalink to &quot;\`deviceName\`&quot;">​</a></h3><p>The <code>deviceName</code> option is used to specify the name of the device.</p><h3 id="http" tabindex="-1"><code>http</code> <a class="header-anchor" href="#http" aria-label="Permalink to &quot;\`http\`&quot;">​</a></h3><p>The <code>http</code> option is used to configure the HTTP server.</p><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><code>bindHost</code></td><td>The host to bind to.</td></tr><tr><td><code>bindPort</code></td><td>The port to bind to.</td></tr><tr><td><code>baseUrl</code></td><td>The base URL of the API.</td></tr></tbody></table><h3 id="bridge" tabindex="-1"><code>bridge</code> <a class="header-anchor" href="#bridge" aria-label="Permalink to &quot;\`bridge\`&quot;">​</a></h3><p>The <code>bridge</code> option is used to configure the bridge.</p><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><code>public</code></td><td>Whether the bridge is public or not.</td></tr></tbody></table><h3 id="bridgeprovider" tabindex="-1"><code>bridgeProvider</code> <a class="header-anchor" href="#bridgeprovider" aria-label="Permalink to &quot;\`bridgeProvider\`&quot;">​</a></h3><p>The <code>bridgeProvider</code> option is used to configure the bridge provider.</p><h4 id="openai" tabindex="-1">OpenAI <a class="header-anchor" href="#openai" aria-label="Permalink to &quot;OpenAI&quot;">​</a></h4><p>The <code>openai</code> option is used to configure the OpenAI provider.</p><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><code>enable</code></td><td>Whether the provider is enabled or not.</td></tr><tr><td><code>baseUrl</code></td><td>The base URL of the OpenAI API.</td></tr><tr><td><code>apiKey</code></td><td>The API key of the OpenAI API.</td></tr><tr><td><code>chatModel</code></td><td>The chat model to use.</td></tr></tbody></table><p>Details of OpenAI integration can be found <a href="./integrations/openai.html">here</a>.</p><h4 id="line" tabindex="-1">LINE <a class="header-anchor" href="#line" aria-label="Permalink to &quot;LINE&quot;">​</a></h4><p>The <code>line</code> option is used to configure the LINE provider.</p><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><code>enable</code></td><td>Whether the provider is enabled or not.</td></tr><tr><td><code>channelAccessToken</code></td><td>The channel access token of the LINE API.</td></tr><tr><td><code>channelSecret</code></td><td>The channel secret of the LINE API.</td></tr><tr><td><code>useNotify</code></td><td>Whether to use LINE Notify or not.</td></tr><tr><td><code>notifyClientId</code></td><td>The client ID of the LINE Notify API.</td></tr><tr><td><code>notifyClientSecret</code></td><td>The client secret of the LINE Notify API.</td></tr></tbody></table><p>Details of LINE integration can be found <a href="./integrations/line.html">here</a>.</p><h4 id="matrix" tabindex="-1">Matrix <a class="header-anchor" href="#matrix" aria-label="Permalink to &quot;Matrix&quot;">​</a></h4><p>The <code>matrix</code> option is used to configure the Matrix provider.</p><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><code>enable</code></td><td>Whether the provider is enabled or not.</td></tr><tr><td><code>homeserverUrl</code></td><td>The homeserver URL of the Matrix API</td></tr><tr><td><code>accessToken</code></td><td>The access token of the Matrix API.</td></tr></tbody></table><p>Details of Matrix integration can be found <a href="./integrations/matrix.html">here</a>.</p><h4 id="discord" tabindex="-1">Discord <a class="header-anchor" href="#discord" aria-label="Permalink to &quot;Discord&quot;">​</a></h4><p>The <code>discord</code> option is used to configure the Discord provider.</p><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><code>enable</code></td><td>Whether the provider is enabled or not.</td></tr><tr><td><code>appId</code></td><td>The application ID of the Discord API.</td></tr><tr><td><code>botToken</code></td><td>The bot token of the Discord API.</td></tr></tbody></table><p>Details of Discord integration can be found <a href="./integrations/discord.html">here</a>.</p><h4 id="telegram" tabindex="-1">Telegram <a class="header-anchor" href="#telegram" aria-label="Permalink to &quot;Telegram&quot;">​</a></h4><p>The <code>telegram</code> option is used to configure the Telegram provider.</p><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><code>enable</code></td><td>Whether the provider is enabled or not.</td></tr><tr><td><code>botToken</code></td><td>The bot token of the Telegram API.</td></tr></tbody></table><p>Details of Telegram integration can be found <a href="./integrations/telegram.html">here</a>.</p>`,38),h=[n];function o(d,r,l,p,k,c){return s(),t("div",null,h)}const u=i(a,[["render",o]]);export{g as __pageData,u as default};
