'use client';

import Image from 'next/image';

const stats = [
    {
        id: 1,
        label: "Lượt khách hàng",
        value: "3,000+"
    },
    {
        id: 2,
        label: "Khách đoàn",
        value: "900+"
    },
    {
        id: 3,
        label: "Đối tác chiến lược",
        value: "100+"
    },
    {
        id: 4,
        label: "Nhân sự đào tạo",
        value: "100%"
    }
];

export default function StatsSection() {
    return (
        <section className="py-16 md:py-24 bg-[#f8fafc] border-y border-gray-100">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left Column: Text description + Stats cards (8 cols) */}
                    <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between h-full">
                        
                        {/* Heading & Paragraph */}
                        <div className="text-left mb-8">
                            <div className="inline-flex items-center gap-2 bg-[#00dba1]/10 px-4 py-1.5 rounded-full mb-4">
                                <span className="text-[#00a878] font-bold uppercase tracking-wider text-xs">Về chúng tôi</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-850 tracking-tight mb-2 uppercase">
                                VNGroup Tourist — Công ty du lịch uy tín tại TP.HCM
                            </h2>
                            <p className="text-sm md:text-base font-bold text-[#00a878] mb-6">
                                Hành trình đẳng cấp – Trải nghiệm khác biệt
                            </p>
                            
                            <div className="text-gray-600 leading-relaxed space-y-4 text-sm md:text-base max-w-4xl">
                                <p>
                                    Chào mừng bạn đến với <strong>VNGroup Tourist</strong>, người đồng hành tin cậy trên mọi hành trình khám phá. 
                                    Chúng tôi tự hào là đơn vị chuyên nghiệp trong việc cung cấp các <strong>tour du lịch trong nước</strong> và 
                                    <strong> tour du lịch quốc tế</strong> với chất lượng dịch vụ đẳng cấp 4-5 sao.
                                </p>
                                <p>
                                    Với đội ngũ nhân sự tận tâm và am hiểu sâu sắc về điểm đến, VNGroup Tourist mang đến cho khách hàng những trải nghiệm khác biệt tại 
                                    <strong> Hàn Quốc</strong>, <strong>Nhật Bản</strong>, <strong>Thái Lan</strong>, <strong>Trung Quốc</strong>, và khắp các vùng miền Việt Nam. 
                                    Bên cạnh các tour trọn gói, chúng tôi còn cung cấp dịch vụ <strong>visa du lịch</strong>, vé máy bay và tổ chức 
                                    <strong> tour MICE</strong> (hội thảo, teambuilding) chuyên nghiệp cho doanh nghiệp.
                                </p>
                                <p>
                                    Hãy để VNGroup Tourist biến mỗi chuyến đi của bạn thành một kỷ niệm đáng nhớ. Liên hệ ngay Hotline <strong>0931 867 376</strong> để được tư vấn miễn phí!
                                </p>
                            </div>
                        </div>

                        {/* Stats Grid at the bottom left */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                            {stats.map((item) => (
                                <div 
                                    key={item.id} 
                                    className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col items-center text-center hover:shadow-md transition-shadow duration-300"
                                >
                                    <div className="text-2xl md:text-3xl font-extrabold text-[#00a878] mb-1">
                                        {item.value}
                                    </div>
                                    <div className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">
                                        {item.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Logo Box (4 cols) */}
                    <div className="lg:col-span-5 xl:col-span-4 flex justify-center">
                        <div className="bg-white rounded-[36px] p-8 sm:p-12 shadow-[0_15px_40px_rgba(0,0,0,0.03)] border border-gray-150/50 flex items-center justify-center aspect-square w-full max-w-[380px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1">
                            <div className="relative w-full h-full aspect-square">
                                <Image 
                                    src="/images/b86a4bce511594545df567494e2a23251eb424c7.png" 
                                    alt="VNGroup Tourist Logo" 
                                    fill 
                                    className="object-contain p-2"
                                    priority
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
