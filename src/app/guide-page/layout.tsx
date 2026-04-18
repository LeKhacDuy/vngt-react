import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cẩm Nang Du Lịch — Kinh Nghiệm & Bí Kíp',
  description:
    'Cẩm nang du lịch từ VNGroup Tourist: kinh nghiệm du lịch Hàn Quốc, Nhật Bản, Thái Lan, Việt Nam. Bí kíp tiết kiệm, ăn ngon, chơi hết mình!',
  alternates: { canonical: '/guide-page' },
  openGraph: {
    title: 'Cẩm Nang Du Lịch | VNGroup Tourist',
    description: 'Kinh nghiệm du lịch Hàn Quốc, Nhật Bản, Thái Lan, Việt Nam từ chuyên gia.',
    url: '/guide-page',
  },
};

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
