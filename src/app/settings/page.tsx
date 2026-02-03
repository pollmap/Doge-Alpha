"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useSettingsStore } from "@/store/useSettingsStore";

export default function SettingsPage() {
  const { theme, currency, setTheme, setCurrency } = useSettingsStore();

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">설정</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          대시보드 환경설정을 관리합니다
        </p>
      </div>

      <Card className="p-6 space-y-6">
        {/* Theme */}
        <div>
          <h3 className="font-semibold text-[var(--color-text-primary)] mb-3">테마</h3>
          <div className="flex gap-2">
            <Button
              variant={theme === "dark" ? "primary" : "outline"}
              onClick={() => setTheme("dark")}
            >
              다크
            </Button>
            <Button
              variant={theme === "light" ? "primary" : "outline"}
              onClick={() => setTheme("light")}
            >
              라이트
            </Button>
          </div>
        </div>

        {/* Currency */}
        <div>
          <h3 className="font-semibold text-[var(--color-text-primary)] mb-3">기본 통화</h3>
          <div className="flex gap-2">
            <Button
              variant={currency === "KRW" ? "primary" : "outline"}
              onClick={() => setCurrency("KRW")}
            >
              KRW (원)
            </Button>
            <Button
              variant={currency === "USD" ? "primary" : "outline"}
              onClick={() => setCurrency("USD")}
            >
              USD ($)
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold text-[var(--color-text-primary)] mb-3">정보</h3>
        <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
          <p>Canis Alpha v0.1.0</p>
          <p>도지코인 분석의 정석 - 밈을 넘어 데이터로</p>
          <p>
            <a
              href="https://github.com/pollmap/Canis-Alpha"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-doge-gold)] hover:underline"
            >
              GitHub 저장소
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
}
