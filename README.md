# Canis Alpha

**도지코인 분석의 정석 - 밈을 넘어 데이터로**

Canis Alpha는 도지코인을 단순한 밈이 아닌 '분석 가능한 자산'으로 접근하는 한국어 분석 대시보드입니다.

## Features

- **실시간 가격** - Binance/Upbit 실시간 가격, 24h 변동률
- **김프/역프 계산** - 업비트-바이낸스 프리미엄 실시간 표시
- **온체인 분석** - 해시레이트, 트랜잭션, 지갑 분석
- **가치 평가** - NVT, Stock-to-Flow 밸류에이션 모델
- **변동성 지수** - DVI (Doge Volatility Index)
- **채택 지표** - Mass Adoption Index (MAI)
- **이벤트 타임라인** - 주요 이벤트와 가격 영향 분석

## Tech Stack

- **Framework**: Next.js 16 (App Router, Static Export)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **State**: Zustand
- **Data Fetching**: TanStack Query
- **Deploy**: GitHub Pages

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Data Sources

| Data | Source |
|------|--------|
| Price (Global) | Binance API |
| Price (Korea) | Upbit API |
| On-chain | Blockchair API |
| Market Data | CoinGecko API |
| Exchange Rate | ExchangeRate API |

## Deploy

Automatically deployed to GitHub Pages on push to `main` via GitHub Actions.

## License

MIT
