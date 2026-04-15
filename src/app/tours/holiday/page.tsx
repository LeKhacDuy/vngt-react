'use client';

import TourListing from '@/components/tours/TourListing';
import SubcategoryHero from '@/components/tours/SubcategoryHero';

export default function HolidayToursPage() {
    return (
        <TourListing
            category="holiday"
            subcategoryCode="holiday"
            title="Tour Lễ 30/4"
            description="Chương trình tour đặc biệt dịp lễ 30/4 - 1/5, tận hưởng kỳ nghỉ dài ngày với giá ưu đãi hấp dẫn."
            introSection={<SubcategoryHero subcategoryKey="holiday" />}
        />
    );
}
