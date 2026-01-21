import { getTranslations } from 'next-intl/server';
import { Check, X, Brain, Zap, DollarSign, Unlock, BarChart3, Globe } from 'lucide-react';

interface HomeStaticContentProps {
    locale: string;
}

export default async function HomeStaticContent({ locale }: HomeStaticContentProps) {
    const t = await getTranslations({ locale, namespace: 'features' });
    const tFaq = await getTranslations({ locale, namespace: 'faq' });
    const tCta = await getTranslations({ locale, namespace: 'cta' });
    const tComparison = await getTranslations({ locale, namespace: 'comparison' });

    const features = [
        { icon: Brain, title: t('feature_1_title'), desc: t('feature_1_desc') },
        { icon: Zap, title: t('feature_2_title'), desc: t('feature_2_desc') },
        { icon: DollarSign, title: t('feature_3_title'), desc: t('feature_3_desc') },
        { icon: Unlock, title: t('feature_4_title'), desc: t('feature_4_desc') },
        { icon: BarChart3, title: t('feature_5_title'), desc: t('feature_5_desc') },
        { icon: Globe, title: t('feature_6_title'), desc: t('feature_6_desc') },
    ];

    const comparisonData = [
        { name: tComparison('features.math_500'), model1: "97.3%", gpt4: "94.1%", o1: "96.4%", highlight: true },
        { name: tComparison('features.humaneval'), model1: "92.1%", gpt4: "88.4%", o1: "90.2%", highlight: false },
        { name: tComparison('features.mmlu'), model1: "91.8%", gpt4: "90.2%", o1: "92.0%", highlight: false },
        { name: tComparison('features.context_window'), model1: "128K", gpt4: "128K", o1: "200K", highlight: false },
        { name: tComparison('features.open_source'), model1: true, gpt4: false, o1: false, highlight: true },
        { name: tComparison('features.api_cost'), model1: "$0.14", gpt4: "$30.00", o1: "$15.00", highlight: true },
        { name: tComparison('features.flashmla'), model1: true, gpt4: false, o1: false, highlight: false },
        { name: tComparison('features.reasoning'), model1: true, gpt4: true, o1: true, highlight: false },
    ];

    const faqs = [
        { q: tFaq('q1'), a: tFaq('a1') },
        { q: tFaq('q2'), a: tFaq('a2') },
        { q: tFaq('q3'), a: tFaq('a3') },
        { q: tFaq('q4'), a: tFaq('a4') },
        { q: tFaq('q5'), a: tFaq('a5') },
    ];

    const renderValue = (value: string | boolean) => {
        if (typeof value === "boolean") {
            return value ? (
                <Check className="w-5 h-5 text-green-500" />
            ) : (
                <X className="w-5 h-5 text-red-400/60" />
            );
        }
        return <span className="font-mono">{value}</span>;
    };

    return (
        <>
            {/* Features Section */}
            <section className="py-20 bg-muted/20" id="features">
                <div className="container px-4 max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">{t('subtitle')}</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="glass-panel rounded-2xl p-6 hover:shadow-lg transition-shadow">
                                <div className="text-3xl mb-4">{feature.title.split(' ')[0]}</div>
                                <h3 className="text-lg font-semibold mb-2">{feature.title.slice(2)}</h3>
                                <p className="text-muted-foreground text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Table Section */}
            <section className="py-20" id="comparison">
                <div className="container px-4 max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            <span className="text-gradient">{tComparison('title')}</span>
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">{tComparison('subtitle')}</p>
                    </div>

                    <div className="glass-panel rounded-2xl overflow-hidden shadow-lg">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                                            {tComparison('feature')}
                                        </th>
                                        <th className="px-6 py-4 text-center">
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="text-primary font-semibold">DeepSeek Model1</span>
                                                <span className="text-xs text-muted-foreground">R1 / V3</span>
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-center">
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="text-foreground font-medium">GPT-4</span>
                                                <span className="text-xs text-muted-foreground">Turbo</span>
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-center">
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="text-foreground font-medium">OpenAI o1</span>
                                                <span className="text-xs text-muted-foreground">Preview</span>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparisonData.map((row, index) => (
                                        <tr
                                            key={index}
                                            className={`border-b border-border/50 ${row.highlight ? 'bg-primary/5' : ''}`}
                                        >
                                            <td className="px-6 py-4 text-sm text-foreground">{row.name}</td>
                                            <td className="px-6 py-4 text-center text-primary font-medium">
                                                <div className="flex justify-center">{renderValue(row.model1)}</div>
                                            </td>
                                            <td className="px-6 py-4 text-center text-muted-foreground">
                                                <div className="flex justify-center">{renderValue(row.gpt4)}</div>
                                            </td>
                                            <td className="px-6 py-4 text-center text-muted-foreground">
                                                <div className="flex justify-center">{renderValue(row.o1)}</div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <p className="text-center text-xs text-muted-foreground mt-4">{tComparison('benchmark_note')}</p>
                </div>
            </section>

            {/* FAQ Section with Schema */}
            <section className="py-20 bg-muted/20" id="faq">
                <div className="container px-4 max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">{tFaq('title')}</h2>
                        <p className="text-muted-foreground">{tFaq('subtitle')}</p>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="glass-panel rounded-xl p-6">
                                <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                                <p className="text-muted-foreground">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ Schema for SEO */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": faqs.map(faq => ({
                                "@type": "Question",
                                "name": faq.q,
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": faq.a
                                }
                            }))
                        })
                    }}
                />
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{tCta('title')}</h2>
                    <p className="text-muted-foreground mb-8">{tCta('subtitle')}</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="#playground"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                        >
                            🚀 {tCta('button_start')}
                        </a>
                        <a
                            href="https://platform.deepseek.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
                        >
                            📡 {tCta('button_api')}
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
