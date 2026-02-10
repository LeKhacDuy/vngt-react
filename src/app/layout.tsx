import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/common/FloatingContact";
import TetDecorations from "@/components/common/TetDecorations";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "VNGROUP TOURIST - Hành trình đẳng cấp",
  description: "Trải nghiệm du lịch khác biệt cùng VNGROUP TOURIST",
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
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
            <FloatingContact />
            <TetDecorations />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
