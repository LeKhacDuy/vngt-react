'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { tourService, Tour, getImageUrl } from '@/services/tour.service';
import { MapPin, Clock, ArrowRight, Star, Compass, Utensils, Hash, Calendar } from 'lucide-react';
import InboundIntro from '@/components/tours/InboundIntro';
import TourCard from '@/components/common/TourCard';

// Custom icons/themes for Inbound
const themes = [
    { id: 'culture', label: 'Culture & Heritage', icon: <Compass className="w-5 h-5" />, color: 'bg-orange-100 text-orange-600' },
    { id: 'food', label: 'Culinary Delights', icon: <Utensils className="w-5 h-5" />, color: 'bg-green-100 text-green-600' },
    { id: 'adventure', label: 'Nature & Adventure', icon: <Hash className="w-5 h-5" />, color: 'bg-blue-100 text-blue-600' },
    { id: 'luxury', label: 'Luxury Retreats', icon: <Star className="w-5 h-5" />, color: 'bg-purple-100 text-purple-600' },
];

const regions = [
    { name: 'North Vietnam', desc: 'Hanoi, Sapa, Ha Long Bay', image: '/images/inbound/halong-north.png' },
    { name: 'Central Vietnam', desc: 'Hue, Da Nang, Hoi An', image: '/images/inbound/danang-central.png' },
    { name: 'South Vietnam', desc: 'HCMC, Mekong Delta', image: '/images/inbound/nhatrang-south.png' },
];

export default function InboundToursPage() {
    const [tours, setTours] = useState<Tour[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTheme, setSelectedTheme] = useState('all');

    useEffect(() => {
        const fetchTours = async () => {
            try {
                // Try fetching inbound tours. If empty, maybe fallback to domestic or hot.
                const response = await tourService.getInboundTours();
                if (response && response.data) {
                    setTours(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch inbound tours:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTours();
    }, []);

    // Filter logic (mocked for theme since real API might not have theme field yet)
    // In real app, we would filter by 'subcategory' or specific tags.
    // For now, we just show all or filter client-side if we had the field.
    const filteredTours = tours;
    // TODO: Implement real theme filtering when API supports it or we have mapping.

    if (loading) {
        return (
            <div className="min-h-screen bg-[#fffaf5] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f5a623]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fffaf5] font-sans selection:bg-[#f5a623] selection:text-white pb-20">

            {/* Custom Hero with InboundIntro integrated */}
            <div className="pt-8">
                <InboundIntro />
            </div>

            <div className="container mx-auto px-4">

                {/* 1. Explore by Region (Visual Grid) */}
                <section className="mb-20">
                    <div className="text-center mb-10">
                        <span className="text-[#f5a623] font-bold tracking-widest uppercase text-sm">Discover Vietnam</span>
                        <h2 className="text-3xl md:text-5xl font-serif text-gray-900 mt-2">Explore by Region</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {regions.map((region, idx) => (
                            <div key={idx} className="group relative h-[400px] rounded-[2rem] overflow-hidden cursor-pointer">
                                <Image
                                    src={region.image}
                                    alt={region.name}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                                <div className="absolute bottom-0 left-0 p-8 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-2xl font-bold text-white mb-2 font-serif">{region.name}</h3>
                                    <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0 delay-100">
                                        {region.desc}
                                    </p>
                                    <div className="w-12 h-1 bg-[#f5a623] mt-4 rounded-full origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-200"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 2. Curated Themes (Interactive Filter) */}
                <section className="mb-16">
                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={() => setSelectedTheme('all')}
                            className={`px-6 py-3 rounded-full border-2 transition-all font-bold ${selectedTheme === 'all' ? 'border-[#f5a623] bg-[#f5a623] text-white' : 'border-gray-200 bg-white text-gray-500 hover:border-[#f5a623] hover:text-[#f5a623]'}`}
                        >
                            All Experiences
                        </button>
                        {themes.map(theme => (
                            <button
                                key={theme.id}
                                onClick={() => setSelectedTheme(theme.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full border-2 transition-all font-bold ${selectedTheme === theme.id ? `${theme.color} border-transparent ring-2 ring-offset-2 ring-gray-200` : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'}`}
                            >
                                {theme.icon}
                                {theme.label}
                            </button>
                        ))}
                    </div>
                </section>

                {/* 3. Signature Journeys (Horizontal Cards) */}
                <section className="space-y-8">
                    {filteredTours.length > 0 ? filteredTours.map((tour) => (
                        <div key={tour.id} className="group bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col lg:flex-row gap-6 lg:gap-8 items-center">
                            {/* Image Side */}
                            <div className="relative w-full lg:w-[45%] h-[280px] rounded-2xl overflow-hidden shrink-0">
                                <Image
                                    src={getImageUrl(tour.thumbnail)}
                                    alt={tour.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 45vw"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-gray-800">
                                    Signature Tour
                                </div>
                                {/* Like heart could go here */}
                            </div>

                            {/* Content Side */}
                            <div className="flex-1 py-2 lg:pr-8 w-full text-left">
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 mb-3">
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4 text-[#f5a623]" />
                                        {tour.duration} Ngày
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4 text-[#f5a623]" />
                                        Daily Departure
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4 text-[#f5a623]" />
                                        {/* Fallback code/id if name missing, ideally mapped from regions */}
                                        Vietnam
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-serif group-hover:text-[#f5a623] transition-colors">
                                    <Link href={`/tours/${tour.tour_code || tour.id}`}>
                                        {tour.name}
                                    </Link>
                                </h3>

                                <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">
                                    {tour.highlights || `Experience the magic of Vietnam with our curated itinerary for ${tour.name}.`}
                                </p>

                                <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                                    <div>
                                        <span className="text-gray-400 text-sm block">Starting from</span>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-2xl font-bold text-[#f5a623]">
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tour.web_price)}
                                            </span>
                                            {/* <span className="text-sm text-gray-400 line-through">{tour.originalPrice}</span> */}
                                        </div>
                                    </div>

                                    <Link
                                        href={`/tours/${tour.tour_code || tour.id}`}
                                        className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-[#f5a623] transition-colors group/btn"
                                    >
                                        View Itinerary
                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-20">
                            <p className="text-gray-500">Updating inbound journeys...</p>
                        </div>
                    )}
                </section>

                {/* 4. Infinite Scroll Prompt */}
                {filteredTours.length > 0 && (
                    <div className="text-center mt-16">
                        <button className="px-8 py-3 bg-transparent border-2 border-gray-900 text-gray-900 rounded-full font-bold hover:bg-gray-900 hover:text-white transition-all uppercase tracking-widest text-sm">
                            Load More Journeys
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}
