'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Search, MapPin, Calendar, ArrowLeft, ArrowRight, ChevronDown, Globe, X } from 'lucide-react';
import { tourService } from '@/services/tour.service';
import { useRouter } from 'next/navigation';

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
        <section className="relative flex flex-col lg:block h-auto lg:h-[75vh]">
            {/* Background Image */}
            <div className="relative w-full h-[320px] lg:absolute lg:inset-0 lg:h-full z-0">
                <Image
                    src="/images/banner-30-4.jpg"
                    alt="Hero Banner"
                    fill
                    className="object-cover"
                    priority
                    unoptimized={true}
                    quality={100}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/50" />
            </div>

            {/* Arrow navigation */}
            <div className="hidden lg:flex justify-between items-center w-full absolute top-1/2 left-0 px-6 -translate-y-1/2 pointer-events-none z-10">
                <button className="pointer-events-auto w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/40 transition-all duration-300 text-white shadow-lg">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <button className="pointer-events-auto w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/40 transition-all duration-300 text-white shadow-lg">
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>

            {/* Content */}
            <div className="container mx-auto relative z-10 w-full px-4 lg:h-full lg:flex lg:items-end lg:justify-center lg:pb-12">
                <div className="relative mt-6 mb-8 lg:mt-0 lg:mb-0 w-full lg:w-[860px] max-w-full">

                    {/* Hero headline (desktop only) */}
                    <div className="hidden lg:block text-center mb-6">
                        <p className="text-white/80 text-sm font-medium tracking-widest uppercase mb-2">
                            Khám phá Việt Nam & thế giới
                        </p>
                        <h1 className="text-white text-4xl font-bold drop-shadow-lg">
                            Chuyến đi trong mơ của bạn bắt đầu từ đây
                        </h1>
                    </div>

                    {/* Search Card */}
                    <div
                        className="bg-white/95 backdrop-blur-xl rounded-2xl border border-white/60 overflow-visible"
                        style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.18)' }}
                    >
                        {/* Top label strip */}
                        <div className="flex items-center gap-2 px-6 pt-5 pb-0">
                            <div className="w-2 h-2 rounded-full bg-[#00dba1]" />
                            <span className="text-xs font-semibold tracking-widest text-[#00a878] uppercase">
                                Tìm tour du lịch
                            </span>
                        </div>

                        {/* Unified search bar */}
                        <div className="flex flex-col lg:flex-row items-stretch gap-0 p-4">

                            {/* ── Destination Dropdown ── */}
                            <div className="flex-1 relative" ref={dropdownRef}>
                                {/* Trigger */}
                                <div
                                    className={`flex items-center gap-3 px-5 py-4 rounded-xl lg:rounded-r-none lg:rounded-l-xl cursor-pointer transition-all duration-200 select-none ${
                                        isDropdownOpen ? 'bg-[#f0fdf9] ring-2 ring-[#00dba1]/40' : 'bg-gray-50 hover:bg-gray-100/80'
                                    }`}
                                    onClick={handleOpenDropdown}
                                >
                                    <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
                                        isDropdownOpen ? 'bg-[#00dba1]' : 'bg-gray-200'
                                    }`}>
                                        <MapPin className={`w-4 h-4 ${isDropdownOpen ? 'text-white' : 'text-gray-500'}`} />
                                    </div>

                                    <div className="flex flex-col min-w-0 flex-1">
                                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                                            Điểm đến
                                        </span>
                                        {/* Show search input when open, label when closed */}
                                        {isDropdownOpen ? (
                                            <input
                                                ref={searchInputRef}
                                                type="text"
                                                value={searchText}
                                                onChange={e => setSearchText(e.target.value)}
                                                placeholder="Tìm điểm đến..."
                                                onClick={e => e.stopPropagation()}
                                                className="bg-transparent border-none outline-none text-sm font-semibold text-gray-800 placeholder-gray-400 w-full"
                                            />
                                        ) : (
                                            <span className={`text-sm font-semibold truncate ${selectedDestination ? 'text-gray-800' : 'text-gray-400'}`}>
                                                {selectedDestination ? selectedDestination.name : 'Bạn muốn đi đâu?'}
                                            </span>
                                        )}
                                    </div>

                                    {/* Clear or chevron icon */}
                                    {selectedDestination && !isDropdownOpen ? (
                                        <button onClick={handleClearDestination} className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-300 hover:bg-gray-400 flex items-center justify-center transition-colors">
                                            <X className="w-3 h-3 text-gray-600" />
                                        </button>
                                    ) : (
                                        <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                    )}
                                </div>

                                {/* Dropdown Panel */}
                                {isDropdownOpen && (
                                    <div
                                        className="absolute top-full left-0 mt-2 w-full min-w-[260px] bg-white rounded-2xl border border-gray-100 z-50 overflow-hidden"
                                        style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.15)' }}
                                    >
                                        {/* All option */}
                                        <button
                                            onClick={() => handleSelectDestination(null)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold hover:bg-[#f0fdf9] transition-colors border-b border-gray-50 ${!selectedDestination ? 'text-[#00a878] bg-[#f0fdf9]' : 'text-gray-700'}`}
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

                            {/* Dividers */}
                            <div className="hidden lg:flex items-center px-1">
                                <div className="w-px h-10 bg-gray-200" />
                            </div>
                            <div className="block lg:hidden my-1 mx-1 h-px bg-gray-200" />

                            {/* ── Departure date ── */}
                            <div
                                className={`flex-1 flex items-center gap-3 px-5 py-4 rounded-xl lg:rounded-none cursor-text transition-all duration-200 ${
                                    focusedField === 'date' ? 'bg-[#f0fdf9] ring-2 ring-[#00dba1]/40' : 'bg-gray-50 hover:bg-gray-100/80'
                                }`}
                                onClick={() => (document.getElementById('input-date') as HTMLInputElement)?.showPicker?.()}
                            >
                                <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
                                    focusedField === 'date' ? 'bg-[#00dba1]' : 'bg-gray-200'
                                }`}>
                                    <Calendar className={`w-4 h-4 ${focusedField === 'date' ? 'text-white' : 'text-gray-500'}`} />
                                </div>
                                <div className="flex flex-col min-w-0 flex-1">
                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                                        Ngày khởi hành
                                    </span>
                                    <input
                                        id="input-date"
                                        type="date"
                                        value={selectedDate}
                                        onChange={e => setSelectedDate(e.target.value)}
                                        onFocus={() => setFocusedField('date')}
                                        onBlur={() => setFocusedField(null)}
                                        className="bg-transparent border-none outline-none text-sm font-semibold text-gray-800 w-full cursor-pointer [color-scheme:light]"
                                    />
                                </div>
            
                            </div>

                            {/* ── Search Button ── */}
                            <div className="flex items-center px-1 pt-2 lg:pt-0">
                                <button
                                    onClick={handleSearch}
                                    className="w-full lg:w-auto h-14 px-7 rounded-xl flex items-center justify-center gap-2 font-bold text-white text-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                                    style={{
                                        background: 'linear-gradient(135deg, #00dba1 0%, #00b87a 100%)',
                                        boxShadow: '0 8px 24px rgba(0,219,161,0.4)',
                                    }}
                                >
                                    <Search className="w-5 h-5" strokeWidth={2.5} />
                                    <span>Tìm kiếm</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
