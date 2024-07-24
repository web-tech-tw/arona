import{_ as e,c as t,o,a2 as i}from"./chunks/framework.BntFm1hN.js";const n="/arona/assets/LINE.Bc614m_w.png",g=JSON.parse('{"title":"LINE","description":"","frontmatter":{},"headers":[],"relativePath":"integrations/line.md","filePath":"integrations/line.md"}'),a={name:"integrations/line.md"},r=i('<h1 id="line" tabindex="-1">LINE <a class="header-anchor" href="#line" aria-label="Permalink to &quot;LINE&quot;">​</a></h1><p><a href="https://line.me" target="_blank" rel="noreferrer">LINE</a> is a messaging app that allows you to send messages, make voice and video calls, and share photos, videos, and more.</p><p>It&#39;s popular in Asia and has over 200 million active users worldwide.</p><p><img src="'+n+'" alt="LINE"></p><h2 id="introduction" tabindex="-1">Introduction <a class="header-anchor" href="#introduction" aria-label="Permalink to &quot;Introduction&quot;">​</a></h2><p>The LINE integration allows you to send messages to a LINE chat. You can use this integration to send notifications, alerts, and updates to your LINE contacts.</p><p>It&#39;s powered by LINE Messaging API, which allows you to add LINE to your app or website to reach your customers. You can respond to messages, send stickers, images, videos, and more.</p><p>There is an LINE Notify integration also, helps you to send notifications from your app to LINE users. It will replace the LINE Messaging API with the LINE Notify API to send messages if you enable it.</p><h2 id="prerequisites" tabindex="-1">Prerequisites <a class="header-anchor" href="#prerequisites" aria-label="Permalink to &quot;Prerequisites&quot;">​</a></h2><p>Before you can set up the LINE integration, you need to have the following:</p><ul><li>A LINE account</li><li>A LINE channel</li><li>A LINE bot</li></ul><h2 id="setting-up-the-integration" tabindex="-1">Setting up the integration <a class="header-anchor" href="#setting-up-the-integration" aria-label="Permalink to &quot;Setting up the integration&quot;">​</a></h2><p>Here will show you how to set up the LINE integration by creating a LINE bot and adding it to a chat.</p><h3 id="create-a-line-bot" tabindex="-1">Create a LINE bot <a class="header-anchor" href="#create-a-line-bot" aria-label="Permalink to &quot;Create a LINE bot&quot;">​</a></h3><p>To set up the LINE integration, you need to create a LINE bot in your LINE account. You can do this by following these steps:</p><ol><li>Open <a href="https://developers.line.biz" target="_blank" rel="noreferrer">LINE Developers</a>.</li><li>Log in to your LINE account.</li><li>Go to the LINE Developers Console.</li><li>Click on the &quot;Create a new provider&quot; button.</li><li>Enter the provider name and description.</li><li>Click on the &quot;Create&quot; button.</li><li>Enter the provider you just created.</li><li>Click on the &quot;Create a new channel&quot; button.</li><li>Fill in the required information for the channel.</li><li>Click on the &quot;Create&quot; button.</li><li>Click on the &quot;Issue&quot; button to generate a channel access token.</li><li>Copy the channel access token and channel secret into the <code>channelAccessToken</code> and <code>channelSecret</code> fields respectively (see the <a href="#configure">Configure</a> section).</li><li>Add the LINE bot to your chat you&#39;re hoping to bridging it.</li><li>Start a chat with the bot and send a command to verify that it is working.</li></ol><p>Here is the official documentation for creating a LINE bot: <a href="https://developers.line.biz/en/docs/messaging-api/overview/" target="_blank" rel="noreferrer">LINE Messaging API</a></p><h3 id="create-a-line-notify-service-provider-optional" tabindex="-1">Create a LINE Notify Service Provider (Optional) <a class="header-anchor" href="#create-a-line-notify-service-provider-optional" aria-label="Permalink to &quot;Create a LINE Notify Service Provider (Optional)&quot;">​</a></h3><p>To set up the LINE Notify integration, you need to create a LINE Notify service provider in your LINE account.</p><p>You can do this by following these steps:</p><ol><li>Open <a href="https://notify-bot.line.me" target="_blank" rel="noreferrer">LINE Notify</a>.</li><li>Log in to your LINE account.</li><li>Go to the <a href="https://notify-bot.line.me/my/services" target="_blank" rel="noreferrer">Manage registered services</a> page.</li><li>Click on the &quot;Add service&quot; button.</li><li>Fill in the required information for the service.</li><li>Submit the form with the <code>Agree and continue</code> button.</li><li>On the confirmation page, click on the <code>Add</code> button.</li><li>Verify your email address, the mail has be sent to the email you used to register the service provider.</li><li>After verifying your email address, click the <a href="https://notify-bot.line.me/my/services" target="_blank" rel="noreferrer">Manage registered services</a> link.</li><li>Open the service provider you just created.</li><li>Copy the client ID and client secret into the <code>notifyClientId</code> and <code>notifyClientSecret</code> fields respectively (see the <a href="#configure">Configure</a> section).</li><li>Make the <code>useNotify</code> field <code>true</code> (see the <a href="#configure">Configure</a> section).</li></ol><p>It will be working with the LINE Notify API to send messages instead of the LINE Messaging API.</p><h3 id="configure" tabindex="-1">Configure <a class="header-anchor" href="#configure" aria-label="Permalink to &quot;Configure&quot;">​</a></h3><p>Here are the options you can configure for the LINE integration:</p><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><a href="#enable"><code>enable</code></a></td><td>Whether the provider is enabled or not.</td></tr><tr><td><a href="#channelaccesstoken"><code>channelAccessToken</code></a></td><td>The channel access token of the LINE API.</td></tr><tr><td><a href="#channelsecret"><code>channelSecret</code></a></td><td>The channel secret of the LINE API.</td></tr><tr><td><a href="#usenotify"><code>useNotify</code></a></td><td>Whether to use LINE Notify or not.</td></tr><tr><td><a href="#notifyclientid"><code>notifyClientId</code></a></td><td>The client ID of the LINE Notify API.</td></tr><tr><td><a href="#notifyclientsecret"><code>notifyClientSecret</code></a></td><td>The client secret of the LINE Notify API.</td></tr></tbody></table><h4 id="enable" tabindex="-1"><code>enable</code> <a class="header-anchor" href="#enable" aria-label="Permalink to &quot;`enable`&quot;">​</a></h4><p><em>type: <code>boolean</code></em></p><p>Whether the provider is enabled or not.</p><h4 id="channelaccesstoken" tabindex="-1"><code>channelAccessToken</code> <a class="header-anchor" href="#channelaccesstoken" aria-label="Permalink to &quot;`channelAccessToken`&quot;">​</a></h4><p><em>type: <code>string</code></em></p><p>The channel access token of the LINE API.</p><p>You should obtain this token from the LINE Developers Console.</p><p>More information can be found <a href="https://developers.line.biz/en/docs/messaging-api/getting-started/" target="_blank" rel="noreferrer">here</a>.</p><h4 id="channelsecret" tabindex="-1"><code>channelSecret</code> <a class="header-anchor" href="#channelsecret" aria-label="Permalink to &quot;`channelSecret`&quot;">​</a></h4><p><em>type: <code>string</code></em></p><p>The channel secret of the LINE API.</p><p>You should obtain this secret from the LINE Developers Console.</p><p>More information can be found <a href="https://developers.line.biz/en/docs/messaging-api/getting-started/" target="_blank" rel="noreferrer">here</a>.</p><h4 id="usenotify" tabindex="-1"><code>useNotify</code> <a class="header-anchor" href="#usenotify" aria-label="Permalink to &quot;`useNotify`&quot;">​</a></h4><p><em>type: <code>boolean</code></em></p><p>Whether to use LINE Notify or not.</p><p>LINE Notify is a service that allows you to send notifications from your app to LINE users.</p><p>More information can be found <a href="https://notify-bot.line.me/en/" target="_blank" rel="noreferrer">here</a>.</p><p>If it&#39;s enabled, it will use the LINE Notify API to send messages instead of the LINE Messaging API.</p><h4 id="notifyclientid" tabindex="-1"><code>notifyClientId</code> <a class="header-anchor" href="#notifyclientid" aria-label="Permalink to &quot;`notifyClientId`&quot;">​</a></h4><p><em>type: <code>string</code></em></p><p>The client ID of the LINE Notify API.</p><p>You should obtain this ID from the LINE Notify API.</p><p>More information can be found <a href="https://notify-bot.line.me/en/" target="_blank" rel="noreferrer">here</a>.</p><h4 id="notifyclientsecret" tabindex="-1"><code>notifyClientSecret</code> <a class="header-anchor" href="#notifyclientsecret" aria-label="Permalink to &quot;`notifyClientSecret`&quot;">​</a></h4><p><em>type: <code>string</code></em></p><p>The client secret of the LINE Notify API.</p><p>You should obtain this secret from the LINE Notify API.</p><p>More information can be found <a href="https://notify-bot.line.me/en/" target="_blank" rel="noreferrer">here</a>.</p><hr><blockquote><p>The copyright of the brand logos belongs to the respective brand owners.</p></blockquote>',56),l=[r];function s(c,h,d,p,f,u){return o(),t("div",null,l)}const y=e(a,[["render",s]]);export{g as __pageData,y as default};
