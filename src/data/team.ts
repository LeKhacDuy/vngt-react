export interface TeamMember {
    id: string;
    name: string;
    position: string;
    bio: string;
    image: string;
    social?: {
        linkedin?: string;
        email?: string;
    };
}

export const teamMembers: TeamMember[] = [
    {
        id: '1',
        name: 'Jenny Bích',
        position: 'Giám Đốc',
        bio: 'Người sáng lập và lãnh đạo VNGroup Tourist, với tầm nhìn chiến lược xây dựng thương hiệu du lịch uy tín hàng đầu Việt Nam.',
        image: '/images/benbich/cbich.jpg',
        social: {}
    },
    {
        id: '2',
        name: 'Benny',
        position: 'Phó Giám Đốc',
        bio: 'Đồng hành cùng VNGroup Tourist từ những ngày đầu, chịu trách nhiệm điều phối hoạt động và phát triển kinh doanh toàn diện.',
        image: '/images/benbich/aben.jpg',
        social: {}
    },
];
