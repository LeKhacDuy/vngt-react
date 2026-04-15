'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { tourService, Tour, getImageUrl } from '@/services/tour.service';
import { ArrowRight, MapPin, Clock, Star } from 'lucide-react';

interface FeaturedDestinationStripProps {
    destinations: {
        id: number;
        name: string;
        emoji: string;
        color: string;
        accent: string;
    }[];
}

function MiniTourCard({ tour, category }: { tour: Tour; category: string }) {
    return (
        <Link
            href={`/tours/${category}/${tour.id}`}
            className="flex-shrink-0 w-64 bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
        >
            <div className="relative h-36 overflow-hidden bg-gray-100">
                {tour.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={getImageUrl(tour.thumbnail)}
                        alt={tour.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <MapPin className="w-8 h-8 text-gray-400" />
                    </div>
                )}
                <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {tour.duration}N
                </div>
            </div>
            <div className="p-3">
                <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug mb-2">{tour.name}</h4>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-400">Từ</p>
                        <p className="text-base font-bold text-[#00a878]">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(tour.web_price)}
                        </p>
                    </div>
                    <div className="flex items-center gap-0.5 text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="text-sm text-gray-500">4.8</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default function FeaturedDestinationStrip({ destinations }: FeaturedDestinationStripProps) {
    const [toursByDest, setToursByDest] = useState<Record<number, Tour[]>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                // Fetch international tours once with small limit, then split by destination
                const res = await tourService.getInternationalTours();
                if (res?.data) {
                    const map: Record<number, Tour[]> = {};
                    destinations.forEach(d => {
                        map[d.id] = res.data
                            .filter((t: Tour) => t.destination_id === d.id)
                            .slice(0, 6);
                    });
                    setToursByDest(map);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, [destinations]);

    // Show skeleton while loading
    if (loading) {
        return (
            <div className="bg-gray-50 border-b border-gray-100">
                {destinations.map(dest => (
                    <div key={dest.id} className="container mx-auto px-4 py-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-xl bg-gray-200 animate-pulse" />
                            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                        </div>
                        <div className="flex gap-3">
                            {[1,2,3,4].map(i => (
                                <div key={i} className="flex-shrink-0 w-56 h-40 rounded-xl bg-gray-200 animate-pulse" />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // Hide section if no tours found
    const hasTours = destinations.some(d => (toursByDest[d.id]?.length ?? 0) > 0);
    if (!hasTours) return null;

    return (
        <div className="bg-gray-50 border-b border-gray-100">
            {destinations.map(dest => {
                const tours = toursByDest[dest.id] ?? [];
                if (!tours.length) return null;
                return (
                    <div key={dest.id} className="container mx-auto px-4 py-6">
                        {/* Dest header */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-8 h-8 rounded-xl flex items-center justify-center text-lg"
                                    style={{ background: dest.accent }}
                                >
                                    {dest.emoji}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 text-sm">
                                        Tour <span style={{ color: dest.color }}>{dest.name}</span>
                                    </h3>
                                    <p className="text-xs text-gray-400">{tours.length} tour nổi bật</p>
                                </div>
                            </div>
                            <Link
                                href={`/tours/international?destination=${dest.id}`}
                                className="flex items-center gap-1 text-xs font-semibold text-[#00a878] hover:underline"
                            >
                                Xem tất cả <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>

                        {/* Horizontal scroll cards */}
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
                            {tours.map(tour => (
                                <MiniTourCard key={tour.id} tour={tour} category="international" />
                            ))}
                        </div>

                        {/* Thin divider between destinations */}
                        <div className="mt-4 h-px bg-gray-200" />
                    </div>
                );
            })}
        </div>
    );
}
