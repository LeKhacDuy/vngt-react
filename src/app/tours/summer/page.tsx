import type { Metadata } from 'next';
import TourListing from '@/components/tours/TourListing';
import SubcategoryHero from '@/components/tours/SubcategoryHero';

export const metadata: Metadata = {
  title: 'Tour Mùa Hè — Biển Đảo Hấp Dẫn',
  description: 'Tour mùa hè: biển Phú Quốc, Nử Hoàng, Đà Nẵng, Quỳnh Nhơn và nhiều hơn. Nghỉ hè vui vẽ cùng gia đình cùng VNGroup Tourist.',
  alternates: { canonical: '/tours/summer' },
  openGraph: {
    title: 'Tour Mùa Hè | VNGroup Tourist',
    description: 'Tour biển đảo mùa hè: Phú Quốc, Nỿ Hoàng, Đà Nẵng. Đặt ngay!',
    url: '/tours/summer',
  },
};


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
