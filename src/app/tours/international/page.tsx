import type { Metadata } from 'next';
import TourListing from '@/components/tours/TourListing';
import FeaturedDestinationStrip from '@/components/tours/FeaturedDestinationStrip';

export const metadata: Metadata = {
  title: 'Tour Quốc Tế Giá Rẻ Uy Tín 2025',
  description: 'Khám phá tour quốc tế hấp dẫn: Hàn Quốc, Nhật Bản, Thái Lan, Trung Quốc và nhiều điểm đến hơn. Giá tốt, dịch vụ chuyên nghiệp từ VNGroup Tourist.',
  alternates: { canonical: '/tours/international' },
  openGraph: {
    title: 'Tour Quốc Tế Giá Rẻ Uy Tín 2025 | VNGroup Tourist',
    description: 'Tour quốc tế: Hàn Quốc, Nhật Bản, Thái Lan, Trung Quốc. Đặt ngay!',
    url: '/tours/international',
  },
};


const FEATURED_DESTINATIONS = [
    {
        id: 13,
        name: 'Thái Lan',
        emoji: '🇹🇭',
        color: '#1a6fc4',
        accent: '#dbeafe',
    },
    {
        id: 17,
        name: 'Trung Quốc',
        emoji: '🇨🇳',
        color: '#dc2626',
        accent: '#fee2e2',
    },
];

export default function InternationalToursPage() {
    return (
        <TourListing
            category="international"
            title="Tour Quốc Tế"
            introSection={
                <FeaturedDestinationStrip destinations={FEATURED_DESTINATIONS} />
            }
        />
    );
}
