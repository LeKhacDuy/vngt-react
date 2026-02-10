'use client';

import Link from 'next/link';
import { Phone } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function FloatingContact() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const zaloLink = "https://zalo.me/0931867376";
    const messengerLink = "https://m.me/vngrouptourist";
    const hotline = "tel:0931867376";

    return (
        <div className={`fixed bottom-6 right-6 z-50 flex flex-col gap-4 transition-all duration-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>

            {/* CSS for custom animations */}
            <style jsx>{`
                @keyframes wiggle {
                    0%, 100% { transform: rotate(-3deg); }
                    50% { transform: rotate(3deg); }
                }
                @keyframes zoom {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                @keyframes ripple {
                    0% { box-shadow: 0 0 0 0 rgba(0, 219, 161, 0.7); }
                    70% { box-shadow: 0 0 0 15px rgba(0, 219, 161, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(0, 219, 161, 0); }
                }
                .animate-wiggle { animation: wiggle 1s ease-in-out infinite; }
                .animate-zoom { animation: zoom 2s ease-in-out infinite; }
                .animate-ripple { animation: ripple 1.5s infinite; }
            `}</style>

            {/* Messenger (Zoom effect) */}
            <Link
                href={messengerLink}
                target="_blank"
                className="w-14 h-14 bg-[#0084ff] rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/30 transition-transform relative group animate-zoom"
                style={{ animationDelay: '0s' }}
            >
                <div className="absolute right-full mr-3 bg-white text-gray-800 text-xs font-bold px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Chat Messenger
                </div>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                    <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.91 1.442 5.51 3.708 7.234V22l3.385-1.858a10.612 10.612 0 002.907.416c5.523 0 10-4.145 10-9.258C22 6.145 17.523 2 12 2zm1.096 11.954l-2.768-2.957-5.402 2.957 5.938-6.307 2.793 2.956 5.378-2.956-5.939 6.307z" />
                </svg>
            </Link>

            {/* Zalo (Wiggle effect) */}
            <Link
                href={zaloLink}
                target="_blank"
                className="w-14 h-14 bg-[#0068ff] rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-600/30 transition-transform relative group animate-wiggle"
                style={{ animationDelay: '0.5s' }}
            >
                <div className="absolute right-full mr-3 bg-white text-gray-800 text-xs font-bold px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Chat Zalo
                </div>
                <span className="font-bold text-sm">Zalo</span>
            </Link>

            {/* Phone/Hotline (Ripple effect) */}
            <Link
                href={hotline}
                className="w-14 h-14 bg-[#00dba1] rounded-full flex items-center justify-center text-white shadow-lg transition-transform relative group animate-ripple"
            >
                <div className="absolute right-full mr-3 bg-white text-gray-800 text-xs font-bold px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Gọi ngay
                </div>
                <Phone className="w-7 h-7 fill-current" />
            </Link>

        </div>
    );
}
