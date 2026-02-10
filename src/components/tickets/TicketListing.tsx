'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { tickets } from '@/data/tickets';
import TicketItem from './TicketItem';
import { ChevronRight, Search, RotateCcw, MessageCircle } from 'lucide-react';

export default function TicketListing() {
    const [filters, setFilters] = useState({
        brand: '',
        location: '',
        category: '',
        search: ''
    });

    const uniqueBrands = Array.from(new Set(tickets.map(t => t.brand))).sort();
    const uniqueLocations = Array.from(new Set(tickets.map(t => t.location))).sort();
    const uniqueCategories = Array.from(new Set(tickets.flatMap(t => t.categories || []))).sort();

    const filteredTickets = useMemo(() => {
        return tickets.filter(ticket => {
            const matchesBrand = filters.brand ? ticket.brand === filters.brand : true;
            const matchesLocation = filters.location ? ticket.location === filters.location : true;
            const matchesCategory = filters.category
                ? ticket.categories?.includes(filters.category)
                : true;

            const matchesSearch = filters.search
                ? ticket.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                ticket.description.toLowerCase().includes(filters.search.toLowerCase())
                : true;

            return matchesBrand && matchesLocation && matchesCategory && matchesSearch;
        });
    }, [filters]);

    const resetFilters = () => {
        setFilters({ brand: '', location: '', category: '', search: '' });
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20 relative">
            {/* Breadcrumb */}
            <section className="bg-white border-b border-gray-200 py-8 lg:py-12 shadow-sm">
                <div className="container mx-auto px-4">
                    <nav className="flex items-center text-sm text-gray-500 mb-4">
                        <Link href="/" className="hover:text-[#00dba1] transition-colors">Trang chủ</Link>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <span className="font-semibold text-gray-800">Vé tham quan du lịch</span>
                    </nav>
                    <h1 className="text-3xl lg:text-5xl font-normal text-gray-800">Vé tham quan du lịch</h1>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12">
                {/* Filters Toolbar */}
                <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 mb-10">
                    <div className="flex flex-col lg:flex-row gap-6 items-end">
                        <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Brand Filter */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Thương hiệu</label>
                                <select
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#00dba1] focus:ring-1 focus:ring-[#00dba1] transition-all"
                                    value={filters.brand}
                                    onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                                >
                                    <option value="">Tất cả thương hiệu</option>
                                    {uniqueBrands.map(b => (
                                        <option key={b} value={b}>{b}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Location Filter */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Khu / Điểm đến</label>
                                <select
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#00dba1] focus:ring-1 focus:ring-[#00dba1] transition-all"
                                    value={filters.location}
                                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                                >
                                    <option value="">Tất cả điểm đến</option>
                                    {uniqueLocations.map(l => (
                                        <option key={l} value={l}>{l}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Category Filter */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Loại vé</label>
                                <select
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#00dba1] focus:ring-1 focus:ring-[#00dba1] transition-all"
                                    value={filters.category}
                                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                                >
                                    <option value="">Tất cả loại vé</option>
                                    {uniqueCategories.map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Search & Reset */}
                        <div className="flex gap-4 w-full lg:w-auto">
                            <div className="space-y-2 flex-grow lg:w-64">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tìm kiếm</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Tìm theo tên..."
                                        className="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#00dba1] focus:ring-1 focus:ring-[#00dba1] transition-all"
                                        value={filters.search}
                                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                    />
                                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                                </div>
                            </div>

                            <button
                                onClick={resetFilters}
                                className="h-[50px] px-6 mt-auto bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl flex items-center gap-2 font-bold transition-colors"
                                title="Xóa lọc"
                            >
                                <RotateCcw className="w-4 h-4" />
                                <span className="hidden md:inline">Xóa lọc</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                {filteredTickets.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredTickets.map(ticket => (
                            <TicketItem key={ticket.id} ticket={ticket} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                        <div className="text-4xl mb-4">🎫</div>
                        <p className="text-gray-500 text-lg">Không tìm thấy vé nào phù hợp.</p>
                        <button onClick={resetFilters} className="mt-4 text-[#00dba1] font-bold hover:underline">
                            Xem tất cả vé
                        </button>
                    </div>
                )}
            </div>

            {/* Floating Booking Button */}
            <a
                href="https://zalo.me/0931867376"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-8 right-8 z-50 flex items-center gap-3 pl-4 pr-6 py-3 bg-gradient-to-r from-[#0068ff] to-[#0054cc] text-white rounded-full shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group"
            >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#0068ff]">
                    <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <span className="font-bold whitespace-nowrap">Đặt vé ngay</span>
            </a>
        </div>
    );
}
