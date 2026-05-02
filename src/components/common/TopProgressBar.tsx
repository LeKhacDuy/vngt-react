'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function TopProgressBar() {
    const pathname = usePathname();
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const prevPathname = useRef(pathname);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const completeTimerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Only trigger on actual path changes
        if (pathname === prevPathname.current) return;
        prevPathname.current = pathname;

        // Clear any existing timers
        if (timerRef.current) clearInterval(timerRef.current);
        if (completeTimerRef.current) clearTimeout(completeTimerRef.current);

        // Start progress
        setProgress(0);
        setIsVisible(true);

        // Quickly jump to ~30%
        requestAnimationFrame(() => setProgress(30));

        // Then slowly crawl to ~90%
        timerRef.current = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 90) {
                    if (timerRef.current) clearInterval(timerRef.current);
                    return prev;
                }
                // Slow down as it gets higher
                const increment = prev < 50 ? 8 : prev < 70 ? 4 : 1;
                return Math.min(prev + increment, 90);
            });
        }, 200);

        // Complete the progress (page has loaded since pathname changed)
        completeTimerRef.current = setTimeout(() => {
            if (timerRef.current) clearInterval(timerRef.current);
            setProgress(100);
            // Hide after animation
            setTimeout(() => {
                setIsVisible(false);
                setProgress(0);
            }, 300);
        }, 100);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            if (completeTimerRef.current) clearTimeout(completeTimerRef.current);
        };
    }, [pathname]);

    if (!isVisible && progress === 0) return null;

    return (
        <div
            className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none"
            style={{ height: '3px' }}
        >
            <div
                style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #00dba1, #00e6ac, #00f0b5)',
                    boxShadow: '0 0 10px rgba(0, 219, 161, 0.7), 0 0 5px rgba(0, 219, 161, 0.5)',
                    transition: progress === 0
                        ? 'none'
                        : progress === 100
                            ? 'width 200ms ease-out, opacity 300ms ease-out'
                            : 'width 400ms ease-out',
                    opacity: progress === 100 ? 0 : 1,
                    borderRadius: '0 2px 2px 0',
                }}
            />
        </div>
    );
}
