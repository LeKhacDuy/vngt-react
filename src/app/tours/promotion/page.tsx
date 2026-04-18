import type { Metadata } from 'next';
import TourListing from '@/components/tours/TourListing';

export const metadata: Metadata = {
  title: 'Tour Khuyến Mãi — Ưu Đãi Hấp Dẫn',
  description: 'Săn ngay tour du lịch khuyến mãi giá sốc từ VNGroup Tourist. Tour trong nước và quốc tế với ưu đãi đặc biệt, giảm giá lên đến 30%.',
  alternates: { canonical: '/tours/promotion' },
  openGraph: {
    title: 'Tour Khuyến Mãi Giá Sốc | VNGroup Tourist',
    description: 'Tour khuyến mãi giảm đến 30%. Đặt ngay kẻo hết!',
    url: '/tours/promotion',
  },
};

import SubcategoryHero from '@/components/tours/SubcategoryHero';

export default function PromotionToursPage() {
    return (
        <TourListing
            category="promotion"
            subcategoryCode="promotion"
            title="Tour Khuyến Mãi"
            description="Tổng hợp các tour du lịch đang có chương trình khuyến mãi, giảm giá đặc biệt. Đặt ngay kẻo lỡ!"
            introSection={<SubcategoryHero subcategoryKey="promotion" />}
        />
    );
}
