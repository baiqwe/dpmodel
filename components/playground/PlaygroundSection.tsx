"use client";

import { useState, useEffect } from "react";
import { Send, Loader2, Sparkles, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatsPanel from "./StatsPanel";

const examplePrompts = [
    "Explain the concept of FlashMLA and how it accelerates inference...",
    "Write a Python function to implement binary search with O(log n)...",
    "What are the key differences between transformer architectures...",
    "Solve this step by step: If a train travels 120km in 2 hours...",
];

const PlaygroundSection = () => {
    const [prompt, setPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [response, setResponse] = useState("");
    const [showBlur, setShowBlur] = useState(false);
    const [currentExample, setCurrentExample] = useState(0);

    // Rotate example prompts
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentExample((prev) => (prev + 1) % examplePrompts.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = async () => {
        if (!prompt.trim()) return;

        setIsGenerating(true);
        setResponse("");
        setShowBlur(false);

        // Simulated streaming response
        const sampleResponse = `Based on your query about "${prompt.slice(0, 50)}...", here's my analysis:

**Understanding the Core Concept**

DeepSeek Model1 leverages advanced reasoning capabilities through its innovative FlashMLA (Multi-head Latent Attention) architecture. This allows for:

1. **Faster Inference**: Up to 3x speedup compared to standard attention mechanisms
2. **Memory Efficiency**: Reduced KV cache requirements through latent compression
3. **Scalable Context**: Support for 128K token context windows

**Technical Implementation**

The model utilizes a mixture-of-experts (MoE) architecture with 671B total parameters, where only 37B are activated per token. This sparse activation pattern enables:

\`\`\`python
def flash_mla_attention(query, key, value, latent_dim=512):
    # Compress KV pairs into latent space
    latent_k = linear_proj(key, latent_dim)
    latent_v = linear_proj(value, latent_dim)
    
    # Compute attention in compressed space
    attn_weights = softmax(query @ latent_k.T / sqrt(d))
    output = attn_weights @ latent_v
    
    return output
\`\`\`

**Performance Metrics**

| Benchmark | Model1 Score | GPT-4 Score |
|-----------|-------------|-------------|
| MATH-500  | 97.3%       | 94.1%       |
| HumanEval | 92.1%       | 88.4%       |
| MMLU      | 91.8%       | 90.2%       |

The reasoning capabilities extend beyond simple...`;

        // Stream the response character by character
        for (let i = 0; i < sampleResponse.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, 8));
            setResponse(sampleResponse.slice(0, i + 1));

            // Show blur after certain point
            if (i > 600) {
                setShowBlur(true);
                break;
            }
        }

        setIsGenerating(false);
    };

    const handleReset = () => {
        setPrompt("");
        setResponse("");
        setShowBlur(false);
    };

    return (
        <section className="relative px-4 py-16" id="playground">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main playground area */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Input area */}
                        <div className="glass-panel rounded-2xl p-6 shadow-lg">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-3 h-3 rounded-full bg-destructive/80" />
                                <div className="w-3 h-3 rounded-full bg-primary/60" />
                                <div className="w-3 h-3 rounded-full bg-accent/60" />
                                <span className="ml-2 text-sm text-muted-foreground font-mono">model1-playground.deepseek</span>
                            </div>

                            <div className="relative">
                                <textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder={examplePrompts[currentExample]}
                                    className="w-full h-32 bg-background border border-border rounded-xl p-4 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none font-mono text-sm"
                                    disabled={isGenerating}
                                />
                                <div className="absolute bottom-4 right-4 flex gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={handleReset}
                                        className="text-muted-foreground hover:text-foreground"
                                    >
                                        <RotateCcw className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={!prompt.trim() || isGenerating}
                                        className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                                    >
                                        {isGenerating ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Send className="w-4 h-4" />
                                        )}
                                        Run
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Output area */}
                        <div className="glass-panel rounded-2xl p-6 min-h-[400px] relative overflow-hidden shadow-lg">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-primary" />
                                    <span className="text-sm font-medium text-foreground">Model1 Response</span>
                                </div>
                                {isGenerating && (
                                    <div className="flex items-center gap-2 text-primary text-sm">
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                        Generating...
                                    </div>
                                )}
                            </div>

                            <div className="relative">
                                <div className={`font-mono text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed ${showBlur ? 'max-h-[300px] overflow-hidden' : ''}`}>
                                    {response || (
                                        <span className="text-muted-foreground italic">
                                            Enter a prompt above and click &quot;Run&quot; to test DeepSeek Model1...
                                        </span>
                                    )}
                                    <span className={`inline-block w-2 h-4 bg-primary ml-1 ${isGenerating ? 'animate-shimmer' : 'opacity-0'}`} />
                                </div>

                                {/* Blur overlay for premium upsell */}
                                {showBlur && (
                                    <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-card via-card/95 to-transparent flex items-end justify-center pb-8">
                                        <div className="text-center space-y-4">
                                            <p className="text-sm text-muted-foreground">
                                                High traffic on Model1 nodes. Verify to continue.
                                            </p>
                                            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 shadow-lg">
                                                <Sparkles className="w-4 h-4" />
                                                Continue with Full Access
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Stats panel */}
                    <div className="lg:col-span-1">
                        <StatsPanel isGenerating={isGenerating} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PlaygroundSection;
