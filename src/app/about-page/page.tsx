'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { teamMembers } from '@/data/team';
import { partners } from '@/data/partners';
import { testimonials } from '@/data/testimonials';
import {
    Users, Handshake, GraduationCap, UserCheck,
    Mountain, Globe, Briefcase, Users as UsersIcon,
    FileText, Plane, ChevronRight, Mail, Linkedin,
    FileCheck, Award, Leaf, Star, Quote
} from 'lucide-react';

export default function AboutPage() {
    const [counters, setCounters] = useState({ customers: 0, groups: 0, partners: 0 });
    const [hasAnimated, setHasAnimated] = useState(false);

    // Animate counters when in view
    useEffect(() => {
        if (hasAnimated) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setHasAnimated(true);
                    animateCounter('customers', 3000, 2000);
                    animateCounter('groups', 900, 2000);
                    animateCounter('partners', 100, 2000);
                }
            },
            { threshold: 0.3 }
        );

        const statsSection = document.getElementById('stats-section');
        if (statsSection) {
            observer.observe(statsSection);
        }

        return () => observer.disconnect();
    }, [hasAnimated]);

    const animateCounter = (key: string, target: number, duration: number) => {
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                setCounters(prev => ({ ...prev, [key]: target }));
                clearInterval(timer);
            } else {
                setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
            }
        }, 16);
    };

    const services = [
        { icon: Mountain, title: 'Du lịch trong nước', desc: 'Tư vấn điểm đến, thiết kế tour theo sở thích và ngân sách của khách hàng' },
        { icon: Globe, title: 'Du lịch nước ngoài', desc: 'Tổ chức các tour quốc tế với chương trình chọn lọc: Thái Lan, Trung Quốc, và nhiều điểm đến hấp dẫn khác' },
        { icon: Briefcase, title: 'Du lịch MICE', desc: 'Tổ chức hội thảo, hội nghị kết hợp du lịch cho doanh nghiệp với dịch vụ chuyên nghiệp' },
        { icon: UsersIcon, title: 'Event - Teambuilding', desc: 'Thiết kế sự kiện và hoạt động gắn kết đội ngũ, tăng cường tinh thần đoàn kết' },
        { icon: FileText, title: 'Dịch vụ Visa/Passport', desc: 'Hỗ trợ visa công tác, du lịch, thăm thân với tỷ lệ đậu cao và quy trình nhanh chóng' },
        { icon: Plane, title: 'Đại lý vé máy bay', desc: 'Vé máy bay trong nước và quốc tế, hỗ trợ 24/7 với giá cạnh tranh nhất' }
    ];

    const values = [
        { letter: 'T', title: 'Trust', subtitle: 'Niềm tin', desc: 'Xây dựng niềm tin vững chắc với khách hàng và đối tác' },
        { letter: 'R', title: 'Responsibility', subtitle: 'Trách nhiệm', desc: 'Cam kết hoàn thành mọi dịch vụ với tinh thần trách nhiệm cao' },
        { letter: 'U', title: 'Unity', subtitle: 'Đoàn kết', desc: 'Phát huy sức mạnh tập thể, cùng nhau vượt qua thử thách' },
        { letter: 'S', title: 'Sincerity', subtitle: 'Chân thành', desc: 'Luôn trung thực và tận tâm trong mọi giao dịch' },
        { letter: 'T', title: 'Transformation', subtitle: 'Đổi mới', desc: 'Không ngừng cải tiến, tạo ra sự khác biệt trong dịch vụ' }
    ];

    const timeline = [
        { year: '2023', title: 'Thành lập', desc: 'Chính thức ra mắt thương hiệu VNGroup Tourist vào ngày 09/03/2023' },
        { year: '2024', title: 'Mở rộng', desc: 'Mở rộng văn phòng đại diện tại Tân Bình, phát triển mạnh tour quốc tế' },
        { year: '2025', title: 'Bứt phá', desc: 'Đạt mốc 3000+ khách hàng và trở thành đối tác chiến lược của nhiều doanh nghiệp lớn' },
        { year: 'Future', title: 'Vươn xa', desc: 'Hướng tới trở thành Top 10 công ty lữ hành hàng đầu Việt Nam' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans">

            {/* Hero Section */}
            <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/slider2.jpg" // Using an existing image as placeholder
                        alt="Hero Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-sm font-semibold mb-6 animate-fade-in-up">
                            <span className="w-2 h-2 bg-[#00dba1] rounded-full animate-pulse"></span>
                            Thành lập từ 09/03/2023
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up delay-100">
                            Hành trình đẳng cấp <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00dba1] to-[#00a86b]">Trải nghiệm khác biệt</span>
                        </h1>

                        <p className="text-xl text-gray-200 mb-8 font-light leading-relaxed max-w-2xl animate-fade-in-up delay-200">
                            VNGroup Tourist tự hào là người bạn đồng hành tin cậy, mang đến những chuyến đi đầy cảm xúc và dịch vụ chất lượng vượt trội.
                        </p>

                        <div className="flex gap-4 animate-fade-in-up delay-300">
                            <Link
                                href="#services"
                                className="px-8 py-4 bg-[#00dba1] hover:bg-[#00c28e] text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-[#00dba1]/50 hover:-translate-y-1"
                            >
                                Khám phá dịch vụ
                            </Link>
                            <Link
                                href="/contact-page"
                                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 font-bold rounded-full transition-all duration-300 hover:-translate-y-1"
                            >
                                Liên hệ chúng tôi
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section id="stats-section" className="py-20 bg-white relative -mt-20 z-20 mx-4 lg:mx-20 rounded-3xl shadow-2xl border border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-widest text-center">Những con số biết nói</h2>
                        <div className="w-20 h-1 bg-[#00dba1] mx-auto mt-4 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Users, count: counters.customers, label: 'Lượt khách hàng', suffix: '+' },
                            { icon: UsersIcon, count: counters.groups, label: 'Khách đoàn', suffix: '+' },
                            { icon: Handshake, count: counters.partners, label: 'Đối tác chiến lược', suffix: '+' },
                            { icon: GraduationCap, count: 100, label: 'Nhân sự đào tạo', suffix: '%' }
                        ].map((stat, idx) => (
                            <div key={idx} className="text-center group">
                                <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-[#00dba1] transition-colors duration-500">
                                    <stat.icon className="w-8 h-8 text-[#00dba1] group-hover:text-white transition-colors duration-500" />
                                </div>
                                <div className="text-5xl font-bold text-gray-900 mb-2">
                                    {stat.count}{stat.suffix}
                                </div>
                                <div className="text-gray-500 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section (NEW) */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Chặng đường phát triển</h2>
                        <p className="text-xl text-gray-600">Hành trình kiến tạo giá trị của VNGroup Tourist</p>
                    </div>

                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200 hidden md:block"></div>

                        <div className="space-y-12">
                            {timeline.map((item, idx) => (
                                <div key={idx} className={`flex flex-col md:flex-row items-center justify-between gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                    <div className="w-full md:w-5/12"></div>

                                    <div className="z-10 bg-[#00dba1] w-12 h-12 rounded-full border-4 border-white shadow-lg flex items-center justify-center flex-shrink-0">
                                        <div className="w-3 h-3 bg-white rounded-full"></div>
                                    </div>

                                    <div className="w-full md:w-5/12 bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                                        <span className="text-[#00dba1] font-bold text-xl mb-2 block">{item.year}</span>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                        <p className="text-gray-600">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Lĩnh vực kinh doanh</h2>
                        <p className="text-xl text-gray-600">6 mảng dịch vụ cốt lõi của VNGroup Tourist</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, idx) => (
                            <div key={idx} className="group p-8 bg-white rounded-3xl border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                                <div className="w-16 h-16 mb-6 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-[#00dba1] transition-colors duration-500">
                                    <service.icon className="w-8 h-8 text-[#00dba1] group-hover:text-white transition-colors duration-500" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                                <p className="text-gray-600 leading-relaxed mb-6">{service.desc}</p>
                                <span className="inline-flex items-center gap-2 text-[#00dba1] font-semibold group-hover:translate-x-2 transition-transform">
                                    Xem chi tiết <ChevronRight className="w-4 h-4" />
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold mb-4">Giá trị cốt lõi - TRUST</h2>
                        <div className="w-24 h-1 bg-[#00dba1] mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
                        {values.map((value, idx) => (
                            <div key={idx} className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
                                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#00dba1] to-[#00a86b] rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-[#00dba1]/30">
                                    {value.letter}
                                </div>
                                <h3 className="font-bold text-xl mb-1">{value.title}</h3>
                                <div className="text-sm text-gray-400 mb-3">{value.subtitle}</div>
                                <p className="text-sm text-gray-300">{value.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* ESG Commitment */}
                    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-3xl border border-green-500/30 backdrop-blur-md">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center flex-shrink-0 animate-pulse">
                                <Leaf className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">Cam kết ESG</h3>
                                <p className="text-gray-300 leading-relaxed">
                                    Chúng tôi chú trọng <strong>Môi trường (Environment)</strong> - <strong>Xã hội (Social)</strong> - <strong>Quản trị (Governance)</strong> trong mọi hoạt động du lịch, hướng tới phát triển bền vững.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section (NEW) */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Khách hàng nói gì về chúng tôi?</h2>
                        <p className="text-xl text-gray-600">Sự hài lòng của bạn là niềm tự hào của chúng tôi</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((item) => (
                            <div key={item.id} className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-xl transition-all duration-300 relative">
                                <Quote className="w-10 h-10 text-[#00dba1]/20 absolute top-6 right-6" />
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-6 italic">"{item.content}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                        <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">{item.name}</div>
                                        <div className="text-xs text-gray-500">{item.role} {item.company && `at ${item.company}`}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Đội ngũ lãnh đạo</h2>
                        <p className="text-xl text-gray-600">Những con người tâm huyết xây dựng VNGroup Tourist</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member) => (
                            <div key={member.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300">
                                <div className="relative h-80 overflow-hidden">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                        <div className="text-white w-full">
                                            <p className="text-sm line-clamp-3 mb-4">{member.bio}</p>
                                            <div className="flex gap-3 justify-center">
                                                {member.social?.email && (
                                                    <a href={`mailto:${member.social.email}`} className="p-2 bg-white/20 hover:bg-[#00dba1] rounded-full transition-colors">
                                                        <Mail className="w-5 h-5" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                                    <div className="text-[#00dba1] font-semibold text-sm uppercase tracking-wider">{member.position}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-r from-gray-900 to-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-[#00dba1] rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                            Sẵn sàng cho hành trình tiếp theo?
                        </h2>
                        <p className="text-xl text-gray-300 mb-10">
                            Liên hệ với chúng tôi để được tư vấn và thiết kế chuyến đi phù hợp nhất
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/contact-page"
                                className="px-10 py-4 bg-[#00dba1] hover:bg-[#00c28e] text-white rounded-full font-bold text-lg transition-all duration-300 flex items-center gap-2 shadow-lg shadow-[#00dba1]/30 hover:-translate-y-1"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                Liên hệ ngay
                            </Link>
                            <Link
                                href="/tours/domestic"
                                className="px-10 py-4 bg-transparent border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                Khám phá tour
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
