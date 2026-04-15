'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Tag } from 'lucide-react';

const CTKM_IMAGES = [
    '/images/ctkm/z7725407860130_496ae96f08f5be56430b6407d903ea33.jpg',
    '/images/ctkm/z7725407864832_96ecae060da271c348e39a6d491e2283.jpg',
    '/images/ctkm/z7725407872065_4a8fc53a24a02b1af2b39e14064d759e.jpg',
    '/images/ctkm/z7725415724288_3c9a5a3cd44f307eaa3ea7b878f8e1d7.jpg',
    '/images/ctkm/z7725415729527_2c295a88c3b8b0614e63caf816532499.jpg',
    '/images/ctkm/z7725415736791_5877e191ca9ab0b420a835a2a5a85370.jpg',
    '/images/ctkm/z7725415758943_1f985c95e91fb51e6d0e88800e971355.jpg',
    '/images/ctkm/z7725415794068_77692cf97549417283ca8a7f17ee6884.jpg',
    '/images/ctkm/z7725415843529_16a15aa240c5e92d84f7ee9b9b424afa.jpg',
];

const VISIBLE = 4;

export default function PromoBannerSlider() {
    const [current, setCurrent] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const total = CTKM_IMAGES.length;
    const maxIndex = total - VISIBLE;

    const goTo = useCallback((index: number) => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrent(Math.max(0, Math.min(index, maxIndex)));
        setTimeout(() => setIsAnimating(false), 400);
    }, [isAnimating, maxIndex]);

    const next = useCallback(() => {
        goTo(current >= maxIndex ? 0 : current + 1);
    }, [current, maxIndex, goTo]);

    const prev = useCallback(() => {
        goTo(current <= 0 ? maxIndex : current - 1);
    }, [current, maxIndex, goTo]);

    // Auto-scroll
    useEffect(() => {
        timerRef.current = setInterval(next, 3500);
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [next]);

    const resetTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(next, 3500);
    };

    const handlePrev = () => { prev(); resetTimer(); };
    const handleNext = () => { next(); resetTimer(); };
    const handleDot = (i: number) => { goTo(i); resetTimer(); };

    return (
        <section className="py-10 bg-white">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#00dba1]/10 flex items-center justify-center">
                            <Tag className="w-4 h-4 text-[#00a878]" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">
                            Ưu Đãi <span className="text-[#00a878]">VNGroup Tourist</span>
                        </h2>
                    </div>
                    {/* Arrows */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePrev}
                            className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:border-[#00dba1] hover:text-[#00a878] transition-all shadow-sm"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:border-[#00dba1] hover:text-[#00a878] transition-all shadow-sm"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Slider viewport */}
                <div className="overflow-hidden rounded-2xl">
                    <div
                        className="flex gap-4 transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(calc(-${current} * (100% / ${VISIBLE} + 16px / ${VISIBLE})))`,
                        }}
                    >
                        {CTKM_IMAGES.map((src, idx) => (
                            <div
                                key={idx}
                                className="flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer group"
                                style={{
                                    width: `calc((100% - ${(VISIBLE - 1) * 16}px) / ${VISIBLE})`,
                                    minWidth: '240px',
                                }}
                            >
                                <div className="relative w-full aspect-[1/1] overflow-hidden rounded-2xl bg-gray-50">
                                    <Image
                                        src={src}
                                        alt={`Ưu đãi ${idx + 1}`}
                                        fill
                                        className="object-contain group-hover:scale-[1.02] transition-transform duration-500"
                                        unoptimized
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dot indicators */}
                <div className="flex justify-center gap-2 mt-5">
                    {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => handleDot(i)}
                            className={`rounded-full transition-all duration-300 ${
                                i === current
                                    ? 'w-6 h-2 bg-[#00dba1]'
                                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
