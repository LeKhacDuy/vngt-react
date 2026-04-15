'use client';

import TourListing from '@/components/tours/TourListing';
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
