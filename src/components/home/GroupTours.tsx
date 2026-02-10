'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { tourService, Tour, getImageUrl } from '@/services/tour.service';

export default function GroupTours() {
    const [tours, setTours] = useState<any[]>([]);

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
            }
        }
        fetchTours();
    }, []);

    if (tours.length === 0) return null; // Or return loading skeleton

    return (
        <section className="py-20 bg-[#0f172a] relative overflow-hidden">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#00dba1]/10 blur-[100px]"></div>
                <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4 relative z-10">
                    <div>
                        <span className="text-[#00dba1] font-bold tracking-wider uppercase text-sm mb-2 block">Dành cho doanh nghiệp</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">Tour Khách Đoàn <span className="text-[#00dba1]">Cao Cấp</span></h2>
                        <p className="text-gray-400 max-w-lg">Giải pháp lữ hành toàn diện, thiết kế riêng biệt cho doanh nghiệp và tổ chức với chi phí tối ưu.</p>
                    </div>

                    <Link href="/tours/group" className="group flex items-center gap-2 px-6 py-3 rounded-full bg-[#00dba1] text-white font-bold hover:bg-[#00c993] transition-all shadow-lg shadow-[#00dba1]/30">
                        Nhận báo giá ngay <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Tour Grid/Slider with Glassmorphism */}
                <div className="relative z-10 flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-4 px-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0 md:mx-0 md:px-0 hide-scrollbar">
                    {tours.map((tour, idx) => (
                        <div key={tour.id} className="min-w-[85%] sm:min-w-[350px] md:min-w-0 snap-center">
                            <Link href={`/tours/${tour.slug}`} className="block h-full">
                                <div className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer">
                                    <Image
                                        src={tour.image}
                                        alt={tour.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                                    <div className="absolute top-4 right-4 bg-[#00dba1] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                        {tour.discount}
                                    </div>

                                    <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                        <div className="text-gray-300 text-xs font-medium mb-2 flex items-center gap-2">
                                            <span className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-white">{tour.duration}</span>
                                            <span>• {tour.departure}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 leading-snug group-hover:text-[#00dba1] transition-colors">
                                            {tour.name}
                                        </h3>
                                        <div className="flex items-end gap-2 mb-4">
                                            <span className="text-[#00dba1] font-bold text-lg">{tour.price}</span>
                                            {tour.originalPrice && <span className="text-gray-500 text-sm line-through decoration-white/50">{tour.originalPrice}</span>}
                                        </div>
                                        <button className="w-full py-3 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-[#00dba1] hover:border-[#00dba1] text-white rounded-xl font-semibold transition-all">
                                            Xem chi tiết
                                        </button>
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
