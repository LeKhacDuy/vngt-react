'use client';

import { Flower2, Sun, Leaf, Snowflake, Flag, Users, ShoppingBag, Percent, MapPin, Clock, Shield, Star, Sparkles, TreePine, Waves, Mountain, Heart, Zap, Gift, TrendingDown, Ban } from 'lucide-react';

// Theme configuration for each subcategory
export interface SubcategoryTheme {
    key: string;
    title: string;
    subtitle: string;
    description: string;
    gradient: string;          // Hero background gradient
    accentColor: string;       // Primary accent (hex)
    accentBg: string;          // Accent background class
    accentText: string;        // Accent text class
    accentBorder: string;      // Accent border class
    icon: React.ReactNode;
    heroPattern: string;       // Decorative CSS pattern
    highlights: { icon: React.ReactNode; title: string; desc: string }[];
    tags: string[];
}

const themes: Record<string, SubcategoryTheme> = {
    spring: {
        key: 'spring',
        title: 'Tour Mùa Xuân',
        subtitle: '🌸 Xuân về - Hoa nở khắp muôn nơi',
        description: 'Chào đón năm mới với những hành trình ngập tràn sắc hoa, lễ hội truyền thống và không khí mùa xuân tươi đẹp khắp Việt Nam và thế giới.',
        gradient: 'from-pink-500 via-rose-400 to-orange-300',
        accentColor: '#ec4899',
        accentBg: 'bg-pink-500',
        accentText: 'text-pink-500',
        accentBorder: 'border-pink-500',
        icon: <Flower2 className="w-8 h-8" />,
        heroPattern: 'radial-gradient(circle at 20% 80%, rgba(255,182,193,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,218,185,0.3) 0%, transparent 50%)',
        highlights: [
            { icon: <Flower2 className="w-6 h-6" />, title: 'Ngắm hoa xuân', desc: 'Hoa đào, hoa mai, hoa anh đào nở rộ khắp nơi' },
            { icon: <Star className="w-6 h-6" />, title: 'Lễ hội đầu năm', desc: 'Tham gia các lễ hội truyền thống đặc sắc' },
            { icon: <MapPin className="w-6 h-6" />, title: 'Điểm đến phổ biến', desc: 'Sapa, Hà Giang, Đà Lạt, Nhật Bản, Hàn Quốc' },
            { icon: <Heart className="w-6 h-6" />, title: 'Thời tiết dễ chịu', desc: 'Khí hậu mát mẻ, thích hợp du lịch trải nghiệm' },
        ],
        tags: ['Hoa đào', 'Lễ hội Tết', 'Hoa anh đào', 'Ngắm hoa', 'Du xuân'],
    },
    summer: {
        key: 'summer',
        title: 'Tour Mùa Hè',
        subtitle: '☀️ Hè rực rỡ - Biển xanh vẫy gọi',
        description: 'Mùa hè sôi động với biển xanh cát trắng, team building, nghỉ dưỡng resort 5 sao và những cuộc phiêu lưu đáng nhớ.',
        gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
        accentColor: '#0ea5e9',
        accentBg: 'bg-sky-500',
        accentText: 'text-sky-500',
        accentBorder: 'border-sky-500',
        icon: <Sun className="w-8 h-8" />,
        heroPattern: 'radial-gradient(circle at 90% 90%, rgba(56,189,248,0.3) 0%, transparent 50%), radial-gradient(circle at 10% 30%, rgba(99,102,241,0.2) 0%, transparent 50%)',
        highlights: [
            { icon: <Waves className="w-6 h-6" />, title: 'Biển đảo thiên đường', desc: 'Phú Quốc, Nha Trang, Quy Nhơn, Bali, Maldives' },
            { icon: <Sun className="w-6 h-6" />, title: 'Nghỉ dưỡng cao cấp', desc: 'Resort 4-5 sao ven biển, spa & wellness' },
            { icon: <Users className="w-6 h-6" />, title: 'Team Building', desc: 'Hoạt động nhóm vui nhộn, gắn kết đồng đội' },
            { icon: <Sparkles className="w-6 h-6" />, title: 'Trải nghiệm mới', desc: 'Lặn biển, lướt sóng, chèo kayak, zipline' },
        ],
        tags: ['Biển đảo', 'Nghỉ dưỡng', 'Team Building', 'Water Sport', 'Resort'],
    },
    autumn: {
        key: 'autumn',
        title: 'Tour Mùa Thu',
        subtitle: '🍂 Thu vàng - Lãng mạn từng khoảnh khắc',
        description: 'Mùa thu lãng mạn với sắc lá vàng đỏ, thời tiết se lạnh và những cung đường đẹp mê hồn xuyên qua các vùng đất thơ mộng.',
        gradient: 'from-amber-500 via-orange-500 to-red-500',
        accentColor: '#f59e0b',
        accentBg: 'bg-amber-500',
        accentText: 'text-amber-500',
        accentBorder: 'border-amber-500',
        icon: <Leaf className="w-8 h-8" />,
        heroPattern: 'radial-gradient(circle at 30% 70%, rgba(251,191,36,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(239,68,68,0.2) 0%, transparent 50%)',
        highlights: [
            { icon: <Leaf className="w-6 h-6" />, title: 'Ngắm lá đổi màu', desc: 'Lá phong đỏ, lá bạch dương vàng rực rỡ' },
            { icon: <Mountain className="w-6 h-6" />, title: 'Cung đường tuyệt đẹp', desc: 'Hà Giang, Tây Bắc, Nhật Bản, Hàn Quốc' },
            { icon: <Clock className="w-6 h-6" />, title: 'Thời tiết lý tưởng', desc: 'Mát mẻ, trong lành, không quá nóng hay lạnh' },
            { icon: <Star className="w-6 h-6" />, title: 'Check-in đỉnh cao', desc: 'Những bức ảnh mùa thu đẹp như tranh vẽ' },
        ],
        tags: ['Lá phong đỏ', 'Mùa thu vàng', 'Hà Giang', 'Tây Bắc', 'Lãng mạn'],
    },
    winter: {
        key: 'winter',
        title: 'Tour Mùa Đông',
        subtitle: '❄️ Đông về - Lạnh mà ấm áp',
        description: 'Trải nghiệm mùa đông kỳ diệu với tuyết trắng, suối nước nóng, lễ hội Giáng sinh và những khoảnh khắc đáng nhớ bên người thương.',
        gradient: 'from-blue-600 via-indigo-600 to-purple-700',
        accentColor: '#6366f1',
        accentBg: 'bg-indigo-500',
        accentText: 'text-indigo-500',
        accentBorder: 'border-indigo-500',
        icon: <Snowflake className="w-8 h-8" />,
        heroPattern: 'radial-gradient(circle at 80% 80%, rgba(129,140,248,0.3) 0%, transparent 50%), radial-gradient(circle at 20% 20%, rgba(167,139,250,0.2) 0%, transparent 50%)',
        highlights: [
            { icon: <Snowflake className="w-6 h-6" />, title: 'Ngắm tuyết rơi', desc: 'Sapa, Nhật Bản, Hàn Quốc, Châu Âu' },
            { icon: <Sparkles className="w-6 h-6" />, title: 'Giáng sinh & Năm mới', desc: 'Đón lễ hội cuối năm tại các thành phố nổi tiếng' },
            { icon: <Heart className="w-6 h-6" />, title: 'Suối nước nóng', desc: 'Thư giãn onsen, spa giữa mùa đông lạnh giá' },
            { icon: <Star className="w-6 h-6" />, title: 'Ẩm thực mùa đông', desc: 'Lẩu nóng, thức uống ấm, đặc sản mùa đông' },
        ],
        tags: ['Tuyết rơi', 'Giáng sinh', 'Onsen', 'Mùa đông', 'Châu Âu'],
    },
    holiday: {
        key: 'holiday',
        title: 'Tour Lễ 30/4',
        subtitle: '🎉 Kỳ nghỉ lễ - Bùng nổ trải nghiệm',
        description: 'Tận dụng kỳ nghỉ lễ 30/4 - 1/5 với những chuyến đi đặc biệt, giá ưu đãi và lịch trình được thiết kế tối ưu cho kỳ nghỉ dài ngày.',
        gradient: 'from-red-600 via-red-500 to-yellow-500',
        accentColor: '#dc2626',
        accentBg: 'bg-red-600',
        accentText: 'text-red-600',
        accentBorder: 'border-red-600',
        icon: <Flag className="w-8 h-8" />,
        heroPattern: 'radial-gradient(circle at 50% 50%, rgba(239,68,68,0.2) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(234,179,8,0.2) 0%, transparent 40%)',
        highlights: [
            { icon: <Flag className="w-6 h-6" />, title: 'Kỳ nghỉ dài ngày', desc: 'Tận dụng 4-5 ngày nghỉ lễ liên tiếp' },
            { icon: <Zap className="w-6 h-6" />, title: 'Đặt sớm giảm giá', desc: 'Ưu đãi đặc biệt khi đặt trước 30 ngày' },
            { icon: <MapPin className="w-6 h-6" />, title: 'Nhiều điểm đến', desc: 'Trong nước lẫn quốc tế, đa dạng lựa chọn' },
            { icon: <Shield className="w-6 h-6" />, title: 'Cam kết chất lượng', desc: 'Dịch vụ đảm bảo, không phụ thu ngày lễ' },
        ],
        tags: ['Lễ 30/4', 'Nghỉ lễ', 'Ưu đãi', 'Đặt sớm', 'Kỳ nghỉ dài'],
    },
    'mini-group': {
        key: 'mini-group',
        title: 'Tour Mini Group',
        subtitle: '👥 Nhóm nhỏ - Trải nghiệm lớn',
        description: 'Tour nhóm nhỏ từ 4-15 người, dịch vụ cao cấp, HDV riêng, lịch trình linh hoạt và trải nghiệm sâu tại mỗi điểm đến.',
        gradient: 'from-violet-600 via-purple-500 to-fuchsia-500',
        accentColor: '#8b5cf6',
        accentBg: 'bg-violet-500',
        accentText: 'text-violet-500',
        accentBorder: 'border-violet-500',
        icon: <Users className="w-8 h-8" />,
        heroPattern: 'radial-gradient(circle at 20% 50%, rgba(139,92,246,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(217,70,239,0.2) 0%, transparent 50%)',
        highlights: [
            { icon: <Users className="w-6 h-6" />, title: 'Nhóm 4-15 người', desc: 'Không gian riêng tư, không đông đúc' },
            { icon: <Star className="w-6 h-6" />, title: 'HDV chuyên nghiệp', desc: 'Hướng dẫn viên riêng, am hiểu địa phương' },
            { icon: <Clock className="w-6 h-6" />, title: 'Lịch trình linh hoạt', desc: 'Dừng chân thoải mái, không vội vã' },
            { icon: <Shield className="w-6 h-6" />, title: 'Dịch vụ VIP', desc: 'Khách sạn 4-5 sao, xe riêng, ăn uống chọn lọc' },
        ],
        tags: ['Nhóm nhỏ', 'VIP', 'Riêng tư', 'Linh hoạt', 'Cao cấp'],
    },
    'no-shopping': {
        key: 'no-shopping',
        title: 'Tour No Shop',
        subtitle: '🚫🛍️ Không mua sắm - 100% tham quan',
        description: 'Cam kết không ghé bất kỳ cửa hàng mua sắm nào. Toàn bộ thời gian dành cho tham quan, khám phá và tận hưởng kỳ nghỉ trọn vẹn.',
        gradient: 'from-emerald-600 via-green-500 to-teal-500',
        accentColor: '#10b981',
        accentBg: 'bg-emerald-500',
        accentText: 'text-emerald-500',
        accentBorder: 'border-emerald-500',
        icon: <Ban className="w-8 h-8" />,
        heroPattern: 'radial-gradient(circle at 30% 80%, rgba(16,185,129,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 20%, rgba(20,184,166,0.2) 0%, transparent 50%)',
        highlights: [
            { icon: <Ban className="w-6 h-6" />, title: 'Không ghé shop', desc: 'Cam kết 100% không có điểm mua sắm bắt buộc' },
            { icon: <Clock className="w-6 h-6" />, title: 'Nhiều thời gian hơn', desc: 'Dành trọn thời gian cho tham quan & trải nghiệm' },
            { icon: <MapPin className="w-6 h-6" />, title: 'Đi sâu hơn', desc: 'Ghé thêm nhiều điểm tham quan thú vị' },
            { icon: <Heart className="w-6 h-6" />, title: 'Hài lòng tuyệt đối', desc: 'Không áp lực mua sắm, thoải mái 100%' },
        ],
        tags: ['No Shop', 'Tham quan', 'Trải nghiệm', 'Thoải mái', 'Chất lượng'],
    },
    promotion: {
        key: 'promotion',
        title: 'Tour Khuyến Mãi',
        subtitle: '🔥 Hot Deal - Giá tốt nhất mùa này',
        description: 'Tổng hợp những chương trình tour đang có khuyến mãi đặc biệt. Giá cực sốc, dịch vụ không đổi. Số lượng có hạn, đặt ngay!',
        gradient: 'from-orange-600 via-red-500 to-rose-600',
        accentColor: '#ea580c',
        accentBg: 'bg-orange-600',
        accentText: 'text-orange-600',
        accentBorder: 'border-orange-600',
        icon: <Percent className="w-8 h-8" />,
        heroPattern: 'radial-gradient(circle at 50% 30%, rgba(234,88,12,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(225,29,72,0.2) 0%, transparent 40%)',
        highlights: [
            { icon: <TrendingDown className="w-6 h-6" />, title: 'Giảm đến 40%', desc: 'Tiết kiệm lớn so với giá gốc' },
            { icon: <Zap className="w-6 h-6" />, title: 'Flash Sale', desc: 'Ưu đãi có thời hạn, đặt ngay kẻo lỡ' },
            { icon: <Gift className="w-6 h-6" />, title: 'Quà tặng kèm', desc: 'Voucher, upgrade phòng, bữa ăn miễn phí' },
            { icon: <Shield className="w-6 h-6" />, title: 'Chất lượng giữ nguyên', desc: 'Giá giảm nhưng dịch vụ không thay đổi' },
        ],
        tags: ['Giảm giá', 'Flash Sale', 'Hot Deal', 'Ưu đãi', 'Số lượng có hạn'],
    },
};

