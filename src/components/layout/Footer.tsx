import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--c-border-subtle)]">
      <div className="max-w-[1440px] mx-auto px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[var(--c-text-tertiary)]">
          <div className="flex items-center gap-3">
            <span className="font-medium text-[var(--c-text-secondary)]">DOGE Alpha</span>
            <span className="hidden sm:inline">&middot;</span>
            <span>Binance &middot; Upbit &middot; Blockchair &middot; CoinGecko</span>
          </div>

          <div className="flex items-center gap-4">
            <span>투자 조언이 아닙니다</span>
            <a
              href="https://github.com/pollmap/Doge-Alpha"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[var(--c-text-secondary)] transition-colors"
            >
              <Github className="w-3 h-3" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
