'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Clock, ArrowRight, Filter } from 'lucide-react';
import { tours } from '@/data/tours';

// Generate mock departures based on existing tours
const generateDepartures = () => {
    return tours.flatMap(tour => {
        // Generate 3 random dates for each tour in next 2 months
        return [1, 2, 3].map(i => {
            const date = new Date();
            date.setDate(date.getDate() + (i * 7) + Math.floor(Math.random() * 5));
            return {
                ...tour,
                departureDate: date,
                seats: 20,
                available: Math.floor(Math.random() * 10),
                status: Math.random() > 0.3 ? 'Available' : 'Last Seats'
            };
        });
    }).sort((a, b) => a.departureDate.getTime() - b.departureDate.getTime());
};

const departures = generateDepartures();

export default function SchedulePage() {
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());

    // Filter by month
    const filteredDepartures = departures.filter(d => d.departureDate.getMonth() === selectedMonth);

    const months = [
        { value: 0, label: 'Tháng 1' }, { value: 1, label: 'Tháng 2' },
        { value: 2, label: 'Tháng 3' }, { value: 3, label: 'Tháng 4' },
        { value: 4, label: 'Tháng 5' }, { value: 5, label: 'Tháng 6' },
        { value: 6, label: 'Tháng 7' }, { value: 7, label: 'Tháng 8' },
        { value: 8, label: 'Tháng 9' }, { value: 9, label: 'Tháng 10' },
        { value: 10, label: 'Tháng 11' }, { value: 11, label: 'Tháng 12' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-[#003580] text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">Lịch Khởi Hành</h1>
                    <p className="text-blue-100 max-w-2xl mx-auto">
                        Cập nhật liên tục lịch khởi hành các tour trong nước và quốc tế.
                        Đặt sớm để nhận ưu đãi tốt nhất!
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8">
                {/* Filter Bar */}
                <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-2 text-gray-700 font-bold">
                        <Filter className="w-5 h-5 text-[#00dba1]" />
                        Bộ lọc:
                    </div>

                    <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                        {months.map(m => (
                            <button
                                key={m.value}
                                onClick={() => setSelectedMonth(m.value)}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${selectedMonth === m.value ? 'bg-[#00dba1] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                            >
                                {m.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Departures List */}
                <div className="space-y-4">
                    {filteredDepartures.length > 0 ? (
                        filteredDepartures.map((item, idx) => (
                            <div key={idx} className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col md:flex-row items-center gap-6">
                                {/* Date Box */}
                                <div className="flex flex-col items-center justify-center p-4 bg-blue-50 text-blue-800 rounded-xl min-w-[100px]">
                                    <span className="text-3xl font-bold">{item.departureDate.getDate()}</span>
                                    <span className="text-sm font-semibold uppercase">Tháng {item.departureDate.getMonth() + 1}</span>
                                </div>

                                {/* Tour Info */}
                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-500 mb-1">
                                        <MapPin className="w-4 h-4 text-[#00dba1]" />
                                        {item.destination}
                                        <span className="w-1 h-1 bg-gray-300 rounded-full mx-2"></span>
                                        <Clock className="w-4 h-4 text-[#00dba1]" />
                                        {item.duration}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-[#00dba1] transition-colors">
                                        <Link href={`/tours/${item.id}`}>{item.name}</Link>
                                    </h3>
                                    <div className="flex items-center justify-center md:justify-start gap-4 text-sm">
                                        <span className={`px-3 py-1 rounded-full font-bold text-xs ${item.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {item.status === 'Available' ? 'Còn chỗ' : 'Sắp hết'}
                                        </span>
                                        <span className="text-gray-500">
                                            Còn <strong>{item.available}</strong> chỗ
                                        </span>
                                    </div>
                                </div>

                                {/* Price & Action */}
                                <div className="text-center md:text-right min-w-[180px] border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 w-full md:w-auto mt-4 md:mt-0">
                                    <div className="text-gray-400 text-sm line-through mb-1">{item.originalPrice}</div>
                                    <div className="text-2xl font-bold text-[#f5a623] mb-3">{item.price}</div>
                                    <Link
                                        href={`/tours/${item.id}`}
                                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#00dba1] hover:bg-[#00c28e] text-white font-bold rounded-lg transition-all w-full md:w-auto justify-center"
                                    >
                                        Đặt ngay <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white rounded-2xl">
                            <p className="text-gray-500 text-lg">Không tìm thấy lịch khởi hành trong tháng này.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
