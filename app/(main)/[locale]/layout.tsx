import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { Geist } from "next/font/google";
import { SoftwareApplicationSchema } from "@/components/json-ld-schema";
import { GoogleAnalytics } from "@/components/google-analytics";
import { createClient } from "@/utils/supabase/server";
import { siteConfig } from "@/config/site";
import "../../globals.css";

// ✅ 必须添加这一行，让前端页面兼容 Cloudflare Edge
export const runtime = 'edge';

const geistSans = Geist({
    display: "swap",
    subsets: ["latin"],
});

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;
    const messages = await getMessages({ locale }) as any;
    const siteUrl = process.env.NEXT_PUBLIC_APP_URL || siteConfig.url;

    return {
        // ✅ SEO Core
        metadataBase: new URL(siteUrl),

        title: {
            default: messages.metadata.title,
            template: `%s | ${siteConfig.name}`
        },
        description: messages.metadata.description,
        keywords: messages.metadata.keywords,

        // ✅ Author & Site Info
        authors: [{ name: siteConfig.author }],
        creator: siteConfig.author,
        publisher: siteConfig.name,

        // ✅ Open Graph - Next.js will automatically use app/opengraph-image.tsx
        openGraph: {
            title: messages.metadata.title,
            description: messages.metadata.description,
            type: "website",
            locale: locale === 'zh' ? 'zh_CN' : 'en_US',
            url: `${siteUrl}/${locale}`,
            siteName: siteConfig.name,
        },

        // ✅ Twitter Card
        twitter: {
            card: "summary_large_image",
            title: messages.metadata.title,
            description: messages.metadata.description,
        },

        // ✅ Canonical & Alternates
        alternates: {
            canonical: `/${locale}`,
            languages: {
                'en': '/en',
                'zh': '/zh',
                'x-default': '/en',
            },
        },

        // ✅ Robots
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

export default async function LocaleLayout(props: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const params = await props.params;
    const { locale } = params;
    const { children } = props;

    // Validate locale
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    const messages = await getMessages({ locale });

    // 从 Supabase 获取用户认证状态（添加错误处理）
    let user = null;
    try {
        const supabase = await createClient();
        const { data } = await supabase.auth.getUser();
        user = data?.user || null;
    } catch (error) {
        // Supabase 调用失败时，用户状态设为 null，页面仍可正常渲染
        console.error('Failed to get user:', error);
    }

    return (
        <html lang={locale} className={geistSans.className} suppressHydrationWarning>
            <body className="bg-background text-foreground antialiased" suppressHydrationWarning>
                <GoogleAnalytics />
                <SoftwareApplicationSchema locale={locale} />
                <NextIntlClientProvider messages={messages} locale={locale}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <div className="relative min-h-screen flex flex-col">
                            <Header user={user} />
                            <main className="flex-1">{children}</main>
                            <Footer />
                        </div>
                        <Toaster />
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
