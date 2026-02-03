"use client";

import { useQuery } from "@tanstack/react-query";
import { getDogeStats } from "@/lib/api/blockchair";
import type { OnchainData } from "@/lib/types";
import { REFRESH_INTERVALS } from "@/lib/utils/constants";

async function fetchOnchain(): Promise<OnchainData> {
  const stats = await getDogeStats();

  return {
    hashrate: parseFloat(stats.hashrate_24h) || 0,
    difficulty: stats.difficulty,
    blockHeight: stats.best_block_height,
    blockTime: 60,
    mempoolSize: stats.mempool_size,
    totalAddresses: 0,
    activeAddresses24h: 0,
    newAddresses24h: 0,
    whaleAddresses: 0,
    top100Holdings: 0,
    transactions24h: stats.transactions_24h,
    avgTxValue: stats.transactions_24h > 0 ? stats.volume_24h / stats.transactions_24h : 0,
    totalTransferred24h: stats.volume_24h,
    avgFee: stats.average_transaction_fee_24h,
    medianFee: stats.median_transaction_fee_24h,
    timestamp: new Date().toISOString(),
  };
}

export function useOnchain() {
  return useQuery({
    queryKey: ["onchain"],
    queryFn: fetchOnchain,
    refetchInterval: REFRESH_INTERVALS.ONCHAIN,
    staleTime: REFRESH_INTERVALS.ONCHAIN / 2,
    retry: 2,
  });
}
