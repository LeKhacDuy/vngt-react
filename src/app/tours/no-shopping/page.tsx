import type { Metadata } from 'next';
import TourListing from '@/components/tours/TourListing';
import SubcategoryHero from '@/components/tours/SubcategoryHero';

export const metadata: Metadata = {
  title: 'Tour Không Mua Sắm — Trải Nghiệm Thuần Túy',
  description: 'Tour du lịch không bị kéo vào cửa hàng mua sắm. Tận hưởng hành trình thuần túy, khám phá văn hóa chất lượng cùng VNGroup Tourist.',
  alternates: { canonical: '/tours/no-shopping' },
  openGraph: {
    title: 'Tour Không Mua Sắm | VNGroup Tourist',
    description: 'Tour thuần túy không dừng cửa hàng. Khám phá văn hóa đích thực.',
    url: '/tours/no-shopping',
  },
};


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
