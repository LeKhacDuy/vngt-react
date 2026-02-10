'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

export default function PromoPopup() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Check if popup was already shown in this session
        const wasShown = sessionStorage.getItem('promoPopupShown');
        if (!wasShown) {
            // Show popup after a small delay for better UX
            const timer = setTimeout(() => {
                setIsOpen(true);
                sessionStorage.setItem('promoPopupShown', 'true');
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsOpen(false)}
        >
            <div
                className="relative max-w-lg w-full animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute -top-3 -right-3 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                >
                    <X className="w-5 h-5 text-gray-700" />
                </button>

                {/* Popup image */}
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                        src="/Thùng bốc thăm.jpg"
                        alt="Bốc thăm trúng thưởng 100% có quà khi đăng ký tour"
                        width={600}
                        height={600}
                        className="w-full h-auto"
                        priority
                    />
                </div>

                {/* CTA Button */}
                <div className="mt-4 text-center">
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            window.open('https://zalo.me/0931867376', '_blank');
                        }}
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                        🎁 ĐĂNG KÝ TOUR NGAY
                    </button>
                </div>
            </div>

            <style jsx global>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scale-in {
                    from { 
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    to { 
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
                .animate-scale-in {
                    animation: scale-in 0.4s ease-out;
                }
            `}</style>
        </div>
    );
}
