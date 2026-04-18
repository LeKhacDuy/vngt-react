import type { Metadata } from 'next';
import TourListing from '@/components/tours/TourListing';
import SubcategoryHero from '@/components/tours/SubcategoryHero';

export const metadata: Metadata = {
  title: 'Tour Mùa Thu 2025 — Lá Đỏ Rực Rỡ',
  description: 'Tour mùa thu 2025: ngắm lá đỏ Nhật Bản, Hàn Quốc, khám phá những hành trình đẹp tươi mùa thu cùng VNGroup Tourist.',
  alternates: { canonical: '/tours/autumn' },
  openGraph: {
    title: 'Tour Mùa Thu 2025 | VNGroup Tourist',
    description: 'Ngắm lá đỏ mùa thu Nhật Bản, Hàn Quốc cùng VNGroup Tourist.',
    url: '/tours/autumn',
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
