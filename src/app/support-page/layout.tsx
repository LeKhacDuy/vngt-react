import type { Metadata } from 'next';
import JsonLd, { breadcrumbSchema } from '@/components/common/JsonLd';

export const metadata: Metadata = {
  title: 'Hỗ Trợ Khách Hàng — VNGroup Tourist',
  description:
    'Trung tâm hỗ trợ khách hàng VNGroup Tourist. Giải đáp thắc mắc về tour, đặt chỗ, hủy tour, hoàn tiền và các vấn đề liên quan. Hỗ trợ 24/7.',
  alternates: { canonical: '/support-page' },
  openGraph: {
    title: 'Hỗ Trợ Khách Hàng | VNGroup Tourist',
    description: 'Hỗ trợ 24/7 — Giải đáp tour, đặt chỗ, hủy và hoàn tiền.',
    url: '/support-page',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
};

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return (
        <>
            <JsonLd data={breadcrumbSchema([
                { name: 'Trang chủ', url: '/' },
                { name: 'Hỗ trợ khách hàng', url: '/support-page' },
            ])} />
            {children}
        </>
    );
}
