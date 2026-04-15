'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { tourService, Tour, getImageUrl } from '@/services/tour.service';
import TourCard from '@/components/common/TourCard';
import { ChevronRight } from 'lucide-react';

export interface FilterTab {
    id: string;
    label: string;
    icon: string;
}

interface TourListingProps {
    category: string;
    title: string;
    description?: string;
    introSection?: React.ReactNode;
    filterTabs?: FilterTab[];
    subcategoryCode?: string; // When set, fetches tours by subcategory_code instead of category
    initialDestinationCode?: string; // Pre-filter by destination (from search page)
}

export default function TourListing({ category, title, description, introSection, filterTabs, subcategoryCode, initialDestinationCode }: TourListingProps) {
    const [tours, setTours] = useState<Tour[]>([]);
    const [destinations, setDestinations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDestination, setSelectedDestination] = useState(initialDestinationCode || '');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | ''>('');
    const [visibleCount, setVisibleCount] = useState(8);
    // Parse initial destination id
    const initialDestId = initialDestinationCode ? Number(initialDestinationCode) : null;
    const [selectedDestId, setSelectedDestId] = useState<number | null>(initialDestId);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch Tours
                let tourResponse;
                if (subcategoryCode) {
                    // Fetch by subcategory_code (e.g. spring, summer, promotion, etc.)
                    tourResponse = await tourService.getToursBySubcategory(subcategoryCode);
                } else if (category === 'international') {
                    tourResponse = await tourService.getInternationalTours();
                } else if (category === 'domestic') {
                    tourResponse = await tourService.getDomesticTours();
                } else if (category === 'group') {
                    tourResponse = await tourService.getGroupTours();
                } else {
                    tourResponse = await tourService.getAll();
                }

                if (tourResponse && tourResponse.data) {
                    setTours(tourResponse.data);
                }

                // Fetch Destinations — filter by matching category
                const destResponse = await tourService.getDestinations();
                if (destResponse && destResponse.data) {
                    let dests = destResponse.data;
                    if (category === 'international') {
                        dests = dests.filter((d: any) => d.category_id === 2);
                    } else if (category === 'domestic') {
                        dests = dests.filter((d: any) => d.category_id === 1);
                    } else if (category === 'inbound') {
                        dests = dests.filter((d: any) => d.category_id === 3 || d.category_id === 4);
                    }
                    // 'group', 'all', subcategoryCode → show all destinations
                    setDestinations(dests);
                }

            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [category, subcategoryCode]);

    // Filter and Sort Logic
    const filteredTours = useMemo(() => {
        let result = tours;

        // Note: API returns filtered list by category already (e.g. international),
        // so we don't need to filter by category.code === 'international' if the API is correct.
        // But if getAll returns EVERYTHING, we might need check. 
        // Our service methods (getInternationalTours) use params to filter on server, 
        // returns only relevant tours. So no need to filter by category again here usually.

        if (selectedDestId) {
            result = result.filter(t => t.destination_id === selectedDestId);
        }

        // Subcategory Filter (Tab)
        if (selectedSubCategory) {
            result = result.filter(t => t.subcategory_code === selectedSubCategory);
        }

        if (sortOrder) {
            result.sort((a, b) => {
                const priceA = a.web_price || 0;
                const priceB = b.web_price || 0;
                return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
            });
        }

        return result;
    }, [tours, selectedDestId, selectedSubCategory, sortOrder]);

    const displayedTours = filteredTours.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 4);
    };

    // Map Tour to UI props for TourCard
    const mapTourToCard = (tour: Tour) => ({
        id: tour.id.toString(),
        name: tour.name,
        image: getImageUrl(tour.thumbnail),
        price: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tour.web_price),
        originalPrice: undefined,
        duration: `${tour.duration} Ngày`,
        departure: 'Liên hệ',
        discount: tour.subcategory_code === 'hot' ? 'Hot' : undefined,
        slug: tour.id.toString(),
        category: category
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00dba1]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Breadcrumb / Page Header — always visible */}
            <section className="bg-white border-b border-gray-200 py-8 lg:py-12">
                <div className="container mx-auto px-4">
                    <nav className="flex items-center text-sm text-gray-500 mb-4">
                        <Link href="/" className="hover:text-[#00dba1] transition-colors">Trang chủ</Link>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <span className="font-semibold text-gray-800">{title}</span>
                    </nav>
                    <h1 className="text-3xl lg:text-5xl font-normal text-gray-800">{title}</h1>
                    {description && <p className="mt-4 text-gray-500">{description}</p>}
                </div>
            </section>

            {/* Featured Destination Strip (Optional) */}
            {introSection}

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8 lg:py-12">

                {/* Filter Tabs (Horizontal Scroll) */}
                {filterTabs && (
                    <div className="flex overflow-x-auto gap-3 pb-6 mb-8 scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0">
                        <button
                            onClick={() => setSelectedSubCategory('')}
                            className={`flex items-center gap-2 px-5 py-3 rounded-xl border transition-all whitespace-nowrap ${selectedSubCategory === '' ? 'bg-[#00dba1]/10 border-[#00dba1] text-[#00dba1] font-bold' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                        >
                            <span className="text-xl">🎯</span>
                            Tất cả
                        </button>
                        {filterTabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedSubCategory(tab.id)}
                                className={`flex items-center gap-2 px-5 py-3 rounded-xl border transition-all whitespace-nowrap ${selectedSubCategory === tab.id ? 'bg-[#00dba1]/10 border-[#00dba1] text-[#00dba1] font-bold' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                            >
                                <span className="text-xl">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                )}

                {/* Filters Toolbar */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <h2 className="text-2xl lg:text-3xl font-normal text-gray-800">
                        {selectedSubCategory
                            ? filterTabs?.find(t => t.id === selectedSubCategory)?.label
                            : 'Danh sách tour'}
                    </h2>

                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                        {/* Country/Destination Filter */}
                        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-2 flex-grow md:flex-grow-0">
                            <span className="text-sm font-medium text-gray-500 whitespace-nowrap">Điểm đến:</span>
                            <select
                                value={selectedDestId ?? ''}
                                onChange={(e) => setSelectedDestId(e.target.value ? Number(e.target.value) : null)}
                                className="bg-transparent border-none outline-none text-sm font-semibold text-gray-800 w-full md:w-32 cursor-pointer"
                            >
                                <option value="">Tất cả</option>
                                {destinations.map(d => (
                                    <option key={d.id} value={d.id}>{d.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Price Sort */}
                        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-2 flex-grow md:flex-grow-0">
                            <span className="text-sm font-medium text-gray-500 whitespace-nowrap">Sắp xếp:</span>
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                                className="bg-transparent border-none outline-none text-sm font-semibold text-gray-800 w-full md:w-32 cursor-pointer"
                            >
                                <option value="">Mặc định</option>
                                <option value="asc">Giá thấp đến cao</option>
                                <option value="desc">Giá cao đến thấp</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                {displayedTours.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {displayedTours.map(tour => (
                            <TourCard key={tour.id} tour={mapTourToCard(tour)} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                        <div className="text-4xl mb-4">🔍</div>
                        <p className="text-gray-500 text-lg">Chưa có tour nào thuộc danh mục này.</p>
                        <button onClick={() => { setSelectedSubCategory(''); setSelectedDestination(''); }} className="mt-4 text-[#00dba1] font-semibold hover:underline">
                            Xem tất cả tour
                        </button>
                    </div>
                )}

                {/* Load More */}
                {displayedTours.length < filteredTours.length && (
                    <div className="text-center">
                        <button
                            onClick={handleLoadMore}
                            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#00dba1]/10 text-[#00dba1] font-bold rounded-full hover:bg-[#00dba1] hover:text-white transition-all duration-300"
                        >
                            Xem thêm tour
                            <ChevronRight className="w-4 h-4 rotate-90" />
                        </button>
                        <p className="mt-3 text-sm text-gray-400">
                            Đang hiển thị {displayedTours.length}/{filteredTours.length} tour
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
