'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import TourCard from '@/components/common/TourCard';
import { ArrowRight, Flame } from 'lucide-react';
import { tourService, getImageUrl } from '@/services/tour.service';

export default function HotToursOfDay() {
    const [promotions, setPromotions] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<string>('all');
    const [allTours, setAllTours] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                // Fetch both APIs in parallel
                const [promosRes, toursRes] = await Promise.all([
                    tourService.getActivePromotions(),
                    tourService.getActivePromotionTours()
                ]);

                if (promosRes?.data) {
                    setPromotions(promosRes.data);
                }

                if (toursRes?.data) {
                    setAllTours(toursRes.data);
                }
            } catch (error) {
                console.error("Failed to fetch hot tours:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPromotions();
    }, []);

    // Format tour for TourCard
    const formatTour = (promoTourItem: any) => {
        const tour = promoTourItem.tour;
        if (!tour) return null;
        
        // Calculate discount percentage
        let discountStr = 'Hot';
        if (tour.web_price && promoTourItem.promo_price < tour.web_price) {
            const percent = Math.round((1 - promoTourItem.promo_price / tour.web_price) * 100);
            discountStr = `-${percent}%`;
        }

        return {
            id: promoTourItem.id.toString(),
            name: tour.name,
            image: getImageUrl(tour.thumbnail),
            price: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(promoTourItem.promo_price),
            originalPrice: tour.web_price ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tour.web_price) : undefined,
            duration: `${tour.duration} Ngày`,
            departure: tour.departure_date || 'Liên hệ',
            discount: discountStr,
            slug: tour.slug || tour.tour_code || tour.id.toString(),
        };
    };

    // Determine which tours to show based on active tab
    let displayTours = [];
    if (activeTab === 'all') {
        displayTours = allTours.map(formatTour).filter(Boolean);
    } else {
        const selectedPromo = promotions.find(p => p.id.toString() === activeTab);
        if (selectedPromo && selectedPromo.promotion_tours) {
            displayTours = selectedPromo.promotion_tours.map(formatTour).filter(Boolean);
        }
    }

    if (isLoading) {
        return (
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-6"></div>
                    <div className="flex gap-4 mb-8">
                        <div className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"></div>
                        <div className="h-10 w-32 bg-gray-200 rounded-full animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-[380px] bg-gray-200 rounded-2xl animate-pulse"></div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (promotions.length === 0 && allTours.length === 0) {
        return null; // Don't show section if no promotions
    }

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                                <Flame className="w-6 h-6 text-red-500" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800">Tour Hot Trong Ngày</h2>
                        </div>
                        <p className="text-gray-600">Săn ngay các ưu đãi đặc biệt với số lượng có hạn</p>
                    </div>
                    <Link href="/promotions" className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-red-500 text-red-500 font-semibold hover:bg-red-500 hover:text-white transition-all">
                        Xem tất cả ưu đãi <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Tabs */}
                {promotions.length > 0 && (
                    <div className="flex overflow-x-auto gap-3 mb-8 pb-2 hide-scrollbar">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`whitespace-nowrap px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                                activeTab === 'all' 
                                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-md' 
                                    : 'bg-white border border-gray-200 text-gray-600 hover:border-red-400 hover:text-red-500 shadow-sm'
                            }`}
                        >
                            Tất cả ưu đãi
                        </button>
                        {promotions.map(promo => (
                            <button
                                key={promo.id}
                                onClick={() => setActiveTab(promo.id.toString())}
                                className={`whitespace-nowrap px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                                    activeTab === promo.id.toString() 
                                        ? 'bg-gradient-to-r from-[#00dba1] to-[#00a878] text-white shadow-md' 
                                        : 'bg-white border border-gray-200 text-gray-600 hover:border-[#00dba1] hover:text-[#00dba1] shadow-sm'
                                }`}
                            >
                                {promo.name}
                            </button>
                        ))}
                    </div>
                )}

                {/* Tour Grid/Slider */}
                {displayTours.length > 0 ? (
                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:overflow-visible md:pb-0 md:mx-0 md:px-0 hide-scrollbar">
                        {displayTours.map((tour: any) => (
                            <div key={tour.id} className="min-w-[85%] sm:min-w-[350px] md:min-w-0 snap-center h-full">
                                <TourCard tour={tour} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        Hiện chưa có tour nào trong mục này. Vui lòng quay lại sau!
                    </div>
                )}
            </div>
        </section>
    );
}
