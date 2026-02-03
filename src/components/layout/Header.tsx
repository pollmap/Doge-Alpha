"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Link2,
  LineChart,
  Activity,
  Target,
  Clock,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { ThemeToggle } from "./ThemeToggle";

const NAV = [
  { name: "대시보드", href: "/", icon: LayoutDashboard },
  { name: "온체인", href: "/onchain", icon: Link2 },
  { name: "가치평가", href: "/valuation", icon: LineChart },
  { name: "변동성", href: "/volatility", icon: Activity },
  { name: "채택", href: "/adoption", icon: Target },
  { name: "역사", href: "/history", icon: Clock },
] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[var(--c-bg-secondary)]/80 backdrop-blur-xl border-b border-[var(--c-border-subtle)]">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <span className="text-lg leading-none">&#x1F415;</span>
            <span className="text-[15px] font-semibold tracking-tight text-[var(--c-text-primary)]">
              DOGE<span className="text-[var(--c-gold)]"> Alpha</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5 ml-8">
            {NAV.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded text-[13px] font-medium transition-colors duration-150",
                    active
                      ? "text-[var(--c-gold)] bg-[var(--c-gold-bg)]"
                      : "text-[var(--c-text-tertiary)] hover:text-[var(--c-text-secondary)] hover:bg-[var(--c-bg-hover)]"
                  )}
                >
                  <item.icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              className="lg:hidden p-2 rounded text-[var(--c-text-secondary)] hover:text-[var(--c-text-primary)] hover:bg-[var(--c-bg-hover)] transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="메뉴"
            >
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="lg:hidden border-t border-[var(--c-border-subtle)] bg-[var(--c-bg-secondary)] animate-fade-in">
          <nav className="px-4 py-2 space-y-0.5">
            {NAV.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2.5 rounded text-[13px] font-medium transition-colors",
                    active
                      ? "text-[var(--c-gold)] bg-[var(--c-gold-bg)]"
                      : "text-[var(--c-text-tertiary)] hover:bg-[var(--c-bg-hover)]"
                  )}
                  onClick={() => setOpen(false)}
                >
                  <item.icon className="w-4 h-4" strokeWidth={1.75} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
