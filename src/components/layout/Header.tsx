"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Link as LinkIcon,
  LineChart,
  Activity,
  Target,
  History,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "./ThemeToggle";

const navigation = [
  { name: "\uB300\uC2DC\uBCF4\uB4DC", href: "/", icon: LayoutDashboard },
  { name: "\uC628\uCCB4\uC778", href: "/onchain", icon: LinkIcon },
  { name: "\uAC00\uCE58\uD3C9\uAC00", href: "/valuation", icon: LineChart },
  { name: "\uBCC0\uB3D9\uC131", href: "/volatility", icon: Activity },
  { name: "\uCC44\uD0DD", href: "/adoption", icon: Target },
  { name: "\uC5ED\uC0AC", href: "/history", icon: History },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-bg)]/80 backdrop-blur-xl border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl group-hover:animate-bounce">{"\u{1F415}"}</span>
            <div className="flex items-baseline">
              <span className="font-bold text-xl text-[var(--color-text-primary)]">Canis</span>
              <span className="font-bold text-xl text-[var(--color-doge-gold)] ml-1">Alpha</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-[var(--color-doge-gold)] text-black"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/settings" className="hidden lg:block">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </Link>
            <button
              className="lg:hidden p-2 text-[var(--color-text-primary)]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[var(--color-border)] bg-[var(--color-bg)]">
          <nav className="px-4 py-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium",
                  isActive(item.href)
                    ? "bg-[var(--color-doge-gold)] text-black"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            ))}
            <Link
              href="/settings"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Settings className="w-5 h-5" />
              설정
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
