'use client';

import TourListing from '@/components/tours/TourListing';
import SubcategoryHero from '@/components/tours/SubcategoryHero';

export default function MiniGroupToursPage() {
    return (
        <TourListing
            category="mini-group"
            subcategoryCode="mini-group"
            title="Tour Mini Group"
            description="Tour nhóm nhỏ từ 4-15 người, trải nghiệm riêng tư và chất lượng dịch vụ cao cấp."
            introSection={<SubcategoryHero subcategoryKey="mini-group" />}
        />
    );
}
