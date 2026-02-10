'use client';

import { Users, Briefcase, Globe, GraduationCap } from 'lucide-react';

const stats = [
    {
        id: 1,
        label: "Lượt khách hàng",
        value: "3,000+",
        icon: <Users className="w-12 h-12 text-[#0f7ae5]" />
    },
    {
        id: 2,
        label: "Khách đoàn",
        value: "900+",
        icon: <Briefcase className="w-12 h-12 text-[#0f7ae5]" />
    },
    {
        id: 3,
        label: "Đối tác chiến lược",
        value: "100+",
        icon: <Globe className="w-12 h-12 text-[#0f7ae5]" />
    },
    {
        id: 4,
        label: "Nhân sự đào tạo",
        value: "100%",
        icon: <GraduationCap className="w-12 h-12 text-[#0f7ae5]" />
    }
];

export default function StatsSection() {
    return (
        <section className="py-20 relative bg-[#e0f7fa]">
            {/* Background Image Simulation (Beach/Ocean) */}
            <div
                className="absolute inset-0 z-0 opacity-50"
                style={{
                    backgroundImage: 'linear-gradient(to bottom, #22d3ee, #ffffff)',
                }}
            ></div>

            {/* Overlay Pattern/Image can be added here */}
            {/* Ideally this would be a real image: /images/beach-footer.jpg */}

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-1 rounded-full mb-4">
                        <span className="text-[#0f7ae5] font-bold uppercase tracking-wider text-sm">Thành tựu</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#003580] uppercase tracking-wide">CHÚNG TÔI TỰ HÀO</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    {stats.map((item) => (
                        <div key={item.id} className="flex flex-col items-center p-6 hover:-translate-y-2 transition-transform duration-300">
                            <div className="mb-4 p-4 rounded-full bg-white/30 backdrop-blur-sm shadow-sm border border-white/50">
                                {item.icon}
                            </div>
                            <div className="text-4xl md:text-5xl font-extrabold text-[#fbbf24] drop-shadow-sm mb-2" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.1)' }}>
                                {item.value}
                            </div>
                            <div className="text-lg font-bold text-[#003580] uppercase tracking-tight">
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
