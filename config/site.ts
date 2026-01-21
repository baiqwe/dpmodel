// config/site.ts
// 站点全局配置 - DeepSeek Model1 Online Playground

export const siteConfig = {
  // === 品牌标识 ===
  name: "DeepSeek Model1",                    // 网站名称
  domain: "deepseekmodel1.com",               // 主域名（不含 https://）
  url: "https://deepseekmodel1.com",          // 完整 URL
  author: "DeepSeek Team",                    // 作者
  supportEmail: "support@deepseekmodel1.com", // 联系邮箱

  // === 分析追踪 ===
  gaId: "G-XXXXXXXXXX",                       // Google Analytics ID (待配置)

  // === 国际化配置 ===
  i18n: {
    locales: ['en', 'zh'] as const,           // 支持的语言列表
    defaultLocale: 'en' as const,             // 默认语言
    baseLocale: 'en' as const,                // 翻译基准语言
  },

  // === PWA 主题 ===
  themeColor: "#1a1a2e",                      // 深色主题
  backgroundColor: "#0f0f1a",

  // === SEO 关键词 ===
  keywords: [
    "DeepSeek Model1",
    "DeepSeek R1",
    "DeepSeek V3",
    "FlashMLA",
    "AI Playground",
    "DeepSeek API",
    "OpenAI o1 alternative",
  ],
};

// 类型导出
export type Locale = (typeof siteConfig.i18n.locales)[number];
