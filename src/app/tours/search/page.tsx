'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import TourListing from '@/components/tours/TourListing';

function SearchContent() {
    const searchParams = useSearchParams();
    // Use destinationId (number-based) for correct filtering
    const destinationId = searchParams.get('destinationId') || '';
    const destinationName = searchParams.get('destinationName') || '';
    const date = searchParams.get('date') || '';

    const title = destinationName ? `Tour đến ${destinationName}` : 'Tìm kiếm tour';
    const description = date
        ? `Ngày khởi hành: ${new Date(date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}`
        : undefined;

    return (
        <TourListing
            category="all"
            title={title}
            description={description}
            initialDestinationCode={destinationId}
        />
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00dba1]" />
            </div>
        }>
            <SearchContent />
        </Suspense>
    );
}
