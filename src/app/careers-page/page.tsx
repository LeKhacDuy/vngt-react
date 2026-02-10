'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Briefcase, Heart, Users, Coffee, ArrowRight, CheckCircle } from 'lucide-react';

const benefits = [
    { icon: Heart, title: "Bảo hiểm sức khỏe", desc: "Gói bảo hiểm sức khỏe toàn diện cho nhân viên và người thân" },
    { icon: Users, title: "Môi trường cởi mở", desc: "Văn hóa làm việc tôn trọng, sáng tạo và hỗ trợ lẫn nhau" },
    { icon: Coffee, title: "Work-Life Balance", desc: "Chế độ nghỉ phép linh hoạt, teambuilding và du lịch hàng năm" },
    { icon: Briefcase, title: "Cơ hội thăng tiến", desc: "Lộ trình phát triển sự nghiệp rõ ràng, đào tạo chuyên môn thường xuyên" }
];

const jobs = [
    {
        id: 1,
        title: "Nhân viên kinh doanh Tour (Sales Tour)",
        department: "Kinh Doanh",
        location: "TP. Hồ Chí Minh",
        type: "Toàn thời gian",
        salary: "15 - 25 Triệu",
        tags: ["Hot", "Urgent"]
    },
    {
        id: 2,
        title: "Content Marketing Specialist",
        department: "Marketing",
        location: "TP. Hồ Chí Minh",
        type: "Toàn thời gian",
        salary: "10 - 15 Triệu",
        tags: []
    },
    {
        id: 3,
        title: "Thực tập sinh Điều hành Tour",
        department: "Vận hành",
        location: "TP. Hồ Chí Minh",
        type: "Thực tập",
        salary: "Hỗ trợ lương",
        tags: ["Internship"]
    }
];

export default function CareersPage() {
    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Hero */}
            <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
                <Image
                    src="/images/slider2.jpg"
                    alt="Careers at VNGroup"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="container mx-auto px-4 relative z-10 text-center text-white">
                    <span className="inline-block py-1 px-3 rounded-full bg-[#00dba1]/20 border border-[#00dba1] text-[#00dba1] font-bold text-sm mb-4 backdrop-blur-sm">
                        TUYỂN DỤNG
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">Gia nhập đội ngũ <br /> VNGroup Tourist</h1>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
                        Cùng chúng tôi kiến tạo những hành trình hạnh phúc và mang lại giá trị cho cộng đồng du lịch Việt Nam.
                    </p>
                    <a href="#jobs" className="px-8 py-4 bg-[#00dba1] text-white font-bold rounded-full hover:bg-[#00c28e] transition-all inline-flex items-center gap-2">
                        Xem vị trí đang tuyển <ArrowRight className="w-5 h-5" />
                    </a>
                </div>
            </section>

            {/* Why Join Us */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tại sao chọn VNGroup?</h2>
                        <div className="w-20 h-1 bg-[#00dba1] mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((item, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 text-center group">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#00dba1] group-hover:text-white transition-colors">
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Job Openings */}
            <section id="jobs" className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="flex items-end justify-between mb-10">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Vị trí đang tuyển</h2>
                            <p className="text-gray-500 mt-2">Tìm kiếm cơ hội phù hợp với bạn</p>
                        </div>
                        <Link href="#" className="hidden md:flex items-center gap-2 text-[#00dba1] font-bold hover:underline">
                            Xem tất cả <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {jobs.map((job) => (
                            <div key={job.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#00dba1] hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                                        {job.tags.map(tag => (
                                            <span key={tag} className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded-full">{tag}</span>
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                        <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {job.department}</span>
                                        <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {job.location}</span>
                                        <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> {job.type}</span>
                                    </div>
                                </div>

                                <div className="text-left md:text-right w-full md:w-auto flex flex-row md:flex-col items-center md:items-end justify-between gap-4">
                                    <div className="text-[#00dba1] font-bold text-lg">{job.salary}</div>
                                    <button className="px-6 py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-[#00dba1] transition-colors whitespace-nowrap">
                                        Ứng tuyển
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
