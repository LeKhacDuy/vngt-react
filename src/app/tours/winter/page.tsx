import type { Metadata } from 'next';
import TourListing from '@/components/tours/TourListing';
import SubcategoryHero from '@/components/tours/SubcategoryHero';

export const metadata: Metadata = {
  title: 'Tour Mùa Đông 2025 — Khám Phá Xứ Tuyết',
  description: 'Tour mùa đông 2025: khám phá xứ tuyết Đông Âu, Hàn Quốc, Nhật Bản. Trải nghiệm mùa đông kỳ diệu cùng VNGroup Tourist.',
  alternates: { canonical: '/tours/winter' },
  openGraph: {
    title: 'Tour Mùa Đông 2025 | VNGroup Tourist',
    description: 'Khám phá xứ tuyết Đông Âu, Hàn Quốc, Nhật Bản mùa đông.',
    url: '/tours/winter',
  },
};


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
