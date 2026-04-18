import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/common/FloatingContact";
import JsonLd, { travelAgencySchema } from "@/components/common/JsonLd";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vngrouptourist.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VNGroup Tourist — Hành Trình Đẳng Cấp, Trải Nghiệm Khác Biệt",
    template: "%s | VNGroup Tourist",
  },
  description:
    "VNGroup Tourist — Công ty du lịch uy tín tại TP.HCM. Chuyên tổ chức tour trong nước, tour quốc tế, tour MICE, dịch vụ visa và vé máy bay. Đặt tour ngay hôm nay!",
  keywords: [
    "du lịch", "tour du lịch", "VNGroup Tourist", "tour quốc tế", "tour trong nước",
    "tour Hàn Quốc", "tour Nhật Bản", "tour Thái Lan", "tour Việt Nam",
    "du lịch TPHCM", "đặt tour online", "công ty du lịch uy tín",
    "tour giá rẻ", "tour cao cấp", "teambuilding", "MICE",
  ],
  authors: [{ name: "VNGroup Tourist", url: siteUrl }],
  creator: "VNGroup Tourist",
  publisher: "VNGroup Tourist",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteUrl,
    siteName: "VNGroup Tourist",
    title: "VNGroup Tourist — Hành Trình Đẳng Cấp, Trải Nghiệm Khác Biệt",
    description:
      "Công ty du lịch uy tín tại TP.HCM. Tour trong nước, quốc tế, MICE, visa và vé máy bay. Đặt tour ngay!",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "VNGroup Tourist — Tour Du Lịch Uy Tín",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VNGroup Tourist — Hành Trình Đẳng Cấp",
    description: "Tour trong nước & quốc tế uy tín. Đặt tour ngay tại VNGroup Tourist!",
    images: ["/images/og-default.jpg"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
    shortcut: "/favicon.png",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.className} suppressHydrationWarning={true}>
        <AuthProvider>
          <LanguageProvider>
            <JsonLd data={travelAgencySchema} />
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
            <FloatingContact />
          </LanguageProvider>
        </AuthProvider>
        <Script src="https://chat-plugin.pancake.vn/main/auto?page_id=web_VNGROUPTOURIST" strategy="lazyOnload" />
      </body>
    </html>
  );
}
