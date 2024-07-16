import { defineConfig } from 'vitepress'

const isProduction = process.env.NODE_ENV === 'production'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Arona",
  base: isProduction ? "/arona/" : "/",
  description: "A simple bridge for every messenger.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{
      text: "Home",
      link: "/",
    }, {
      text: "Docs",
      link: "/introduction",
    }],
    sidebar: [
      {
        text: "🌟 Introduction",
        link: "/introduction",
      },
      {
        text: "😎 Prerequisites",
        link: "/prerequisites",
      },
      {
        text: "✨ Get Started",
        link: "/get-started",
      },
      {
        text: "🪄 Configuration",
        link: "/configuration",
      },
      {
        text: "🎯 Usage",
        link: "/usage",
      },
      {
        text: "🏁 Commands",
        link: "/commands",
      },
      {
        text: "❓ FAQ",
        link: "/faq",
      },
      {
        text: "🔱 Integrations",
        link: "/integrations",
        items: [
          {
            text: "LINE",
            link: "/integrations/line",
          },
          {
            text: "Matrix",
            link: "/integrations/matrix",
          },
          {
            text: "Discord",
            link: "/integrations/discord",
          },
          {
            text: "Telegram",
            link: "/integrations/telegram",
          },
          {
            text: "OpenAI",
            link: "/integrations/openai",
          }
        ],
      },
      {
        text: "🔮 About",
        link: "/about",
      },
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/web-tech-tw/arona',
      }
    ],
    footer: {
      message: "MIT Licensed",
      copyright: "Copyright © 2024 Taiwan Web Technology Promotion Organization (Web Tech TW)"
    }
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en'
    },
    "zh-tw": {
      label: '正體中文',
      lang: 'zh-tw',
    }
  }
})
