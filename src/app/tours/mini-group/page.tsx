import type { Metadata } from 'next';
import TourListing from '@/components/tours/TourListing';
import SubcategoryHero from '@/components/tours/SubcategoryHero';

export const metadata: Metadata = {
  title: 'Tour Mini Group — Nhóm Nhỏ Tiện Lợi',
  description: 'Tour mini group dành cho nhóm nhỏ từ 6-15 người. Linh hoạt lịch trình, dịch vụ cá nhân hóa, trải nghiệm sâu hơn cùng VNGroup Tourist.',
  alternates: { canonical: '/tours/mini-group' },
  openGraph: {
    title: 'Tour Mini Group | VNGroup Tourist',
    description: 'Tour nhóm nhỏ 6-15 người. Linh hoạt, cá nhân hóa, trải nghiệm sâu.',
    url: '/tours/mini-group',
  },
};


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
