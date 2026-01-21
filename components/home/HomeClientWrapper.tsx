'use client';

import { type ReactNode } from 'react';
import { PlaygroundSection } from '@/components/playground';

interface HomeClientWrapperProps {
    staticContent: ReactNode;
    user: any;
}

export default function HomeClientWrapper({ staticContent, user }: HomeClientWrapperProps) {
    return (
        <div className="min-h-screen bg-background">
            {/* Playground Section - 替换原有的 Hero */}
            <PlaygroundSection />

            {/* Static Content - SEO 内容 */}
            {staticContent}
        </div>
    );
}

