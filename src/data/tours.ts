
export interface Tour {
    id: string;
    name: string;
    image: string;
    price: string;
    originalPrice?: string;
    duration: string;
    departure: string;
    discount?: string;
    slug: string;
    category: 'international' | 'domestic' | 'luxury' | 'group' | 'inbound';
    subcategory?: string; // For Group Tours tabs (e.g., 'company', 'family')
    destination: string; // Country code or name
    rating?: number;
    reviews?: number;
    priceValue: number; // For sorting
    // New detailed fields
    gallery?: string[];
    itinerary?: {
        day: number;
        title: string;
        description: string;
        image?: string;
    }[];
    inclusions?: string[];
    exclusions?: string[];
    policy?: string;
}

export const tours: Tour[] = [
    // International Tours
    {
        id: '1',
        name: 'Tour Thái Lan 5N4Đ: Bangkok - Pattaya - Đảo Coral - Show Alcazar',
        image: '/images/tour1.jpg',
        price: '5.990.000đ',
        originalPrice: '7.500.000đ',
        duration: '5 Ngày 4 Đêm',
        departure: 'Thứ 5 hàng tuần',
        discount: '-20%',
        slug: 'thai-lan-5n4d',
        category: 'international',
        destination: 'TH',
        priceValue: 5990000,
        gallery: [
            '/images/tour1.jpg',
            '/images/tour2.jpg',
            '/images/tour3.jpg',
            '/images/tour4.jpg'
        ],
        itinerary: [
            {
                day: 1,
                title: 'TP.HCM - Bangkok - Pattaya (Ăn trưa, tối)',
                description: 'Trưởng đoàn đón quý khách tại sân bay Tân Sơn Nhất, làm thủ tục bay đi Bangkok. Đến nơi, xe đưa đoàn về Pattaya. Trên đường ghé tham quan Trân Bảo Phật Sơn.',
                image: '/images/tour1.jpg'
            },
            {
                day: 2,
                title: 'Pattaya - Đảo Coral - Show Alcazar (Ăn 3 bữa)',
                description: 'Sáng: Đi cano ra đảo Coral, tự do tắm biển. Chiều: Tham quan Xưởng chế tác đá quý, Trung tâm giấc ngủ Hoàng gia. Tối: Xem show bê đê Alcazar hoành tráng.',
                image: '/images/tour2.jpg'
            },
            {
                day: 3,
                title: 'Pattaya - Muang Boran - Bangkok (Ăn 3 bữa)',
                description: 'Khởi hành về Bangkok. Tham quan thành phố cổ Muang Boran, thưởng thức bữa trưa truyền thống Thái Lan. Chiều mua sắm tại trung tâm thương mại.',
                image: '/images/tour3.jpg'
            },
            {
                day: 4,
                title: 'Bangkok - Baiyoke Sky - Dạo thuyền (Ăn sáng, trưa)',
                description: 'Tham quan chùa Vàng, chùa Thuyền. Ăn trưa buffet tại tòa nhà 86 tầng Baiyoke Sky. Dạo thuyền trên sông Chaophraya xem cá nổi.',
                image: '/images/tour4.jpg'
            },
            {
                day: 5,
                title: 'Bangkok - TP.HCM (Ăn sáng)',
                description: 'Dùng điểm tâm, tự do đến giờ ra sân bay. Xe đưa đoàn ra sân bay làm thủ tục về Việt Nam. Kết thúc chương trình.',
                image: '/images/tour1.jpg'
            }
        ],
        inclusions: [
            'Vé máy bay khứ hồi SGN-BKK-SGN (Hành lý xách tay + ký gửi)',
            'Khách sạn 4 sao tiêu chuẩn Thái Lan (2 khách/phòng)',
            'Các bữa ăn theo chương trình, bao gồm 1 bữa buffet 86 tầng',
            'Xe tham quan đời mới, máy lạnh suốt tuyến',
            'Vé tham quan tất cả các điểm theo chương trình'
        ],
        exclusions: [
            'Hộ chiếu (còn hạn trên 6 tháng)',
            'Tiền tip cho HDV và tài xế (4$/ngày/người)',
            'Chi phí cá nhân: điện thoại, giặt ủi, nước uống minibar...'
        ]
    },
    {
        id: '2',
        name: 'Tour Singapore - Malaysia 5N4Đ: Khám phá 2 quốc gia',
        image: '/images/tour2.jpg',
        price: '8.990.000đ',
        originalPrice: '10.500.000đ',
        duration: '5 Ngày 4 Đêm',
        departure: '20/11, 27/11',
        slug: 'singapore-malaysia',
        category: 'international',
        destination: 'SG',
        priceValue: 8990000,
        itinerary: [
            { day: 1, title: 'TP.HCM - Singapore (Ăn tối)', description: 'Đón đoàn tại sân bay, bay đi Sing. Tham quan Jewel Changi, Marina Bay Sands.' },
            { day: 2, title: 'Singapore - Sentosa - Malacca (Ăn 3 bữa)', description: 'Tham quan Garden by the Bay, đảo Sentosa. Khởi hành đi Malacca (Malaysia).' },
            { day: 3, title: 'Malacca - Kuala Lumpur (Ăn 3 bữa)', description: 'Tham quan phố cổ Malacca. Di chuyển về thủ đô Kuala Lumpur, chụp hình tháp đôi Petronas.' },
            { day: 4, title: 'Kuala Lumpur - Genting (Ăn sáng, trưa)', description: 'Lên cao nguyên Genting, thử vận may tại Casino. Tham quan động Batu.' },
            { day: 5, title: 'Kuala Lumpur - TP.HCM (Ăn sáng)', description: 'Tự do mua sắm đặc sản. Ra sân bay về lại Việt Nam.' }
        ]
    },
    {
        id: '5',
        name: 'Tour Hàn Quốc 5N4Đ: Seoul - Nami - Everland',
        image: '/images/tour1.jpg',
        price: '14.990.000đ',
        originalPrice: '16.500.000đ',
        duration: '5 Ngày 4 Đêm',
        departure: 'Hàng tuần',
        slug: 'han-quoc-5n4d',
        category: 'international',
        destination: 'KR',
        priceValue: 14990000
    },
    {
        id: '6',
        name: 'Tour Châu Âu 5 Nước: Pháp - Thụy Sĩ - Ý - Vatican',
        image: '/images/tour2.jpg',
        price: '55.990.000đ',
        originalPrice: '60.000.000đ',
        duration: '11 Ngày 10 Đêm',
        departure: '25/12',
        slug: 'chau-au-5-nuoc',
        category: 'international',
        destination: 'EU',
        priceValue: 55990000
    },
    // Domestic Tours
    {
        id: '7',
        name: 'Du lịch Phú Quốc Hè - Grand World - Vinwonders - Safari từ Sài Gòn 2025',
        image: '/images/tour3.jpg',
        price: '2.750.000đ',
        originalPrice: '3.500.000đ',
        duration: '3 Ngày 2 Đêm',
        departure: 'Hàng tuần',
        slug: 'phu-quoc-he-2025',
        category: 'domestic',
        destination: 'PQ',
        priceValue: 2750000
    },
    {
        id: '8',
        name: 'Tour Đà Nẵng - Hội An - Bà Nà Hills 4N3Đ',
        image: '/images/tour4.jpg',
        price: '4.990.000đ',
        originalPrice: '6.000.000đ',
        duration: '4 Ngày 3 Đêm',
        departure: 'Thứ 5 hàng tuần',
        slug: 'da-nang-hoi-an-4n3d',
        category: 'domestic',
        destination: 'DN',
        priceValue: 4990000
    },
    {
        id: '9',
        name: 'Tour Hà Giang - Mùa Hoa Tam Giác Mạch',
        image: '/images/tour1.jpg',
        price: '3.500.000đ',
        originalPrice: '4.200.000đ',
        duration: '3 Ngày 2 Đêm',
        departure: 'Thứ 6 hàng tuần',
        slug: 'ha-giang-mua-hoa',
        category: 'domestic',
        destination: 'HG',
        priceValue: 3500000
    },
    // Luxury Tours
    {
        id: '10',
        name: 'Tour Du Thuyền Hạ Long 5 Sao Ambassador',
        image: '/images/tour2.jpg',
        price: '3.990.000đ',
        originalPrice: '5.500.000đ',
        duration: '2 Ngày 1 Đêm',
        departure: 'Hàng ngày',
        slug: 'du-thuyen-ha-long-ambassador',
        category: 'luxury',
        destination: 'HL',
        priceValue: 3990000
    },
    // Inbound Tours
    {
        id: '11',
        name: 'Classic Vietnam Highlights 10 Days',
        image: '/images/tour3.jpg',
        price: '15.990.000đ',
        originalPrice: '18.500.000đ',
        duration: '10 Days',
        departure: 'Daily',
        slug: 'classic-vietnam-highlights',
        category: 'inbound',
        destination: 'VN',
        priceValue: 15990000
    },
    // --- Inbound Tours ---
    {
        id: 'inbound-1',
        name: 'Hanoi - Halong Bay - Sapa',
        image: '/images/tour1.jpg',
        price: 'Start from $450',
        originalPrice: '$550',
        duration: '5 Days 4 Nights',
        departure: 'Hanoi',
        discount: '-18%',
        slug: 'hanoi-halong-sapa',
        category: 'inbound',
        destination: 'VN',
        priceValue: 450000,
        subcategory: 'cultural'
    },
    // --- Group Tours (Mock Data for Tabs) ---
    {
        id: 'group-dn-1',
        name: 'Team Building Hồ Tràm - Gắn Kết Sức Mạnh',
        image: '/images/tour2.jpg',
        price: '3.500.000đ',
        duration: '2 Ngày 1 Đêm',
        departure: 'TP.HCM',
        slug: 'team-building-ho-tram',
        category: 'group',
        subcategory: 'doanh-nghiep',
        destination: 'VN',
        priceValue: 3500000
    },
    {
        id: 'group-gd-1',
        name: 'Nghỉ Dưỡng Phú Quốc - Gia Đình Hạnh Phúc',
        image: '/images/tour3.jpg',
        price: '5.200.000đ',
        duration: '3 Ngày 2 Đêm',
        departure: 'TP.HCM',
        slug: 'phu-quoc-family',
        category: 'group',
        subcategory: 'gia-dinh',
        destination: 'VN',
        priceValue: 5200000
    },
    {
        id: 'group-hh-1',
        name: 'Hành Hương Đức Mẹ Tà Pao',
        image: '/images/tour4.jpg',
        price: '890.000đ',
        duration: '1 Ngày',
        departure: 'TP.HCM',
        slug: 'hanh-huong-ta-pao',
        category: 'group',
        subcategory: 'hanh-huong',
        destination: 'VN',
        priceValue: 890000
    },
    {
        id: 'group-hocsinh-1',
        name: 'Về Nguồn Củ Chi - Trải Nghiệm Nông Trang',
        image: '/images/tour1.jpg',
        price: '450.000đ',
        duration: '1 Ngày',
        departure: 'TP.HCM',
        slug: 'hoc-sinh-cu-chi',
        category: 'group',
        subcategory: 'hoc-sinh',
        destination: 'VN',
        priceValue: 450000
    },
    // Group Tours
    {
        id: '12',
        name: 'Company Trip: Teambuilding Phan Thiết 3N2Đ',
        image: '/images/tour4.jpg',
        price: 'Liên hệ',
        originalPrice: '',
        duration: '3 Ngày 2 Đêm',
        departure: 'Theo yêu cầu',
        slug: 'teambuilding-phan-thiet',
        category: 'group',
        destination: 'PT',
        priceValue: 0
    }
];

export function getTourBySlug(slug: string): Tour | undefined {
    return tours.find(tour => tour.slug === slug);
}

export const destinations = [
    { code: 'TH', name: 'Thái Lan' },
    { code: 'SG', name: 'Singapore' },
    { code: 'TW', name: 'Đài Loan' },
    { code: 'JP', name: 'Nhật Bản' },
    { code: 'KR', name: 'Hàn Quốc' },
    { code: 'EU', name: 'Châu Âu' },
    { code: 'CN', name: 'Trung Quốc' },
    { code: 'PQ', name: 'Phú Quốc' },
    { code: 'DN', name: 'Đà Nẵng' },
    { code: 'HG', name: 'Hà Giang' },
    { code: 'HL', name: 'Hạ Long' },
    { code: 'DL', name: 'Đà Lạt' },
    { code: 'VN', name: 'Vietnam' },
    { code: 'PT', name: 'Phan Thiết' }
];
