'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Mail, Phone, Facebook, Youtube, MessageCircle, Send } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#0f172a] text-white rounded-t-[60px] shadow-[0_-10px_32px_rgba(0,0,0,0.1)] mt-10">
            <div className="py-10">
                <div className="container mx-auto px-4">
                    {/* Top Section */}
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end pb-10 border-b border-white/10 mb-10 gap-5 lg:gap-0">
                        <h2 className="text-[28px] font-bold leading-tight text-white max-w-xl">
                            CÔNG TY TNHH THƯƠNG MẠI -<br />DỊCH VỤ VÀ DU LỊCH VNGROUP TOURIST
                        </h2>
                        <div className="relative w-[300px] h-[60px] lg:w-[486px] lg:h-[96px] bg-white/5 rounded-2xl p-2 backdrop-blur-sm">
                            <Image
                                src="/images/b86a4bce511594545df567494e2a23251eb424c7.png"
                                alt="VNGROUP TOURIST"
                                fill
                                className="object-contain object-right-bottom"
                            />
                        </div>
                    </div>

                    {/* Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Contact Col */}
                        <div>
                            <h4 className="text-base font-bold mb-6 uppercase text-[#00dba1]">thông tin liên hệ</h4>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-2">
                                    <MapPin className="w-5 h-5 text-[#00dba1] flex-shrink-0" />
                                    <span className="text-gray-300 text-[15px]">93/8 Phạm Văn Hai, Phường Tân Sơn Hoà, TP Hồ Chí Minh Việt Nam</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Mail className="w-5 h-5 text-[#00dba1] flex-shrink-0" />
                                    <span className="text-gray-300 text-[15px]">info@vngrouptourist.com</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Phone className="w-5 h-5 text-[#00dba1] flex-shrink-0" />
                                    <span className="text-gray-300 text-[15px]">0931.867.376 - 0938.322.487</span>
                                </li>
                            </ul>

                            <div className="flex gap-3 mt-6">
                                {[
                                    { icon: <div className="font-bold text-[11px] leading-none">TIK<br/>TOK</div>, href: 'https://www.tiktok.com/@dulichvngrouptourist?lang=vi-VN' },
                                    { icon: <Facebook className="w-4 h-4" />, href: 'https://www.facebook.com/vngrouptourist/' },
                                    { icon: <Youtube className="w-4 h-4" />, href: 'https://www.youtube.com/@DuLichVNGroupTourist/' },
                                    { icon: <MessageCircle className="w-4 h-4" />, href: 'https://zalo.me/0931867376' }, // Zalo
                                ].map((social, idx) => (
                                    <Link
                                        key={idx}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#00dba1] transition-all transform hover:-translate-y-1"
                                    >
                                        {social.icon}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-base font-bold mb-6 uppercase text-[#00dba1]">Truy cập nhanh</h4>
                            <ul className="flex flex-col gap-4">
                                {[
                                    { name: 'Giới thiệu công ty', href: '/about-page' },
                                    { name: 'Lịch khởi hành', href: '/schedule-page' },
                                    { name: 'Hỗ trợ khách hàng', href: '/support-page' },
                                    { name: 'Tuyển dụng', href: '/careers-page' },
                                    { name: 'Chương trình khuyến mãi', href: '/promotions' },
                                ].map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.href} className="text-gray-300 hover:text-[#00dba1] transition-colors">
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Featured Tours */}
                        <div>
                            <h4 className="text-base font-bold mb-6 uppercase text-[#00dba1]">Tour nổi bật</h4>
                            <ul className="flex flex-col gap-4">
                                {[
                                    { name: 'Tour quốc tế', href: '/tours/international' },
                                    { name: 'Tour doanh nghiệp', href: '/tours/group' },
                                    { name: 'Tour Inbound', href: '/tours/inbound' },
                                    { name: 'Tour trong nước', href: '/tours/domestic' },
                                ].map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.href} className="text-gray-300 hover:text-[#00dba1] transition-colors">
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Subscribe */}
                        <div>
                            <h4 className="text-base font-bold mb-6 max-w-[200px] text-[#00dba1]">Đăng ký nhận thông tin Ưu đãi</h4>
                            <form className="relative flex items-center bg-white/10 rounded-full p-1 pl-4 border border-white/10">
                                <input
                                    type="email"
                                    placeholder="Email của bạn"
                                    className="bg-transparent border-none outline-none text-sm text-white w-full placeholder-gray-400"
                                />
                                <button type="submit" className="w-10 h-10 bg-[#00dba1] rounded-full flex items-center justify-center hover:bg-[#00c791] transition-colors flex-shrink-0">
                                    <Send className="w-4 h-4 text-white ml-0.5" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="bg-black/20 border-t border-white/10 py-4">
                <div className="container mx-auto px-4 text-center">
                    <span className="text-sm text-gray-400">© All Right Reserved</span>
                </div>
            </div>
        </footer>
    );
}
