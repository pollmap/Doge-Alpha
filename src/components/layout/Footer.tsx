import { Github, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
            <span>{"\u{1F415}"}</span>
            <span className="font-semibold text-[var(--color-text-primary)]">Canis Alpha</span>
            <span>|</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-[var(--color-doge-gold)] fill-current" /> for DOGE Community
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm text-[var(--color-text-secondary)]">
            <span>도지코인 분석의 정석</span>
            <a
              href="https://github.com/pollmap/Canis-Alpha"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[var(--color-text-primary)] transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-[var(--color-border)] text-xs text-[var(--color-text-secondary)] text-center">
          <p>
            이 사이트는 투자 조언을 제공하지 않습니다. 모든 투자 결정은 본인의 판단하에 이루어져야 합니다.
          </p>
          <p className="mt-1">
            데이터 출처: Binance, Upbit, Blockchair, CoinGecko | 실시간 데이터는 10초마다 갱신됩니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
