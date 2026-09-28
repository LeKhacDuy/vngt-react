import type { Metadata } from 'next';
import JsonLd, { breadcrumbSchema } from '@/components/common/JsonLd';

export const metadata: Metadata = {
  title: 'Cẩm Nang Du Lịch — Kinh Nghiệm & Bí Kíp',
  description:
    'Cẩm nang du lịch từ VNGroup Tourist: kinh nghiệm du lịch Hàn Quốc, Nhật Bản, Thái Lan, Việt Nam. Bí kíp tiết kiệm, ăn ngon, chơi hết mình!',
  alternates: { canonical: '/guide-page' },
  openGraph: {
    title: 'Cẩm Nang Du Lịch | VNGroup Tourist',
    description: 'Kinh nghiệm du lịch Hàn Quốc, Nhật Bản, Thái Lan, Việt Nam từ chuyên gia.',
    url: '/guide-page',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
};

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return (
        <>
            <JsonLd data={breadcrumbSchema([
                { name: 'Trang chủ', url: '/' },
                { name: 'Cẩm nang du lịch', url: '/guide-page' },
            ])} />
            {children}
        </>
    );
}
