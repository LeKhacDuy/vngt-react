'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Phone, Mail, MessageCircle, HelpCircle, FileText, ShieldCheck } from 'lucide-react';

const faqs = [
    {
        question: "Làm thế nào để đặt tour tại VNGroup Tourist?",
        answer: "Bạn có thể đặt tour trực tuyến ngay trên website bằng cách chọn tour mong muốn và nhấn nút 'Đặt ngay'. Ngoài ra, bạn cũng có thể liên hệ qua hotline hoặc Zalo để được nhân viên tư vấn hỗ trợ đặt tour."
    },
    {
        question: "Tôi có thể hủy tour đã đặt không? Chính sách hoàn tiền như thế nào?",
        answer: "Có, bạn có thể hủy tour theo quy định. Hủy trước 15 ngày khởi hành hoàn 100%, trước 7 ngày hoàn 50%. Chi tiết vui lòng xem tại trang 'Điều khoản & Quy định' hoặc liên hệ CSKH."
    },
    {
        question: "Công ty có hỗ trợ làm Visa không?",
        answer: "Chúng tôi cung cấp dịch vụ tư vấn và hỗ trợ làm Visa trọn gói với tỷ lệ đậu cao cho các thị trường Âu, Úc, Mỹ, Á..."
    },
    {
        question: "Hình thức thanh toán nào được chấp nhận?",
        answer: "Chúng tôi chấp nhận thanh toán qua chuyển khoản ngân hàng, thẻ tín dụng/ATM nội địa, ví điện tử Momo/VNPAY và tiền mặt tại văn phòng."
    }
];

export default function SupportPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Hero */}
            <section className="bg-gradient-to-r from-[#00dba1] to-[#00a86b] py-20 text-white text-center">
                <div className="container mx-auto px-4">
                    <HelpCircle className="w-16 h-16 mx-auto mb-6 opacity-80" />
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Trung Tâm Hỗ Trợ</h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">Chúng tôi ở đây để giải đáp mọi thắc mắc và hỗ trợ bạn 24/7</p>
                </div>
            </section>

            <div className="container mx-auto px-4 -mt-10 relative z-10">
                {/* Contact Channels Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-[#00dba1] text-center hover:-translate-y-1 transition-transform">
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                            <Phone className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Gọi Hotline</h3>
                        <p className="text-gray-500 mb-4">Hỗ trợ khẩn cấp 24/7</p>
                        <a href="tel:0931867376" className="text-2xl font-bold text-[#00dba1]">0931.867.376</a>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-purple-500 text-center hover:-translate-y-1 transition-transform">
                        <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600">
                            <MessageCircle className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Chat Zalo</h3>
                        <p className="text-gray-500 mb-4">Tư vấn trực tiếp nhanh chóng</p>
                        <a href="#" className="inline-block px-6 py-2 bg-purple-600 text-white rounded-full font-bold hover:bg-purple-700">Chat Ngay</a>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-orange-500 text-center hover:-translate-y-1 transition-transform">
                        <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-600">
                            <Mail className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Gửi Email</h3>
                        <p className="text-gray-500 mb-4">Giải đáp thắc mắc chi tiết</p>
                        <a href="mailto:info@vngrouptourist.com" className="text-lg font-bold text-gray-800 hover:text-[#00dba1]">info@vngrouptourist.com</a>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Câu hỏi thường gặp</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <button
                                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                    className="w-full flex items-center justify-between p-6 text-left font-bold text-gray-800 hover:bg-gray-50 transition-colors"
                                >
                                    {faq.question}
                                    {openIndex === idx ? <ChevronUp className="w-5 h-5 text-[#00dba1]" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 mt-2">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Additional Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 max-w-4xl mx-auto">
                    <a href="#" className="flex items-center gap-4 p-6 bg-white rounded-2xl border border-gray-200 hover:border-[#00dba1] hover:shadow-lg transition-all group">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-[#00dba1] group-hover:text-white transition-colors">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 group-hover:text-[#00dba1]">Hướng dẫn đặt tour</h4>
                            <p className="text-sm text-gray-500">Quy trình booking chi tiết</p>
                        </div>
                    </a>
                    <a href="#" className="flex items-center gap-4 p-6 bg-white rounded-2xl border border-gray-200 hover:border-[#00dba1] hover:shadow-lg transition-all group">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-[#00dba1] group-hover:text-white transition-colors">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 group-hover:text-[#00dba1]">Chính sách bảo mật</h4>
                            <p className="text-sm text-gray-500">Cam kết bảo vệ thông tin</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}
