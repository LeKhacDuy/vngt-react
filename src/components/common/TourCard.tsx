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
    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(0,0,0,0.15)] transition-all duration-300 flex flex-col h-full">
            {/* Image Container */}
            <div className="relative h-[215px] overflow-hidden">
                <Image
                    src={tour.image}
                    alt={tour.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {tour.discount && (
                    <div className="absolute top-3 left-3 bg-[#00dba1] text-white text-xs font-bold px-2 py-1 rounded-md z-10">
                        {tour.discount}
                    </div>
                )}
                <button className="absolute top-3 right-3 w-8 h-8 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors text-gray-600 hover:text-red-500">
                    <Star className="w-4 h-4" />
                </button>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-base font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-[#00dba1] transition-colors min-h-[48px]">
                    <Link href={`/tours/${tour.slug}`}>
                        {tour.name}
                    </Link>
                </h3>

                <div className="flex flex-col gap-2 mb-4 text-sm text-gray-600">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Khởi hành: {tour.departure}</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Thời gian: {tour.duration}</span>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 my-3"></div>

                <div className="mt-auto flex justify-between items-center">
                    <div className="flex flex-col">
                        {tour.originalPrice && (
                            <span className="text-xs text-gray-400 line-through">{tour.originalPrice}</span>
                        )}
                        <span className="text-lg font-bold text-[#00dba1]">{tour.price}</span>
                    </div>

                    <Link
                        href={`/tours/${tour.slug}`}
                        className="px-4 py-2 bg-[#00dba1]/10 text-[#00dba1] rounded-full text-sm font-semibold hover:bg-[#00dba1] hover:text-white transition-all"
                    >
                        Đặt ngay
                    </Link>
                </div>
            </div>
        </div>
    );
}