export function getSubcategoryTheme(key: string): SubcategoryTheme {
    return themes[key] || themes['promotion'];
}

// Animated floating particles for hero
function FloatingParticles({ theme }: { theme: SubcategoryTheme }) {
    const particleEmojis: Record<string, string[]> = {
        spring: ['🌸', '🌺', '🌷', '🦋', '🌿'],
        summer: ['☀️', '🌊', '🏖️', '🐚', '🌴'],
        autumn: ['🍂', '🍁', '🍃', '🌾', '🍄'],
        winter: ['❄️', '⛄', '🌨️', '✨', '🎄'],
        holiday: ['🎉', '🎊', '🇻🇳', '⭐', '🎇'],
        'mini-group': ['👥', '✨', '🌟', '💎', '🏆'],
        'no-shopping': ['🌿', '🗺️', '📸', '⛰️', '🌅'],
        promotion: ['🔥', '💥', '⚡', '🎁', '💰'],
    };

    const emojis = particleEmojis[theme.key] || ['✨'];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {emojis.map((emoji, i) => (
                <div
                    key={i}
                    className="absolute animate-float opacity-20"
                    style={{
                        left: `${15 + i * 18}%`,
                        top: `${10 + (i % 3) * 25}%`,
                        animationDelay: `${i * 0.8}s`,
                        animationDuration: `${3 + i * 0.5}s`,
                        fontSize: `${24 + i * 4}px`,
                    }}
                >
                    {emoji}
                </div>
            ))}
        </div>
    );
}

