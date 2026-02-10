'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MapPin, Mail, Phone, Facebook, Instagram, Youtube, Send, Clock, CheckCircle, MessageSquare, Globe } from 'lucide-react';
import { partners } from '@/data/partners';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        people: '',
        time: '',
        tourType: '',
        message: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) newErrors.name = 'Vui lòng nhập họ tên';
        if (!formData.email.trim()) {
            newErrors.email = 'Vui lòng nhập email';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Vui lòng nhập số điện thoại';
        } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Số điện thoại không hợp lệ';
        }

        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
            setFormData({ name: '', email: '', phone: '', people: '', time: '', tourType: '', message: '' });
            setIsSubmitted(false);
        }, 5000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">

            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-gray-900 overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/contact-hero.jpg"
                        alt="Contact Hero"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
                        Liên hệ với chúng tôi
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto animate-fade-in-up delay-100">
                        Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn 24/7. Hãy để lại thông tin và chúng tôi sẽ phản hồi sớm nhất.
                    </p>
                </div>
            </section>

            {/* Quick Contact Bar */}
            <div className="container mx-auto px-4 relative z-20 -mt-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center gap-4 hover:-translate-y-1 transition-transform">
                        <div className="w-12 h-12 bg-[#00dba1]/10 rounded-full flex items-center justify-center text-[#00dba1]">
                            <Phone className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 uppercase font-semibold">Hotline tư vấn</div>
                            <div className="text-lg font-bold text-gray-900">0931.867.376</div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center gap-4 hover:-translate-y-1 transition-transform">
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 uppercase font-semibold">Email hỗ trợ</div>
                            <div className="text-lg font-bold text-gray-900">info@vngrouptourist.com</div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center gap-4 hover:-translate-y-1 transition-transform">
                        <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-500">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 uppercase font-semibold">Giờ làm việc</div>
                            <div className="text-lg font-bold text-gray-900">Thứ 2 - Thứ 7</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Contact Section */}
            <section className="py-20 lg:py-24">
                <div className="container mx-auto px-4">
                    <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
                        <div className="grid grid-cols-1 lg:grid-cols-12">

                            {/* Left Column: Info */}
                            <div className="lg:col-span-5 bg-gradient-to-br from-gray-900 to-gray-800 p-8 lg:p-16 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00dba1] rounded-full blur-[100px] opacity-20 -mr-20 -mt-20"></div>
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20 -ml-20 -mb-20"></div>

                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div>
                                        <h2 className="text-3xl font-bold mb-8">Thông tin liên hệ</h2>

                                        <div className="space-y-8">
                                            <div className="flex gap-4">
                                                <MapPin className="w-6 h-6 text-[#00dba1] mt-1 flex-shrink-0" />
                                                <div>
                                                    <h3 className="font-bold text-lg mb-1">Trụ sở chính</h3>
                                                    <p className="text-gray-300 text-sm leading-relaxed">
                                                        Hóc Môn, TP. Hồ Chí Minh<br />
                                                        Việt Nam
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex gap-4">
                                                <MapPin className="w-6 h-6 text-[#00dba1] mt-1 flex-shrink-0" />
                                                <div>
                                                    <h3 className="font-bold text-lg mb-1">Văn phòng đại diện</h3>
                                                    <p className="text-gray-300 text-sm leading-relaxed">
                                                        93/8 Phạm Văn Hai, Phường 3<br />
                                                        Quận Tân Bình, TP.HCM
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex gap-4">
                                                <Phone className="w-6 h-6 text-[#00dba1] mt-1 flex-shrink-0" />
                                                <div>
                                                    <h3 className="font-bold text-lg mb-1">Điện thoại</h3>
                                                    <p className="text-gray-300 text-sm">0931.867.376</p>
                                                    <p className="text-gray-300 text-sm">0938.322.487</p>
                                                </div>
                                            </div>

                                            <div className="flex gap-4">
                                                <Mail className="w-6 h-6 text-[#00dba1] mt-1 flex-shrink-0" />
                                                <div>
                                                    <h3 className="font-bold text-lg mb-1">Email</h3>
                                                    <p className="text-gray-300 text-sm">info@vngrouptourist.com</p>
                                                    <p className="text-gray-300 text-sm">support@vngrouptourist.com</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-12">
                                        <h3 className="text-sm uppercase font-semibold text-gray-400 mb-4">Kết nối mạng xã hội</h3>
                                        <div className="flex gap-4">
                                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#00dba1] transition-all">
                                                <Facebook className="w-5 h-5 text-white" />
                                            </a>
                                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#00dba1] transition-all">
                                                <Instagram className="w-5 h-5 text-white" />
                                            </a>
                                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#00dba1] transition-all">
                                                <Youtube className="w-5 h-5 text-white" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Form */}
                            <div className="lg:col-span-7 p-8 lg:p-16 bg-white relative">
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Gửi tin nhắn</h2>
                                <p className="text-gray-500 mb-10">Điền vào form bên dưới, chúng tôi sẽ liên hệ trong vòng 24h.</p>

                                {isSubmitted ? (
                                    <div className="bg-green-50 rounded-3xl p-8 text-center animate-in fade-in zoom-in duration-300">
                                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle className="w-10 h-10 text-green-600" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Gửi thành công!</h3>
                                        <p className="text-gray-600 mb-8 max-w-sm mx-auto">
                                            Cảm ơn bạn đã liên hệ. Đội ngũ tư vấn của chúng tôi sẽ gọi lại cho bạn trong thời gian sớm nhất.
                                        </p>
                                        <button
                                            onClick={() => setIsSubmitted(false)}
                                            className="px-8 py-3 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-800 transition-colors"
                                        >
                                            Gửi tin nhắn khác
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-1">
                                                <label className="text-sm font-semibold text-gray-700 ml-1">Họ và tên <span className="text-red-500">*</span></label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="Ví dụ: Nguyễn Văn A"
                                                    className={`w-full px-5 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00dba1] focus:border-transparent transition-all ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                                                />
                                                {errors.name && <p className="text-xs text-red-500 ml-1">{errors.name}</p>}
                                            </div>

                                            <div className="space-y-1">
                                                <label className="text-sm font-semibold text-gray-700 ml-1">Số điện thoại <span className="text-red-500">*</span></label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder="09xx xxx xxx"
                                                    className={`w-full px-5 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00dba1] focus:border-transparent transition-all ${errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                                                />
                                                {errors.phone && <p className="text-xs text-red-500 ml-1">{errors.phone}</p>}
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-sm font-semibold text-gray-700 ml-1">Email <span className="text-red-500">*</span></label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="example@gmail.com"
                                                className={`w-full px-5 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00dba1] focus:border-transparent transition-all ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                                            />
                                            {errors.email && <p className="text-xs text-red-500 ml-1">{errors.email}</p>}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-1">
                                                <label className="text-sm font-semibold text-gray-700 ml-1">Loại dịch vụ</label>
                                                <select
                                                    name="tourType"
                                                    value={formData.tourType}
                                                    onChange={handleChange}
                                                    className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00dba1] focus:border-transparent transition-all appearance-none"
                                                >
                                                    <option value="">Chọn dịch vụ quan tâm</option>
                                                    <option value="domestic">Tour trong nước</option>
                                                    <option value="international">Tour quốc tế</option>
                                                    <option value="luxury">Tour cao cấp (Luxury)</option>
                                                    <option value="visa">Dịch vụ Visa</option>
                                                    <option value="ticket">Vé máy bay</option>
                                                    <option value="other">Khác</option>
                                                </select>
                                            </div>

                                            <div className="space-y-1">
                                                <label className="text-sm font-semibold text-gray-700 ml-1">Số lượng khách</label>
                                                <input
                                                    type="number"
                                                    name="people"
                                                    value={formData.people}
                                                    onChange={handleChange}
                                                    placeholder="Số người dự kiến"
                                                    className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00dba1] focus:border-transparent transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-sm font-semibold text-gray-700 ml-1">Nội dung <span className="text-red-500">*</span></label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                rows={4}
                                                placeholder="Hãy mô tả chi tiết nhu cầu của bạn (điểm đến, ngân sách, ngày đi...)"
                                                className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00dba1] focus:border-transparent transition-all resize-none"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full px-8 py-4 bg-gradient-to-r from-[#00dba1] to-[#00a86b] text-white font-bold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Đang xử lý...
                                                </>
                                            ) : (
                                                'Gửi yêu cầu tư vấn'
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Strategic Partners Section */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <h3 className="text-xl font-bold text-gray-400 uppercase tracking-widest">Đối tác chiến lược</h3>
                    </div>

                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {partners.filter(p => p.category === 'airline' || p.category === 'finance').slice(0, 5).map(partner => (
                            <div key={partner.id} className="text-xl font-bold text-gray-500 hover:text-[#00dba1] transition-colors cursor-default">
                                {partner.name}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="h-[400px] w-full bg-gray-200 relative">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.123456789!2d106.6789123!3d10.798456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528d4386d4e51%3A0x123456789abcdef!2zOTMvOCBQaOG6oW0gVsSDbiBIYWksIFBoxrDhu5luZyAzLCBUw6JuIELDrG5oLCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="filter grayscale hover:grayscale-0 transition-all duration-500"
                ></iframe>

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <div className="bg-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-bounce">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                        <span className="font-bold text-gray-900">VNGROUP TOURIST OFFICE</span>
                    </div>
                </div>
            </section>

        </div>
    );
}
