'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Search, MapPin, Calendar, ArrowLeft, ArrowRight, ChevronDown, Globe, X } from 'lucide-react';
import { tourService } from '@/services/tour.service';
import { useRouter } from 'next/navigation';

const HERO_IMAGES = [
    '/cover/cover1.jpg',
    '/cover/cover2.jpg',
    '/cover/Cover Website tour nước ngoài.jpg',
    '/cover/Cover Website tour nội địa.jpg',
    '/cover/Cover website Teambuilding Gala Dinner.jpg',
    '/cover/Cover website Thái Lan.jpg',
    '/cover/Cover website Trung Quốc.jpg'
];

interface Destination {
    id: number;
    code: string;
    name: string;
}

export default function HeroSection() {
    const router = useRouter();
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
    const [searchText, setSearchText] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-scroll hero banner
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % HERO_IMAGES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const handleNextSlide = () => {
        setCurrentSlide(prev => (prev + 1) % HERO_IMAGES.length);
    };

    const handlePrevSlide = () => {
        setCurrentSlide(prev => (prev === 0 ? HERO_IMAGES.length - 1 : prev - 1));
    };
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Fetch destinations from API
    useEffect(() => {
        tourService.getDestinations().then(res => {
            if (res?.data) setDestinations(res.data);
        }).catch(() => {});
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false);
                setFocusedField(null);
                // If nothing selected, clear search text too
                if (!selectedDestination) setSearchText('');
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [selectedDestination]);

    // Auto-focus search input when dropdown opens
    useEffect(() => {
        if (isDropdownOpen) {
            setTimeout(() => searchInputRef.current?.focus(), 50);
        }
    }, [isDropdownOpen]);

    const filteredDestinations = destinations.filter(d =>
        d.name.toLowerCase().includes(searchText.toLowerCase()) ||
        d.code.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleOpenDropdown = () => {
        setIsDropdownOpen(true);
        setFocusedField('destination');
        // Pre-fill search with selected name for editing
        if (selectedDestination) setSearchText('');
    };

    const handleSelectDestination = (dest: Destination | null) => {
        setSelectedDestination(dest);
        setSearchText('');
        setIsDropdownOpen(false);
        setFocusedField(null);
    };

    const handleClearDestination = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedDestination(null);
        setSearchText('');
    };

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (selectedDestination) {
            params.set('destinationId', String(selectedDestination.id));
            params.set('destinationName', selectedDestination.name);
        }
        if (selectedDate) params.set('date', selectedDate);
        router.push(`/tours/search?${params.toString()}`);
    };

    return (
        <section className="relative w-full min-h-[580px] sm:min-h-[620px] lg:min-h-0 lg:h-auto lg:aspect-[3000/1039] flex flex-col justify-end py-10 lg:py-0 lg:block lg:mb-16 bg-gray-900">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 overflow-hidden bg-gray-900">
                {HERO_IMAGES.map((src, idx) => (
                    <div
                        key={idx}
                        className={`absolute inset-0 transition-opacity duration-1000 ${
                            idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                    >
                        <Image
                            src={src}
                            alt={`Hero Banner ${idx + 1}`}
                            fill
                            className="object-cover"
                            priority={idx === 0}
                            quality={100}
                        />
                    </div>
                ))}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 z-20 pointer-events-none" />
            </div>

            {/* Arrow navigation */}
            <div className="hidden lg:flex justify-between items-center w-full absolute top-1/2 left-0 px-6 -translate-y-1/2 pointer-events-none z-30">
                <button 
                    onClick={handlePrevSlide}
                    className="pointer-events-auto w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/40 transition-all duration-300 text-white shadow-lg">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <button 
                    onClick={handleNextSlide}
                    className="pointer-events-auto w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/40 transition-all duration-300 text-white shadow-lg">
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>

            {/* Content */}
            <div className="container mx-auto relative z-10 w-full px-4 flex flex-col justify-between h-full lg:h-full lg:flex lg:items-end lg:justify-center">
                
                {/* Hero headline - Visually hidden (sr-only) to prevent overlap with pre-designed text on the banner image, while maintaining 100% SEO strength */}
                <div className="sr-only">
                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[62px] font-extrabold text-white leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)] mb-4 lg:mb-5 tracking-tight">
                        Hành Trình Đẳng Cấp,<br />
                        <span className="bg-gradient-to-r from-[#00dba1] to-[#00f5b9] bg-clip-text text-transparent drop-shadow-none">Trải Nghiệm Khác Biệt</span>
                    </h1>
                    <p className="text-xs sm:text-base md:text-xl text-white/95 font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] max-w-2xl mx-auto leading-relaxed">
                        VNGroup Tourist — Chuyên tổ chức tour trong nước & quốc tế uy tín, tour MICE, dịch vụ Visa hàng đầu tại TP.HCM.
                    </p>
                </div>

                <div className="w-full lg:w-[880px] max-w-full lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 lg:translate-y-1/2 z-20">

                    {/* Search Card */}
                    <div
                        className="bg-white/80 backdrop-blur-xl rounded-[28px] border border-white/40 overflow-visible p-1.5"
                        style={{ boxShadow: '0 30px 70px rgba(0,0,0,0.22)' }}
                    >
                        {/* Top label strip */}
                        <div className="flex items-center gap-2 px-6 pt-4 pb-1">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#00dba1] animate-pulse" />
                            <span className="text-[11px] font-bold tracking-widest text-[#00a878] uppercase">
                                Tìm kiếm hành trình của bạn
                            </span>
                        </div>

                        {/* Unified search bar */}
                        <div className="flex flex-col lg:flex-row items-stretch gap-2 p-2">

                            {/* ── Destination Dropdown ── */}
                            <div className="flex-1 relative" ref={dropdownRef}>
                                {/* Trigger */}
                                <div
                                    className={`flex items-center gap-3 px-5 py-4 rounded-2xl cursor-pointer transition-all duration-300 select-none border ${
                                        isDropdownOpen 
                                            ? 'bg-white shadow-[0_8px_30px_rgba(0,219,161,0.06)] border-[#00dba1]/20 ring-2 ring-[#00dba1]/20' 
                                            : 'bg-white/30 hover:bg-white/60 border-transparent'
                                    }`}
                                    onClick={handleOpenDropdown}
                                >
                                    <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                                        isDropdownOpen ? 'bg-[#00dba1] text-white' : 'bg-white/80 text-gray-500 shadow-sm'
                                    }`}>
                                        <MapPin className="w-4 h-4" />
                                    </div>

                                    <div className="flex flex-col min-w-0 flex-1">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                                            Điểm đến
                                        </span>
                                        {/* Show search input when open, label when closed */}
                                        {isDropdownOpen ? (
                                            <input
                                                ref={searchInputRef}
                                                type="text"
                                                value={searchText}
                                                onChange={e => setSearchText(e.target.value)}
                                                placeholder="Bạn muốn đi đâu?"
                                                onClick={e => e.stopPropagation()}
                                                className="bg-transparent border-none outline-none text-sm font-bold text-gray-800 placeholder-gray-400 w-full"
                                            />
                                        ) : (
                                            <span className={`text-sm font-bold truncate ${selectedDestination ? 'text-gray-800' : 'text-gray-400'}`}>
                                                {selectedDestination ? selectedDestination.name : 'Nhập địa điểm du lịch...'}
                                            </span>
                                        )}
                                    </div>

                                    {/* Clear or chevron icon */}
                                    {selectedDestination && !isDropdownOpen ? (
                                        <button onClick={handleClearDestination} className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-300 hover:bg-gray-400 flex items-center justify-center transition-colors">
                                            <X className="w-3 h-3 text-gray-600" />
                                        </button>
                                    ) : (
                                        <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-[#00dba1]' : ''}`} />
                                    )}
                                </div>

                                {/* Dropdown Panel */}
                                {isDropdownOpen && (
                                    <div
                                        className="absolute top-full left-0 mt-2.5 w-full min-w-[280px] bg-white/95 backdrop-blur-md rounded-2xl border border-gray-100 z-50 overflow-hidden"
                                        style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.15)' }}
                                    >
                                        {/* All option */}
                                        <button
                                            onClick={() => handleSelectDestination(null)}
                                            className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-bold hover:bg-[#f0fdf9] transition-colors border-b border-gray-50 ${!selectedDestination ? 'text-[#00a878] bg-[#f0fdf9]' : 'text-gray-700'}`}
                                        >
                                            <div className="w-8 h-8 rounded-full bg-[#00dba1]/10 flex items-center justify-center flex-shrink-0">
                                                <Globe className="w-4 h-4 text-[#00a878]" />
                                            </div>
                                            Tất cả điểm đến
                                        </button>

                                        {/* Filtered list */}
                                        <div className="max-h-52 overflow-y-auto">
                                            {destinations.length === 0 ? (
                                                <div className="py-6 text-center text-sm text-gray-400">
                                                    <div className="animate-spin w-5 h-5 border-2 border-[#00dba1] border-t-transparent rounded-full mx-auto mb-2" />
                                                    Đang tải...
                                                </div>
                                            ) : filteredDestinations.length === 0 ? (
                                                <div className="py-6 text-center text-sm text-gray-400">
                                                    Không tìm thấy điểm đến nào
                                                </div>
                                            ) : (
                                                filteredDestinations.map((dest) => (
                                                    <button
                                                        key={dest.id}
                                                        onClick={() => handleSelectDestination(dest)}
                                                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-[#f0fdf9] transition-colors text-left ${selectedDestination?.id === dest.id ? 'text-[#00a878] font-bold bg-[#f0fdf9]' : 'text-gray-700 font-medium'}`}
                                                    >
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${selectedDestination?.id === dest.id ? 'bg-[#00dba1] text-white' : 'bg-gray-100 text-gray-500'}`}>
                                                            {dest.code?.slice(0, 2).toUpperCase()}
                                                        </div>
                                                        {dest.name}
                                                    </button>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* ── Departure date ── */}
                            <div
                                className={`flex-1 flex items-center gap-3 px-5 py-4 rounded-2xl cursor-text transition-all duration-300 border ${
                                    focusedField === 'date' 
                                        ? 'bg-white shadow-[0_8px_30px_rgba(0,219,161,0.06)] border-[#00dba1]/20 ring-2 ring-[#00dba1]/20' 
                                        : 'bg-white/30 hover:bg-white/60 border-transparent'
                                }`}
                                onClick={() => (document.getElementById('input-date') as HTMLInputElement)?.showPicker?.()}
                            >
                                <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                                    focusedField === 'date' ? 'bg-[#00dba1] text-white' : 'bg-white/80 text-gray-500 shadow-sm'
                                }`}>
                                    <Calendar className="w-4 h-4" />
                                </div>
                                <div className="flex flex-col min-w-0 flex-1">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                                        Ngày khởi hành
                                    </span>
                                    <input
                                        id="input-date"
                                        type="date"
                                        value={selectedDate}
                                        onChange={e => setSelectedDate(e.target.value)}
                                        onFocus={() => setFocusedField('date')}
                                        onBlur={() => setFocusedField(null)}
                                        className="bg-transparent border-none outline-none text-sm font-bold text-gray-800 w-full cursor-pointer [color-scheme:light]"
                                    />
                                </div>
                            </div>

                            {/* ── Search Button ── */}
                            <div className="flex items-center pt-2 lg:pt-0">
                                <button
                                    onClick={handleSearch}
                                    className="w-full lg:w-auto h-14 px-8 rounded-2xl flex items-center justify-center gap-2 font-bold text-white text-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-95 shimmer-btn shadow-[0_8px_25px_rgba(0,219,161,0.3)] hover:shadow-[0_12px_30px_rgba(0,219,161,0.45)]"
                                    style={{
                                        background: 'linear-gradient(135deg, #00dba1 0%, #00b87a 100%)',
                                    }}
                                >
                                    <Search className="w-5 h-5" strokeWidth={2.5} />
                                    <span className="uppercase tracking-wider">Tìm kiếm</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
