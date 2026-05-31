'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { tourService, getImageUrl } from '@/services/tour.service';
import { Flame, Tag, Copy, Check, Clock, MapPin } from 'lucide-react';
import TourCard from '@/components/common/TourCard';

export default function PromotionsPage() {
    const [promotions, setPromotions] = useState<any[]>([]);
    const [allTours, setAllTours] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDestination, setSelectedDestination] = useState('');
    const [selectedPromotion, setSelectedPromotion] = useState('all');
    const [priceSort, setPriceSort] = useState('price_asc');

    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const [promosRes, toursRes] = await Promise.all([
                    tourService.getActivePromotions(),
                    tourService.getActivePromotionTours()
                ]);

                if (promosRes?.data) setPromotions(promosRes.data);
                if (toursRes?.data) setAllTours(toursRes.data);
            } catch (error) {
                console.error("Failed to fetch promotion tours:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPromotions();
    }, []);

    const formatTour = (promoTourItem: any) => {
        const tour = promoTourItem.tour;
        if (!tour) return null;
        
        let discountStr = 'Khuyến mãi';
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
            rawPrice: promoTourItem.promo_price,
            duration: `${tour.duration} Ngày`,
            departure: tour.departure_date || 'Liên hệ',
            discount: discountStr,
            slug: tour.slug || tour.tour_code || tour.id.toString(),
            destination_code: tour.destination_code || tour.destination?.code || '',
            destination: tour.destination?.name || '',
        };
    };

    // Determine which tours to show based on selected promotion
    let sourceTours = [];
    if (selectedPromotion === 'all') {
        sourceTours = allTours.map(formatTour).filter(Boolean);
    } else {
        const selectedPromo = promotions.find(p => p.id.toString() === selectedPromotion);
        if (selectedPromo && selectedPromo.promotion_tours) {
            sourceTours = selectedPromo.promotion_tours.map(formatTour).filter(Boolean);
        }
    }

    // Client-side Filter & Sort
    const filteredTours = sourceTours.filter((tour: any) => {
        if (selectedDestination && !tour.name?.toLowerCase().includes(selectedDestination.toLowerCase()) && tour.destination_code !== selectedDestination) return false;
        return true;
    }).sort((a: any, b: any) => {
        const priceA = a.rawPrice || 0;
        const priceB = b.rawPrice || 0;
        return priceSort === 'price_asc' ? priceA - priceB : priceB - priceA;
    });

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Header */}
            <section className="bg-gradient-to-br from-[#00dba1]/10 via-white to-[#00dba1]/5 py-16 border-b border-gray-100">
                <div className="container mx-auto px-4">
                    <nav className="text-sm text-gray-600 mb-6">
                        <Link href="/" className="hover:text-[#00dba1] transition-colors">Trang chủ</Link>
                        <span className="mx-2">/</span>
                        <span className="text-[#00dba1] font-semibold">Chương trình khuyến mãi</span>
                    </nav>
                    <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-4">
                        Chương Trình <span className="text-[#00dba1]">Khuyến Mãi</span>
                    </h1>
                </div>
            </section>

            {/* Tours Listing */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                                Danh sách Tour Khuyến Mãi
                            </h2>
                            <p className="text-gray-600">Tìm thấy {filteredTours.length} tour đang giảm giá</p>
                        </div>

                        <div className="flex flex-wrap gap-4 w-full md:w-auto">
                            <select
                                value={selectedPromotion}
                                onChange={(e) => setSelectedPromotion(e.target.value)}
                                className="px-5 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00dba1] focus:border-transparent flex-1 md:flex-none min-w-[200px]"
                            >
                                <option value="all">Tất cả chương trình</option>
                                {promotions.map(promo => (
                                    <option key={promo.id} value={promo.id.toString()}>{promo.name}</option>
                                ))}
                            </select>

                            <select
                                value={selectedDestination}
                                onChange={(e) => setSelectedDestination(e.target.value)}
                                className="px-5 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00dba1] focus:border-transparent flex-1 md:flex-none"
                            >
                                <option value="">Tất cả điểm đến</option>
                                <option value="đà nẵng">Đà Nẵng</option>
                                <option value="nha trang">Nha Trang</option>
                                <option value="phú quốc">Phú Quốc</option>
                                <option value="thái lan">Thái Lan</option>
                                <option value="hàn quốc">Hàn Quốc</option>
                                <option value="trung quốc">Trung Quốc</option>
                                <option value="nhật bản">Nhật Bản</option>
                            </select>

                            <select
                                value={priceSort}
                                onChange={(e) => setPriceSort(e.target.value)}
                                className="px-5 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00dba1] focus:border-transparent flex-1 md:flex-none"
                            >
                                <option value="price_asc">Giá: Thấp đến cao</option>
                                <option value="price_desc">Giá: Cao đến thấp</option>
                            </select>
                        </div>
                    </div>

                    {/* Tours Grid */}
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00dba1]"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {filteredTours.map((tour: any) => (
                                <TourCard key={tour.id} tour={tour} />
                            ))}
                        </div>
                    )}

                    {!loading && filteredTours.length === 0 && (
                        <div className="text-center py-20 text-gray-500 bg-white rounded-2xl border border-dashed border-gray-200">
                            Không tìm thấy tour nào phù hợp với bộ lọc hiện tại.
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-[#00dba1] to-[#00a878] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
                        Đừng bỏ lỡ ưu đãi hấp dẫn! 🎁
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Đăng ký nhận thông tin về các chương trình khuyến mãi mới nhất từ VNGroup Tourist
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
                        <input
                            type="email"
                            placeholder="Nhập email của bạn..."
                            className="flex-1 px-6 py-4 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                        <button className="px-8 py-4 bg-white text-[#00a878] font-bold rounded-xl hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all">
                            Đăng ký
                        </button>
                    </div>
                </div>
            </section>

        </div>
    );
}
