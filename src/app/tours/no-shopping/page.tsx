'use client';

import TourListing from '@/components/tours/TourListing';
import SubcategoryHero from '@/components/tours/SubcategoryHero';

export default function NoShoppingToursPage() {
    return (
        <TourListing
            category="no-shopping"
            subcategoryCode="no-shopping"
            title="Tour No Shop"
            description="Chương trình tour không ghé shop mua sắm, tập trung 100% vào tham quan và trải nghiệm."
            introSection={<SubcategoryHero subcategoryKey="no-shopping" />}
        />
    );
}
