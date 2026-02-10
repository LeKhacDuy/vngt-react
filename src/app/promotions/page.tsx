'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { tourService, Tour, getImageUrl } from '@/services/tour.service'; // Added service
import { activePromotions, coupons } from '@/data/promotions'; // Keep mock coupons for now
import CountdownTimer from '@/components/common/CountdownTimer';
import { Flame, Tag, Copy, Check, Clock, MapPin, Calendar } from 'lucide-react';

export default function PromotionsPage() {
    const [promotionTours, setPromotionTours] = useState<Tour[]>([]); // State for tours
    const [loading, setLoading] = useState(true);
    const [copiedCode, setCopiedCode] = useState<string | null>(null);
    const [selectedDestination, setSelectedDestination] = useState('');
    const [priceSort, setPriceSort] = useState('price_asc');

    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const response = await tourService.getPromotionTours();
                if (response && response.data) {
                    setPromotionTours(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch promotion tours:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPromotions();
    }, []);

    // Client-side Filter & Sort
    const filteredTours = promotionTours.filter(tour => {
        if (selectedDestination && tour.destination !== selectedDestination && tour.destination_code !== selectedDestination) return false;
        return true;
    }).sort((a, b) => {
        const priceA = a.web_price || 0;
        const priceB = b.web_price || 0;
        return priceSort === 'price_asc' ? priceA - priceB : priceB - priceA;
    });

    const copyToClipboard = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    const flashSale = activePromotions.find(p => p.isFlashSale);

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Header */}
            <section className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-16 border-b border-gray-100">
                <div className="container mx-auto px-4">
                    <nav className="text-sm text-gray-600 mb-6">
                        <Link href="/" className="hover:text-gray-900">Trang chủ</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900 font-semibold">Khuyến Mãi</span>
                    </nav>
                    <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-4">
                        Tour Khuyến Mãi
                    </h1>
                </div>
            </section>

            {/* Flash Sale Banner with Countdown */}
            {flashSale && (
                <section className="py-12 bg-gradient-to-r from-red-600 via-orange-600 to-red-600 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300 rounded-full blur-3xl animate-pulse"></div>
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-red-900 rounded-full font-bold mb-4 animate-bounce">
                                <Flame className="w-5 h-5" />
                                FLASH SALE
                            </div>
                            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-3">
                                {flashSale.title}
                            </h2>
                            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                                {flashSale.description}
                            </p>

                            <CountdownTimer endDate={flashSale.endDate} />
                        </div>
                    </div>
                </section>
            )}

            {/* Coupon Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                            Mã giảm giá hot 🎟️
                        </h2>
                        <p className="text-xl text-gray-600">Nhấn để copy mã và sử dụng ngay khi đặt tour</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {coupons.map((coupon) => (
                            <div key={coupon.id} className="group relative bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border-2 border-dashed border-orange-200 hover:border-orange-400 hover:shadow-xl transition-all duration-300">
                                <div className="absolute top-4 right-4">
                                    <Tag className="w-6 h-6 text-orange-500" />
                                </div>

                                <div className="mb-4">
                                    <div className="text-sm text-orange-600 font-semibold mb-1">{coupon.title}</div>
                                    <div className="text-3xl font-bold text-gray-900 mb-2">{coupon.discount}</div>
                                    <p className="text-sm text-gray-600">{coupon.description}</p>
                                </div>

                                <div className="mb-4 pt-4 border-t border-orange-200">
                                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                                        <Clock className="w-3 h-3" />
                                        <span>HSD: {new Date(coupon.validUntil).toLocaleDateString('vi-VN')}</span>
                                    </div>
                                    {coupon.minSpend !== undefined && coupon.minSpend > 0 && (
                                        <div className="text-xs text-gray-500">
                                            Đơn tối thiểu: {formatPrice(coupon.minSpend)}
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={() => copyToClipboard(coupon.code)}
                                    className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    {copiedCode === coupon.code ? (
                                        <>
                                            <Check className="w-4 h-4" />
                                            Đã copy!
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-4 h-4" />
                                            {coupon.code}
                                        </>
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
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

                        <div className="flex flex-wrap gap-4">
                            <select
                                value={selectedDestination}
                                onChange={(e) => setSelectedDestination(e.target.value)}
                                className="px-5 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            >
                                <option value="">Tất cả điểm đến</option>
                                {/* TODO: Populate dynamically from API destinations if possible */}
                                <option value="DN">Đà Nẵng</option>
                                <option value="NT">Nha Trang</option>
                                <option value="PQ">Phú Quốc</option>
                            </select>

                            <select
                                value={priceSort}
                                onChange={(e) => setPriceSort(e.target.value)}
                                className="px-5 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            >
                                <option value="price_asc">Giá: Thấp đến cao</option>
                                <option value="price_desc">Giá: Cao đến thấp</option>
                            </select>
                        </div>
                    </div>

                    {/* Tours Grid */}
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {filteredTours.map((tour) => (
                                <Link
                                    key={tour.id}
                                    href={`/tours/${tour.tour_code || tour.id}`}
                                    className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                                >
                                    {/* Image */}
                                    <div className="relative h-56 overflow-hidden">
                                        <Image
                                            src={getImageUrl(tour.thumbnail)}
                                            alt={tour.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />

                                        {/* Discount Badge */}
                                        <div className="absolute top-4 left-4 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-full shadow-lg flex items-center gap-1 animate-pulse">
                                            <Flame className="w-4 h-4" />
                                            Hot Deal
                                        </div>

                                        {/* Category Badge */}
                                        <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700">
                                            {/* tour.category_id mapping could go here */}
                                            Tour
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 min-h-[56px] group-hover:text-orange-600 transition-colors">
                                            {tour.name}
                                        </h3>

                                        <div className="space-y-2 mb-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-orange-500" />
                                                <span>{tour.duration} Ngày</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-orange-500" />
                                                <span>Khởi hành: Liên hệ</span>
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="flex items-end justify-between pt-4 border-t border-gray-100">
                                            <div>
                                                {/* Original price not in API yet, use mock logic or hide */}
                                                <div className="text-2xl font-bold text-orange-600">{formatPrice(tour.web_price)}</div>
                                            </div>
                                            <div className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg group-hover:bg-orange-600 transition-colors text-sm">
                                                Xem ngay
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Load More */}
                    {!loading && filteredTours.length > 8 && (
                        <div className="text-center mt-12">
                            <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                Xem thêm tour khuyến mãi
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 relative overflow-hidden">
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
                        <button className="px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all">
                            Đăng ký
                        </button>
                    </div>
                </div>
            </section>

        </div>
    );
}
