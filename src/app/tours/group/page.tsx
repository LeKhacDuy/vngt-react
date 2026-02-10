'use client';

import TourListing from '@/components/tours/TourListing';
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
