'use client';

import Image from 'next/image';

export default function InboundIntro() {
    return (
        <div className="mb-16">
            {/* Hero Animation Section */}
            <div className="relative w-screen -ml-[50vw] left-1/2 mt-4 mb-8 overflow-hidden h-[300px] lg:h-[420px]">
                <div className="absolute inset-0 animate-[kenburns_14s_ease-in-out_infinite_alternate]">
                    <Image
                        src="/images/inbound/hero.png"
                        // Restored from legacy bia_inb.png
                        alt="Inbound Hero"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>

            {/* Intro Content Wrapper */}
            <div className="container mx-auto px-4 relative -mt-16 z-10">
                <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">

                    {/* Section 1: Overview */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                        <div className="relative h-[260px] rounded-2xl overflow-hidden group">
                            <Image
                                src="/images/inbound/sapa-north.png"
                                alt="Overview"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Overview of Our Inbound Services</h3>
                            <p className="text-[#f5a623] font-bold italic mb-4 text-lg">Experience Vietnam your way!</p>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Tại VNGroup Tourist, chúng tôi cung cấp dịch vụ du lịch inbound chuyên nghiệp, mang đến cho khách hàng trải nghiệm hoàn chỉnh và sâu sắc về Việt Nam. Từ các tour văn hóa và ẩm thực đến du lịch nghỉ dưỡng, wellness và hành hương.
                            </p>
                            <p className="text-gray-500 text-sm italic border-t border-gray-100 pt-4">
                                At VNGroup Tourist, we offer professional inbound travel services, providing our guests with a complete and immersive experience of Vietnam. From cultural and culinary tours to leisure, wellness, and pilgrimage trips.
                            </p>
                        </div>
                    </div>

                    {/* Section 2: Commitment */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Our Service Commitment</h3>
                            <p className="text-[#f5a623] font-bold italic mb-4 text-lg">Trust as the Foundation of everything we do!</p>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Uy tín và chất lượng luôn là ưu tiên hàng đầu của chúng tôi. Chúng tôi cam kết mang đến những dịch vụ đạt chuẩn cao, với giá cả minh bạch và hỗ trợ tận tâm trong suốt hành trình.
                            </p>
                            <p className="text-gray-500 text-sm italic border-t border-gray-100 pt-4">
                                Reputation and quality are always our top priorities. We are committed to delivering services that meet high standards, with transparent pricing and dedicated support throughout the journey.
                            </p>
                        </div>
                        <div className="relative h-[260px] rounded-2xl overflow-hidden group order-1 lg:order-2">
                            <Image
                                src="/images/inbound/danang-central.png"
                                alt="Commitment"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                    </div>

                </div>
            </div>

            <style jsx global>{`
        @keyframes kenburns {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
      `}</style>
        </div>
    );
}
