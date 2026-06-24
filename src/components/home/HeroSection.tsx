'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Search, MapPin, Calendar, ArrowLeft, ArrowRight, ChevronDown, Globe, X, Compass, Plane, Hotel, Bed, ShieldCheck, Star } from 'lucide-react';
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
    category_id?: number;
}

const DEPARTURES = [
    'TP. Hồ Chí Minh',
    'Hà Nội',
    'Đà Nẵng',
    'Cần Thơ',
    'Nha Trang',
    'Hải Phòng'
];

export default function HeroSection() {
    const router = useRouter();
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
    const [searchText, setSearchText] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    // Departure states
    const [selectedDeparture, setSelectedDeparture] = useState('TP. Hồ Chí Minh');
    const [isDepartureDropdownOpen, setIsDepartureDropdownOpen] = useState(false);

    const [selectedDate, setSelectedDate] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0);

    // New states for premium Vietravel-style search bar
    const [tourCategory, setTourCategory] = useState<'domestic' | 'international'>('domestic');
    const [activeTab, setActiveTab] = useState<'tours' | 'flight_hotel' | 'hotel' | 'flight' | 'visa'>('tours');

    const TABS = [
        { id: 'tours', label: 'TOUR TRỌN GÓI', icon: Compass },
        { id: 'flight_hotel', label: 'VÉ MÁY BAY + KHÁCH SẠN', icon: Bed },
        { id: 'hotel', label: 'KHÁCH SẠN', icon: Hotel },
        { id: 'flight', label: 'VÉ MÁY BAY', icon: Plane },
        { id: 'visa', label: 'DỊCH VỤ VISA', icon: ShieldCheck }
    ];

    const POPULAR_SEARCHES = [
        { label: 'TOUR XUYÊN VIỆT', type: 'domestic', query: 'Xuyên Việt' },
        { label: 'TOUR PHÚ QUỐC', type: 'domestic', query: 'Phú Quốc' },
        { label: 'TOUR THÁI LAN', type: 'international', query: 'Thái Lan' },
        { label: 'TOUR TRUNG QUỐC', type: 'international', query: 'Trung Quốc' },
        { label: 'DỊCH VỤ VISA', type: 'visa', query: '' }
    ];

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
    const departureDropdownRef = useRef<HTMLDivElement>(null);
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
            if (departureDropdownRef.current && !departureDropdownRef.current.contains(e.target as Node)) {
                setIsDepartureDropdownOpen(false);
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

    // Filter destinations by active category first (1 for domestic, 2 for international)
    const categoryFilteredDests = destinations.filter(d => 
        tourCategory === 'domestic' ? d.category_id === 1 : d.category_id === 2
    );

    const filteredDestinations = categoryFilteredDests.filter(d =>
        d.name.toLowerCase().includes(searchText.toLowerCase()) ||
        d.code.toLowerCase().includes(searchText.toLowerCase())
    );

    // Handler for category change with smart destination reset
    const handleCategoryChange = (category: 'domestic' | 'international') => {
        setTourCategory(category);
        if (selectedDestination) {
            const expectedCategoryId = category === 'domestic' ? 1 : 2;
            if (selectedDestination.category_id !== expectedCategoryId) {
                setSelectedDestination(null);
            }
        }
    };

    // Handler for top tab click with routing logic
    const handleTabClick = (tab: typeof TABS[0]) => {
        setActiveTab(tab.id as any);
        if (tab.id === 'visa') {
            router.push('/visa-page');
        } else if (tab.id === 'flight_hotel' || tab.id === 'hotel' || tab.id === 'flight') {
            router.push('/tickets');
        }
    };

    // Handler for popular search clicks
    const handlePopularSearchClick = (tag: typeof POPULAR_SEARCHES[0]) => {
        if (tag.type === 'visa') {
            router.push('/visa-page');
            return;
        }
        
        setTourCategory(tag.type as 'domestic' | 'international');
        
        const found = destinations.find(d => 
            d.name.toLowerCase().includes(tag.query.toLowerCase()) &&
            (tag.type === 'domestic' ? d.category_id === 1 : d.category_id === 2)
        );
        
        if (found) {
            setSelectedDestination(found);
            const params = new URLSearchParams();
            if (selectedDeparture) params.set('departure', selectedDeparture);
            params.set('destinationId', String(found.id));
            params.set('destinationName', found.name);
            if (selectedDate) params.set('date', selectedDate);
            router.push(`/tours/search?${params.toString()}`);
        } else {
            const params = new URLSearchParams();
            if (selectedDeparture) params.set('departure', selectedDeparture);
            params.set('keyword', tag.query);
            router.push(`/tours/search?${params.toString()}`);
        }
    };

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
        if (selectedDeparture) {
            params.set('departure', selectedDeparture);
        }
        if (selectedDestination) {
            params.set('destinationId', String(selectedDestination.id));
            params.set('destinationName', selectedDestination.name);
        } else {
            // Pass the category filter to the search page if "All destinations" is selected
            params.set('category', tourCategory === 'domestic' ? 'domestic' : 'international');
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

                <div className="w-full lg:w-[980px] max-w-full lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 lg:translate-y-1/2 z-20">

                    {/* Tabs Menu */}
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3.5 px-2 sm:px-0">
                        {TABS.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabClick(tab)}
                                    className={`flex items-center gap-2 px-4 py-3 rounded-t-2xl rounded-b-lg font-bold text-xs sm:text-[13px] transition-all duration-300 ${
                                        isActive
                                            ? 'bg-gradient-to-r from-[#00dba1] to-[#00b87a] text-white shadow-[0_8px_25px_rgba(0,219,161,0.22)] border-t-2 border-[#00f5b9]'
                                            : 'bg-white/85 backdrop-blur-md text-gray-700 hover:bg-white border border-white/40 hover:text-[#00a878]'
                                    }`}
                                >
                                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white animate-pulse' : 'text-gray-500'}`} />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Search Card */}
                    <div
                        className="bg-white/85 backdrop-blur-2xl rounded-[28px] border border-white/50 overflow-visible p-1.5"
                        style={{ boxShadow: '0 30px 70px rgba(0,0,0,0.22)' }}
                    >
                        {/* Unified search bar */}
                        <div className="flex flex-col lg:flex-row items-stretch gap-2.5 p-2">

                            {/* ── Category Selector (Trong nước / Nước ngoài) ── */}
                            <div className="flex-shrink-0 flex flex-row lg:flex-col justify-center items-center lg:items-start gap-6 lg:gap-2.5 px-6 py-4 rounded-2xl bg-white/40 border border-white/20 lg:w-44 select-none shadow-sm">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="tourCategory"
                                        checked={tourCategory === 'domestic'}
                                        onChange={() => handleCategoryChange('domestic')}
                                        className="sr-only"
                                    />
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                                        tourCategory === 'domestic' 
                                            ? 'border-[#00dba1] bg-[#00dba1]/10 scale-105 shadow-sm' 
                                            : 'border-gray-300 bg-transparent group-hover:border-gray-400'
                                    }`}>
                                        <div className={`w-2.5 h-2.5 rounded-full bg-[#00dba1] transition-transform duration-300 ${
                                            tourCategory === 'domestic' ? 'scale-100 animate-fade-in' : 'scale-0'
                                        }`} />
                                    </div>
                                    <span className={`text-[13px] font-bold tracking-wide transition-colors duration-300 whitespace-nowrap ${
                                        tourCategory === 'domestic' ? 'text-[#00a878]' : 'text-gray-600 group-hover:text-gray-800'
                                    }`}>
                                        Trong nước
                                    </span>
                                </label>

                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="tourCategory"
                                        checked={tourCategory === 'international'}
                                        onChange={() => handleCategoryChange('international')}
                                        className="sr-only"
                                    />
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                                        tourCategory === 'international' 
                                            ? 'border-[#00dba1] bg-[#00dba1]/10 scale-105 shadow-sm' 
                                            : 'border-gray-300 bg-transparent group-hover:border-gray-400'
                                    }`}>
                                        <div className={`w-2.5 h-2.5 rounded-full bg-[#00dba1] transition-transform duration-300 ${
                                            tourCategory === 'international' ? 'scale-100 animate-fade-in' : 'scale-0'
                                        }`} />
                                    </div>
                                    <span className={`text-[13px] font-bold tracking-wide transition-colors duration-300 whitespace-nowrap ${
                                        tourCategory === 'international' ? 'text-[#00a878]' : 'text-gray-600 group-hover:text-gray-800'
                                    }`}>
                                        Nước ngoài
                                    </span>
                                </label>
                            </div>

                            {/* ── Departure Point Dropdown ── */}
                            <div className="flex-1 min-w-0 relative" ref={departureDropdownRef}>
                                {/* Trigger */}
                                <div
                                    className={`flex items-center gap-3 px-5 py-4 rounded-2xl cursor-pointer transition-all duration-300 select-none border ${
                                        isDepartureDropdownOpen 
                                            ? 'bg-white shadow-[0_8px_30px_rgba(0,219,161,0.06)] border-[#00dba1]/20 ring-2 ring-[#00dba1]/20' 
                                            : 'bg-white/30 hover:bg-white/60 border-transparent'
                                    }`}
                                    onClick={() => setIsDepartureDropdownOpen(!isDepartureDropdownOpen)}
                                >
                                    <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                                        isDepartureDropdownOpen ? 'bg-[#00dba1] text-white' : 'bg-white/80 text-gray-500 shadow-sm'
                                    }`}>
                                        <Compass className="w-4 h-4" />
                                    </div>

                                    <div className="flex flex-col min-w-0 flex-1">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                                            Điểm khởi hành
                                        </span>
                                        <div className="h-5 flex items-center">
                                            <span className="text-sm font-bold text-gray-800 truncate leading-none">
                                                {selectedDeparture}
                                            </span>
                                        </div>
                                    </div>
                                    <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-300 ${isDepartureDropdownOpen ? 'rotate-180 text-[#00dba1]' : ''}`} />
                                </div>

                                {/* Dropdown Panel */}
                                {isDepartureDropdownOpen && (
                                    <div
                                        className="absolute top-full left-0 mt-2.5 w-full min-w-[200px] bg-white/95 backdrop-blur-md rounded-2xl border border-gray-100 z-50 overflow-hidden animate-fade-in"
                                        style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.15)' }}
                                    >
                                        <div className="max-h-48 overflow-y-auto">
                                            {DEPARTURES.map((dep) => (
                                                <button
                                                    key={dep}
                                                    onClick={() => {
                                                        setSelectedDeparture(dep);
                                                        setIsDepartureDropdownOpen(false);
                                                    }}
                                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-[#f0fdf9] transition-colors text-left ${selectedDeparture === dep ? 'text-[#00a878] font-bold bg-[#f0fdf9]' : 'text-gray-700 font-medium'}`}
                                                >
                                                    {dep}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* ── Destination Dropdown (Lọc động hoàn toàn không bị rối) ── */}
                            <div className="flex-1 min-w-0 relative" ref={dropdownRef}>
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
                                            Điểm đến ({tourCategory === 'domestic' ? 'Trong nước' : 'Nước ngoài'})
                                        </span>
                                        <div className="h-5 flex items-center">
                                            {/* Show search input when open, label when closed */}
                                            {isDropdownOpen ? (
                                                <input
                                                    ref={searchInputRef}
                                                    type="text"
                                                    value={searchText}
                                                    onChange={e => setSearchText(e.target.value)}
                                                    placeholder="Bạn muốn đi đâu?"
                                                    onClick={e => e.stopPropagation()}
                                                    className="bg-transparent border-none outline-none text-sm font-bold text-gray-800 placeholder-gray-400 w-full min-w-0 p-0 leading-none h-full"
                                                />
                                            ) : (
                                                <span className={`text-sm font-bold truncate leading-none ${selectedDestination ? 'text-gray-800' : 'text-gray-400'}`}>
                                                    {selectedDestination ? selectedDestination.name : 'Nhập địa điểm du lịch...'}
                                                </span>
                                            )}
                                        </div>
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
                                        className="absolute top-full left-0 mt-2.5 w-full min-w-[320px] bg-white/95 backdrop-blur-md rounded-2xl border border-gray-100 z-50 overflow-hidden animate-fade-in"
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
                                            Tất cả điểm đến {tourCategory === 'domestic' ? 'Trong nước' : 'Nước ngoài'}
                                        </button>

                                        {/* Flat list already filtered by category */}
                                        <div className="max-h-64 overflow-y-auto">
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
                                                <div className="py-1">
                                                    {filteredDestinations.map((dest) => (
                                                        <button
                                                            key={dest.id}
                                                            onClick={() => handleSelectDestination(dest)}
                                                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-[#f0fdf9] transition-colors text-left ${selectedDestination?.id === dest.id ? 'text-[#00a878] font-bold bg-[#f0fdf9]' : 'text-gray-700 font-medium'}`}
                                                        >
                                                            <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold ${selectedDestination?.id === dest.id ? 'bg-[#00dba1] text-white' : 'bg-gray-100 text-gray-500'}`}>
                                                                {dest.code?.slice(0, 2).toUpperCase()}
                                                            </div>
                                                            <span className="truncate">{dest.name}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* ── Departure date ── */}
                            <div
                                className={`flex-1 min-w-0 flex items-center gap-3 px-5 py-4 rounded-2xl cursor-text transition-all duration-300 border ${
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
                                    <div className="h-5 flex items-center">
                                        <input
                                            id="input-date"
                                            type="date"
                                            value={selectedDate}
                                            onChange={e => setSelectedDate(e.target.value)}
                                            onFocus={() => setFocusedField('date')}
                                            onBlur={() => setFocusedField(null)}
                                            className="bg-transparent border-none outline-none text-sm font-bold text-gray-800 w-full cursor-pointer [color-scheme:light] p-0 leading-none h-full"
                                        />
                                    </div>
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

                        {/* Popular Searches strip */}
                        <div className="flex flex-wrap items-center gap-2 px-6 pt-2 pb-3 text-xs border-t border-gray-100/50 mt-1.5">
                            <span className="font-bold text-gray-500 mr-1 whitespace-nowrap">Tìm kiếm nổi bật:</span>
                            <div className="flex flex-wrap items-center gap-1.5">
                                {POPULAR_SEARCHES.map((tag) => (
                                    <button
                                        key={tag.label}
                                        onClick={() => handlePopularSearchClick(tag)}
                                        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#f0fdf9] text-[#00a878] hover:bg-[#e6fbf4] border border-[#00dba1]/20 font-bold transition-all duration-300 hover:-translate-y-0.5 active:scale-95 text-[11px]"
                                    >
                                        <Star className="w-3 h-3 fill-[#00a878]/15 text-[#00a878]" />
                                        {tag.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
