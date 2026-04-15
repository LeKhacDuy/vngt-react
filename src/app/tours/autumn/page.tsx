'use client';

import TourListing from '@/components/tours/TourListing';
import SubcategoryHero from '@/components/tours/SubcategoryHero';

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
