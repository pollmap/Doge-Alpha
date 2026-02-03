"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Settings } from "@/lib/types";

interface SettingsState extends Settings {
  setTheme: (theme: Settings["theme"]) => void;
  setCurrency: (currency: Settings["currency"]) => void;
  setRefreshInterval: (interval: number) => void;
  setNotifications: (notifications: Partial<Settings["notifications"]>) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: "dark",
      currency: "KRW",
      refreshInterval: 10,
      notifications: {
        kimchiAlert: false,
        kimchiThreshold: 3,
        priceAlert: false,
        priceThreshold: 5,
      },

      setTheme: (theme) => set({ theme }),
      setCurrency: (currency) => set({ currency }),
      setRefreshInterval: (refreshInterval) => set({ refreshInterval }),
      setNotifications: (notifications) =>
        set((state) => ({
          notifications: { ...state.notifications, ...notifications },
        })),
    }),
    { name: "canis-alpha-settings" }
  )
);
