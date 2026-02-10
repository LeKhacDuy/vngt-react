'use client';

import { useState } from 'react';
import { X, Check } from 'lucide-react';

interface VisaRatingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type Step = 'country' | 'form' | 'result' | 'consult';

export default function VisaRatingModal({ isOpen, onClose }: VisaRatingModalProps) {
    const [step, setStep] = useState<Step>('country');
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [formData, setFormData] = useState({
        travel_history: 0,
        employment: 0,
        savings: 0,
        assets: 0
    });
    const [totalScore, setTotalScore] = useState(0);

    if (!isOpen) return null;

    const handleCountrySelect = (country: string) => {
        setSelectedCountry(country);
        setTimeout(() => setStep('form'), 300);
    };

    const calculateScore = () => {
        const score = formData.travel_history + formData.employment + formData.savings + formData.assets;
        setTotalScore(score);
        setStep('result');
    };

    const getResult = () => {
        if (totalScore >= 80) return { title: 'Xuất sắc!', desc: 'Hồ sơ của bạn rất mạnh, tỷ lệ đậu VISA rất cao. Bạn có thể tự tin nộp hồ sơ.', color: 'text-green-600' };
        if (totalScore >= 60) return { title: 'Tốt!', desc: 'Hồ sơ của bạn khá ổn, có thể cần bổ sung thêm một số giấy tờ để tăng tỷ lệ đậu.', color: 'text-blue-600' };
        if (totalScore >= 40) return { title: 'Cần cải thiện', desc: 'Hồ sơ cần được cải thiện nhiều điểm. Chúng tôi khuyên bạn nên tư vấn chuyên gia.', color: 'text-yellow-600' };
        return { title: 'Cần hỗ trợ', desc: 'Hồ sơ cần được chuẩn bị kỹ lưỡng. Hãy liên hệ với chúng tôi để được tư vấn chi tiết.', color: 'text-red-600' };
    };

    const result = getResult();

    const resetForm = () => {
        setFormData({ travel_history: 0, employment: 0, savings: 0, assets: 0 });
        setSelectedCountry('');
        setStep('country');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white z-20">
                    <h3 className="text-xl font-bold text-gray-800">Kiểm tra thang điểm VISA</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                <div className="p-6 lg:p-8">

                    {/* Step 1: Country Selection */}
                    {step === 'country' && (
                        <div className="space-y-6">
                            <h4 className="text-lg font-semibold text-gray-700">Bước 1: Chọn quốc gia bạn muốn đến</h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {[
                                    { id: 'usa', name: 'Mỹ', flag: '🇺🇸' },
                                    { id: 'australia', name: 'Úc', flag: '🇦🇺' },
                                    { id: 'europe', name: 'Châu Âu', flag: '🇪🇺' },
                                    { id: 'japan', name: 'Nhật Bản', flag: '🇯🇵' },
                                    { id: 'korea', name: 'Hàn Quốc', flag: '🇰🇷' },
                                    { id: 'other', name: 'Khác', flag: '🌍' }
                                ].map(c => (
                                    <button
                                        key={c.id}
                                        onClick={() => handleCountrySelect(c.id)}
                                        className="flex flex-col items-center justify-center p-6 border-2 border-gray-100 rounded-2xl hover:border-[#00dba1] hover:bg-[#00dba1]/5 transition-all group"
                                    >
                                        <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">{c.flag}</span>
                                        <span className="font-bold text-gray-700 group-hover:text-[#00dba1]">{c.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Questionnaire */}
                    {step === 'form' && (
                        <div className="space-y-8">
                            <h4 className="text-lg font-semibold text-gray-700">Bước 2: Đánh giá hồ sơ</h4>

                            {/* Q1 */}
                            <div className="space-y-4">
                                <h5 className="font-bold text-[#00dba1]">I. LỊCH SỬ DU LỊCH</h5>
                                <div className="grid gap-3">
                                    {[
                                        { val: 0, label: 'Hộ chiếu trắng' },
                                        { val: 5, label: '1 nước Đông Nam Á (< 1 năm)' },
                                        { val: 10, label: '1 nước Đông Nam Á (> 1 năm)' },
                                        { val: 15, label: '2-3 nước Đông Nam Á (< 1 năm)' },
                                        { val: 20, label: '2-3 nước Đông Nam Á (> 1 năm)' },
                                        { val: 30, label: 'Các nước ĐNÁ + Nhật, Hàn' },
                                        { val: 40, label: 'Hàn, Nhật, Âu, Mỹ, Úc' }
                                    ].map(opt => (
                                        <label key={opt.val + opt.label} className="flex items-center p-3 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50 has-[:checked]:border-[#00dba1] has-[:checked]:bg-[#00dba1]/5 transition-all">
                                            <input type="radio" name="travel" className="w-5 h-5 accent-[#00dba1] mr-3"
                                                checked={formData.travel_history === opt.val}
                                                onChange={() => setFormData({ ...formData, travel_history: opt.val })} />
                                            <span className="text-gray-700 font-medium">{opt.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Q2 */}
                            <div className="space-y-4">
                                <h5 className="font-bold text-[#00dba1]">II. CÔNG VIỆC HIỆN TẠI</h5>
                                <div className="grid gap-3">
                                    {[
                                        { val: 0, label: 'Tự do (Không chứng minh được)' },
                                        { val: 10, label: 'Tự do (Chứng minh được)' },
                                        { val: 5, label: 'Nhân viên (Lương tiền mặt)' },
                                        { val: 10, label: 'Nhân viên (CK < 6 tháng)' },
                                        { val: 20, label: 'Nhân viên (CK > 1 năm + BHXH)' },
                                        { val: 30, label: 'Viên chức nhà nước' }
                                    ].map(opt => (
                                        <label key={opt.val + opt.label} className="flex items-center p-3 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50 has-[:checked]:border-[#00dba1] has-[:checked]:bg-[#00dba1]/5 transition-all">
                                            <input type="radio" name="job" className="w-5 h-5 accent-[#00dba1] mr-3"
                                                checked={formData.employment === opt.val}
                                                onChange={() => setFormData({ ...formData, employment: opt.val })} />
                                            <span className="text-gray-700 font-medium">{opt.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Q3 */}
                            <div className="space-y-4">
                                <h5 className="font-bold text-[#00dba1]">III. TÀI CHÍNH (SỔ TIẾT KIỆM)</h5>
                                <div className="grid gap-3">
                                    {[
                                        { val: 0, label: 'Không có sổ tiết kiệm' },
                                        { val: 10, label: 'Sổ tiết kiệm < 150tr' },
                                        { val: 15, label: 'Sổ tiết kiệm > 200tr' },
                                        { val: 20, label: 'Sổ tiết kiệm > 300tr' },
                                        { val: 25, label: 'Sổ tiết kiệm > 500tr' }
                                    ].map(opt => (
                                        <label key={opt.val + opt.label} className="flex items-center p-3 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50 has-[:checked]:border-[#00dba1] has-[:checked]:bg-[#00dba1]/5 transition-all">
                                            <input type="radio" name="finance" className="w-5 h-5 accent-[#00dba1] mr-3"
                                                checked={formData.savings === opt.val}
                                                onChange={() => setFormData({ ...formData, savings: opt.val })} />
                                            <span className="text-gray-700 font-medium">{opt.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Q4 */}
                            <div className="space-y-4">
                                <h5 className="font-bold text-[#00dba1]">IV. TÀI SẢN KHÁC</h5>
                                <div className="grid gap-3">
                                    {[
                                        { val: 0, label: 'Không có nhà đất' },
                                        { val: 5, label: '1 nhà đất / Cổ phiếu' },
                                        { val: 15, label: '1 nhà đất + xe hơi' },
                                        { val: 20, label: '2 nhà đất trở lên + xe hơi' }
                                    ].map(opt => (
                                        <label key={opt.val + opt.label} className="flex items-center p-3 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50 has-[:checked]:border-[#00dba1] has-[:checked]:bg-[#00dba1]/5 transition-all">
                                            <input type="radio" name="assets" className="w-5 h-5 accent-[#00dba1] mr-3"
                                                checked={formData.assets === opt.val}
                                                onChange={() => setFormData({ ...formData, assets: opt.val })} />
                                            <span className="text-gray-700 font-medium">{opt.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 flex justify-between">
                                <button onClick={() => setStep('country')} className="px-6 py-2 rounded-full border border-gray-300 font-semibold hover:bg-gray-50">
                                    Quay lại
                                </button>
                                <button onClick={calculateScore} className="px-8 py-2 rounded-full bg-[#00dba1] text-white font-bold hover:bg-[#00c791] shadow-lg shadow-[#00dba1]/30">
                                    Tính điểm ngay
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Result */}
                    {step === 'result' && (
                        <div className="text-center py-10">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#00dba1] to-[#00a86b] flex flex-col items-center justify-center text-white mx-auto mb-6 shadow-xl ring-4 ring-green-100">
                                <span className="text-4xl font-bold">{totalScore}</span>
                                <span className="text-sm opacity-90">điểm</span>
                            </div>

                            <h2 className={`text-2xl font-bold mb-3 ${result.color}`}>{result.title}</h2>
                            <p className="text-gray-600 max-w-md mx-auto mb-10 leading-relaxed">
                                {result.desc}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button onClick={resetForm} className="px-8 py-3 rounded-full border-2 border-[#00dba1] text-[#00dba1] font-bold hover:bg-[#00dba1]/5">
                                    Kiểm tra lại
                                </button>
                                <button onClick={() => setStep('consult')} className="px-8 py-3 rounded-full bg-[#00dba1] text-white font-bold hover:bg-[#00c791] shadow-lg shadow-[#00dba1]/30">
                                    Tư vấn chi tiết
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Consult (Simplified placeholder) */}
                    {step === 'consult' && (
                        <div className="text-center py-10">
                            <Check className="w-16 h-16 text-[#00dba1] mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Đăng ký thành công!</h3>
                            <p className="text-gray-600">
                                Chúng tôi đã nhận được thông tin và sẽ liên hệ với bạn trong thời gian sớm nhất để tư vấn chi tiết về hồ sơ.
                            </p>
                            <button onClick={onClose} className="mt-8 px-6 py-2 rounded-full bg-gray-100 font-semibold hover:bg-gray-200">
                                Đóng
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
