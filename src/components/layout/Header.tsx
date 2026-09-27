'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';


export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
        <header className={cn(
            "sticky top-0 z-50 w-full transition-all duration-500",
            isScrolled
                ? "bg-white/80 backdrop-blur-lg shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-gray-100/50"
                : "bg-white/95 backdrop-blur-sm shadow-sm"
        )}>
            {/* Top Bar - Hidden on mobile/tablet */}
            <div className="hidden lg:block bg-gradient-to-br from-brand to-brand text-white text-sm py-2">
                <div className="container mx-auto px-4 flex justify-between items-center h-9">
                    <p className="font-medium tracking-wide">Hành trình đẳng cấp – Trải nghiệm khác biệt.</p>
                    <div className="flex items-center gap-6">
                        <nav>
                            <ul className="flex gap-5">
                                <li><Link href="/visa-page" className="hover:opacity-80 transition-opacity">Dịch vụ Visa</Link></li>
                                <li><Link href="/guide-page" className="hover:opacity-80 transition-opacity">Cẩm nang du lịch</Link></li>
                                <li><Link href="/company-profile" className="hover:opacity-80 transition-opacity">Hồ sơ năng lực</Link></li>
                                <li><Link href="/about-page" className="hover:opacity-80 transition-opacity">Về chúng tôi</Link></li>
                                <li><Link href="/contact-page" className="hover:opacity-80 transition-opacity">Liên hệ</Link></li>
                            </ul>
                        </nav>

                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="bg-transparent py-2 lg:py-3 border-b border-gray-100/50 lg:border-none">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <div className="relative w-[150px] h-[30px] lg:w-[180px] lg:h-[36px]">
                            {/* Using the long filename as is for now */}
                            <Image
                                src="/images/logo-vngroup-tourist.png"
                                alt="VNGROUP TOURIST"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center">
                        <ul className="flex items-center gap-1 xl:gap-2">
                            {[
                                { name: 'Tour quốc tế', href: '/tours/international' },
                                { name: 'Tour trong nước', href: '/tours/domestic' },
                                { name: 'Tour đoàn', href: '/tours/group' },
                                { name: 'Tour inbound', href: '/tours/inbound' },
                                { name: 'Vé tham quan', href: '/tickets' },
                                { name: 'Lịch khởi hành', href: '/schedule-page' },
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="relative block px-2.5 xl:px-3.5 py-2 text-[13px] font-bold text-gray-700 uppercase hover:text-brand transition-all duration-300 whitespace-nowrap group"
                                    >
                                        <span className="relative z-10">{item.name}</span>
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] rounded-full bg-brand transition-all duration-300 group-hover:w-4/5" />
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link
                                    href="/promotions"
                                    className="flex items-center gap-2 ml-2 bg-gradient-to-r from-brand to-brand-hover text-white font-bold text-[13px] uppercase px-5 py-2.5 rounded-full hover:shadow-[0_8px_20px_rgba(188,52,46,0.25)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 shimmer-btn"
                                >
                                    {/* Using generic icon if image missing, or image */}
                                    <div className="relative w-[18px] h-[18px]">
                                        <Image src="/images/160_3408.svg" alt="" fill />
                                    </div>
                                    <span>Chương trình khuyến mãi</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Mobile Actions */}
                    <div className="flex lg:hidden items-center gap-3">

                        {/* Hamburger Button */}
                        <button
                            onClick={toggleMobileMenu}
                            className="p-1 focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X className="w-7 h-7 text-gray-800" /> : <Menu className="w-7 h-7 text-gray-800" />}
                        </button>
                    </div>
                </div>
            </div>

        </header>

            {/* Menu dien thoai — phai de NGOAI the <header>.
                <header> co backdrop-blur-sm. Thuoc tinh backdrop-filter bien
                the do thanh khung tham chieu cho moi phan tu position: fixed
                nam trong no. Khi menu con nam trong header, no bam theo header
                cao 53px chu khong theo man hinh, nen luc dong bi day sang phai
                va keo chieu rong trang tu 390px len 721px — sinh ra dai trang
                trong o ben phai tren dien thoai.
                Khung boc ben duoi dung bang man hinh va clip phan thua, nen
                ngan keo luc dong khong lam trang rong them. */}
            <div className="fixed inset-0 z-40 overflow-hidden pointer-events-none lg:hidden">

                {/* Lop mo phia sau */}
                <div
                    className={cn(
                        "absolute inset-0 bg-black/80 transition-opacity duration-300",
                        isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Ngan keo */}
                <div
                    className={cn(
                        "absolute top-0 right-0 w-[85%] max-w-[340px] h-full bg-white/95 backdrop-blur-xl border-l border-gray-100/50 rounded-l-[32px] transition-all duration-500 ease-out transform overflow-y-auto shadow-[0_20px_60px_rgba(0,0,0,0.15)]",
                        isMobileMenuOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none"
                    )}
                >
                <div className="p-6 pt-24">
                    <ul className="space-y-2">
                        <li>
                            <Link
                                href="/visa-page"
                                className="block py-3 px-4 rounded-xl text-base font-bold text-gray-800 uppercase hover:bg-brand/5 hover:text-brand transition-all duration-300"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Dịch vụ Visa
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/guide-page"
                                className="block py-3 px-4 rounded-xl text-base font-bold text-gray-800 uppercase hover:bg-brand/5 hover:text-brand transition-all duration-300"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Cẩm nang du lịch
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/company-profile"
                                className="block py-3 px-4 rounded-xl text-base font-bold text-gray-800 uppercase hover:bg-brand/5 hover:text-brand transition-all duration-300"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Hồ sơ năng lực
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about-page"
                                className="block py-3 px-4 rounded-xl text-base font-bold text-gray-800 uppercase hover:bg-brand/5 hover:text-brand transition-all duration-300"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Về chúng tôi
                            </Link>
                        </li>

                        <li className="h-px bg-gray-100/80 my-3 mx-4"></li>

                        {[
                            { name: 'Tour quốc tế', href: '/tours/international' },
                            { name: 'Tour trong nước', href: '/tours/domestic' },
                            { name: 'Tour đoàn', href: '/tours/group' },
                            { name: 'Tour inbound', href: '/tours/inbound' },
                            { name: 'Vé tham quan', href: '/tickets' },
                            { name: 'Lịch khởi hành', href: '/schedule-page' },
                            { name: 'Liên hệ', href: '/contact-page' },
                        ].map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className="block py-3 px-4 rounded-xl text-base font-bold text-gray-700 uppercase hover:bg-brand/5 hover:text-brand transition-all duration-300"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                        <li className="pt-2">
                            <Link
                                href="/promotions"
                                className="flex items-center justify-center gap-3 bg-gradient-to-r from-brand to-brand-hover text-white p-4 rounded-2xl font-bold uppercase hover:shadow-[0_8px_20px_rgba(188,52,46,0.2)] transition-all duration-300 shimmer-btn"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <div className="relative w-[18px] h-[18px]">
                                    <Image src="/images/160_3408.svg" alt="" fill />
                                </div>
                                <span>Chương trình khuyến mãi</span>
                            </Link>
                        </li>
                    </ul>

                    <div className="mt-8 pt-8 border-t border-gray-100 text-center text-gray-400">
                        <p className="flex items-center justify-center gap-2">
                            <Phone className="w-4 h-4" /> Liên hệ: 0931 867 376
                        </p>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
}
