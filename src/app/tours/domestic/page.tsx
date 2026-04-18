import type { Metadata } from 'next';
import TourListing from '@/components/tours/TourListing';

export const metadata: Metadata = {
  title: 'Tour Trong Nước Giá Rẻ Uy Tín 2025',
  description: 'Tour du lịch trong nước: Đà Lạt, Phú Quốc, Hội An, Hạ Long và nhiều điểm đẹp. Dịch vụ tận tâm, giá cạnh tranh từ VNGroup Tourist.',
  alternates: { canonical: '/tours/domestic' },
  openGraph: {
    title: 'Tour Trong Nước Giá Rẻ Uy Tín | VNGroup Tourist',
    description: 'Tour nội địa: Đà Lạt, Phú Quốc, Hội An, Hạ Long. Đặt ngay!',
    url: '/tours/domestic',
  },
};


export default function DomesticToursPage() {
    return <TourListing category="domestic" title="Tour Trong Nước" />;
}
