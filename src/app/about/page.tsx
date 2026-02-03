import { Card } from "@/components/ui/Card";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">소개</h1>
      </div>

      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-bold text-[var(--color-doge-gold)]">Canis Alpha</h2>
        <p className="text-sm text-[var(--color-text-secondary)]">
          <strong className="text-[var(--color-text-primary)]">카니스 알파 (Canis Alpha)</strong>는
          도지코인을 단순한 밈이 아닌 &apos;분석 가능한 자산&apos;으로 접근하는 분석 대시보드입니다.
        </p>

        <h3 className="font-semibold text-[var(--color-text-primary)] mt-4">어원</h3>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Canis(라틴어: 개) + Alpha(초과수익/근원) &mdash; 도지코인에서 알파를 찾겠다는 의지를 담았습니다.
        </p>

        <h3 className="font-semibold text-[var(--color-text-primary)] mt-4">핵심 가치</h3>
        <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
          <li><strong className="text-[var(--color-text-primary)]">투명성</strong> &mdash; 모든 데이터는 온체인에서 검증 가능</li>
          <li><strong className="text-[var(--color-text-primary)]">접근성</strong> &mdash; 전문 지식 없이도 핵심 지표 이해 가능</li>
          <li><strong className="text-[var(--color-text-primary)]">실용성</strong> &mdash; 투자 의사결정에 실제로 도움되는 정보 제공</li>
          <li><strong className="text-[var(--color-text-primary)]">한국화</strong> &mdash; 김프, 원화 환산 등 한국 투자자 특화 기능</li>
        </ul>

        <h3 className="font-semibold text-[var(--color-text-primary)] mt-4">데이터 소스</h3>
        <ul className="space-y-1 text-sm text-[var(--color-text-secondary)]">
          <li>가격 (글로벌): Binance API</li>
          <li>가격 (한국): Upbit API</li>
          <li>온체인: Blockchair API</li>
          <li>시장 데이터: CoinGecko API</li>
          <li>환율: ExchangeRate API</li>
        </ul>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold text-[var(--color-text-primary)] mb-3">면책 사항</h3>
        <p className="text-sm text-[var(--color-text-secondary)]">
          이 사이트는 정보 제공 목적으로만 운영됩니다. 투자 조언이 아니며,
          암호화폐 투자는 높은 리스크를 수반합니다. 모든 투자 결정은
          본인의 판단과 책임하에 이루어져야 합니다.
        </p>
      </Card>
    </div>
  );
}
