"use client";

import { useEffect, useState } from "react";
import { Activity, Cpu, Gauge, Zap, Server, Clock } from "lucide-react";

interface StatsPanelProps {
    isGenerating: boolean;
}

const StatsPanel = ({ isGenerating }: StatsPanelProps) => {
    const [stats, setStats] = useState({
        tokensPerSec: 0,
        latency: 0,
        gpuMemory: 0,
        activeExperts: 0,
        contextUsed: 0,
        queuePosition: 1,
    });

    useEffect(() => {
        if (isGenerating) {
            const interval = setInterval(() => {
                setStats({
                    tokensPerSec: Math.floor(450 + Math.random() * 100),
                    latency: Math.floor(15 + Math.random() * 10),
                    gpuMemory: Math.floor(65 + Math.random() * 15),
                    activeExperts: Math.floor(6 + Math.random() * 3),
                    contextUsed: Math.floor(2000 + Math.random() * 500),
                    queuePosition: 1,
                });
            }, 200);
            return () => clearInterval(interval);
        } else {
            setStats({
                tokensPerSec: 0,
                latency: 0,
                gpuMemory: 0,
                activeExperts: 0,
                contextUsed: 0,
                queuePosition: 1,
            });
        }
    }, [isGenerating]);

    const statItems = [
        {
            icon: Zap,
            label: "Token Speed",
            value: isGenerating ? `${stats.tokensPerSec}` : "—",
            unit: "tok/s",
            color: "text-primary",
        },
        {
            icon: Clock,
            label: "Latency",
            value: isGenerating ? `${stats.latency}` : "—",
            unit: "ms",
            color: "text-green-400",
        },
        {
            icon: Cpu,
            label: "GPU Memory",
            value: isGenerating ? `${stats.gpuMemory}` : "—",
            unit: "%",
            color: "text-yellow-400",
        },
        {
            icon: Activity,
            label: "Active Experts",
            value: isGenerating ? `${stats.activeExperts}/8` : "—",
            unit: "MoE",
            color: "text-purple-400",
        },
        {
            icon: Server,
            label: "Context Used",
            value: isGenerating ? `${(stats.contextUsed / 1000).toFixed(1)}K` : "—",
            unit: "/ 128K",
            color: "text-blue-400",
        },
        {
            icon: Gauge,
            label: "Queue Position",
            value: `#${stats.queuePosition}`,
            unit: "",
            color: "text-primary",
        },
    ];

    return (
        <div className="glass-panel rounded-xl p-6 h-full">
            <div className="flex items-center gap-2 mb-6">
                <div className={`w-2 h-2 rounded-full ${isGenerating ? 'bg-green-500 animate-pulse' : 'bg-muted-foreground'}`} />
                <span className="text-sm font-medium text-foreground">
                    {isGenerating ? 'Processing' : 'Ready'}
                </span>
                <span className="text-xs text-muted-foreground ml-auto font-mono">
                    FlashMLA v2.1
                </span>
            </div>

            <div className="space-y-5">
                {statItems.map((item, index) => (
                    <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <item.icon className="w-4 h-4" />
                                <span className="text-xs">{item.label}</span>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className={`font-mono text-lg font-semibold ${item.color}`}>
                                    {item.value}
                                </span>
                                <span className="text-xs text-muted-foreground">{item.unit}</span>
                            </div>
                        </div>
                        <div className="h-1 bg-muted rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-300 ${isGenerating ? 'bg-gradient-to-r from-primary to-purple-500' : 'bg-muted'
                                    }`}
                                style={{
                                    width: isGenerating ? `${Math.min(95, 30 + Math.random() * 60)}%` : '0%'
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Model info */}
            <div className="mt-8 pt-6 border-t border-border/50 space-y-3">
                <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Model</span>
                    <span className="text-foreground font-mono">deepseek-model1-r1</span>
                </div>
                <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Parameters</span>
                    <span className="text-foreground font-mono">671B (37B active)</span>
                </div>
                <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Architecture</span>
                    <span className="text-foreground font-mono">MoE + FlashMLA</span>
                </div>
            </div>
        </div>
    );
};

export default StatsPanel;
