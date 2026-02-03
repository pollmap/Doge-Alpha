"use client";

import { useQuery } from "@tanstack/react-query";
import type { Snapshot } from "@/lib/types";

function getBasePath() {
  return typeof window !== "undefined" && window.location.pathname.startsWith("/Doge-Alpha")
    ? "/Doge-Alpha"
    : "";
}

async function fetchSnapshot(): Promise<Snapshot> {
  const basePath = getBasePath();
  const res = await fetch(`${basePath}/data/snapshots/latest.json`);
  if (!res.ok) throw new Error("Failed to fetch snapshot");
  return res.json();
}

export function useSnapshot() {
  return useQuery({
    queryKey: ["snapshot"],
    queryFn: fetchSnapshot,
    staleTime: 60_000,
    refetchInterval: 60_000,
    retry: 1,
  });
}
