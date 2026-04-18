import type { Metadata } from 'next';
import TourListing from '@/components/tours/TourListing';
import SubcategoryHero from '@/components/tours/SubcategoryHero';

export const metadata: Metadata = {
  title: 'Tour Lễ Tết 2025 — Nghỉ Lễ Trọn Vẹn',
  description: 'Tour du lịch dịp lễ tết 2025: 30/4, 1/5, Quốc khánh, Tết Nguyên Đán. Đặt sớm để có giá tốt cùng VNGroup Tourist!',
  alternates: { canonical: '/tours/holiday' },
  openGraph: {
    title: 'Tour Lễ Tết 2025 | VNGroup Tourist',
    description: 'Tour lễ tết 30/4, 1/5, Quốc khánh, Tết. Đặt sớm giá tốt!',
    url: '/tours/holiday',
  },
};


export default function HolidayToursPage() {
    return (
        <TourListing
            category="holiday"
            subcategoryCode="holiday"
            title="Tour Lễ 30/4"
            description="Chương trình tour đặc biệt dịp lễ 30/4 - 1/5, tận hưởng kỳ nghỉ dài ngày với giá ưu đãi hấp dẫn."
            introSection={<SubcategoryHero subcategoryKey="holiday" />}
        />
    );
}
