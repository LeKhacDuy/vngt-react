import type { Metadata } from 'next';
import LuxuryLandingPage from '@/components/tours/LuxuryLandingPage';

export const metadata: Metadata = {
  title: 'Tour Cao Cấp 5 Sao — Trải Nghiệm Đẳng Cấp',
  description: 'Tour du lịch cao cấp 5 sao: khách sạn sang trọng, dịch vụ VIP, hành trình độc quyền cùng VNGroup Tourist. Đặt tour luxury ngay!',
  alternates: { canonical: '/tours/luxury' },
  openGraph: {
    title: 'Tour Cao Cấp 5 Sao | VNGroup Tourist',
    description: 'Tour luxury 5 sao: khách sạn hạng sang, dịch vụ VIP, hành trình độc quyền.',
    url: '/tours/luxury',
  },
};


export default function LuxuryToursPage() {
    return <LuxuryLandingPage />;
}
