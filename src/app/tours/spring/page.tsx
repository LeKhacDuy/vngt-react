'use client';

import TourListing from '@/components/tours/TourListing';
import SubcategoryHero from '@/components/tours/SubcategoryHero';

export default function SpringToursPage() {
    return (
        <TourListing
            category="spring"
            subcategoryCode="spring"
            title="Tour Mùa Xuân"
            description="Khám phá vẻ đẹp mùa xuân với những chuyến du lịch tuyệt vời, ngắm hoa nở rộ và tận hưởng không khí lễ hội đầu năm."
            introSection={<SubcategoryHero subcategoryKey="spring" />}
        />
    );
}
