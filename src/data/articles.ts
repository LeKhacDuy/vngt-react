export interface Article {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    category: 'Tips' | 'Food' | 'Destination' | 'Culture';
    categoryLabel: string;
    author: {
        name: string;
        avatar: string;
    };
    publishedAt: string;
    readTime: string; // e.g., "5 min read"
    tags: string[];
    featured?: boolean;
}

export const articles: Article[] = [
    {
        id: '1',
        title: '10 địa điểm "săn mây" tuyệt đẹp tại Đà Lạt không thể bỏ lỡ',
        excerpt: 'Khám phá những ngọn đồi chìm trong sương mù, nơi bạn có thể chạm tay vào những đám mây bồng bềnh tại thành phố ngàn hoa.',
        image: '/images/tour1.jpg',
        category: 'Destination',
        categoryLabel: 'Điểm đến',
        author: {
            name: 'Minh Trang',
            avatar: 'https://ui-avatars.com/api/?name=Minh+Trang&background=random'
        },
        publishedAt: '2025-11-15',
        readTime: '5 phút',
        tags: ['Đà Lạt', 'Săn mây', 'Photography'],
        featured: true
    },
    {
        id: '2',
        title: 'Cẩm nang du lịch Thái Lan tự túc 4 ngày 3 đêm cho người mới',
        excerpt: 'Lịch trình chi tiết, chi phí dự kiến và những lưu ý quan trọng khi lần đầu đặt chân đến xứ sở Chùa Vàng.',
        image: '/images/tour2.jpg',
        category: 'Tips',
        categoryLabel: 'Kinh nghiệm',
        author: {
            name: 'Tuấn Anh',
            avatar: 'https://ui-avatars.com/api/?name=Tuan+Anh&background=random'
        },
        publishedAt: '2025-10-20',
        readTime: '10 phút',
        tags: ['Thái Lan', 'Du lịch tự túc', 'Châu Á'],
        featured: true
    },
    {
        id: '3',
        title: 'Top 5 món ăn đường phố Must-Try khi đến Phượng Hoàng Cổ Trấn',
        excerpt: 'Đừng bỏ qua Đậu phụ thối, Lẩu cá cay và những món đặc sản làm nên tên tuổi ẩm thực vùng Hồ Nam.',
        image: '/images/tour3.jpg',
        category: 'Food',
        categoryLabel: 'Ẩm thực',
        author: {
            name: 'Hồng Hạnh',
            avatar: 'https://ui-avatars.com/api/?name=Hong+Hanh&background=random'
        },
        publishedAt: '2025-12-01',
        readTime: '4 phút',
        tags: ['Trung Quốc', 'Ẩm thực', 'Food Tour'],
        featured: false
    },
    {
        id: '4',
        title: 'Bí kíp xin Visa Châu Âu (Schengen) tỷ lệ đậu 99%',
        excerpt: 'Hướng dẫn chuẩn bị hồ sơ, chứng minh tài chính và những câu hỏi phỏng vấn thường gặp.',
        image: '/images/tour4.jpg',
        category: 'Tips',
        categoryLabel: 'Visa',
        author: {
            name: 'Expert Team',
            avatar: 'https://ui-avatars.com/api/?name=Expert+Team&background=00dba1&color=fff'
        },
        publishedAt: '2025-09-15',
        readTime: '15 phút',
        tags: ['Visa', 'Châu Âu', 'Thủ tục'],
        featured: true
    },
    {
        id: '5',
        title: 'Khám phá văn hóa trà đạo Nhật Bản',
        excerpt: 'Tìm hiểu về lịch sử, ý nghĩa và quy trình thưởng trà tinh tế của người Nhật.',
        image: '/images/tour1.jpg',
        category: 'Culture',
        categoryLabel: 'Văn hóa',
        author: {
            name: 'Kenji',
            avatar: 'https://ui-avatars.com/api/?name=Kenji&background=random'
        },
        publishedAt: '2025-11-28',
        readTime: '8 phút',
        tags: ['Nhật Bản', 'Văn hóa', 'Trà đạo'],
        featured: false
    },
    {
        id: '6',
        title: 'Lịch trình du lịch Phú Quốc 3N2Đ nghỉ dưỡng 5 sao',
        excerpt: 'Tận hưởng kỳ nghỉ sang trọng tại các resort hàng đầu và trải nghiệm ẩm thực đẳng cấp.',
        image: '/images/tour2.jpg',
        category: 'Destination',
        categoryLabel: 'Điểm đến',
        author: {
            name: 'Thu Hà',
            avatar: 'https://ui-avatars.com/api/?name=Thu+Ha&background=random'
        },
        publishedAt: '2025-12-05',
        readTime: '6 phút',
        tags: ['Phú Quốc', 'Luxury', 'Nghỉ dưỡng'],
        featured: false
    },
    {
        id: '7',
        title: 'Review chi tiết Universal Studios Singapore',
        excerpt: 'Những trò chơi cảm giác mạnh không thể bỏ qua và mẹo xếp hàng nhanh.',
        image: '/images/tour3.jpg',
        category: 'Destination',
        categoryLabel: 'Điểm đến',
        author: {
            name: 'Đức Minh',
            avatar: 'https://ui-avatars.com/api/?name=Duc+Minh&background=random'
        },
        publishedAt: '2025-11-10',
        readTime: '7 phút',
        tags: ['Singapore', 'Theme Park', 'Gia đình'],
        featured: false
    },
    {
        id: '8',
        title: 'Mùa thu Hàn Quốc: Đi đâu đẹp nhất?',
        excerpt: 'Những con đường lá vàng, lá đỏ lãng mạn tại Seoul và Nami.',
        image: '/images/tour4.jpg',
        category: 'Destination',
        categoryLabel: 'Điểm đến',
        author: {
            name: 'Mai Phương',
            avatar: 'https://ui-avatars.com/api/?name=Mai+Phuong&background=random'
        },
        publishedAt: '2025-10-05',
        readTime: '5 phút',
        tags: ['Hàn Quốc', 'Mùa thu', 'Check-in'],
        featured: false
    }
];

export const popularTags = [
    'Đà Lạt', 'Thái Lan', 'Visa', 'Ẩm thực', 'Nhật Bản',
    'Phú Quốc', 'Châu Âu', 'Du lịch tự túc', 'Photography', 'Gia đình'
];