export default function SubcategoryHero({ subcategoryKey }: { subcategoryKey: string }) {
    const theme = getSubcategoryTheme(subcategoryKey);

    return (
        <>
            {/* Hero Banner */}
            <section className={`relative overflow-hidden bg-gradient-to-br ${theme.gradient} text-white`}>
                {/* Background Pattern */}
                <div
                    className="absolute inset-0"
                    style={{ background: theme.heroPattern }}
                />

                {/* Floating Particles */}
                <FloatingParticles theme={theme} />

                {/* Decorative circles */}
                <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-white/5 blur-3xl" />

                <div className="relative container mx-auto px-4 py-16 lg:py-24">
                    <div className="max-w-3xl">
                        {/* Category Badge */}
                        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
                            <span className="text-white">{theme.icon}</span>
                            <span className="text-sm font-bold tracking-wider uppercase">{theme.key.replace('-', ' ')}</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl lg:text-6xl font-bold mb-4 leading-tight">
                            {theme.title}
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl lg:text-2xl font-medium mb-6 text-white/90">
                            {theme.subtitle}
                        </p>

                        {/* Description */}
                        <p className="text-base lg:text-lg text-white/75 mb-8 max-w-2xl leading-relaxed">
                            {theme.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {theme.tags.map((tag, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20 hover:bg-white/20 transition-colors cursor-default"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                        <path d="M0,60 C360,100 720,20 1080,60 C1260,80 1380,70 1440,60 L1440,100 L0,100 Z" fill="#f9fafb" />
                    </svg>
                </div>
            </section>

            {/* Highlights Section */}
            <section className="bg-gray-50 py-12 lg:py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {theme.highlights.map((item, i) => (
                            <div
                                key={i}
                                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:-translate-y-1"
                            >
                                <div
                                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}
                                    style={{ backgroundColor: `${theme.accentColor}15`, color: theme.accentColor }}
                                >
                                    {item.icon}
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
