'use client';

import TourListing from '@/components/tours/TourListing';
import SubcategoryHero from '@/components/tours/SubcategoryHero';

export default function SummerToursPage() {
    return (
        <TourListing
            category="summer"
            subcategoryCode="summer"
            title="Tour Mùa Hè"
            description="Những chuyến du lịch mùa hè sôi động, nghỉ dưỡng biển xanh cát trắng và khám phá thiên nhiên tươi đẹp."
            introSection={<SubcategoryHero subcategoryKey="summer" />}
        />
    );
}
