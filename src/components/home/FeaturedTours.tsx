'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import TourCard from '@/components/common/TourCard';
import { ArrowRight } from 'lucide-react';
import { tourService, Tour, getImageUrl } from '@/services/tour.service';

export default function FeaturedTours() {
    const [tours, setTours] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTours = async () => {
            try {
                // Fetch HOT tours as per reference code
                const response = await tourService.getHotTours();

                if (response && response.data) {
                    // Ưu tiên hiển thị tour Trung Quốc lên trước
                    const sortedData = [...response.data].sort((a: any, b: any) => {
                        // Lấy thông tin điểm đến (code hoặc name)
                        const aDest = (a.destination?.code || a.destination_code || a.destination?.name || '').toLowerCase();
                        const bDest = (b.destination?.code || b.destination_code || b.destination?.name || '').toLowerCase();
                        
                        // Kiểm tra xem có chứa từ khóa Trung Quốc không
                        const isAChina = aDest.includes('trung quoc') || aDest.includes('trung-quoc') || aDest.includes('trung quốc') || aDest.includes('china');
                        const isBChina = bDest.includes('trung quoc') || bDest.includes('trung-quoc') || bDest.includes('trung quốc') || bDest.includes('china');

                        if (isAChina && !isBChina) return -1;
                        if (!isAChina && isBChina) return 1;
                        return 0;
                    });

                    // Map API data to UI format
                    const mappedTours = sortedData.slice(0, 4).map((item: any) => ({
                        id: item.id.toString(),
                        name: item.name,
                        image: getImageUrl(item.thumbnail), // Use helper
                        price: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.web_price),
                        originalPrice: null,
                        duration: `${item.duration} Ngày`,
                        departure: 'Liên hệ',
                        discount: item.subcategory_code === 'hot' || item.subcategory?.code === 'hot' ? 'Hot' : null,
                        slug: item.slug || item.tour_code,
                        category: item.category?.name || 'Tour nổi bật'
                    }));
                    setTours(mappedTours);
                }
            } catch (error) {
                console.error("Failed to fetch featured tours:", error);
                // Keep mock data or show empty on error? For now, let's leave empty to see if API works
            } finally {
                setIsLoading(false);
            }
        };

        fetchTours();
    }, []);

    // Loading Skeleton
    if (isLoading) {
        return (
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                        <div>
                            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
                            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="h-10 w-32 bg-gray-200 rounded-full animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                                {/* Image placeholder */}
                                <div className="h-[215px] bg-gray-200" />
                                {/* Content */}
                                <div className="p-4">
                                    <div className="h-5 w-full bg-gray-200 rounded mb-2" />
                                    <div className="h-5 w-3/4 bg-gray-200 rounded mb-4" />
                                    <div className="space-y-2 mb-4">
                                        <div className="h-4 w-40 bg-gray-100 rounded" />
                                        <div className="h-4 w-36 bg-gray-100 rounded" />
                                    </div>
                                    <div className="border-t border-gray-100 my-3" />
                                    <div className="flex justify-between items-center">
                                        <div className="h-6 w-28 bg-[#00dba1]/15 rounded" />
                                        <div className="h-9 w-20 bg-[#00dba1]/10 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Tour Nổi Bật</h2>
                        <p className="text-gray-600">Những điểm đến được yêu thích nhất hiện nay</p>
                    </div>

                    <Link href="/tours" className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#00dba1] text-[#00dba1] font-semibold hover:bg-[#00dba1] hover:text-white transition-all">
                        Xem tất cả <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Tour Grid/Slider */}
                {tours.length > 0 ? (
                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:overflow-visible md:pb-0 md:mx-0 md:px-0 hide-scrollbar">
                        {tours.map((tour) => (
                            <div key={tour.id} className="min-w-[85%] sm:min-w-[350px] md:min-w-0 snap-center">
                                <TourCard tour={tour} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 text-gray-500">
                        Hiện chưa có tour nào. Vui lòng quay lại sau!
                    </div>
                )}
            </div>
        </section>
    );
}
