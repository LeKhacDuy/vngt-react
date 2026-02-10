'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { tours } from '@/data/tours';
import { ArrowRight, Star, Wine, Plane, User, Lock, Crown } from 'lucide-react';

export default function LuxuryLandingPage() {
    const luxuryTours = tours.filter(t => t.category === 'luxury').slice(0, 5);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    return (
        <div className="bg-[#0f1014] min-h-screen text-white/90 selection:bg-[#c6a355] selection:text-black font-sans">

            {/* Hero Section */}
            <section className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0">
                    <Image
                        src="/images/tour3.jpg"
                        alt="Luxury Travel"
                        fill
                        className="object-cover opacity-60 scale-105 animate-[kenburns_20s_infinite_alternate]"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f1014] via-[#0f1014]/40 to-transparent"></div>
                </div>

                <div className="relative z-10 text-center container px-4">
                    <div className="inline-block mb-4 px-4 py-1 border border-[#c6a355]/50 text-[#c6a355] text-xs md:text-sm tracking-[0.3em] uppercase rounded-full bg-black/30 backdrop-blur-md">
                        VNGROUP TOURIST ELITE
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 tracking-tight">
                        Beyond <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c6a355] to-[#f9d98c] italic">Luxury</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed mb-10">
                        Hành trình thượng lưu được thiết kế riêng cho những vị khách quý tộc. Nơi đẳng cấp không chỉ là đích đến, mà là từng khoảnh khắc trải nghiệm.
                    </p>
                    <button className="group relative px-8 py-4 bg-transparent border border-[#c6a355] text-[#c6a355] hover:bg-[#c6a355] hover:text-[#0f1014] transition-all duration-500 rounded-sm uppercase tracking-widest text-sm font-bold">
                        <span className="relative z-10">Khám phá bộ sưu tập</span>
                        <div className="absolute inset-0 bg-[#c6a355] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                    </button>
                </div>
            </section>

            {/* Privileges Section */}
            <section className="py-24 container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif text-[#c6a355] mb-4">Đặc Quyền Thượng Lưu</h2>
                    <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#c6a355] to-transparent mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: Crown, title: 'Dịch Vụ 6 Sao', desc: 'Trải nghiệm hệ thống resort & khách sạn 6 sao đẳng cấp thế giới.' },
                        { icon: Plane, title: 'Bay Thương Gia', desc: 'Tận hưởng khoang hạng nhất và dịch vụ đưa đón sân bay bằng xe sang.' },
                        { icon: Wine, title: 'Ẩm Thực Tinh Hoa', desc: 'Thưởng thức thực đơn Michelin được thiết kế riêng bởi các đầu bếp trứ danh.' },
                        { icon: User, title: 'Quản Gia Riêng', desc: 'Đội ngũ phục vụ chuyên nghiệp, sẵn sàng hỗ trợ 24/7 theo yêu cầu cá nhân.' }
                    ].map((item, idx) => (
                        <div key={idx} className="p-8 border border-white/5 bg-white/5 hover:bg-[#c6a355]/10 hover:border-[#c6a355]/30 transition-all duration-500 group rounded-xl text-center">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#c6a355] to-[#8d6e30] p-[1px]">
                                <div className="w-full h-full bg-[#0f1014] rounded-full flex items-center justify-center">
                                    <item.icon className="w-8 h-8 text-[#c6a355] group-hover:scale-110 transition-transform duration-500" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 font-serif">{item.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Collection Section (Magazine Style) */}
            <section className="py-24 bg-[#0a0b0e] relative">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex justify-between items-end mb-20 px-4">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-serif text-white mb-2">Bộ Sưu Tập 2026</h2>
                            <p className="text-[#c6a355] font-light tracking-wider uppercase text-sm">Limited Edition Journeys</p>
                        </div>
                        <Link href="#" className="hidden md:flex items-center gap-2 text-gray-400 hover:text-[#c6a355] transition-colors border-b border-transparent hover:border-[#c6a355] pb-1">
                            Xem tất cả hành trình <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="space-y-32">
                        {luxuryTours.map((tour, index) => (
                            <div key={tour.id} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center group`}>

                                {/* Image Side */}
                                <div className="w-full lg:w-3/5 relative aspect-[16/9] overflow-hidden rounded-[2px]">
                                    <div className="absolute inset-0 bg-[#c6a355]/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                    <Image
                                        src={tour.image}
                                        alt={tour.name}
                                        fill
                                        className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
                                    />
                                    <div className="absolute bottom-6 left-6 z-20 bg-black/60 backdrop-blur-md px-6 py-3 border-l-2 border-[#c6a355]">
                                        <p className="text-[#c6a355] text-xs font-bold uppercase tracking-widest mb-1">Giá khởi điểm</p>
                                        <p className="text-2xl font-serif text-white">{tour.price}</p>
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className="w-full lg:w-2/5 px-4 lg:px-0">
                                    <div className="flex items-center gap-4 mb-6">
                                        <span className="text-5xl font-serif text-[#c6a355]/20 font-bold">0{index + 1}</span>
                                        <div className="h-[1px] bg-[#c6a355]/30 flex-grow"></div>
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-serif text-white mb-6 leading-tight group-hover:text-[#c6a355] transition-colors duration-500">
                                        <Link href={`/tours/${tour.slug}`}>{tour.name}</Link>
                                    </h3>
                                    <p className="text-gray-400 text-lg font-light leading-relaxed mb-8 line-clamp-3">
                                        {tour.name} - Một hành trình được thiết kế tinh xảo để đánh thức mọi giác quan. Tận hưởng sự riêng tư tuyệt đối và những đặc quyền chưa từng có.
                                    </p>

                                    <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-10 text-sm text-gray-300">
                                        <div className="flex items-center gap-3">
                                            <ClockIcon className="w-4 h-4 text-[#c6a355]" />
                                            <span>{tour.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <MapPinIcon className="w-4 h-4 text-[#c6a355]" />
                                            <span>{tour.destination === 'VN' ? 'Việt Nam' : 'Quốc tế'}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Plane className="w-4 h-4 text-[#c6a355]" />
                                            <span>Khởi hành: {tour.departure}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Lock className="w-4 h-4 text-[#c6a355]" />
                                            <span>Private Tour</span>
                                        </div>
                                    </div>

                                    <Link href={`/tours/${tour.slug}`} className="inline-block px-10 py-4 bg-[#c6a355] text-[#0f1014] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
                                        Xem chi tiết
                                    </Link>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tailor Made Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/tour4.jpg"
                        alt="Bespoke"
                        fill
                        className="object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-[#0f1014]/80"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <Crown className="w-12 h-12 text-[#c6a355] mx-auto mb-6" />
                    <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">Thiết Kế Hành Trình Riêng</h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light mb-12 leading-relaxed">
                        Bạn muốn một chuyến đi bằng chuyên cơ riêng? Một bữa tối lãng mạn trên du thuyền tại Venice? Hay một kỳ nghỉ biệt lập tại hòn đảo tư nhân? Hãy để các chuyên gia của chúng tôi hiện thực hóa giấc mơ của bạn.
                    </p>
                    <button className="px-12 py-5 bg-gradient-to-r from-[#c6a355] to-[#f9d98c] text-[#0f1014] font-bold text-lg uppercase tracking-widest hover:shadow-[0_0_30px_rgba(198,163,85,0.4)] transition-all duration-500 rounded-sm">
                        Liên hệ Private Client
                    </button>
                </div>
            </section>

        </div>
    );
}

// Icons Helper
function ClockIcon(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
}

function MapPinIcon(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
}
