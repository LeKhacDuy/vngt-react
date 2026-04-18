import type { Metadata } from 'next';
import TourListing from '@/components/tours/TourListing';

export const metadata: Metadata = {
  title: 'Tour Đoàn Doanh Nghiệp — MICE & Teambuilding',
  description: 'Tổ chức tour đoàn doanh nghiệp, MICE, teambuilding chuyên nghiệp. VNGroup Tourist có kinh nghiệm phục vụ đoàn từ 20-500 người trên khắp Việt Nam và quốc tế.',
  alternates: { canonical: '/tours/group' },
  openGraph: {
    title: 'Tour Đoàn Doanh Nghiệp | VNGroup Tourist',
    description: 'Tour đoàn, MICE, teambuilding chuyên nghiệp cho doanh nghiệp.',
    url: '/tours/group',
  },
};

import { FilterTab } from '@/components/tours/TourListing';

const groupTabs: FilterTab[] = [
    { id: 'doanh-nghiep', label: 'Tour doanh nghiệp', icon: '🏢' },
    { id: 'gia-dinh', label: 'Tour gia đình', icon: '👨‍👩‍👧‍👦' },
    { id: 'hoi-cho', label: 'Tour hội chợ', icon: '🎪' },
    { id: 'moi-la', label: 'Tour mới lạ', icon: '✨' },
    { id: 'hanh-huong', label: 'Tour hành hương', icon: '🙏' },
    { id: 'hoc-sinh', label: 'Tour học sinh', icon: '🎓' },
];

export default function GroupToursPage() {
    return (
        <TourListing
            category="group"
            title="Tour Đoàn"
            description="Các chương trình du lịch được thiết kế riêng cho đoàn thể, doanh nghiệp và gia đình."
            filterTabs={groupTabs}
        />
    );
}
