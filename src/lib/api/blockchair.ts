import { API_ENDPOINTS } from "@/lib/utils/constants";

export interface BlockchairStats {
  blocks: number;
  transactions: number;
  outputs: number;
  circulation: number;
  blocks_24h: number;
  transactions_24h: number;
  difficulty: number;
  volume_24h: number;
  mempool_transactions: number;
  mempool_size: number;
  mempool_tps: number;
  best_block_height: number;
  best_block_hash: string;
  best_block_time: string;
  blockchain_size: number;
  average_transaction_fee_24h: number;
  median_transaction_fee_24h: number;
  suggested_transaction_fee_per_byte_sat: number;
  hashrate_24h: string;
  market_price_usd: number;
  market_price_btc: number;
  market_cap_usd: number;
  market_dominance_percentage: number;
}

export async function getDogeStats(): Promise<BlockchairStats> {
  const res = await fetch(`${API_ENDPOINTS.BLOCKCHAIR}/stats`);
  if (!res.ok) throw new Error("Failed to fetch Blockchair stats");
  const json = await res.json();
  return json.data;
}
