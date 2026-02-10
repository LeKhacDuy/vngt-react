'use client';

import { useEffect, useState } from 'react';

// Hoa Mai vàng (Yellow Apricot Blossom) falling effect for Tết
export default function TetDecorations() {
    const [mounted, setMounted] = useState(false);
    const [petals, setPetals] = useState<Array<{
        id: number;
        left: number;
        animationDuration: number;
        animationDelay: number;
        size: number;
        type: 'mai' | 'sparkle' | 'coin';
    }>>([]);

    useEffect(() => {
        setMounted(true);
        // Generate random petals only on client
        const newPetals = Array.from({ length: 8 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            animationDuration: 10 + Math.random() * 15,
            animationDelay: Math.random() * 8,
            size: 14 + Math.random() * 14,
            type: i % 5 === 0 ? 'coin' : (i % 4 === 0 ? 'sparkle' : 'mai') as 'mai' | 'sparkle' | 'coin'
        }));
        setPetals(newPetals);
    }, []);

    // Don't render anything on server to avoid hydration mismatch
    if (!mounted) return null;

    return (
        <>
            {/* Falling petals container */}
            <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
                {petals.map((petal) => (
                    <div
                        key={petal.id}
                        className="absolute animate-fall"
                        style={{
                            left: `${petal.left}%`,
                            animationDuration: `${petal.animationDuration}s`,
                            animationDelay: `${petal.animationDelay}s`,
                            fontSize: `${petal.size}px`,
                        }}
                    >
                        {/* Hoa Mai vàng - Yellow Apricot Blossom */}
                        {petal.type === 'mai' && <span className="drop-shadow-md">🌼</span>}
                        {petal.type === 'sparkle' && <span className="text-yellow-400">✨</span>}
                        {petal.type === 'coin' && <span>🧧</span>}
                    </div>
                ))}
            </div>



            {/* Decorative lanterns on sides - hidden on mobile */}
            <div className="hidden lg:block fixed top-32 left-4 z-[9997] animate-swing pointer-events-none">
                <div className="text-4xl drop-shadow-lg">🏮</div>
            </div>
            <div className="hidden lg:block fixed top-44 right-4 z-[9997] animate-swing-reverse pointer-events-none">
                <div className="text-4xl drop-shadow-lg">🏮</div>
            </div>
            <div className="hidden lg:block fixed top-56 left-6 z-[9997] animate-swing pointer-events-none">
                <div className="text-3xl drop-shadow-lg">🧧</div>
            </div>

            {/* CSS for animations */}
            <style jsx global>{`
                @keyframes fall {
                    0% {
                        transform: translateY(-10vh) rotate(0deg) scale(1);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    50% {
                        transform: translateY(50vh) rotate(360deg) scale(0.9);
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(110vh) rotate(720deg) scale(0.7);
                        opacity: 0;
                    }
                }

                @keyframes swing {
                    0%, 100% {
                        transform: rotate(-8deg);
                    }
                    50% {
                        transform: rotate(8deg);
                    }
                }

                @keyframes swing-reverse {
                    0%, 100% {
                        transform: rotate(8deg);
                    }
                    50% {
                        transform: rotate(-8deg);
                    }
                }

                .animate-fall {
                    animation: fall linear infinite;
                }

                .animate-swing {
                    animation: swing 3s ease-in-out infinite;
                    transform-origin: top center;
                }

                .animate-swing-reverse {
                    animation: swing-reverse 3.5s ease-in-out infinite;
                    transform-origin: top center;
                }
            `}</style>
        </>
    );
}
