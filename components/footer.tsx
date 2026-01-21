"use client";

import { Logo } from "./logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";

export function Footer() {
  const pathname = usePathname();
  const t = useTranslations('footer');
  const isDashboard = pathname?.startsWith("/dashboard");

  // 检测当前 locale
  const pathParts = pathname?.split('/') || [];
  const currentLocale = (pathParts[1] === 'en' || pathParts[1] === 'zh') ? pathParts[1] : 'en';
  const localePrefix = `/${currentLocale}`;

  // 资源链接
  const resourceLinks = [
    { label: t('link_api'), href: "https://platform.deepseek.com", external: true },
    { label: t('link_github'), href: "https://github.com/deepseek-ai", external: true },
    { label: t('link_huggingface'), href: "https://huggingface.co/deepseek-ai", external: true },
  ];

  // 页面锚点链接
  const pageLinks = [
    { label: "Playground", href: `${localePrefix}#playground` },
    { label: currentLocale === 'zh' ? '模型对比' : 'Comparison', href: `${localePrefix}#comparison` },
    { label: currentLocale === 'zh' ? '常见问题' : 'FAQ', href: `${localePrefix}#faq` },
  ];

  // 法律链接
  const legalLinks = [
    { label: t('link_privacy'), href: `${localePrefix}/privacy` },
    { label: t('link_terms'), href: `${localePrefix}/terms` },
    { label: t('link_about'), href: `${localePrefix}/about` },
  ];

  if (isDashboard) {
    return (
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built by{" "}
              <span className="font-medium">{siteConfig.author}</span>
            </p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t bg-muted/30">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-full lg:col-span-2">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground max-w-sm">
              {t('tagline')}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              {currentLocale === 'zh'
                ? '🚀 基于 FlashMLA 的新一代 AI 推理模型'
                : '🚀 Next-gen AI reasoning powered by FlashMLA'}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold">
              {currentLocale === 'zh' ? '快速链接' : 'Quick Links'}
            </h3>
            <nav className="flex flex-col gap-2">
              {pageLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold">{t('resources')}</h3>
            <nav className="flex flex-col gap-2">
              {resourceLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label} ↗
                </a>
              ))}
            </nav>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold">{t('legal')}</h3>
            <nav className="flex flex-col gap-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © {new Date().getFullYear()} {siteConfig.name}. Not affiliated with DeepSeek Inc. A project by AI enthusiasts.
          </p>
          <p className="text-center text-sm text-muted-foreground md:text-right">
            Built by <span className="font-medium">{siteConfig.author}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
