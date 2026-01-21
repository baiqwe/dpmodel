import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Required for Cloudflare Pages deployment
export const runtime = 'edge';

// Initialize OpenAI client
// Supports DeepSeek Official or OpenRouter via environment variables
const openai = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY || "placeholder",
    baseURL: process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com",
});

export async function POST(request: NextRequest) {
    try {
        const { prompt } = await request.json();

        if (!prompt) {
            return NextResponse.json(
                { error: "Prompt is required" },
                { status: 400 }
            );
        }

        if (!process.env.DEEPSEEK_API_KEY) {
            console.error("DEEPSEEK_API_KEY is not set");
            return NextResponse.json(
                { error: "Server configuration error (Missing API Key)" },
                { status: 500 }
            );
        }

        // Call API
        // Defaults to "deepseek-reasoner" (R1) but can be overridden (e.g. "deepseek/deepseek-r1" for OpenRouter)
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: process.env.DEEPSEEK_MODEL || "deepseek-reasoner",
        });

        const content = completion.choices[0].message.content;

        return NextResponse.json({
            result: content,
            usage: completion.usage
        });

    } catch (error: any) {
        console.error("API Error:", error);

        // Handle specific OpenAI errors
        if (error.response) {
            return NextResponse.json(
                { error: error.response.data.error.message || "Provider API Error" },
                { status: error.response.status }
            );
        }

        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
