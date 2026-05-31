import Image from 'next/image';
import Link from 'next/link';
import { Heart, Users, Star, MessageCircle, ThumbsUp, ShieldCheck, PhoneCall, ChevronRight } from 'lucide-react';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Vì sao khách hàng chọn VNGroup Tourist | Đánh giá chân thực',
    description: 'Khám phá lý do hàng ngàn khách hàng tin tưởng lựa chọn VNGroup Tourist. Xem đánh giá chân thực, review lịch trình, chất lượng hướng dẫn viên và dịch vụ tận tâm.',
    keywords: ['VNGroup Tourist', 'Review VNGroup Tourist', 'Đánh giá VNGroup Tourist', 'Công ty du lịch uy tín', 'Tour du lịch chất lượng', 'Feedback khách hàng du lịch'],
    openGraph: {
        title: 'Vì sao khách hàng chọn VNGroup Tourist?',
        description: 'Đừng chỉ nghe chúng tôi nói, hãy xem khách hàng cảm nhận gì sau mỗi chuyến đi cùng VNGroup Tourist. Dịch vụ tận tâm, lịch trình chu đáo.',
        type: 'website',
        locale: 'vi_VN',
        url: 'https://vngrouptourist.com/why-choose-us',
        siteName: 'VNGroup Tourist',
        images: [
            {
                url: '/images/slider2.jpg', // Có thể thay bằng URL hình thật
                width: 1200,
                height: 630,
                alt: 'Khách hàng đánh giá VNGroup Tourist',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Vì sao khách hàng chọn VNGroup Tourist?',
        description: 'Đừng chỉ nghe chúng tôi nói, hãy xem khách hàng cảm nhận gì sau mỗi chuyến đi cùng VNGroup Tourist.',
    },
    alternates: {
        canonical: 'https://vngrouptourist.com/why-choose-us',
    }
};

export default function WhyChooseUsPage() {
    const feedbackImages = [
        "/feedback/feedback-tq.jpg",
        "/feedback/feedback-thai-lan-10-4.jpg",
        "/feedback/feedback-thai-lan-18-4.jpg",
        "/feedback/z7816401995460_4f318fceddb8493c94e51dc4a33e9df4.jpg",
        "/feedback/z7816402005503_19036d35fb9978bdd59b1aef248d4920.jpg",
        "/feedback/z7816402009809_4e50c1f8d4b7e2621766c3cfd32a1bf8.jpg",
        "/feedback/z7816402017259_2e461c4823995754dc164b32f82989be.jpg",
        "/feedback/z7816439146774_01be57e539cd0c69d1dbbf42efbf3027.jpg",
        "/feedback/z7816439619198_f518cfafc986c881a5c3f8812595f196.jpg"
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans pb-20">
            {/* Hero Section */}
            <section className="relative pt-24 pb-32 overflow-hidden bg-gradient-to-br from-[#00dba1] via-[#00c791] to-[#009b70]">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 left-10 w-64 h-64 bg-white opacity-10 rounded-full blur-2xl"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white text-sm font-semibold mb-8 animate-fade-in-up">
                        <Heart className="w-4 h-4 text-pink-200" fill="currentColor" />
                        Niềm tin của khách hàng là tài sản lớn nhất
                    </div>
                    
                    <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in-up delay-100 max-w-4xl mx-auto">
                        VÌ SAO KHÁCH HÀNG LẠI CHỌN <br />
                        <span className="text-yellow-300">VNGroup Tourist?</span>
                    </h1>
                    
                    <p className="text-xl lg:text-2xl text-white/90 font-light leading-relaxed max-w-3xl mx-auto animate-fade-in-up delay-200">
                        Không phải vì tụi em nói hay. Mà vì sau mỗi chuyến đi, khách là người cảm nhận rõ nhất.
                    </p>
                </div>
                
                {/* Curved wave at bottom */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
                    <svg className="relative block w-full h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="#f9fafb"></path>
                    </svg>
                </div>
            </section>

            {/* The 3 key points */}
            <section className="relative z-20 -mt-16 container mx-auto px-4 mb-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    <div className="bg-white rounded-2xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 hover:-translate-y-2 transition-transform duration-300 text-center group">
                        <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Users className="w-8 h-8 text-blue-500" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Chương trình phù hợp</h3>
                        <p className="text-gray-600">Có khách khen chương trình thiết kế rất phù hợp và chu đáo cho gia đình.</p>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 hover:-translate-y-2 transition-transform duration-300 text-center group">
                        <div className="w-16 h-16 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <ShieldCheck className="w-8 h-8 text-[#00dba1]" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">HDV Nhiệt tình</h3>
                        <p className="text-gray-600">Có khách ấn tượng mãi vì sự chuyên nghiệp và hướng dẫn viên cực kỳ nhiệt tình.</p>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 hover:-translate-y-2 transition-transform duration-300 text-center group">
                        <div className="w-16 h-16 mx-auto bg-yellow-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Sự tin tưởng</h3>
                        <p className="text-gray-600">Có khách đi tour Trung Quốc về rồi nói: "Lần tới có cơ hội chị sẽ lựa chọn tiếp bên em."</p>
                    </div>
                </div>
            </section>

            {/* Deep Message */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#00dba1]/10 to-[#00dba1]/5 rounded-3xl p-10 md:p-16 border border-[#00dba1]/20 relative">
                        <MessageCircle className="absolute top-8 left-8 w-12 h-12 text-[#00dba1]/20" />
                        <p className="text-2xl md:text-3xl text-gray-800 font-medium leading-relaxed text-center relative z-10">
                            "Với VNGroup Tourist, một chuyến đi không chỉ là lịch trình, khách sạn hay điểm tham quan. Đó còn là cách mình chăm sóc khách trong suốt hành trình, xử lý từng chi tiết nhỏ và để khách trở về với cảm giác: <span className="text-[#00dba1] font-bold">đi đáng tiền, được quan tâm, và muốn quay lại.</span>"
                        </p>
                    </div>
                </div>
            </section>

            {/* Feedback Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            Lướt tiếp để xem feedback thật từ khách hàng nhà VNGroup Tourist nha ✨
                        </h2>
                        <div className="w-24 h-1 bg-[#00dba1] mx-auto rounded-full mt-6"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {feedbackImages.map((imgSrc, idx) => (
                            <div key={idx} className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200 group hover:shadow-2xl transition-all duration-300">
                                <Image 
                                    src={imgSrc} 
                                    alt={`Feedback khách hàng ${idx + 1}`} 
                                    fill 
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <div className="flex items-center gap-2 text-white">
                                        <Heart className="w-5 h-5 fill-pink-500 text-pink-500" />
                                        <span className="font-medium">Khách hàng yêu thích</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA & Hashtags Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center bg-gray-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
                        {/* Background glowing effects */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00dba1] opacity-20 blur-[100px] rounded-full"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 opacity-20 blur-[100px] rounded-full"></div>
                        
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                                Sẵn sàng trải nghiệm dịch vụ tận tâm?
                            </h2>
                            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                                📩 Inbox để được tư vấn tour phù hợp cho gia đình, công ty hoặc nhóm bạn.
                            </p>
                            
                            <Link 
                                href="/contact-page" 
                                className="inline-flex items-center gap-2 px-10 py-5 bg-[#00dba1] hover:bg-[#00c28e] text-white font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,219,161,0.4)]"
                            >
                                <PhoneCall className="w-5 h-5" />
                                INBOX NHẬN TƯ VẤN NGAY
                            </Link>

                            <div className="mt-12 flex flex-wrap justify-center gap-3">
                                {[
                                    '#VNGroupTourist', 
                                    '#FeedbackKhachHang', 
                                    '#ReviewTour', 
                                    '#TourTrungQuoc', 
                                    '#DuLichTrungQuoc', 
                                    '#TourGiaDinh', 
                                    '#DichVuTanTam', 
                                    '#ChamSocChuDao'
                                ].map((tag) => (
                                    <span key={tag} className="px-4 py-2 bg-white/10 text-gray-300 rounded-full text-sm font-medium border border-white/5 hover:bg-white/20 transition-colors cursor-pointer">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
