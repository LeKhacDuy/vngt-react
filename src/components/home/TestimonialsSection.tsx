'use client';

import Image from 'next/image';
import { Quote, Star } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        content: "Minh đăng ký đi Sapa cho gia đình mình. HDV cực kỳ dễ thương và nhiệt tình, nhà hàng ăn ngon và hợp khẩu vị. Khách sạn gần chợ nên buổi tối đi chơi tự do được luôn. Đi tour về còn có nhân viên gọi hỏi thăm rất chu đáo.",
        author: "Nguyen Tran",
        role: "Khách hàng thân thiết",
        avatar: "https://ui-avatars.com/api/?name=Nguyen+Tran&background=random&color=fff",
        rating: 5
    },
    {
        id: 2,
        content: "Minh và gia đình đã tham gia chuyến du lịch Thái Lan 3 ngày 2 đêm. Cảm giác thật thoải mái và yên tâm sau chuyến đi do đội ngũ nhân viên lên kế hoạch kỹ cho đoàn của mình, đặc biệt HDV rất nhiệt tình hỗ trợ mọi người trong nhóm.",
        author: "Johnny Dang",
        role: "Doanh nhân",
        avatar: "https://ui-avatars.com/api/?name=Johnny+Dang&background=random&color=fff",
        rating: 5
    },
    {
        id: 3,
        content: "Mọi địa điểm tham quan đều được sắp xếp thời gian hợp lý, đủ thời gian trải nghiệm dịch vụ và được chụp hình ghi lại những bức ảnh kỉ niệm. Chất lượng món ăn ở nhà hàng phù hợp với khẩu vị với đoàn của mình.",
        author: "Jessica Nguyen",
        role: "Travel Blogger",
        avatar: "https://ui-avatars.com/api/?name=Jessica+Nguyen&background=random&color=fff",
        rating: 5
    }
];

export default function TestimonialsSection() {
    return (
        <section className="py-20 bg-white relative overflow-hidden">
            {/* Background Pattern (Doodles simulation) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}
            ></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <Quote className="w-8 h-8 text-[#00dba1] fill-current opacity-50" />
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 uppercase tracking-wide">Cảm Nhận Khách Hàng</h2>
                    </div>
                    <div className="w-24 h-1 bg-[#00dba1] mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item) => (
                        <div key={item.id} className="bg-gray-50 rounded-3xl p-8 relative hover:-translate-y-2 transition-transform duration-300 border border-gray-100 shadow-sm hover:shadow-xl">
                            <Quote className="absolute top-8 left-8 w-10 h-10 text-[#00dba1]/20 -scale-x-100" />

                            <p className="text-gray-600 italic mb-8 relative z-10 leading-relaxed min-h-[120px]">
                                "{item.content}"
                            </p>

                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 rounded-full border-4 border-white shadow-md overflow-hidden mb-4 relative">
                                    <Image
                                        src={item.avatar}
                                        alt={item.author}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="font-bold text-gray-900 text-lg">{item.author}</h3>
                                <p className="text-sm text-gray-500 mb-2">{item.role}</p>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < item.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
