'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Search, MapPin, Calendar, Users, ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function HeroSection() {
    const [activeTab, setActiveTab] = useState('tour'); // tour, hotel, flight

    return (
        <section className="relative flex flex-col lg:block h-auto lg:h-[70vh]">
            {/* Background Image */}
            <div className="relative w-full h-[300px] lg:absolute lg:inset-0 lg:h-full z-0">
                <Image
                    src="/images/banner-30-4.jpg"
                    alt="Hero Banner"
                    fill
                    className="object-cover"
                    priority
                    unoptimized={true}
                    quality={100}
                />
                <div className="absolute inset-0 bg-black/10"></div>
            </div>

            <div className="container mx-auto relative z-10 w-full px-4 lg:h-full lg:flex lg:items-center lg:justify-center">
                <div className="flex justify-between items-center w-full absolute top-1/2 left-0 px-4 -translate-y-1/2 pointer-events-none">
                    {/* Arrows (Hidden on mobile) */}
                    <button className="hidden lg:flex pointer-events-auto w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm items-center justify-center hover:bg-white transition-colors cursor-pointer text-gray-800">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button className="hidden lg:flex pointer-events-auto w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm items-center justify-center hover:bg-white transition-colors cursor-pointer text-gray-800">
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Search Box */}
                <div className="relative mt-4 mb-10 lg:mt-0 lg:mb-0 lg:absolute lg:bottom-10 lg:left-1/2 lg:transform lg:-translate-x-1/2 w-full lg:w-[1000px] max-w-full shadow-2xl rounded-3xl z-20">
                    <div className="bg-white rounded-3xl p-5 lg:p-8 backdrop-blur-sm bg-white/95">

                        {/* Tabs */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                            <span className="text-base font-bold text-gray-800">Bạn muốn đi đâu?</span>
                            <div className="flex flex-wrap justify-center gap-2">
                                {[
                                    { id: 'tour', icon: MapPin, label: 'Tour du lịch' },
                                    { id: 'hotel', icon: Users, label: 'Khách sạn' },
                                    { id: 'flight', icon: Calendar, label: 'Vé máy bay' }
                                ].map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={cn("px-5 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 border",
                                            activeTab === tab.id
                                                ? "bg-[#00dba1] border-[#00dba1] text-white shadow-lg shadow-[#00dba1]/30"
                                                : "bg-gray-50 border-gray-100 text-gray-600 hover:bg-gray-100"
                                        )}
                                    >
                                        <tab.icon className="w-4 h-4" /> {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Inputs */}
                        <div className="flex flex-col lg:flex-row gap-4 items-end">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow w-full">
                                {/* Location Input */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Điểm đến</label>
                                    <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl h-14 px-4 focus-within:border-[#00dba1] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#00dba1]/20 transition-all">
                                        <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                                        <input
                                            type="text"
                                            placeholder="Bạn muốn đi đâu?"
                                            className="bg-transparent border-none outline-none text-sm font-medium w-full placeholder-gray-400 text-gray-800"
                                        />
                                    </div>
                                </div>

                                {/* Date Input */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Ngày khởi hành</label>
                                    <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl h-14 px-4 focus-within:border-[#00dba1] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#00dba1]/20 transition-all">
                                        <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                                        <input
                                            type="date"
                                            className="bg-transparent border-none outline-none text-sm font-medium w-full text-gray-800"
                                        />
                                    </div>
                                </div>

                                {/* Price/Guest Input */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Ngân sách / Số người</label>
                                    <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl h-14 px-4 focus-within:border-[#00dba1] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#00dba1]/20 transition-all">
                                        <Users className="w-5 h-5 text-gray-400 mr-3" />
                                        <input
                                            type="text"
                                            placeholder="VD: 5 triệu, 2 người"
                                            className="bg-transparent border-none outline-none text-sm font-medium w-full placeholder-gray-400 text-gray-800"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Search Button */}
                            <button className="w-full lg:w-auto h-14 px-8 rounded-xl bg-[#00dba1] flex items-center justify-center hover:bg-[#00c28e] hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-[#00dba1]/30">
                                <Search className="w-6 h-6 text-white" />
                                <span className="lg:hidden ml-2 font-bold text-white">Tìm kiếm</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
