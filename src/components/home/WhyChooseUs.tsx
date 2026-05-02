'use client';

import Image from 'next/image';

const memberships = [
    {
        name: 'Hội Viên Hội Doanh Nhân Trẻ Việt Nam',
        logo: '/logoclb/doanhnhantre.jpg',
    },
    {
        name: 'Uỷ viên Ban Chấp hành Câu lạc bộ Du lịch Doanh Nhân Trẻ Việt Nam',
        logo: '/logoclb/clbdoanhnhantre.jpg',
    },
    {
        name: 'Hội viên Hiệp Hội Du Lịch TP. HCM',
        logo: '/logoclb/hiephoidulichtphcm.png',
    },
    {
        name: 'Uỷ viên Ban Chấp hành Hội Doanh Nghiệp Phường Tân Sơn Hòa',
        logo: '/logoclb/hoidoanhnghiepphuongtansonhoa.jpg',
    },
    {
        name: 'Hội viên Câu Lạc Bộ Doanh Nhân và Pháp Luật',
        logo: '/logoclb/doanhnhanvaphapluat.jpg',
    },
    {
        name: 'Hội viên Hiệp Hội Du Lịch tỉnh Tây Ninh',
        logo: '/logoclb/hiephoidulichtinhtayninh.png',
    },
    {
        name: 'Hội viên Hội Doanh Nhân Tây Ninh tại TP.HCM',
        logo: '/logoclb/doanhnhantayninhtaihcm.jpg',
    },
];

export default function WhyChooseUs() {
    return (
        <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
            {/* Subtle background decorations */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-[#00dba1]/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block text-[#00dba1] font-bold tracking-widest uppercase text-sm mb-3">
                        Thành viên chính thức
                    </span>
                    <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-5 tracking-tight">
                        Thành viên của các <span className="text-[#00dba1]">Hiệp Hội</span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                        VNGroup Tourist tự hào là thành viên chính thức của các hiệp hội, câu lạc bộ doanh nhân uy tín hàng đầu Việt Nam.
                    </p>
                </div>

                {/* Membership Grid */}
                <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
                    {memberships.map((item, idx) => (
                        <div
                            key={idx}
                            className="group relative flex flex-col items-center text-center p-6 lg:p-8 rounded-2xl bg-gray-50/80 border border-gray-100 hover:border-[#00dba1]/30 hover:bg-white hover:shadow-xl hover:shadow-[#00dba1]/5 hover:-translate-y-2 transition-all duration-500 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-24px)]"
                        >
                            {/* Logo Container */}
                            <div className="relative w-24 h-24 lg:w-28 lg:h-28 rounded-2xl bg-white shadow-md group-hover:shadow-lg transition-shadow duration-500 mb-6 overflow-hidden flex items-center justify-center p-3 border border-gray-100 group-hover:border-[#00dba1]/20">
                                <Image
                                    src={item.logo}
                                    alt={item.name}
                                    width={96}
                                    height={96}
                                    className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            {/* Name */}
                            <h3 className="text-sm lg:text-base font-bold text-gray-800 leading-snug group-hover:text-[#00dba1] transition-colors duration-300">
                                {item.name}
                            </h3>

                            {/* Decorative accent line */}
                            <div className="mt-4 w-8 h-1 rounded-full bg-gray-200 group-hover:bg-[#00dba1] group-hover:w-12 transition-all duration-500" />
                        </div>
                    ))}
                </div>

                {/* Bottom Trust Badge */}
                <div className="mt-16 flex flex-col items-center">
                    <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#00dba1]/10 to-blue-500/10 rounded-full border border-[#00dba1]/20">
                        <div className="w-2 h-2 rounded-full bg-[#00dba1] animate-pulse" />
                        <p className="text-sm font-semibold text-gray-700">
                            Đối tác tin cậy — Uy tín được chứng nhận bởi các hiệp hội uy tín
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
