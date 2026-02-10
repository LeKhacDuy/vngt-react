'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { visaCountries, processSteps } from '@/data/visa';
import { visaTestimonials } from '@/data/visa_testimonials';
import { visaFAQs } from '@/data/visa_faq';
import { Check, ChevronDown, ChevronRight, Star, ThumbsUp, Quote, HelpCircle, Plus, Minus } from 'lucide-react';
import VisaRatingModal from '@/components/visa/VisaRatingModal';

export default function VisaLandingPage() {
    const [openCountry, setOpenCountry] = useState<string | null>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

    const toggleCountry = (id: string) => {
        setOpenCountry(openCountry === id ? null : id);
    };

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            {/* Hero Section */}
            <section className="relative h-[500px] lg:h-[600px] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/tour2.jpg"
                        alt="Visa Services"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 pt-20">
                    <div className="max-w-2xl animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[#00dba1] text-sm font-bold mb-6">
                            <span className="w-2 h-2 bg-[#00dba1] rounded-full animate-pulse"></span>
                            Dịch vụ VISA Uy tín hàng đầu
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            Mở khóa hành trình <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00dba1] to-[#00a86b]">Vươn ra thế giới</span>
                        </h1>
                        <p className="text-xl text-gray-200 mb-8 font-light leading-relaxed max-w-xl">
                            Chuyên xử lý hồ sơ khó, tỷ lệ đậu lên đến 98%. Đồng hành cùng bạn chinh phục những tấm visa quyền lực nhất.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => setIsRatingModalOpen(true)}
                                className="px-8 py-4 bg-[#00dba1] hover:bg-[#00c28e] text-white font-bold rounded-full transition-all shadow-lg shadow-[#00dba1]/40 hover:-translate-y-1 flex items-center justify-center gap-2"
                            >
                                <Star className="w-5 h-5 fill-current" />
                                Kiểm tra tỷ lệ đậu
                            </button>
                            <Link
                                href="#countries"
                                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 font-bold rounded-full transition-all hover:-translate-y-1 text-center"
                            >
                                Xem các quốc gia
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Banner */}
            <div className="container mx-auto px-4 relative z-20 -mt-16 mb-20">
                <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-gray-100">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-x-0 lg:divide-x divide-gray-100">
                        <div className="p-4">
                            <div className="text-4xl lg:text-5xl font-bold text-[#00dba1] mb-2">98%</div>
                            <div className="text-gray-600 font-medium">Tỷ lệ đậu VISA</div>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl lg:text-5xl font-bold text-[#00dba1] mb-2">24/7</div>
                            <div className="text-gray-600 font-medium">Hỗ trợ khẩn cấp</div>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl lg:text-5xl font-bold text-[#00dba1] mb-2">90+</div>
                            <div className="text-gray-600 font-medium">Quốc gia hỗ trợ</div>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl lg:text-5xl font-bold text-[#00dba1] mb-2">10k+</div>
                            <div className="text-gray-600 font-medium">Khách hàng thành công</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Visa Rating / Score Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-1 rounded-full bg-[#00dba1]/10 text-[#00dba1] font-semibold text-sm mb-4">CÔNG CỤ THÔNG MINH</div>
                        <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
                            Đánh giá khả năng đậu VISA
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">Hệ thống chấm điểm tự động dựa trên tiêu chuẩn của Lãnh sự quán.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {/* Cards */}
                        {[
                            { title: 'Điểm cao (90-100)', desc: 'Hồ sơ mạnh, tỷ lệ đậu > 95%', icon: '⭐', color: 'from-green-400 to-green-600', w: '95%' },
                            { title: 'Trung bình (70-89)', desc: 'Hồ sơ ổn, cần bổ sung giấy tờ', icon: '⚖️', color: 'from-blue-400 to-blue-600', w: '80%' },
                            { title: 'Cần cải thiện (50-69)', desc: 'Rủi ro cao, cần chuyên gia tư vấn', icon: '🆘', color: 'from-orange-400 to-orange-600', w: '60%' },
                        ].map((card, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 hover:border-[#00dba1]/50 hover:shadow-xl transition-all group text-center relative overflow-hidden">
                                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl bg-gradient-to-br ${card.color} text-white shadow-lg`}>
                                    {card.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
                                <p className="text-gray-500 text-sm mb-6">{card.desc}</p>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className={`h-full bg-gradient-to-r ${card.color}`} style={{ width: card.w }}></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <button
                            onClick={() => setIsRatingModalOpen(true)}
                            className="px-10 py-5 bg-[#00dba1] hover:bg-[#00c791] text-white font-bold rounded-full shadow-xl shadow-[#00dba1]/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 mx-auto text-lg"
                        >
                            <Star className="w-5 h-5 fill-current" />
                            KIỂM TRA NGAY - MIỄN PHÍ
                        </button>
                    </div>
                </div>
            </section>

            {/* Countries Section */}
            <section id="countries" className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-1 rounded-full bg-[#00dba1]/10 text-[#00dba1] font-semibold text-sm mb-4">DỊCH VỤ PHỔ BIẾN</div>
                        <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">Hồ sơ xin VISA các nước lớn</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            Cập nhật thủ tục mới nhất 2024
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {visaCountries.map((country) => (
                            <div
                                key={country.id}
                                className={`bg-gray-50 rounded-3xl p-6 transition-all cursor-pointer group hover:bg-white hover:shadow-xl border border-transparent hover:border-[#00dba1]/20 ${openCountry === country.id ? 'ring-2 ring-[#00dba1] bg-white shadow-lg' : ''}`}
                                onClick={() => toggleCountry(country.id)}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{country.flag}</span>
                                        <div>
                                            <h3 className="font-bold text-xl text-gray-900">{country.name}</h3>
                                            <p className="text-xs text-gray-500 uppercase tracking-wide">{country.tagline}</p>
                                        </div>
                                    </div>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${openCountry === country.id ? 'bg-[#00dba1] text-white rotate-45' : 'bg-white text-gray-400 group-hover:bg-[#00dba1] group-hover:text-white'}`}>
                                        <Plus className="w-6 h-6" />
                                    </div>
                                </div>

                                <div className={`grid transition-all duration-500 ease-in-out ${openCountry === country.id ? 'grid-rows-[1fr] opacity-100 mt-6 pt-6 border-t border-gray-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                    <div className="overflow-hidden">
                                        <h4 className="font-bold text-gray-800 mb-3 text-sm">Hồ sơ bao gồm:</h4>
                                        <ul className="space-y-3">
                                            {country.requirements.map((req, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-gray-600">
                                                    <div className="w-5 h-5 rounded-full bg-[#00dba1]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <Check className="w-3 h-3 text-[#00dba1]" />
                                                    </div>
                                                    {req}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="bg-gray-900 text-white py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00dba1] rounded-full blur-[120px] opacity-10"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[120px] opacity-10"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div>
                            <div className="inline-block px-4 py-1 rounded-full bg-white/10 text-[#00dba1] font-semibold text-sm mb-4">QUY TRÌNH CHUYÊN NGHIỆP</div>
                            <h2 className="text-3xl lg:text-5xl font-bold">Quy trình làm việc</h2>
                        </div>
                        <p className="text-gray-400 max-w-md text-right md:text-left">Đơn giản hóa mọi thủ tục phức tạp, giúp bạn tiết kiệm thời gian và công sức.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {processSteps.map((step, idx) => (
                            <div key={idx} className="relative group p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#00dba1] to-transparent mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                    {step.number}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00dba1] transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section (NEW) */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">Câu chuyện thành công</h2>
                        <p className="text-gray-600 text-lg">Hàng ngàn khách hàng đã hài lòng với dịch vụ VISA của chúng tôi</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {visaTestimonials.map((item) => (
                            <div key={item.id} className="bg-gray-50 p-6 rounded-3xl border border-gray-100 hover:shadow-xl hover:border-[#00dba1]/30 transition-all duration-300 flex flex-col h-full">
                                <div className="mb-6 flex items-start justify-between">
                                    <Quote className="w-8 h-8 text-[#00dba1]/20" />
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-3 h-3 ${i < Math.floor(item.rating) ? 'fill-current' : 'text-gray-300'}`} />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm mb-6 flex-grow italic">"{item.content}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full overflow-hidden relative">
                                        <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm text-gray-900">{item.name}</div>
                                        <div className="text-xs text-[#00dba1] font-semibold">{item.visaType} - {item.country}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section (NEW) */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">Câu hỏi thường gặp</h2>
                        <p className="text-gray-600 text-lg">Giải đáp những thắc mắc phổ biến về thủ tục xin VISA</p>
                    </div>

                    <div className="space-y-4">
                        {visaFAQs.map((faq, idx) => (
                            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <button
                                    className="w-full flex items-center justify-between p-6 text-left font-bold text-gray-800 hover:text-[#00dba1] transition-colors"
                                    onClick={() => toggleFaq(idx)}
                                >
                                    <div className="flex gap-4 items-center">
                                        <HelpCircle className="w-5 h-5 text-[#00dba1]" />
                                        {faq.question}
                                    </div>
                                    {openFaq === idx ? <Minus className="w-5 h-5 text-[#00dba1]" /> : <Plus className="w-5 h-5 text-gray-400" />}
                                </button>
                                <div className={`px-6 overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <p className="text-gray-600 leading-relaxed pl-9 border-l-2 border-[#00dba1]/20">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Bottom */}
            <section className="py-24 bg-gradient-to-br from-[#00dba1] to-[#00a86b] text-white text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container mx-auto px-4 relative z-10 max-w-4xl">
                    <h2 className="text-4xl lg:text-6xl font-bold mb-6">Bạn đã sẵn sàng cho chuyến đi?</h2>
                    <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                        Đừng để vấn đề VISA cản trở hành trình của bạn. Hãy để chúng tôi giúp bạn mở cánh cửa ra thế giới.
                    </p>
                    <button
                        onClick={() => setIsRatingModalOpen(true)}
                        className="px-12 py-5 bg-white text-[#00dba1] font-bold rounded-full text-xl shadow-2xl hover:shadow-white/20 hover:-translate-y-1 transition-all"
                    >
                        Tư vấn hồ sơ ngay
                    </button>
                    <p className="mt-6 text-sm opacity-70">Hoặc gọi hotline: <strong className="text-white">0931 867 376</strong> để được hỗ trợ gấp</p>
                </div>
            </section>

            <VisaRatingModal isOpen={isRatingModalOpen} onClose={() => setIsRatingModalOpen(false)} />
        </div>
    );
}
