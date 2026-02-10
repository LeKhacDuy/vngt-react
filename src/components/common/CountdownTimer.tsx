'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
    endDate: string;
    onExpire?: () => void;
}

export default function CountdownTimer({ endDate, onExpire }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = new Date(endDate).getTime() - new Date().getTime();

            if (difference <= 0) {
                setIsExpired(true);
                if (onExpire) onExpire();
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
            }

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [endDate, onExpire]);

    if (isExpired) {
        return (
            <div className="text-center py-4 px-6 bg-gray-100 rounded-xl">
                <p className="text-gray-600 font-semibold">Chương trình đã kết thúc</p>
            </div>
        );
    }

    return (
        <div className="flex gap-3 justify-center">
            <TimeUnit value={timeLeft.days} label="Ngày" />
            <TimeUnit value={timeLeft.hours} label="Giờ" />
            <TimeUnit value={timeLeft.minutes} label="Phút" />
            <TimeUnit value={timeLeft.seconds} label="Giây" />
        </div>
    );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
    return (
        <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center border-2 border-red-100">
                <span className="text-2xl font-bold text-red-600">{value.toString().padStart(2, '0')}</span>
            </div>
            <span className="text-xs text-white font-semibold mt-2 uppercase tracking-wide">{label}</span>
        </div>
    );
}
