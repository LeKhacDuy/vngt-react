import type { Metadata } from 'next';
import TourListing from '@/components/tours/TourListing';
import SubcategoryHero from '@/components/tours/SubcategoryHero';

export const metadata: Metadata = {
  title: 'Tour Mùa Thu — Lá Đỏ Rực Rỡ',
  description: 'Tour mùa thu: ngắm lá đỏ Nhật Bản, Hàn Quốc, khám phá những hành trình đẹp tươi mùa thu cùng VNGroup Tourist.',
  alternates: { canonical: '/tours/autumn' },
  openGraph: {
    title: 'Tour Mùa Thu | VNGroup Tourist',
    description: 'Ngắm lá đỏ mùa thu Nhật Bản, Hàn Quốc cùng VNGroup Tourist.',
    url: '/tours/autumn',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
};


export default function AutumnToursPage() {
    return (
        <TourListing
            category="autumn"
            subcategoryCode="autumn"
            title="Tour Mùa Thu"
            description="Tận hưởng vẻ đẹp lãng mạn của mùa thu với lá vàng rơi, thời tiết mát mẻ và những điểm đến thơ mộng."
            introSection={<SubcategoryHero subcategoryKey="autumn" />}
        />
    );
}
