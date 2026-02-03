import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "DOGE Alpha - 도지코인 분석 대시보드",
  description:
    "도지코인 실시간 가격, 김프, 온체인 지표, 변동성 분석. 밈을 넘어 데이터로. 한국어 도지코인 분석의 정석.",
  keywords: ["도지코인", "DOGE", "김프", "암호화폐 분석", "온체인", "dogecoin", "도지"],
  openGraph: {
    title: "DOGE Alpha - 도지코인 분석의 정석",
    description: "밈을 넘어 데이터로. 도지코인 투자자를 위한 분석 대시보드.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DOGE Alpha",
    description: "도지코인 분석 대시보드",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="dark" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
