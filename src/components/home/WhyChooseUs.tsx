'use client';

import { ShieldCheck, UserCheck, CreditCard, Headphones } from 'lucide-react';

const features = [
    {
        icon: <ShieldCheck className="w-8 h-8 text-[#00dba1]" />,
        title: "Thương hiệu uy tín",
        description: "Hơn 10 năm kinh nghiệm trong lĩnh vực du lịch lữ hành."
    },
    {
        icon: <UserCheck className="w-8 h-8 text-[#00dba1]" />,
        title: "Dịch vụ chuyên nghiệp",
        description: "Đội ngũ nhân viên tận tâm, tư vấn 24/7."
    },
    {
        icon: <CreditCard className="w-8 h-8 text-[#00dba1]" />,
        title: "Giá cả tiết kiệm",
        description: "Cam kết giá tốt nhất thị trường cùng nhiều ưu đãi."
    },
    {
        icon: <Headphones className="w-8 h-8 text-[#00dba1]" />,
        title: "Hỗ trợ 24/7",
        description: "Luôn sẵn sàng giải quyết mọi vấn đề của khách hàng."
    }
];

export default function WhyChooseUs() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Vì sao chọn VNGROUP TOURIST?</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">Chúng tôi cam kết mang đến những trải nghiệm du lịch tuyệt vời nhất cho khách hàng với dịch vụ chất lượng và giá cả hợp lý.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 hover:bg-[#00dba1]/5 hover:-translate-y-2 transition-all duration-300">
                            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-3">{feature.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
