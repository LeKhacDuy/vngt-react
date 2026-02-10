'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, Globe, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const { locale, setLocale, t } = useLanguage();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm">
            {/* Top Bar - Hidden on mobile/tablet */}
            <div className="hidden lg:block bg-gradient-to-br from-[#00dba1] to-[#00c791] text-white text-sm py-2">
                <div className="container mx-auto px-4 flex justify-between items-center h-9">
                    <p className="font-medium tracking-wide">Hành trình đẳng cấp – Trải nghiệm khác biệt.</p>
                    <div className="flex items-center gap-6">
                        <nav>
                            <ul className="flex gap-5">
                                <li><Link href="/visa-page" className="hover:opacity-80 transition-opacity">Dịch vụ Visa</Link></li>
                                <li><Link href="/guide-page" className="hover:opacity-80 transition-opacity">Cẩm nang du lịch</Link></li>
                                <li><Link href="/about-page" className="hover:opacity-80 transition-opacity">Về chúng tôi</Link></li>
                                <li><Link href="/contact-page" className="hover:opacity-80 transition-opacity">Liên hệ</Link></li>
                            </ul>
                        </nav>
                        <div className="relative">
                            <button
                                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                                className="flex items-center gap-1 cursor-pointer bg-white/15 border border-white/30 px-2.5 py-1 rounded hover:bg-white/25 transition-colors"
                            >
                                <Globe className="w-3.5 h-3.5" />
                                <span className="font-medium text-[13px] ml-1">{locale.toUpperCase()}</span>
                                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", isLangDropdownOpen && "rotate-180")} />
                            </button>

                            {/* Language Dropdown */}
                            {isLangDropdownOpen && (
                                <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-100 py-1 min-w-[100px] z-50">
                                    <button
                                        onClick={() => { setLocale('vi'); setIsLangDropdownOpen(false); }}
                                        className={cn(
                                            "w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors flex items-center gap-2",
                                            locale === 'vi' ? "text-[#00dba1] font-semibold" : "text-gray-700"
                                        )}
                                    >
                                        🇻🇳 Tiếng Việt
                                    </button>
                                    <button
                                        onClick={() => { setLocale('en'); setIsLangDropdownOpen(false); }}
                                        className={cn(
                                            "w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors flex items-center gap-2",
                                            locale === 'en' ? "text-[#00dba1] font-semibold" : "text-gray-700"
                                        )}
                                    >
                                        🇺🇸 English
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="bg-white py-2 lg:py-3 border-b border-gray-100 lg:border-none">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <div className="relative w-[150px] h-[30px] lg:w-[180px] lg:h-[36px]">
                            {/* Using the long filename as is for now */}
                            <Image
                                src="/images/b86a4bce511594545df567494e2a23251eb424c7.png"
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
                                { name: 'Tour cao cấp', href: '/tours/luxury' },
                                { name: 'Tour đoàn', href: '/tours/group' },
                                { name: 'Tour inbound', href: '/tours/inbound' },
                                { name: 'Vé tham quan', href: '/tickets' },
                                { name: 'Khuyến mãi', href: '/promotions' },
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="block px-2 xl:px-3 py-2 text-[13px] font-medium text-gray-800 uppercase hover:bg-gray-100 hover:text-[#00dba1] rounded-md transition-colors whitespace-nowrap"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link
                                    href="/hot-combo"
                                    className="flex items-center gap-2 ml-2 bg-gradient-to-br from-[rgba(0,219,161,0.15)] to-[rgba(0,219,161,0.25)] text-[#00dba1] font-semibold text-[13px] uppercase px-4 py-2 rounded-full border border-[rgba(0,219,161,0.3)] hover:translate-y-[-2px] hover:shadow-md transition-all"
                                >
                                    {/* Using generic icon if image missing, or image */}
                                    <div className="relative w-[18px] h-[18px]">
                                        <Image src="/images/160_3408.svg" alt="" fill />
                                    </div>
                                    <span>Combo du lịch hot</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Mobile Actions */}
                    <div className="flex lg:hidden items-center gap-3">
                        {/* Mobile Language Selector */}
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00dba1]/20 border border-[#00dba1]/50 rounded-full text-[#00dba1] text-xs font-semibold">
                            <Globe className="w-3.5 h-3.5" />
                            <span>VN</span>
                        </div>

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

            {/* Mobile Menu Overlay */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/80 z-40 transition-opacity duration-300 lg:hidden",
                    isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Sidebar */}
            <div
                className={cn(
                    "fixed top-0 right-0 w-[85%] max-w-[350px] h-full bg-white z-50 transition-transform duration-300 transform overflow-y-auto lg:hidden",
                    isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="p-6 pt-20">
                    <ul className="space-y-4">
                        <li><Link href="/visa-page" className="block pb-3 border-b border-gray-100 text-lg font-medium text-gray-800 uppercase">Dịch vụ Visa</Link></li>
                        <li><Link href="/guide-page" className="block pb-3 border-b border-gray-100 text-lg font-medium text-gray-800 uppercase">Cẩm nang du lịch</Link></li>
                        <li><Link href="/about-page" className="block pb-3 border-b border-gray-100 text-lg font-medium text-gray-800 uppercase">Về chúng tôi</Link></li>

                        <li className="h-px bg-gray-100 my-4"></li>

                        {[
                            { name: 'Tour quốc tế', href: '/tours/international' },
                            { name: 'Tour trong nước', href: '/tours/domestic' },
                            { name: 'Tour cao cấp', href: '/tours/luxury' },
                            { name: 'Tour đoàn', href: '/tours/group' },
                            { name: 'Tour inbound', href: '/tours/inbound' },
                            { name: 'Vé tham quan', href: '/tickets' },
                            { name: 'Khuyến mãi', href: '/promotions' },
                            { name: 'Liên hệ', href: '/contact-page' },
                        ].map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className="block pb-3 border-b border-gray-100 text-lg font-medium text-gray-800 uppercase hover:text-[#00dba1] transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link
                                href="/hot-combo"
                                className="flex items-center gap-3 bg-[#00dba1]/10 p-4 rounded-xl text-[#00dba1] font-medium uppercase mt-4"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <div className="relative w-[18px] h-[18px]">
                                    <Image src="/images/160_3408.svg" alt="" fill />
                                </div>
                                <span>Combo du lịch hot</span>
                            </Link>
                        </li>
                    </ul>

                    <div className="mt-8 pt-8 border-t border-gray-100 text-center text-gray-500">
                        <p className="flex items-center justify-center gap-2">
                            <Phone className="w-4 h-4" /> Liên hệ: 0931 867 376
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
}
