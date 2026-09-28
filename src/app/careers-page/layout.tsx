import type { Metadata } from 'next';
import JsonLd, { breadcrumbSchema } from '@/components/common/JsonLd';

export const metadata: Metadata = {
  title: 'Tuyển Dụng — Gia Nhập Đội Ngũ VNGroup Tourist',
  description:
    'VNGroup Tourist tuyển dụng nhân sự ngành du lịch: hướng dẫn viên, tư vấn tour, marketing, kế toán và nhiều vị trí khác. Môi trường chuyên nghiệp, thu nhập hấp dẫn.',
  alternates: { canonical: '/careers-page' },
  openGraph: {
    title: 'Tuyển Dụng | VNGroup Tourist',
    description: 'Tuyển dụng nhân sự du lịch: HDV, tư vấn tour, marketing. Thu nhập hấp dẫn.',
    url: '/careers-page',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return (
        <>
            <JsonLd data={breadcrumbSchema([
                { name: 'Trang chủ', url: '/' },
                { name: 'Tuyển dụng', url: '/careers-page' },
            ])} />
            {children}
        </>
    );
}
