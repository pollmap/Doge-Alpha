// ========== 가격 관련 ==========
export interface PriceData {
  usd: number;
  krw: number;
  btc: number;
  change24h: number;
  change7d: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  marketCap: number;
  rank: number;
  timestamp: string;
}

export interface KimchiData {
  premium: number;
  absoluteKrw: number;
  upbitPrice: number;
  binancePrice: number;
  exchangeRate: number;
  timestamp: string;
}

// ========== 온체인 관련 ==========
export interface OnchainData {
  hashrate: number;
  difficulty: number;
  blockHeight: number;
  blockTime: number;
  mempoolSize: number;
  totalAddresses: number;
  activeAddresses24h: number;
  newAddresses24h: number;
  whaleAddresses: number;
  top100Holdings: number;
  transactions24h: number;
  avgTxValue: number;
  totalTransferred24h: number;
  avgFee: number;
  medianFee: number;
  timestamp: string;
}

// ========== 가치 평가 ==========
export interface ValuationData {
  nvt: number;
  nvtSignal: number;
  s2f: number;
  s2fPrice: number;
  mvrv?: number;
  timestamp: string;
}

// ========== 변동성 ==========
export type VolatilityLevel = "very-low" | "low" | "medium" | "high" | "very-high";

export interface VolatilityData {
  dvi7d: number;
  dvi30d: number;
  dvi90d: number;
  btcCorrelation: number;
  level: VolatilityLevel;
  timestamp: string;
}

// ========== 채택 지표 ==========
export interface AdoptionData {
  mai: number;
  components: {
    activeAddressGrowth: number;
    transactionGrowth: number;
    merchantCount: number;
    socialMentions: number;
    devActivity: number;
  };
  timestamp: string;
}

// ========== 이벤트 ==========
export type EventCategory = "milestone" | "elon" | "exchange" | "partnership" | "technical" | "market";
export type EventImpact = "positive" | "negative" | "neutral";

export interface HistoricalEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  category: EventCategory;
  priceAtEvent: number;
  priceChange24h?: number;
  impact: EventImpact;
  sources?: string[];
}

// ========== 스냅샷 ==========
export interface Snapshot {
  timestamp: string;
  price: PriceData;
  kimchi: KimchiData;
  onchain: OnchainData;
  valuation: ValuationData;
  volatility: VolatilityData;
  adoption: AdoptionData;
}

// ========== 히스토리 ==========
export interface PriceHistory {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface OnchainHistory {
  date: string;
  activeAddresses: number;
  transactions: number;
  hashrate: number;
  avgFee: number;
}

// ========== 설정 ==========
export interface Settings {
  theme: "dark" | "light" | "system";
  currency: "KRW" | "USD";
  refreshInterval: number;
  notifications: {
    kimchiAlert: boolean;
    kimchiThreshold: number;
    priceAlert: boolean;
    priceThreshold: number;
  };
}
