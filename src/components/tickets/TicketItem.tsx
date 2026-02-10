'use client';

import Image from 'next/image';
import { Ticket } from '@/data/tickets';
import { Clock, MapPin, Tag } from 'lucide-react';

export default function TicketItem({ ticket }: { ticket: Ticket }) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    return (
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
            {/* Image Header */}
            <div className="relative h-48 bg-gray-50 flex items-center justify-center p-6 border-b border-gray-100">
                <div className="relative w-full h-full">
                    <Image
                        src={ticket.image || '/images/tour1.jpg'}
                        alt={ticket.title}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                </div>

                <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-[#00dba1]/10 text-[#00dba1] text-xs font-bold rounded-full uppercase tracking-wider backdrop-blur-sm">
                        {ticket.brand}
                    </span>
                    <span className="px-3 py-1 bg-gray-900/10 text-gray-800 text-xs font-bold rounded-full uppercase tracking-wider backdrop-blur-sm">
                        {ticket.location}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 min-h-[56px] group-hover:text-[#00dba1] transition-colors">
                    {ticket.title}
                </h3>

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 bg-gray-50 p-2 rounded-lg w-fit">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">Hạn dùng: {ticket.validity}</span>
                </div>

                <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                    {ticket.description}
                </p>

                {/* Pricing Table */}
                <div className="space-y-2 mb-6">
                    {ticket.pricing.map((price, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 bg-[#00dba1]/5 rounded-xl border border-[#00dba1]/10 dashed">
                            <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">{price.audience}</span>
                            <div className="flex flex-col items-end">
                                <span className="font-bold text-[#00a86b] text-lg">{formatPrice(Number(price.price))}</span>
                                <span className="text-[10px] text-gray-400">{price.priceLabel}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-auto">
                    {ticket.notes && (
                        <div className="text-xs text-gray-500 mb-4 bg-gray-50 p-3 rounded-xl italic">
                            * {ticket.notes}
                        </div>
                    )}

                    <a
                        href="https://zalo.me/0931867376"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center py-3 rounded-xl bg-gray-900 text-white font-bold hover:bg-[#00dba1] transition-colors shadow-lg hover:shadow-[#00dba1]/30"
                    >
                        Liên hệ đặt vé
                    </a>
                </div>
            </div>
        </div>
    );
}
