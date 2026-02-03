"use client";

import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useSettingsStore } from "@/store/useSettingsStore";

export default function SettingsPage() {
  const { theme, currency, setTheme, setCurrency } = useSettingsStore();

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-6 space-y-6 animate-fade-in">
      {/* Title */}
      <div>
        <h1 className="text-sm font-semibold text-[var(--c-text-primary)]">설정</h1>
        <p className="text-[11px] text-[var(--c-text-tertiary)] mt-1">
          대시보드 환경설정을 관리합니다
        </p>
      </div>

      {/* Theme */}
      <Card variant="default">
        <CardHeader>
          <span className="text-sm font-semibold text-[var(--c-text-primary)]">테마</span>
        </CardHeader>
        <CardBody>
          <div className="flex gap-2">
            <Button
              variant={theme === "dark" ? "primary" : "secondary"}
              size="md"
              onClick={() => setTheme("dark")}
            >
              다크
            </Button>
            <Button
              variant={theme === "light" ? "primary" : "secondary"}
              size="md"
              onClick={() => setTheme("light")}
            >
              라이트
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Currency */}
      <Card variant="default">
        <CardHeader>
          <span className="text-sm font-semibold text-[var(--c-text-primary)]">기본 통화</span>
        </CardHeader>
        <CardBody>
          <div className="flex gap-2">
            <Button
              variant={currency === "KRW" ? "primary" : "secondary"}
              size="md"
              onClick={() => setCurrency("KRW")}
            >
              KRW (원)
            </Button>
            <Button
              variant={currency === "USD" ? "primary" : "secondary"}
              size="md"
              onClick={() => setCurrency("USD")}
            >
              USD ($)
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Info */}
      <Card variant="default">
        <CardHeader>
          <span className="text-sm font-semibold text-[var(--c-text-primary)]">정보</span>
        </CardHeader>
        <CardBody>
          <div className="space-y-2">
            <p className="text-[11px] text-[var(--c-text-secondary)]">DOGE Alpha v0.1.0</p>
            <p className="text-[11px] text-[var(--c-text-tertiary)]">
              도지코인 분석의 정석 - 밈을 넘어 데이터로
            </p>
            <p>
              <a
                href="https://github.com/pollmap/Doge-Alpha"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[var(--c-gold)] hover:underline"
              >
                GitHub 저장소
              </a>
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
