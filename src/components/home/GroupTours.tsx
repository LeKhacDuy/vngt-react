'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { tourService, Tour, getImageUrl } from '@/services/tour.service';

export default function GroupTours() {
    const [tours, setTours] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await tourService.getGroupTours();
                if (response && response.data) {
                    const mappedTours = response.data.slice(0, 4).map((item: Tour) => ({
                        id: item.id.toString(),
                        name: item.name,
                        image: getImageUrl(item.thumbnail),
                        price: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.web_price),
                        originalPrice: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.web_price * 1.2), // Mock original price
                        duration: `${item.duration} Ngày`,
                        departure: 'Theo yêu cầu',
                        discount: 'Hot',
                        slug: item.slug || item.tour_code || item.id
                    }));
                    setTours(mappedTours);
                }
            } catch (error) {
                console.error("Failed to fetch group tours:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchTours();
    }, []);

    if (isLoading) {
        return (
            <section className="py-20 bg-[#0f172a] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#00dba1]/10 blur-[100px]"></div>
                    <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10 animate-pulse">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                        <div>
                            <div className="h-4 w-40 bg-white/10 rounded mb-3" />
                            <div className="h-10 w-72 bg-white/10 rounded-lg mb-2" />
                            <div className="h-5 w-96 bg-white/5 rounded" />
                        </div>
                        <div className="h-12 w-48 bg-[#00dba1]/20 rounded-full" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-[400px] rounded-3xl bg-white/5 border border-white/10" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (tours.length === 0) return null;

    return (
        <section className="py-20 lg:py-28 bg-gradient-to-br from-[#090d16] via-[#0f172a] to-[#070a10] relative overflow-hidden">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[55%] h-[55%] rounded-full bg-[#00dba1]/8 blur-[100px] animate-pulse duration-[6000ms]"></div>
                <div className="absolute top-[40%] -right-[10%] w-[45%] h-[45%] rounded-full bg-blue-600/8 blur-[120px] animate-pulse duration-[8000ms]"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 relative z-10">
                    <div>
                        <span className="text-[#00dba1] bg-[#00dba1]/10 px-3.5 py-1.5 rounded-full inline-block font-extrabold uppercase tracking-widest text-xs mb-3">
                            Dành cho doanh nghiệp
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-3 tracking-tight leading-tight">
                            Tour Khách Đoàn <span className="bg-gradient-to-r from-[#00dba1] to-blue-400 bg-clip-text text-transparent">Cao Cấp</span>
                        </h2>
                        <p className="text-gray-400 max-w-xl text-sm md:text-base leading-relaxed">
                            Giải pháp lữ hành toàn diện, thiết kế riêng biệt cho doanh nghiệp và tổ chức với chi phí tối ưu cùng dịch vụ chuẩn mực.
                        </p>
                    </div>

                    <Link 
                        href="/tours/group" 
                        className="group flex items-center gap-2 px-6 py-4 rounded-full bg-gradient-to-r from-[#00dba1] to-[#00b87a] text-white text-xs font-extrabold uppercase tracking-widest hover:shadow-[0_8px_25px_rgba(0,219,161,0.3)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 shimmer-btn"
                    >
                        Nhận báo giá ngay <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Tour Grid/Slider with Glassmorphism */}
                <div className="relative z-10 flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-4 px-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0 md:mx-0 md:px-0 hide-scrollbar">
                    {tours.map((tour, idx) => (
                        <div key={tour.id} className="min-w-[85%] sm:min-w-[350px] md:min-w-0 snap-center">
                            <Link href={`/tours/${tour.slug}`} className="block h-full">
                                <div className="group relative h-[440px] rounded-[28px] overflow-hidden cursor-pointer shadow-lg border border-white/5 hover:border-white/10 transition-all duration-500">
                                    <Image
                                        src={tour.image}
                                        alt={tour.name}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>

                                    <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
                                        {tour.discount}
                                    </div>

                                    {/* Glassmorphic floating text panel */}
                                    <div className="absolute bottom-4 left-4 right-4 p-5 rounded-[22px] glass-panel-dark transition-all duration-500 group-hover:border-[#00dba1]/30 group-hover:shadow-[0_12px_40px_rgba(0,219,161,0.12)]">
                                        <div className="text-gray-300 text-xs font-semibold mb-2.5 flex items-center gap-2">
                                            <span className="bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-md text-white font-bold">{tour.duration}</span>
                                            <span>• {tour.departure}</span>
                                        </div>
                                        <h3 className="text-[15px] font-extrabold text-white mb-2 line-clamp-2 leading-snug group-hover:text-[#00dba1] transition-colors duration-300">
                                            {tour.name}
                                        </h3>
                                        <div className="flex items-end gap-2 mb-3.5">
                                            <span className="text-[#00dba1] font-extrabold text-base tracking-tight">{tour.price}</span>
                                            {tour.originalPrice && <span className="text-gray-400/80 text-xs line-through">{tour.originalPrice}</span>}
                                        </div>
                                        <div className="w-full py-2.5 bg-gradient-to-r from-[#00dba1] to-[#00b87a] hover:from-[#00c993] hover:to-[#00a878] text-white rounded-xl text-center text-xs font-extrabold uppercase tracking-wider transition-all duration-300 shadow-md shadow-[#00dba1]/25 shimmer-btn">
                                            Xem chi tiết
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
