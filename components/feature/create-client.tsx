"use client";

import { useState, useEffect } from "react";
import { useCredits } from "@/hooks/use-credits";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, Wand2 } from "lucide-react";
import ImageUploader from "@/components/feature/image-uploader";
import Image from "next/image";
import { QuickRefillModal } from "@/components/payment/quick-refill-modal";
import { useToast } from "@/hooks/use-toast";
import confetti from "canvas-confetti"; // Make sure to install this package

const STYLES = [
    {
        id: "coloring-page",
        name: "Coloring Page",
        description: "Thick lines, white background, print-ready.",
        icon: "🎨"
    },
    {
        id: "sketch",
        name: "Sketch",
        description: "Artistic pencil sketch style.",
        icon: "✏️"
    },
    {
        id: "line-art",
        name: "Line Art",
        description: "Detailed, fine line illustration.",
        icon: "🖋️"
    }
];

const SIZE_OPTIONS = [
    { id: "a4", name: "A4", desc: "210×297mm", icon: "📄" },
    { id: "letter", name: "Letter", desc: "8.5×11in", icon: "📝" },
    { id: "square", name: "Square", desc: "1:1 ratio", icon: "⬜" },
    { id: "a3", name: "A3", desc: "297×420mm", icon: "📰" },
];

export default function CreateClient({ user }: { user: any }) {
    const { credits, spendCredits, refetchCredits } = useCredits();
    const { toast } = useToast();

    const [prompt, setPrompt] = useState("");
    const [selectedStyle, setSelectedStyle] = useState(STYLES[0].id);
    const [selectedSize, setSelectedSize] = useState(SIZE_OPTIONS[0].id);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [resultImage, setResultImage] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Payment Modal State
    const [isRefillModalOpen, setIsRefillModalOpen] = useState(false);

    // Initial load logic: check for payment success
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        if (query.get("checkout") === "success") {
            // Restore state if available
            const savedState = localStorage.getItem("pending_generation");
            if (savedState) {
                try {
                    const parsed = JSON.parse(savedState);
                    setUploadedImage(parsed.uploadedImage);
                    setPrompt(parsed.prompt);
                    setSelectedStyle(parsed.selectedStyle);
                    setSelectedSize(parsed.selectedSize);

                    // Clear state
                    localStorage.removeItem("pending_generation");

                    // Show celebration
                    confetti({
                        particleCount: 150,
                        spread: 70,
                        origin: { y: 0.6 }
                    });

                    toast({
                        title: "Payment Successful!",
                        description: "Credits added. Resuming your masterpiece...",
                        className: "bg-green-500 text-white border-none"
                    });

                    // Auto-trigger generation after a short delay to allow credits to update
                    setTimeout(() => {
                        handleGenerate(true); // Force run
                    }, 1000);
                } catch (e) {
                    console.error("Failed to restore state", e);
                }
            } else {
                toast({
                    title: "Welcome Back!",
                    description: "Your credits have been topped up.",
                });
            }

            // Refetch credits to ensure UI is up to date
            refetchCredits();

            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []);

    const handleImageSelect = (imageSrc: string) => {
        setUploadedImage(imageSrc);
        setResultImage(null);
        setError(null);
    };

    const saveStateForRefill = () => {
        localStorage.setItem("pending_generation", JSON.stringify({
            uploadedImage,
            prompt,
            selectedStyle,
            selectedSize
        }));
    };

    const handleGenerate = async (force = false) => {
        if (!uploadedImage) return;

        if (!user) {
            window.location.href = "/sign-in";
            return;
        }

        // Check local credits first (unless forced)
        if (!force && credits && credits.remaining_credits < 10) {
            saveStateForRefill();
            setIsRefillModalOpen(true);
            return;
        }

        setIsGenerating(true);
        setError(null);

        try {
            console.log("Calling generation API...");

            const response = await fetch("/api/ai/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    image: uploadedImage,
                    prompt: prompt,
                    style: selectedStyle,
                    size: selectedSize,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();

                // Intercept 402 Insufficient Funds
                if (response.status === 402) {
                    saveStateForRefill();
                    setIsRefillModalOpen(true);
                    return; // Stop execution
                }

                const errorMsg = errorData.details
                    ? `${errorData.error}: ${errorData.details}`
                    : (errorData.error || "Generation failed");
                throw new Error(errorMsg);
            }

            const data = await response.json();
            console.log("Generation success:", data);

            if (data.url) {
                setResultImage(data.url);
                await refetchCredits();
            } else {
                throw new Error("No image returned from server");
            }

        } catch (err: any) {
            console.error("Generation error:", err);
            // Don't show error if we opened the modal
            if (!isRefillModalOpen) {
                setError(err instanceof Error ? err.message : "Failed to generate");
            }
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="container py-8 px-4 max-w-7xl mx-auto">
            <QuickRefillModal
                isOpen={isRefillModalOpen}
                onClose={() => setIsRefillModalOpen(false)}
            />

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Left Column: Settings */}
                <div className="space-y-8">
                    <div className="space-y-6">
                        {/* Header with Navigation */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold tracking-tight mb-2">✨ AI Studio</h1>
                                    <p className="text-muted-foreground">
                                        Transform your photos into professional coloring pages and sketches.
                                    </p>
                                </div>
                            </div>

                            {/* Secondary Menu (Tools) */}
                            <div className="flex items-center gap-2 border-b overflow-x-auto pb-1">
                                <Button variant="ghost" className="text-primary border-b-2 border-primary rounded-none px-4 hover:bg-transparent">
                                    Image to Sketch
                                </Button>
                                <Button variant="ghost" className="text-muted-foreground rounded-none px-4 hover:text-foreground">
                                    Text to Image
                                </Button>
                                <Button variant="ghost" className="text-muted-foreground rounded-none px-4 hover:text-foreground">
                                    Style Transfer
                                </Button>
                                <Button variant="ghost" className="text-muted-foreground rounded-none px-4 hover:text-foreground">
                                    My Gallery
                                </Button>
                            </div>

                            {/* Tertiary Menu (Sub-options/Filters) */}
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span className="bg-muted px-2 py-1 rounded cursor-pointer hover:bg-muted/80 text-foreground font-medium">All Styles</span>
                                <span className="px-2 py-1 rounded cursor-pointer hover:bg-muted/50">bw-lineart</span>
                                <span className="px-2 py-1 rounded cursor-pointer hover:bg-muted/50">concept-art</span>
                                <span className="px-2 py-1 rounded cursor-pointer hover:bg-muted/50">character-design</span>
                            </div>
                        </div>
                    </div>

                    {/* Style Selector */}
                    <Card className="p-6 space-y-4">
                        <h3 className="font-semibold text-lg">1. Choose Style</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {STYLES.map((style) => (
                                <button
                                    key={style.id}
                                    onClick={() => setSelectedStyle(style.id)}
                                    className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${selectedStyle === style.id
                                        ? "border-primary bg-primary/5"
                                        : "border-muted hover:border-primary/50"
                                        }`}
                                >
                                    <span className="text-2xl mb-2">{style.icon}</span>
                                    <span className="font-medium text-sm">{style.name}</span>
                                </button>
                            ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {STYLES.find(s => s.id === selectedStyle)?.description}
                        </p>
                    </Card>

                    {/* Size Selector */}
                    <Card className="p-6 space-y-4">
                        <h3 className="font-semibold text-lg">1.5 Choose Size</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {SIZE_OPTIONS.map((size) => (
                                <button
                                    key={size.id}
                                    onClick={() => setSelectedSize(size.id)}
                                    className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${selectedSize === size.id
                                        ? "border-primary bg-primary/5"
                                        : "border-muted hover:border-primary/50"
                                        }`}
                                >
                                    <span className="text-xl mb-1">{size.icon}</span>
                                    <span className="font-medium text-sm">{size.name}</span>
                                    <span className="text-xs text-muted-foreground">{size.desc}</span>
                                </button>
                            ))}
                        </div>
                    </Card>

                    {/* Prompt Input */}
                    <Card className="p-6 space-y-4">
                        <h3 className="font-semibold text-lg">2. Describe (Optional)</h3>
                        <Textarea
                            placeholder="E.g., clean lines, cute cartoon style, detailed background..."
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="min-h-[100px]"
                        />
                    </Card>

                    {/* Credits & Action */}
                    <div className="flex flex-col gap-4">
                        {user ? (
                            <div className="flex items-center justify-between bg-muted/50 p-4 rounded-lg">
                                <span className="text-muted-foreground">Your Balance:</span>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-xl">{credits?.remaining_credits ?? 0}</span>
                                    <span className="text-sm text-muted-foreground">credits</span>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-primary/10 p-4 rounded-lg text-sm text-primary flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                New users get 30 free credits!
                            </div>
                        )}

                        <Button
                            size="lg"
                            className="w-full text-lg h-14 relative overflow-hidden group"
                            onClick={() => handleGenerate()}
                            disabled={!uploadedImage || isGenerating}
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Wand2 className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                                    Generate (10 Credits)
                                </>
                            )}
                        </Button>

                        {error && (
                            <p className="text-destructive text-sm text-center font-medium">{error}</p>
                        )}
                    </div>
                </div>

                {/* Right Column: Preview */}
                <div className="space-y-8">
                    <Card className="p-6 min-h-[600px] flex flex-col">
                        <h3 className="font-semibold text-lg mb-4">Preview</h3>

                        {/* Upload or Result Area */}
                        <div className="flex-1 flex flex-col gap-6">
                            {!uploadedImage ? (
                                <div className="flex-1 flex items-center justify-center">
                                    <ImageUploader onImageSelect={handleImageSelect} />
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {/* Original */}
                                    <div className="relative aspect-video w-full rounded-lg overflow-hidden border bg-muted/50 group">
                                        {uploadedImage && typeof uploadedImage === 'string' && (
                                            <Image
                                                src={uploadedImage}
                                                alt="Original"
                                                fill
                                                className="object-contain"
                                            />
                                        )}
                                        <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 text-xs rounded">Original</div>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={() => {
                                                setUploadedImage(null);
                                                setResultImage(null);
                                            }}
                                        >
                                            Change Image
                                        </Button>
                                    </div>

                                    {/* Arrow */}
                                    <div className="flex justify-center">
                                        <span className="text-2xl text-muted-foreground">⬇️</span>
                                    </div>

                                    {/* Result */}
                                    <div className="relative aspect-video w-full rounded-lg overflow-hidden border-2 border-primary/20 bg-muted/20 min-h-[300px] flex items-center justify-center">
                                        {resultImage && typeof resultImage === 'string' ? (
                                            <Image
                                                src={resultImage}
                                                alt="Generated Result"
                                                fill
                                                className="object-contain"
                                            />
                                        ) : isGenerating ? (
                                            <div className="flex flex-col items-center gap-4 text-muted-foreground">
                                                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                                                <span>Designing your masterpiece...</span>
                                            </div>
                                        ) : (
                                            <div className="text-muted-foreground text-sm text-center p-8">
                                                Click "Generate" to create your masterpiece
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

