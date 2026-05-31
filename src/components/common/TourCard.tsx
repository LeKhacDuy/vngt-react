'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Calendar, Clock, Star } from 'lucide-react';

interface TourProps {
    id: string;
    name: string;
    image: string;
    price: string;
    originalPrice?: string;
    duration: string;
    departure: string;
    rating?: number;
    reviews?: number;
    discount?: string;
    slug: string;
}

export default function TourCard({ tour }: { tour: TourProps }) {
    // Dynamic discount gradient style
    const isHot = tour.discount?.toLowerCase() === 'hot';
    const badgeBg = isHot 
        ? "bg-gradient-to-r from-orange-500 to-red-500 shadow-[0_4px_12px_rgba(239,68,68,0.25)]" 
        : "bg-gradient-to-r from-[#00dba1] to-[#00b87a] shadow-[0_4px_12px_rgba(0,219,161,0.25)]";

    return (
        <div className="group bg-white rounded-[24px] overflow-hidden border border-gray-100/60 hover:border-[#00dba1]/20 shadow-[0_12px_40px_rgba(0,0,0,0.04)] hover:-translate-y-2 hover:shadow-[0_20px_48px_rgba(0,219,161,0.08)] transition-all duration-500 flex flex-col h-full">
            {/* Image Container */}
            <div className="relative h-[215px] overflow-hidden">
                <Image
                    src={tour.image}
                    alt={tour.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                {/* Visual Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60 pointer-events-none" />

                {tour.discount && (
                    <div className={`absolute top-4 left-4 text-white text-xs font-extrabold px-3 py-1.5 rounded-full z-10 uppercase tracking-wider ${badgeBg}`}>
                        {tour.discount}
                    </div>
                )}
                
                <button className="absolute top-4 right-4 w-9 h-9 bg-white/70 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 text-gray-700 hover:text-red-500 hover:scale-110 shadow-md">
                    <Star className="w-4 h-4 fill-transparent hover:fill-red-500 transition-colors" />
                </button>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-base font-bold text-gray-800 mb-3.5 line-clamp-2 group-hover:text-[#00dba1] transition-colors duration-300 min-h-[48px] leading-snug">
                    <Link href={`/tours/${tour.slug}`}>
                        {tour.name}
                    </Link>
                </h3>

                <div className="flex flex-col gap-2.5 mb-4 text-sm text-gray-500 font-medium">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#00dba1]" />
                            <span>Khởi hành: <strong className="text-gray-700">{tour.departure}</strong></span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#00dba1]" />
                            <span>Thời gian: <strong className="text-gray-700">{tour.duration}</strong></span>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100/80 my-4"></div>

                <div className="mt-auto flex justify-between items-center gap-2">
                    <div className="flex flex-col">
                        {tour.originalPrice && (
                            <span className="text-[11px] text-gray-400 line-through tracking-wide mb-0.5">{tour.originalPrice}</span>
                        )}
                        <span className="text-lg font-extrabold text-[#00a878] tracking-tight">{tour.price}</span>
                    </div>

                    <Link
                        href={`/tours/${tour.slug}`}
                        className="px-5 py-2.5 bg-gradient-to-r from-[#00dba1] to-[#00b87a] text-white rounded-full text-xs font-extrabold uppercase tracking-wider hover:shadow-[0_8px_20px_rgba(0,219,161,0.3)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 shimmer-btn"
                    >
                        Đặt ngay
                    </Link>
                </div>
            </div>
        </div>
    );
}
