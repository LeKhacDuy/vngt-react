'use client';

import { useState, useEffect } from 'react';
import { Clock, ArrowRight, Filter, X, Send, CheckCircle } from 'lucide-react';

interface DepartureItem {
    id: number;
    tourCode: string;
    tourName: string;
    duration: string;
    flight: string;
    price: number;
    formattedPrice: string;
    departureDate: string;
    isHoliday: boolean;
    month: number;
    day: number;
    available: number;
    status: string;
}

export default function SchedulePage() {
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
    const [departures, setDepartures] = useState<DepartureItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Modal state
    const [activeTour, setActiveTour] = useState<DepartureItem | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        adults: 1,
        children: 0,
        babies: 0,
        message: ''
    });
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [isSubmittingForm, setIsSubmittingForm] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    useEffect(() => {
        async function fetchSchedule() {
            try {
                setIsLoading(true);
                // Fetch a large page size to ensure we get all active departures
                const res = await fetch('/api/schedule?pageSize=500');
                if (!res.ok) {
                    throw new Error('Không thể tải lịch khởi hành từ máy chủ.');
                }
                const data = await res.json();
                
                if (!Array.isArray(data)) {
                    throw new Error('Dữ liệu trả về không đúng định dạng.');
                }

                // Map CRM data to UI state
                const mapped: DepartureItem[] = data.map((item: any) => {
                    const start = new Date(item.startDate);
                    const end = new Date(item.endDate);
                    
                    // Extract or calculate duration
                    const titleMatch = (item.title || '').match(/(\d+)N(\d+)[ĐD]/i);
                    let duration = 'Liên hệ';
                    if (titleMatch) {
                        duration = titleMatch[0].toUpperCase();
                    } else if (item.startDate && item.endDate) {
                        const diffDays = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
                        if (diffDays > 0) {
                            duration = `${diffDays + 1}N${diffDays}Đ`;
                        }
                    }

                    // Format flight info
                    let flight = 'Liên hệ';
                    if (item.NameVehicleGo || item.ticketVehicleGo || item.NameVehicleBack || item.ticketVehicleBack) {
                        const goPart = [item.NameVehicleGo, item.ticketVehicleGo].filter(Boolean).join(' ');
                        const backPart = [item.NameVehicleBack, item.ticketVehicleBack].filter(Boolean).join(' ');
                        flight = `Đi: ${goPart || 'Chưa cập nhật'}\nVề: ${backPart || 'Chưa cập nhật'}`;
                    }

                    const day = start.getDate();
                    const month = start.getMonth();

                    // Map status: Available (Còn chỗ) vs Last Seats (Sắp hết)
                    // If cusRemaining <= 5 -> Last Seats, else Available
                    const remaining = item.cusRemaining || 0;
                    const status = remaining <= 5 ? 'Last Seats' : 'Available';
                    
                    const priceVal = item.pricePerSlot || item.tourPrice || 0;
                    const formattedPrice = priceVal > 0 
                        ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceVal)
                        : 'Liên hệ';

                    return {
                        id: item.id,
                        tourCode: item.tourCode || '',
                        tourName: item.title,
                        duration,
                        flight,
                        price: priceVal,
                        formattedPrice,
                        departureDate: item.startDate,
                        isHoliday: false, // Default
                        month,
                        day,
                        available: remaining,
                        status
                    };
                });
                
                // Sort departures chronologically by startDate
                mapped.sort((a, b) => new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime());

                setDepartures(mapped);
                setError(null);
            } catch (err: any) {
                console.error('[Schedule Fetch Error]:', err);
                setError(err.message || 'Lỗi kết nối hệ thống.');
            } finally {
                setIsLoading(false);
            }
        }

        fetchSchedule();
    }, []);

    // Filter by month (0-indexed)
    const filteredDepartures = departures.filter(d => d.month === selectedMonth);

    const months = [
        { value: 0, label: 'Tháng 1' }, { value: 1, label: 'Tháng 2' },
        { value: 2, label: 'Tháng 3' }, { value: 3, label: 'Tháng 4' },
        { value: 4, label: 'Tháng 5' }, { value: 5, label: 'Tháng 6' },
        { value: 6, label: 'Tháng 7' }, { value: 7, label: 'Tháng 8' },
        { value: 8, label: 'Tháng 9' }, { value: 9, label: 'Tháng 10' },
        { value: 10, label: 'Tháng 11' }, { value: 11, label: 'Tháng 12' }
    ];

    // Form input validation
    const validateForm = () => {
        const errors: Record<string, string> = {};
        if (!formData.name.trim()) errors.name = 'Vui lòng nhập họ tên';
        if (!formData.phone.trim()) {
            errors.phone = 'Vui lòng nhập số điện thoại';
        } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
            errors.phone = 'Số điện thoại không hợp lệ';
        }
        if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Email không hợp lệ';
        }
        return errors;
    };

    // Form submit to CRM
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        if (!activeTour) return;

        setIsSubmittingForm(true);
        setFormErrors({});

        try {
            const formattedDate = new Date(activeTour.departureDate).toLocaleDateString('vi-VN');
            const payload = {
                TenKH: formData.name,
                SoDienThoaiKH: formData.phone,
                EmailKH: formData.email,
                DiaChiKH: '',
                SoLuong: Number(formData.adults),
                QuantityChild: Number(formData.children),
                QuantityBaby: Number(formData.babies),
                Gia: activeTour.price,
                GiaChild: 0,
                GiaBaby: 0,
                TenPhieu: `Đăng ký Lịch Khởi Hành: ${activeTour.tourName} (${activeTour.duration})`,
                NoiDungPhieu: `Thông tin đăng ký:
- Ngày khởi hành: ${formattedDate}
- Người lớn: ${formData.adults} | Trẻ em: ${formData.children} | Em bé: ${formData.babies}
- Ghi chú: ${formData.message || 'Không có'}`
            };

            const res = await fetch('/api/schedule/ticket', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                throw new Error('Không thể gửi thông tin lên hệ thống CRM.');
            }

            setIsFormSubmitted(true);
            
            // Auto close after 3 seconds
            setTimeout(() => {
                closeModal();
            }, 3500);

        } catch (err: any) {
            console.error('[Submit CRM Ticket Error]:', err);
            setFormErrors({ submit: err.message || 'Có lỗi xảy ra khi gửi thông tin.' });
        } finally {
            setIsSubmittingForm(false);
        }
    };

    const closeModal = () => {
        setActiveTour(null);
        setFormData({
            name: '',
            phone: '',
            email: '',
            adults: 1,
            children: 0,
            babies: 0,
            message: ''
        });
        setFormErrors({});
        setIsFormSubmitted(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-[#003580] text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">Lịch Khởi Hành</h1>
                    <p className="text-blue-100 max-w-2xl mx-auto">
                        Cập nhật liên tục lịch khởi hành các tour trong nước và quốc tế.
                        Đặt sớm để nhận ưu đãi tốt nhất!
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8">
                {/* Filter Bar */}
                <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-2 text-gray-700 font-bold">
                        <Filter className="w-5 h-5 text-[#00dba1]" />
                        Bộ lọc:
                    </div>

                    <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                        {months.map(m => (
                            <button
                                key={m.value}
                                onClick={() => setSelectedMonth(m.value)}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${selectedMonth === m.value ? 'bg-[#00dba1] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                            >
                                {m.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Departures List */}
                <div className="space-y-4">
                    {isLoading ? (
                        <div className="text-center py-20 bg-white rounded-2xl flex flex-col items-center justify-center gap-4 shadow-sm border border-gray-100">
                            <div className="w-12 h-12 border-4 border-[#00dba1] border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-gray-500 text-lg font-medium animate-pulse">Đang tải lịch khởi hành từ CRM...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                            <p className="text-red-500 text-lg font-medium mb-3">Đã xảy ra lỗi: {error}</p>
                            <button 
                                onClick={() => window.location.reload()}
                                className="px-5 py-2.5 bg-[#00dba1] hover:bg-[#00c28e] text-white font-bold rounded-lg shadow transition-all active:scale-95"
                            >
                                Thử lại
                            </button>
                        </div>
                    ) : filteredDepartures.length > 0 ? (
                        filteredDepartures.map((item, idx) => (
                            <div key={idx} className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col md:flex-row items-center gap-6">
                                {/* Date Box */}
                                <div className="flex flex-col items-center justify-center p-4 bg-blue-50 text-blue-800 rounded-xl min-w-[100px]">
                                    <span className="text-3xl font-bold">{item.day}</span>
                                    <span className="text-sm font-semibold uppercase">Tháng {item.month + 1}</span>
                                </div>

                                {/* Tour Info */}
                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-sm text-gray-500 mb-2">
                                        <Clock className="w-4 h-4 text-[#00dba1]" />
                                        <span>{item.duration}</span>
                                        <span className="w-1 h-1 bg-gray-300 rounded-full mx-2 hidden sm:block"></span>
                                        <span className="bg-gray-100 px-2 py-1 rounded text-xs whitespace-pre-line text-left">
                                            ✈️ {item.flight}
                                        </span>
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 whitespace-pre-line">
                                        {item.tourName}
                                    </h3>
                                    <div className="flex items-center justify-center md:justify-start gap-4 text-sm">
                                        {item.isHoliday && (
                                            <span className="px-3 py-1 rounded-full font-bold text-xs bg-red-500 text-white shadow-sm">
                                                Dịp Lễ
                                            </span>
                                        )}
                                        <span className={`px-3 py-1 rounded-full font-bold text-xs ${item.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {item.status === 'Available' ? 'Còn chỗ' : 'Sắp hết'}
                                        </span>
                                        <span className="text-gray-500 hidden sm:inline">
                                            Còn <strong>{item.available}</strong> chỗ
                                        </span>
                                    </div>
                                </div>

                                {/* Price & Action */}
                                <div className="text-center md:text-right min-w-[180px] border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 w-full md:w-auto mt-4 md:mt-0">
                                    <div className="text-2xl font-bold text-[#f5a623] mb-3">{item.formattedPrice}</div>
                                    <button
                                        onClick={() => setActiveTour(item)}
                                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#00dba1] hover:bg-[#00c28e] text-white font-bold rounded-lg transition-all w-full md:w-auto justify-center shadow-md hover:shadow-lg cursor-pointer"
                                    >
                                        Liên hệ <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white rounded-2xl">
                            <p className="text-gray-500 text-lg">Không tìm thấy lịch khởi hành trong tháng này.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Inquire/Contact Modal */}
            {activeTour && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Separate absolute overlay for blur/dark background to fix WebKit rendering bug */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10" onClick={closeModal}></div>
                    
                    {/* Modal Card Content (with relative z-20 to force rendering above backdrop) */}
                    <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-gray-100 relative z-20 max-h-[95vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="bg-[#003580] text-white p-6 relative">
                            <button 
                                onClick={closeModal}
                                className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <h3 className="text-xl font-bold pr-8">Yêu Cầu Tư Vấn Lịch Khởi Hành</h3>
                            <p className="text-blue-100 text-sm mt-2 font-medium line-clamp-1">{activeTour.tourName}</p>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6">
                            {isFormSubmitted ? (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle className="w-10 h-10" />
                                    </div>
                                    <h4 className="text-2xl font-bold text-gray-900 mb-2">Gửi thành công!</h4>
                                    <p className="text-gray-600 max-w-sm mx-auto">
                                        Yêu cầu tư vấn của bạn đã được chuyển đến hệ thống CRM. Chúng tôi sẽ liên hệ lại với bạn ngay.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleFormSubmit} className="space-y-4">
                                    {formErrors.submit && (
                                        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
                                            {formErrors.submit}
                                        </div>
                                    )}

                                    {/* Tour Meta inside form */}
                                    <div className="bg-gray-50 p-3.5 rounded-xl text-sm text-gray-600 space-y-1.5 border border-gray-100">
                                        <p>🗓️ <strong>Ngày khởi hành:</strong> {new Date(activeTour.departureDate).toLocaleDateString('vi-VN')} ({activeTour.duration})</p>
                                        <p>💵 <strong>Giá người lớn:</strong> <span className="text-red-600 font-bold">{activeTour.formattedPrice}</span></p>
                                    </div>

                                    {/* Name input */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Họ và tên <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Ví dụ: Nguyễn Văn A"
                                            className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00dba1] focus:border-transparent transition-all ${formErrors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                                        />
                                        {formErrors.name && <p className="text-xs text-red-500">{formErrors.name}</p>}
                                    </div>

                                    {/* Phone input */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Số điện thoại <span className="text-red-500">*</span></label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="09xx xxx xxx"
                                            className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00dba1] focus:border-transparent transition-all ${formErrors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                                        />
                                        {formErrors.phone && <p className="text-xs text-red-500">{formErrors.phone}</p>}
                                    </div>

                                    {/* Email input */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Email (Không bắt buộc)</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="example@gmail.com"
                                            className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00dba1] focus:border-transparent transition-all ${formErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                                        />
                                        {formErrors.email && <p className="text-xs text-red-500">{formErrors.email}</p>}
                                    </div>

                                    {/* Quantity inputs */}
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Người lớn</label>
                                            <input
                                                type="number"
                                                min="1"
                                                value={formData.adults}
                                                onChange={e => setFormData({ ...formData, adults: Math.max(1, Number(e.target.value)) })}
                                                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00dba1]"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Trẻ em (5-11t)</label>
                                            <input
                                                type="number"
                                                min="0"
                                                value={formData.children}
                                                onChange={e => setFormData({ ...formData, children: Math.max(0, Number(e.target.value)) })}
                                                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00dba1]"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Em bé (&lt;5t)</label>
                                            <input
                                                type="number"
                                                min="0"
                                                value={formData.babies}
                                                onChange={e => setFormData({ ...formData, babies: Math.max(0, Number(e.target.value)) })}
                                                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00dba1]"
                                            />
                                        </div>
                                    </div>

                                    {/* Message input */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Lời nhắn / Yêu cầu thêm</label>
                                        <textarea
                                            value={formData.message}
                                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                                            rows={2}
                                            placeholder="Thời gian bay mong muốn, ghi chú đặc biệt..."
                                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00dba1] resize-none"
                                        />
                                    </div>

                                    {/* Submit button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmittingForm}
                                        className="w-full mt-2 py-3 bg-gradient-to-r from-[#00dba1] to-[#00b87a] text-white font-bold rounded-xl hover:shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        {isSubmittingForm ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Đang gửi yêu cầu...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4" />
                                                Gửi thông tin tư vấn
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


