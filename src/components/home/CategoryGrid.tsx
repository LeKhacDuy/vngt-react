'use client';

import Link from 'next/link';
import Image from 'next/image';

const categories = [
    { id: 1, name: "Tour mùa xuân", icon: "/images/xuan.svg", href: "/tours/spring" },
    { id: 2, name: "Tour mùa hè", icon: "/images/he.svg", href: "/tours/summer" },
    { id: 3, name: "Tour mùa thu", icon: "/images/thu.svg", href: "/tours/autumn" },
    { id: 4, name: "Tour mùa đông", icon: "/images/dong.svg", href: "/tours/winter" },
    { id: 5, name: "Tour lễ 30/4", icon: "/images/le.svg", href: "/tours/holiday" },
    { id: 6, name: "Tour Mini Group", icon: "/images/gr.svg", href: "/tours/mini-group" },
    { id: 7, name: "Tour No Shop", icon: "/images/noshop.svg", href: "/tours/no-shopping" },
    { id: 8, name: "Tour Khuyến Mãi", icon: "/images/hot.svg", href: "/tours/promotion" },
];

export default function CategoryGrid() {
    return (
        <section className="py-10 lg:py-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-nowrap lg:grid lg:grid-cols-8 gap-4 lg:gap-8 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide md:justify-between">
                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={cat.href}
                            className="flex flex-col items-center gap-3 min-w-[100px] group"
                        >
                            <div className="relative w-12 h-12 transition-transform duration-300 group-hover:-translate-y-1">
                                <Image src={cat.icon} alt={cat.name} fill className="object-contain" />
                            </div>
                            <span className="text-sm font-semibold text-gray-800 text-center whitespace-nowrap lg:whitespace-normal group-hover:text-[#00dba1] transition-colors">
                                {cat.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
