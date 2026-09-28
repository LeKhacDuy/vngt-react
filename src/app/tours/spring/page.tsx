import type { Metadata } from 'next';
import TourListing from '@/components/tours/TourListing';
import SubcategoryHero from '@/components/tours/SubcategoryHero';

export const metadata: Metadata = {
  title: 'Tour Mùa Xuân — Hành Trình Đầu Năm',
  description: 'Tour du lịch mùa xuân: những điểm đến đẹp nhất mùa hoa nở. Đặt tour mùa xuân ưu đãi cùng VNGroup Tourist ngay hôm nay!',
  alternates: { canonical: '/tours/spring' },
  openGraph: {
    title: 'Tour Mùa Xuân | VNGroup Tourist',
    description: 'Khám phá những hành trình đẹp nhất mùa xuân.',
    url: '/tours/spring',
  },
};


export default function SpringToursPage() {
    return (
        <TourListing
            category="spring"
            subcategoryCode="spring"
            title="Tour Mùa Xuân"
            description="Khám phá vẻ đẹp mùa xuân với những chuyến du lịch tuyệt vời, ngắm hoa nở rộ và tận hưởng không khí lễ hội đầu năm."
            introSection={<SubcategoryHero subcategoryKey="spring" />}
        />
    );
}
