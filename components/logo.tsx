"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

export function Logo() {
  const pathname = usePathname();
  const currentLocale = pathname?.split('/')[1] || 'en';
  const localePrefix = `/${currentLocale}`;

  return (
    <Link
      href={localePrefix}
      className="flex items-center gap-2 hover:opacity-90 transition-opacity"
    >
      <div className="relative w-8 h-8 flex items-center justify-center bg-primary rounded-lg overflow-hidden">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-5 h-5 text-primary-foreground"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            className="opacity-50"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4"
          />
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
            fill="currentColor"
            className="hidden"
          />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 21v-3" />
          <path d="M12 3v3" />
          <path d="M3 12h3" />
          <path d="M21 12h-3" />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/20" />
      </div>
      <span className="font-bold text-lg bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
        {siteConfig.name}
      </span>
    </Link>
  );
}

