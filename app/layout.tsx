import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "이원테크",
  description: "산업 전자제작 OEM/ODM 개발·생산 파트너",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-white text-neutral-900">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}