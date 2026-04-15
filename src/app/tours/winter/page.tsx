'use client';

import TourListing from '@/components/tours/TourListing';
import SubcategoryHero from '@/components/tours/SubcategoryHero';

export default function WinterToursPage() {
    return (
        <TourListing
            category="winter"
            subcategoryCode="winter"
            title="Tour Mùa Đông"
            description="Khám phá mùa đông với những chuyến du lịch ngắm tuyết, suối nước nóng và trải nghiệm văn hóa độc đáo."
            introSection={<SubcategoryHero subcategoryKey="winter" />}
        />
    );
}
