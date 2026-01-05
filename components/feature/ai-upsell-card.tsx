"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function AiUpsellCard({ className }: { className?: string }) {
    return (
        <Card className={`w-full mx-auto border-2 border-primary/20 overflow-hidden bg-gradient-to-r from-primary/5 to-purple-500/5 ${className}`}>
            <CardContent className="p-0 h-full">
                <div className="flex flex-col md:flex-row items-center h-full">
                    {/* Left Content */}
                    <div className="flex-1 p-6 md:p-8 space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                            <Sparkles className="w-4 h-4" />
                            <span>New Feature</span>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                            Not satisfied with the result?
                        </h3>

                        <p className="text-muted-foreground text-lg">
                            Try our new AI Professional Mode. Turn messy photos into perfect coloring pages, sketches, or line art instantly.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center pt-2">
                            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 border-0">
                                <Link href="/create">
                                    Try AI Generator Free
                                </Link>
                            </Button>
                            <p className="text-sm font-medium text-muted-foreground">
                                🎁 New users get <span className="text-primary font-bold">10 credits</span> for free!
                            </p>
                        </div>
                    </div>

                    {/* Right Visual Hook */}
                    <div className="md:w-1/3 h-48 md:h-full min-h-[200px] relative bg-muted/50 flex items-center justify-center border-l border-primary/10">
                        {/* Visual placeholder - replacing with actual GIF when available */}
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/40 font-mono text-sm p-4 text-center">
                            AI Demo Preview
                            (Before -&gt; After)
                        </div>
                        {/*
               TODO: Uncomment when ai-demo.gif is available
               <Image
                 src="/images/ai-demo.gif"
                 alt="AI Transformation Demo"
                 fill
                 className="object-cover"
               /> 
            */}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
