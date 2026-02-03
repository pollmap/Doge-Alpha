export const API_ENDPOINTS = {
  BINANCE: "https://api.binance.com/api/v3",
  UPBIT: "https://api.upbit.com/v1",
  BLOCKCHAIR: "https://api.blockchair.com/dogecoin",
  COINGECKO: "https://api.coingecko.com/api/v3",
  EXCHANGE_RATE: "https://api.exchangerate-api.com/v4/latest/USD",
} as const;

export const REFRESH_INTERVALS = {
  PRICE: 10_000,
  KIMCHI: 10_000,
  ONCHAIN: 300_000,
  VALUATION: 3_600_000,
} as const;

export const VOLATILITY_LEVELS = {
  "very-low": { max: 20, label: "매우 낮음", color: "#238636" },
  low: { max: 40, label: "낮음", color: "#3fb950" },
  medium: { max: 60, label: "보통", color: "#d29922" },
  high: { max: 80, label: "높음", color: "#f85149" },
  "very-high": { max: 100, label: "매우 높음", color: "#da3633" },
} as const;

export const NVT_LEVELS = {
  undervalued: { max: 20, label: "저평가", color: "#238636" },
  fair: { max: 50, label: "적정", color: "#d29922" },
  overvalued: { max: Infinity, label: "고평가", color: "#da3633" },
} as const;

export const EVENT_CATEGORIES = {
  milestone: { label: "마일스톤", color: "#8b5cf6", icon: "trophy" },
  elon: { label: "일론 머스크", color: "#3b82f6", icon: "rocket" },
  exchange: { label: "거래소", color: "#10b981", icon: "arrow-left-right" },
  partnership: { label: "파트너십", color: "#f59e0b", icon: "handshake" },
  technical: { label: "기술", color: "#6366f1", icon: "settings" },
  market: { label: "시장", color: "#ef4444", icon: "trending-up" },
} as const;

export const CHART_COLORS = {
  primary: "#c2a633",
  secondary: "#8b949e",
  positive: "#238636",
  negative: "#da3633",
  grid: "#21262d",
  background: "#161b22",
} as const;

export const DOGE_ANNUAL_ISSUANCE = 5_256_000_000;
export const DOGE_BLOCK_REWARD = 10_000;
export const DOGE_BLOCK_TIME_SECONDS = 60;
