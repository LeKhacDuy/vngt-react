'use client';

import TourListing from '@/components/tours/TourListing';
import FeaturedDestinationStrip from '@/components/tours/FeaturedDestinationStrip';

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
