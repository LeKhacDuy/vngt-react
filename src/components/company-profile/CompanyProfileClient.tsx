'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Users, Handshake, Award, FileText, Download, Briefcase, Globe,
    Building2, Compass, ShieldCheck, Heart, Sparkles, CheckCircle2,
    ArrowUpRight, Users2, Landmark, Plane, GraduationCap, ChevronRight,
    Check, Phone, MapPin, Mail, Leaf, Star, HelpCircle
} from 'lucide-react';

export default function CompanyProfileClient() {
    const [activeTab, setActiveTab] = useState<'T' | 'R' | 'U' | 'S' | 'T2'>('T');
    const [activeSector, setActiveSector] = useState<number>(0);
    const [counters, setCounters] = useState({
        customers: 0,
        groups: 0,
        partners: 0,
        guides: 0,
        trained: 0
    });
    const [hasAnimated, setHasAnimated] = useState(false);

    // Animate counters when in view
    useEffect(() => {
        if (hasAnimated) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setHasAnimated(true);
                    animateCounter('customers', 3000, 2000);
                    animateCounter('groups', 900, 2000);
                    animateCounter('partners', 100, 2000);
                    animateCounter('guides', 50, 2000);
                    animateCounter('trained', 100, 2000);
                }
            },
            { threshold: 0.2 }
        );

        const statsSection = document.getElementById('profile-stats-section');
        if (statsSection) {
            observer.observe(statsSection);
        }

        return () => observer.disconnect();
    }, [hasAnimated]);

    const animateCounter = (key: string, target: number, duration: number) => {
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                setCounters(prev => ({ ...prev, [key]: target }));
                clearInterval(timer);
            } else {
                setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
            }
        }, 16);
    };

    const trustValues = [
        {
            id: 'T' as const,
            letter: 'T',
            title: 'TRUSTWORTHINESS',
            subtitle: 'Tận tâm với Khách hàng',
            desc: 'Luôn đặt khách hàng làm trọng tâm, tận tình, chu đáo trong từng trải nghiệm. Lắng nghe và thấu hiểu mọi nguyện vọng để mang đến sự hài lòng tối đa.'
        },
        {
            id: 'R' as const,
            letter: 'R',
            title: 'RESPONSIBILITY',
            subtitle: 'Làm đúng cam kết và nhận trách nhiệm',
            desc: 'Cam kết rõ ràng, làm đúng những gì đã tuyên bố và sẵn sàng chịu trách nhiệm với mọi hành động, đảm bảo uy tín tuyệt đối trước đối tác và khách hàng.'
        },
        {
            id: 'U' as const,
            letter: 'U',
            title: 'UNITY',
            subtitle: 'Yêu thương và hỗ trợ đồng đội',
            desc: 'Sự gắn kết bền chặt, luôn quan tâm, hỗ trợ và chia sẻ giữa các phòng ban. Chúng tôi tin rằng một tập thể đoàn kết là nền tảng để tạo ra dịch vụ xuất sắc.'
        },
        {
            id: 'S' as const,
            letter: 'S',
            title: 'SINCERITY',
            subtitle: 'Trung thực và minh bạch',
            desc: 'Minh bạch trong mọi giao dịch tài chính, thông tin lịch trình và chính sách dịch vụ. Chân thành trong giao tiếp và trung thực trong mọi ứng xử.'
        },
        {
            id: 'T2' as const,
            letter: 'T',
            title: 'TRANSFORMATION',
            subtitle: 'Không ngừng đổi mới và tạo khác biệt',
            desc: 'Nhạy bén với xu hướng du lịch mới, không ngừng đổi mới sáng tạo trong thiết kế chương trình, dịch vụ để đem lại trải nghiệm độc đáo, khác biệt cho du khách.'
        }
    ];

    const businessSectors = [
        {
            title: 'Du lịch trong nước',
            subtitle: 'Khám phá trọn vẹn chất Việt',
            desc: 'VNGroup Tourist mang đến những hành trình khám phá tuyệt vời trên khắp mọi miền đất nước. Chúng tôi thiết kế tour linh hoạt theo sở thích và ngân sách, mang đến sản phẩm mới lạ, độc đáo với chất lượng dịch vụ ổn định 24/7.',
            features: [
                'Thiết kế tour cá nhân hóa & khác biệt',
                'Đảm bảo chất lượng dịch vụ ổn định mọi thời điểm',
                'Nhiều chương trình ưu đãi, gia tăng giá trị cộng thêm',
                'Hỗ trợ khách hàng chuyên nghiệp 24/7'
            ],
            image: '/cover/cover_domestic.jpg'
        },
        {
            title: 'Du lịch nước ngoài',
            subtitle: 'Chương trình đặc sắc, chọn lọc kỹ càng',
            desc: 'Nâng tầm trải nghiệm du lịch nước ngoài với những tuyến tour độc đáo, dịch vụ tận tâm và chính sách quản lý chất lượng nghiêm ngặt. Phục vụ chu đáo từ khâu thủ tục đến suốt hành trình khám phá.',
            features: [
                'Tuyến điểm chọn lọc: Thái Lan, Trung Quốc, Hàn Quốc, Nhật Bản...',
                'Mạng lưới đối tác quốc tế uy tín, trực tiếp',
                'Dịch vụ chăm sóc khách hàng tinh tế, tận tâm',
                'Chi phí hợp lý, nhiều ưu đãi hấp dẫn'
            ],
            image: '/cover/cover_international.jpg'
        },
        {
            title: 'Event - Teambuilding',
            subtitle: 'Bừng cháy nhiệt huyết, gắn kết bền lâu',
            desc: 'Mang đến những chương trình được thiết kế riêng biệt, phù hợp với văn hóa và mục tiêu của từng doanh nghiệp. Giúp khơi dậy tinh thần đồng đội, gắn kết nhân sự và kiến tạo những khoảnh khắc bùng nổ.',
            features: [
                'Kịch bản độc quyền, sáng tạo, giàu ý nghĩa',
                'Dịch vụ trọn gói, chi phí tối ưu hóa',
                'Tổ chức sự kiện chuyên nghiệp, chỉn chu đến từng chi tiết',
                'Đội ngũ quản trò (MC) năng động, kinh nghiệm dày dặn'
            ],
            image: '/cover/cover_teambuilding.jpg'
        },
        {
            title: 'Du lịch MICE',
            subtitle: 'Hội nghị, hội thảo & du lịch khen thưởng đẳng cấp',
            desc: 'Giải pháp tối ưu cho doanh nghiệp với các chương trình kết hợp hội nghị chuyên nghiệp và hoạt động teambuilding gắn kết. Mỗi sự kiện là một bước đệm vững chắc cho sự thăng hoa và phát triển bền vững của doanh nghiệp.',
            features: [
                'Dịch vụ hội thảo MICE chuyên nghiệp, đẳng cấp',
                'Kết hợp hoàn hảo giữa công việc và nghỉ dưỡng',
                'Tối ưu hóa ngân sách và thời gian tổ chức',
                'Nâng tầm hình ảnh thương hiệu của doanh nghiệp'
            ],
            image: '/cover/cover_china.jpg'
        },
        {
            title: 'Dịch vụ Visa / Passport',
            subtitle: 'Uy tín, bảo mật & tỷ lệ đậu cao',
            desc: 'Cung cấp dịch vụ làm visa chuyên nghiệp cho cả cá nhân và doanh nghiệp. Đội ngũ giàu kinh nghiệm hỗ trợ chuẩn bị hồ sơ bài bản cho các diện du lịch, công tác, thăm thân nhân tại tất cả các nước.',
            features: [
                'Tư vấn tận tâm, đánh giá hồ sơ chính xác',
                'Xử lý hồ sơ chuyên nghiệp, nhanh gọn',
                'Bảo mật tuyệt đối thông tin khách hàng',
                'Tối ưu hóa tỷ lệ đậu visa cao nhất'
            ],
            image: '/cover/cover1.jpg'
        },
        {
            title: 'Đại lý vé máy bay',
            subtitle: 'Đại lý chính thức của các hãng hàng không',
            desc: 'Là đối tác trực tiếp của các hãng hàng không trong nước và quốc tế, sẵn sàng hỗ trợ khách hàng đặt chỗ nhanh chóng, đặc biệt vào mùa cao điểm hoặc các chuyến bay khẩn cấp.',
            features: [
                'Cung cấp vé máy bay giá cạnh tranh nhất',
                'Hỗ trợ đặt chỗ khẩn cấp, mùa cao điểm 24/7',
                'Hỗ trợ làm thủ tục sân bay miễn phí (khách đoàn)',
                'Giải quyết đổi tên, hoàn hủy nhanh chóng, đúng quy định'
            ],
            image: '/cover/cover2.jpg'
        }
    ];

    const organizationDepts = [
        { name: 'PHÒNG NS - TC - KT', desc: 'Nhân sự - Tài chính - Kế toán' },
        { name: 'PHÒNG ĐIỀU HÀNH', desc: 'Thị trường Inbound, Outbound & Nội địa' },
        { name: 'PHÒNG VISA - VMB', desc: 'Dịch vụ Visa & Vé máy bay' },
        { name: 'PHÒNG KINH DOANH', desc: 'Sale & Chạy quảng cáo đa nền tảng' },
        { name: 'PHÒNG CSKH', desc: 'Chăm sóc và giải quyết phản hồi khách hàng' },
        { name: 'PHÒNG IT', desc: 'Hệ thống hạ tầng công nghệ thông tin' },
        { name: 'PHÒNG MARKETING', desc: 'Truyền thông & phát triển thương hiệu' }
    ];

    const clientJourneys = [
        { client: 'CÔNG TY KẾT CẤU THÉP ATAD', destination: 'PHAN THIẾT' },
        { client: 'NGÂN HÀNG TMCP QUỐC TẾ VIỆT NAM (VIB)', destination: 'PHAN THIẾT' },
        { client: 'TRƯỜNG ĐẠI HỌC HUFLIT', destination: 'TP. HỒ CHÍ MINH' },
        { client: 'HỌC VIỆN HÀNG KHÔNG QUỐC GIA VIỆT NAM', destination: 'THÁI LAN' },
        { client: 'TRƯỜNG TIỂU HỌC KIM ĐỒNG', destination: 'VŨNG TÀU / MỸ THO' },
        { client: 'FAMTRIP TP.HCM THAM QUAN LỆ GIANG - SHANGRILA', destination: 'TRUNG QUỐC' },
        { client: 'ĐOÀN THAM QUAN BUSAN - SEOUL', destination: 'HÀN QUỐC' },
        { client: 'CÔNG TY TNHH TMDV KIM ĐẠI NAM', destination: 'PHAN THIẾT' }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-[#00dba1]/30 selection:text-slate-900 overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative min-h-[70vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-gradient-to-br from-[#e6fbf7] via-slate-50 to-teal-50 text-slate-900">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,219,161,0.06),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_60%,#f8fafc_100%)]"></div>
                
                <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00dba1]/10 border border-[#00dba1]/20 text-[#00a36c] text-xs font-bold rounded-full mb-6 uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                        Hồ sơ năng lực doanh nghiệp
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight text-slate-950">
                        CÔNG TY TNHH TM - DV & DU LỊCH <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00dba1] via-emerald-500 to-teal-600">
                            VNGROUP TOURIST
                        </span>
                    </h1>
                    
                    <p className="text-base sm:text-xl text-slate-655 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
                        Hành trình đẳng cấp – Trải nghiệm khác biệt. Khẳng định uy tín và chất lượng qua từng chuyến đi. Dữ liệu cập nhật mới nhất đến tháng 04/2026.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a 
                            href="/documents/company-profile.pdf" 
                            download="Company profile_VNGroup Tourist.pdf"
                            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#00dba1] to-[#00b87a] hover:from-[#00c791] hover:to-[#00a36c] text-slate-950 font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-[#00dba1]/20 hover:shadow-[#00dba1]/40 hover:-translate-y-0.5"
                        >
                            <Download className="w-5 h-5 stroke-[2.5]" />
                            Tải PDF Bản Gốc (26MB)
                        </a>
                        <a 
                            href="/documents/company-profile.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5 shadow-sm"
                        >
                            <FileText className="w-5 h-5" />
                            Xem trực tuyến
                        </a>
                    </div>
                </div>
            </section>

            {/* Letter Section */}
            <section className="py-16 sm:py-24 container mx-auto px-4 -mt-20 relative z-20">
                <div className="bg-white rounded-3xl p-8 sm:p-12 md:p-16 shadow-[0_20px_50px_rgba(15,23,42,0.05)] border border-slate-100 max-w-4xl mx-auto relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#00dba1]/10 to-transparent rounded-bl-full"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#00dba1]/5 to-transparent rounded-tr-full"></div>

                    <div className="flex items-center gap-3 text-[#00dba1] font-bold text-sm tracking-widest uppercase mb-6">
                        <span className="w-8 h-px bg-[#00dba1]"></span>
                        Lời Ngỏ Từ Ban Giám Đốc
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-8 leading-snug">
                        Kính gửi Quý Khách hàng & Đối tác,
                    </h2>

                    <div className="text-slate-700 space-y-6 text-base sm:text-lg leading-relaxed font-light">
                        <p>
                            Lời đầu tiên, <strong className="font-semibold text-slate-950">VNGroup Tourist</strong> xin gửi đến Quý Khách hàng lời chào trân trọng và lời cảm ơn chân thành sâu sắc nhất vì sự quan tâm quý báu mà Quý vị đã dành cho chúng tôi.
                        </p>
                        <p>
                            Trong nhịp sống hiện đại, du lịch đã trở thành một nhu cầu thiết yếu để tái tạo năng lượng, gắn kết gia đình và nâng cao đời sống tinh thần. Thấu hiểu sâu sắc điều đó, VNGroup Tourist cam kết kiến tạo và mang đến những sản phẩm du lịch đa dạng, phong phú cùng chất lượng phục vụ vượt trội, đáp ứng cao nhất mọi kỳ vọng của bạn.
                        </p>
                        <p>
                            Là một công ty lữ hành trẻ trung và đầy khát vọng, chính thức ra mắt từ ngày <span className="font-semibold text-[#00a36c]">09/03/2023</span>, chúng tôi luôn nhạy bén nắm bắt các xu hướng du lịch hiện đại của thời đại để không ngừng nghiên cứu, cải tiến hệ thống sản phẩm. Với đội ngũ nhân sự giàu kinh nghiệm, nhiệt huyết, được đào tạo chuyên sâu từ các đơn vị lữ hành hàng đầu cùng mạng lưới đối tác chọn lọc kỹ lưỡng, mục tiêu của chúng tôi là mang tới những chuyến đi đầy ắp cảm xúc trọn vẹn nhất.
                        </p>
                        <p>
                            Bằng sự chuyên nghiệp, tinh thần trách nhiệm tuyệt đối và cam kết chất lượng, chúng tôi rất mong có cơ hội hợp tác và mang đến cho Quý Khách hàng những hành trình du lịch đẳng cấp, giá trị và đáng nhớ nhất.
                        </p>
                    </div>

                    <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                        <div>
                            <p className="text-slate-500 text-sm">VNGroup Tourist chân thành cảm ơn,</p>
                            <p className="text-slate-500 text-sm italic">Kính chúc Quý Khách hàng phát triển & thịnh vượng!</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-slate-950 text-lg">Trân trọng,</p>
                            <p className="font-semibold text-[#00b87a] uppercase tracking-wide mt-1">Đội ngũ VNGroup Tourist</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision, Mission & ESG Section */}
            <section className="py-20 bg-slate-50 text-slate-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,219,161,0.03),transparent_50%)]"></div>
                <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="text-[#00dba1] text-xs font-bold uppercase tracking-widest block mb-3">Tầm nhìn & Sứ mệnh</span>
                        <h2 className="text-3xl sm:text-5xl font-extrabold">Định Hướng Phát Triển Bền Vững</h2>
                        <div className="w-16 h-1 bg-[#00dba1] mx-auto mt-4 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        {/* Vision Card */}
                        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 flex flex-col justify-between hover:border-[#00dba1]/40 transition-all duration-300 shadow-sm">
                            <div>
                                <div className="w-12 h-12 bg-gradient-to-br from-[#00dba1]/15 to-emerald-500/15 rounded-2xl flex items-center justify-center text-[#00a36c] mb-6">
                                    <Compass className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-slate-950">Tầm Nhìn</h3>
                                <p className="text-slate-600 font-light leading-relaxed">
                                    VNGroup Tourist hướng đến việc trở thành thương hiệu du lịch được khách hàng yêu thích và tin tưởng nhất tại Việt Nam. Chúng tôi tiên phong kiến tạo những sản phẩm du lịch độc đáo, mang tính nhân văn sâu sắc và chất lượng dịch vụ cao cấp nhất.
                                </p>
                            </div>
                        </div>

                        {/* Mission Card */}
                        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 flex flex-col justify-between hover:border-[#00dba1]/40 transition-all duration-300 shadow-sm">
                            <div>
                                <div className="w-12 h-12 bg-gradient-to-br from-[#00dba1]/15 to-emerald-500/15 rounded-2xl flex items-center justify-center text-[#00a36c] mb-6">
                                    <Award className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-slate-950">Sứ Mệnh</h3>
                                <ul className="text-slate-600 font-light space-y-3.5 leading-relaxed">
                                    <li className="flex items-start gap-2.5">
                                        <Check className="w-4 h-4 text-[#00dba1] mt-1 flex-shrink-0" />
                                        <span>Tạo ra các sản phẩm du lịch phong phú, giàu giá trị văn hóa lịch sử, phục vụ mọi gia đình Việt.</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <Check className="w-4 h-4 text-[#00dba1] mt-1 flex-shrink-0" />
                                        <span>Kết nối du khách khám phá vẻ đẹp bất tận của quê hương Việt Nam và các nền văn minh lớn thế giới.</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <Check className="w-4 h-4 text-[#00dba1] mt-1 flex-shrink-0" />
                                        <span>Xây dựng môi trường làm việc sáng tạo, năng động, mang đến cơ hội thăng tiến và thu nhập công bằng cho nhân sự.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* ESG Commitment */}
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-8 md:p-10 border border-emerald-200/60 shadow-sm">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/20">
                                <Leaf className="w-10 h-10 text-slate-950 stroke-[2.2]" />
                            </div>
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-[#00a36c] rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                                    Tiêu chuẩn ESG
                                </div>
                                <h3 className="text-2xl font-bold text-slate-950 mb-3">Cam kết Phát triển Bền vững (ESG)</h3>
                                <p className="text-slate-650 font-light leading-relaxed">
                                    Ngay từ những ngày đầu thành lập, VNGroup Tourist đã đặt mục tiêu hướng đến sự <strong className="font-semibold text-slate-950">phát triển bền vững</strong>. Chúng tôi lồng ghép các tiêu chuẩn <strong className="text-[#00a36c]">Environment (Môi trường)</strong> – <strong className="text-[#00a36c]">Social (Xã hội)</strong> – <strong className="text-[#00a36c]">Governance (Quản trị)</strong> trong từng hành trình. Vừa mang đến trải nghiệm du lịch ý nghĩa, vừa nỗ lực bảo tồn môi trường điểm đến, tôn vinh văn hóa bản địa và kết nối giúp đỡ cộng đồng địa phương.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values (TRUST) Section */}
            <section className="py-24 container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <span className="text-[#00dba1] text-xs font-bold uppercase tracking-widest block mb-3">Kim chỉ nam</span>
                    <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950">Giá Trị Cốt Lõi - TRUST</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto mt-4 font-light text-base sm:text-lg">
                        Tại VNGroup Tourist, "TRUST" không đơn giản chỉ là chữ viết tắt, mà còn là tôn chỉ giúp chúng tôi xây dựng một thương hiệu du lịch đáng tin cậy.
                    </p>
                    <div className="w-16 h-1 bg-[#00dba1] mx-auto mt-6 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-8 md:p-12 rounded-3xl border border-slate-100 shadow-[0_15px_40px_rgba(15,23,42,0.03)]">
                    {/* Letters Nav */}
                    <div className="lg:col-span-5 flex flex-row lg:flex-col gap-3 sm:gap-4 justify-between lg:justify-start w-full">
                        {trustValues.map((val) => (
                            <button
                                key={val.id}
                                onClick={() => setActiveTab(val.id)}
                                className={`flex items-center gap-4 p-3.5 sm:p-5 rounded-2xl text-left transition-all duration-300 w-full cursor-pointer ${
                                    activeTab === val.id
                                        ? 'bg-[#00dba1]/20 border border-[#00dba1] text-slate-950 translate-x-1 shadow-sm'
                                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-100'
                                }`}
                            >
                                <span className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-black text-xl sm:text-2xl transition-colors duration-300 ${
                                    activeTab === val.id ? 'bg-[#00dba1] text-slate-950' : 'bg-slate-200 text-slate-700'
                                }`}>
                                    {val.letter}
                                </span>
                                <div className="hidden sm:block">
                                    <div className="font-bold text-xs uppercase opacity-65 tracking-wider">Giá trị</div>
                                    <div className="font-bold text-sm sm:text-base">{val.title}</div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Content Display */}
                    <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-10 rounded-2xl border border-slate-100 h-full flex flex-col justify-center min-h-[300px] transition-all duration-300">
                        {trustValues.map((val) => {
                            if (val.id !== activeTab) return null;
                            return (
                                <div key={val.id} className="animate-fade-in">
                                    <div className="inline-block px-3.5 py-1.5 bg-[#00dba1]/10 text-[#00b87a] rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                                        Chữ viết tắt: {val.letter}
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mb-2">{val.title}</h3>
                                    <h4 className="text-lg font-semibold text-[#00b87a] mb-6">{val.subtitle}</h4>
                                    <p className="text-slate-600 leading-relaxed text-base sm:text-lg font-light">
                                        {val.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Business Sectors Section */}
            <section className="py-24 bg-slate-50 text-slate-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,219,161,0.03),transparent_40%)]"></div>
                <div className="container mx-auto px-4 max-w-6xl relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-[#00dba1] text-xs font-bold uppercase tracking-widest block mb-3">Lĩnh vực hoạt động</span>
                        <h2 className="text-3xl sm:text-5xl font-extrabold">Lĩnh Vực Kinh Doanh Cốt Lõi</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto mt-4 font-light text-sm sm:text-base">
                            Chúng tôi cung cấp giải pháp dịch vụ lữ hành toàn diện và chất lượng vượt trội nhằm đáp ứng tối đa mọi nhu cầu của du khách.
                        </p>
                        <div className="w-16 h-1 bg-[#00dba1] mx-auto mt-6 rounded-full"></div>
                    </div>

                    {/* Sectors Grid/Tabs */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Tab List */}
                        <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-2.5 w-full">
                            {businessSectors.map((sector, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveSector(idx)}
                                    className={`px-5 py-4 rounded-xl font-bold text-left transition-all duration-300 text-sm cursor-pointer border ${
                                        activeSector === idx
                                            ? 'bg-[#00dba1] text-slate-950 border-[#00dba1] shadow-md'
                                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                                    }`}
                                >
                                    {sector.title}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content Panel */}
                        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm transition-all duration-300">
                            <div className="relative h-64 sm:h-80 w-full">
                                <Image
                                    src={businessSectors[activeSector].image}
                                    alt={businessSectors[activeSector].title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-955/70 via-slate-955/10 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <span className="text-[#00dba1] font-bold text-xs uppercase tracking-wider block mb-1">
                                        Mảng kinh doanh 0{activeSector + 1}
                                    </span>
                                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                                        {businessSectors[activeSector].title}
                                    </h3>
                                </div>
                            </div>
                            
                            <div className="p-8 sm:p-10 space-y-6">
                                <h4 className="text-lg font-bold text-[#00b87a]">{businessSectors[activeSector].subtitle}</h4>
                                <p className="text-slate-600 font-light leading-relaxed">
                                    {businessSectors[activeSector].desc}
                                </p>
                                
                                <div className="pt-4 border-t border-slate-100">
                                    <h5 className="font-bold text-sm text-slate-950 uppercase tracking-wider mb-4">Các dịch vụ tiêu biểu:</h5>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                        {businessSectors[activeSector].features.map((feat, fidx) => (
                                            <div key={fidx} className="flex items-start gap-2.5">
                                                <CheckCircle2 className="w-4 h-4 text-[#00dba1] mt-0.5 flex-shrink-0" />
                                                <span className="text-sm text-slate-650 font-light">{feat}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Organization & Human Resources */}
            <section className="py-24 container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <span className="text-[#00dba1] text-xs font-bold uppercase tracking-widest block mb-3">Cơ cấu & Con người</span>
                    <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950">Bộ Máy Tổ Chức & Nhân Sự</h2>
                    <div className="w-16 h-1 bg-[#00dba1] mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Staff Qualifications */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex gap-4 items-center">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                            <Users2 className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-extrabold text-slate-950 text-xl">50+ Nhân Sự</h4>
                            <p className="text-sm text-slate-500 font-light">Nhân viên hoạt động chuyên nghiệp</p>
                        </div>
                    </div>
                    
                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex gap-4 items-center">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
                            <GraduationCap className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-extrabold text-slate-950 text-xl">Đào Tạo Định Kỳ</h4>
                            <p className="text-sm text-slate-500 font-light">Trình độ từ Cao đẳng đến Cao học</p>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex gap-4 items-center">
                        <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 flex-shrink-0">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-extrabold text-slate-950 text-xl">Chuẩn Mực Phục Vụ</h4>
                            <p className="text-sm text-slate-500 font-light">Chính trực, lấy Khách hàng làm trung tâm</p>
                        </div>
                    </div>
                </div>

                {/* Organogram */}
                <div className="bg-white p-6 sm:p-10 md:p-12 rounded-3xl border border-slate-100 shadow-sm">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mb-10 text-center uppercase tracking-wide">
                        Sơ Đồ Cơ Cấu Tổ Chức
                    </h3>

                    {/* Visual Tree Layout */}
                    <div className="max-w-4xl mx-auto space-y-8">
                        {/* Level 1: Director */}
                        <div className="flex justify-center">
                            <div className="bg-slate-950 text-white px-8 py-3.5 rounded-xl font-bold text-center shadow-md border border-slate-800 min-w-[180px]">
                                GIÁM ĐỐC
                            </div>
                        </div>

                        {/* Connector Line */}
                        <div className="flex justify-center -my-8">
                            <div className="w-0.5 h-8 bg-slate-300"></div>
                        </div>

                        {/* Level 2: Deputy Director */}
                        <div className="flex justify-center">
                            <div className="bg-slate-800 text-white px-8 py-3.5 rounded-xl font-bold text-center shadow-md border border-slate-700 min-w-[180px]">
                                PHÓ GIÁM ĐỐC
                            </div>
                        </div>

                        {/* Connector Line */}
                        <div className="flex justify-center -my-8">
                            <div className="w-0.5 h-8 bg-slate-300"></div>
                        </div>

                        {/* Horizontal Connector Line for Departments */}
                        <div className="hidden md:block relative w-full h-0.5 bg-slate-300 top-4"></div>

                        {/* Level 3: Department List */}
                        <div className="grid grid-cols-1 md:grid-cols-7 gap-3 pt-6 relative z-10">
                            {organizationDepts.map((dept, idx) => (
                                <div key={idx} className="bg-slate-50 hover:bg-slate-100 hover:border-[#00dba1] transition-all p-4 rounded-xl border border-slate-200 text-center flex flex-col justify-center h-full min-h-[90px]">
                                    <h4 className="font-extrabold text-slate-950 text-xs tracking-wider mb-1.5 uppercase">{dept.name}</h4>
                                    <p className="text-[10px] text-slate-500 leading-tight font-medium">{dept.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us & Product Commitment */}
            <section className="py-20 bg-white text-slate-950 relative overflow-hidden">
                <div className="container mx-auto px-4 max-w-6xl relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-[#00dba1] text-xs font-bold uppercase tracking-widest block mb-3">Lý do đồng hành</span>
                        <h2 className="text-3xl sm:text-5xl font-extrabold">Vì Sao Nên Chọn VNGroup Tourist?</h2>
                        <div className="w-16 h-1 bg-[#00dba1] mx-auto mt-4 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {[
                            { title: 'UY TÍN HÀNG ĐẦU', desc: 'Khẳng định qua sự tin cậy tuyệt đối của hàng nghìn khách hàng và cam kết thực hiện đúng mọi điều khoản.' },
                            { title: 'CHI PHÍ TỐI ƯU', desc: 'Thiết kế giải pháp phù hợp ngân sách riêng biệt của từng doanh nghiệp và du khách cá nhân.' },
                            { title: 'SẢN PHẨM ĐỘC ĐÁO', desc: 'Liên tục nghiên cứu nâng cấp để phát triển các chương trình tour mới mẻ, mang chất riêng biệt.' },
                            { title: 'THỦ TỤC ĐƠN GIẢN', desc: 'Quy trình tư vấn chuẩn hóa, xử lý visa và vé máy bay nhanh chóng, loại bỏ tối đa phiền hà.' },
                            { title: 'CHẤT LƯỢNG ĐẢM BẢO', desc: 'Hệ thống đối tác cung cấp dịch vụ được kiểm soát chất lượng chặt chẽ trên toàn quốc và quốc tế.' },
                            { title: 'NHÂN SỰ TRẺ TRUNG', desc: 'Đội ngũ giàu năng lượng, nhạy bén xu hướng mới để hỗ trợ và xử lý phát sinh nhanh gọn.' }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-slate-50 border border-slate-200/80 p-8 rounded-2xl flex flex-col justify-between hover:border-[#00dba1]/30 hover:shadow-sm transition-all duration-300">
                                <div>
                                    <div className="w-8 h-8 rounded-lg bg-[#00dba1]/10 text-[#00a36c] font-bold text-xs flex items-center justify-center mb-5 border border-[#00dba1]/20">
                                        0{idx + 1}
                                    </div>
                                    <h4 className="font-extrabold text-slate-950 text-lg mb-3 tracking-wide">{item.title}</h4>
                                    <p className="text-slate-600 text-sm leading-relaxed font-light">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Product Commitment */}
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-8 md:p-12 rounded-3xl border border-emerald-200/50 text-center max-w-4xl mx-auto shadow-sm">
                        <h3 className="text-2xl font-bold mb-6 text-slate-950">Cam Kết Sản Phẩm & Dịch Vụ</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                            <div className="bg-white p-5 rounded-xl border border-slate-200">
                                <h4 className="font-bold text-[#00b87a] text-base mb-2">Chất lượng tốt nhất</h4>
                                <p className="text-xs text-slate-600 leading-relaxed font-light">Cung cấp các sản phẩm chất lượng dịch vụ chuẩn chỉnh đi đôi với chi phí phù hợp nhất.</p>
                            </div>
                            <div className="bg-white p-5 rounded-xl border border-slate-200">
                                <h4 className="font-bold text-[#00b87a] text-base mb-2">Dịch vụ độc đáo</h4>
                                <p className="text-xs text-slate-600 leading-relaxed font-light">Tạo ra những hành trình mới lạ mang lại giá trị trải nghiệm cao và cảm xúc khác biệt cho du khách.</p>
                            </div>
                            <div className="bg-white p-5 rounded-xl border border-slate-200">
                                <h4 className="font-bold text-[#00b87a] text-base mb-2">Chính sách ưu việt</h4>
                                <p className="text-xs text-slate-600 leading-relaxed font-light">Đáp ứng nhu cầu trên góc độ mang lại lợi ích tốt nhất cho quý đối tác và khách hàng.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats counter section */}
            <section id="profile-stats-section" className="py-24 bg-white relative">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="text-[#00dba1] text-xs font-bold uppercase tracking-widest block mb-3">Kết quả hành trình</span>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950">Những Con Số "Biết Nói"</h2>
                        <div className="w-16 h-1 bg-[#00dba1] mx-auto mt-4 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
                        {[
                            { count: counters.customers, label: 'Lượt Khách Hàng', suffix: '+' },
                            { count: counters.groups, label: 'Lượt Khách Đoàn', suffix: '+' },
                            { count: counters.partners, label: 'Đối Tác Chiến Lược', suffix: '+' },
                            { count: counters.guides, label: 'Hướng Dẫn Viên Có Thẻ', suffix: '+' },
                            { count: counters.trained, label: 'Nhân Sự Đào Tạo Bài Bản', suffix: '%' }
                        ].map((stat, idx) => (
                            <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center hover:bg-white hover:shadow-lg transition-all duration-300">
                                <div className="text-3xl sm:text-5xl font-black text-slate-950 mb-3 tracking-tight">
                                    {stat.count}{stat.suffix}
                                </div>
                                <div className="text-slate-500 font-medium text-xs sm:text-sm leading-snug">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Client Journeys & Footprints */}
            <section className="py-24 bg-slate-50 border-t border-slate-100">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="text-[#00dba1] text-xs font-bold uppercase tracking-widest block mb-3">Đối tác đồng hành</span>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950">Dấu Ấn Hành Trình</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto mt-4 font-light text-sm sm:text-base">
                            Mỗi hành trình đi qua là một cột mốc, mỗi khoảnh khắc đồng hành là một kỷ niệm đáng trân quý mà VNGroup Tourist vinh dự kiến tạo.
                        </p>
                        <div className="w-16 h-1 bg-[#00dba1] mx-auto mt-4 rounded-full"></div>
                    </div>

                    {/* Journeys List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {clientJourneys.map((item, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                                <div>
                                    <span className="text-[10px] text-[#00b87a] font-bold tracking-wider uppercase block mb-2">Đoàn khách đoàn</span>
                                    <h4 className="font-extrabold text-slate-950 text-sm mb-4 leading-normal">{item.client}</h4>
                                </div>
                                <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-xs text-slate-500">
                                    <span>Điểm đến:</span>
                                    <strong className="text-slate-800 font-bold">{item.destination}</strong>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Download Bottom Banner */}
            <section className="py-20 bg-gradient-to-r from-[#e6fbf7] via-slate-50 to-teal-50 text-slate-950 text-center relative overflow-hidden border-t border-slate-100">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,219,161,0.04),transparent_50%)]"></div>
                <div className="container mx-auto px-4 relative z-10 max-w-3xl">
                    <Building2 className="w-12 h-12 text-[#00b87a] mx-auto mb-6" />
                    <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-slate-950">Sở Hữu Bản In Hồ Sơ Năng Lực</h2>
                    <p className="text-slate-655 font-light mb-10 text-sm sm:text-base">
                        Để phục vụ cho nhu cầu lưu trữ, nghiên cứu hoặc trình ban lãnh đạo phê duyệt, quý khách vui lòng tải về bản PDF chất lượng cao đầy đủ của chúng tôi.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a 
                            href="/documents/company-profile.pdf" 
                            download="Company profile_VNGroup Tourist.pdf"
                            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#00dba1] to-[#00b87a] hover:from-[#00c791] hover:to-[#00a36c] text-slate-950 font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-[#00dba1]/20 cursor-pointer"
                        >
                            <Download className="w-5 h-5 stroke-[2.5]" />
                            Tải Bản PDF Đầy Đủ
                        </a>
                        <Link 
                            href="/contact-page"
                            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
                        >
                            <Phone className="w-4 h-4 text-slate-550" />
                            Liên hệ tư vấn trực tiếp
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
