/**
 * Snapshot fetcher - Run via GitHub Actions cron
 * Collects data from multiple APIs and saves as JSON
 */

import * as fs from "fs";
import * as path from "path";

const API = {
  BINANCE: "https://api.binance.com/api/v3",
  UPBIT: "https://api.upbit.com/v1",
  BLOCKCHAIR: "https://api.blockchair.com/dogecoin",
  COINGECKO: "https://api.coingecko.com/api/v3",
  EXCHANGE_RATE: "https://api.exchangerate-api.com/v4/latest/USD",
};

async function fetchWithRetry(url: string, retries = 3): Promise<any> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.log(`Attempt ${i + 1} failed for ${url}:`, err);
      if (i === retries - 1) throw err;
      await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
    }
  }
}

async function main() {
  const timestamp = new Date().toISOString();
  console.log(`Fetching snapshot at ${timestamp}`);

  try {
    const [binance, binanceBtc, upbit, exchangeData, blockchair, coingecko] = await Promise.all([
      fetchWithRetry(`${API.BINANCE}/ticker/24hr?symbol=DOGEUSDT`),
      fetchWithRetry(`${API.BINANCE}/ticker/24hr?symbol=DOGEBTC`),
      fetchWithRetry(`${API.UPBIT}/ticker?markets=KRW-DOGE`),
      fetchWithRetry(API.EXCHANGE_RATE),
      fetchWithRetry(`${API.BLOCKCHAIR}/stats`),
      fetchWithRetry(`${API.COINGECKO}/coins/markets?vs_currency=usd&ids=dogecoin`),
    ]);

    const usdKrw = exchangeData.rates.KRW;
    const binancePrice = parseFloat(binance.lastPrice);
    const upbitPrice = upbit[0].trade_price;
    const binanceKrw = binancePrice * usdKrw;
    const kimchiPremium = ((upbitPrice - binanceKrw) / binanceKrw) * 100;

    const snapshot = {
      timestamp,
      price: {
        usd: binancePrice,
        krw: upbitPrice,
        btc: parseFloat(binanceBtc.lastPrice),
        change24h: parseFloat(binance.priceChangePercent),
        change7d: coingecko[0]?.price_change_percentage_7d ?? 0,
        high24h: parseFloat(binance.highPrice),
        low24h: parseFloat(binance.lowPrice),
        volume24h: parseFloat(binance.quoteVolume),
        marketCap: coingecko[0]?.market_cap ?? 0,
        rank: coingecko[0]?.market_cap_rank ?? 0,
      },
      kimchi: {
        premium: kimchiPremium,
        absoluteKrw: upbitPrice - binanceKrw,
        upbitPrice,
        binancePrice,
        exchangeRate: usdKrw,
        timestamp,
      },
      onchain: {
        hashrate: parseFloat(blockchair.data.hashrate_24h) || 0,
        difficulty: blockchair.data.difficulty,
        blockHeight: blockchair.data.best_block_height,
        blockTime: 60,
        mempoolSize: blockchair.data.mempool_size,
        totalAddresses: 0,
        activeAddresses24h: 0,
        newAddresses24h: 0,
        whaleAddresses: 0,
        top100Holdings: 0,
        transactions24h: blockchair.data.transactions_24h,
        avgTxValue:
          blockchair.data.transactions_24h > 0
            ? blockchair.data.volume_24h / blockchair.data.transactions_24h
            : 0,
        totalTransferred24h: blockchair.data.volume_24h,
        avgFee: blockchair.data.average_transaction_fee_24h,
        medianFee: blockchair.data.median_transaction_fee_24h,
        timestamp,
      },
      valuation: {
        nvt:
          blockchair.data.volume_24h > 0
            ? blockchair.data.market_cap_usd / (blockchair.data.volume_24h * binancePrice)
            : 0,
        nvtSignal: 0,
        s2f: 0,
        s2fPrice: 0,
        timestamp,
      },
      volatility: {
        dvi7d: 0,
        dvi30d: 0,
        dvi90d: 0,
        btcCorrelation: 0,
        level: "medium" as const,
        timestamp,
      },
      adoption: {
        mai: 45,
        components: {
          activeAddressGrowth: 0,
          transactionGrowth: 0,
          merchantCount: 25,
          socialMentions: 50,
          devActivity: 60,
        },
        timestamp,
      },
    };

    const dataDir = path.join(process.cwd(), "public", "data", "snapshots");
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

    fs.writeFileSync(path.join(dataDir, "latest.json"), JSON.stringify(snapshot, null, 2));

    const dateStr = timestamp.split("T")[0];
    fs.writeFileSync(path.join(dataDir, `${dateStr}.json`), JSON.stringify(snapshot, null, 2));

    console.log(`Saved: $${snapshot.price.usd} / ₩${snapshot.price.krw} | Kimchi: ${kimchiPremium.toFixed(2)}%`);
  } catch (err) {
    console.error("Snapshot fetch failed:", err);
    process.exit(1);
  }
}

main();
