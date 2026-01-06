"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function AiUpsellCard({ className }: { className?: string }) {
    return (
        <Card className={`w-full mx-auto border-2 border-primary/20 overflow-hidden bg-gradient-to-r from-primary/5 to-purple-500/5 ${className}`}>
            <CardContent className="p-3 md:p-4">
                <div className="flex flex-col gap-3">
                    {/* Top: Comparison Image - 突出显示 */}
                    <div className="w-full relative aspect-[3/1.2] rounded-md overflow-hidden border bg-white">
                        <Image
                            src="/images/ai-comparison.png"
                            alt="质量对比：原图 vs 基础版 vs AI专业版"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Bottom: Content & CTA - 紧凑排列 */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="flex items-center gap-3 text-center sm:text-left">
                            <div className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium shrink-0">
                                <Sparkles className="w-3 h-3" />
                                <span>AI Pro</span>
                            </div>
                            <p className="text-sm font-medium text-foreground">
                                对细节不满意？试试 <span className="text-primary">AI 专业版</span>，连贯线条一键生成
                            </p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                            <Button asChild size="sm" className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 border-0">
                                <Link href="/create">
                                    免费试用 AI
                                </Link>
                            </Button>
                            <p className="text-xs text-muted-foreground whitespace-nowrap">
                                🎁 送 <span className="text-primary font-bold">30</span> 积分
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

