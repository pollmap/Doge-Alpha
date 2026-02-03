"use client";

import { create } from "zustand";

export type Timeframe = "1H" | "1D" | "7D" | "1M" | "3M" | "1Y" | "ALL";
export type ChartType = "line" | "candle" | "area";

interface DashboardState {
  selectedTimeframe: Timeframe;
  showVolume: boolean;
  chartType: ChartType;

  setTimeframe: (timeframe: Timeframe) => void;
  setShowVolume: (show: boolean) => void;
  setChartType: (type: ChartType) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  selectedTimeframe: "7D",
  showVolume: true,
  chartType: "area",

  setTimeframe: (selectedTimeframe) => set({ selectedTimeframe }),
  setShowVolume: (showVolume) => set({ showVolume }),
  setChartType: (chartType) => set({ chartType }),
}));
