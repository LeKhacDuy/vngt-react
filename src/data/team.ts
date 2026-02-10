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
        name: 'Nguyễn Văn A',
        position: 'Giám Đốc Điều Hành',
        bio: 'Hơn 15 năm kinh nghiệm trong ngành du lịch, chuyên gia về phát triển sản phẩm tour cao cấp.',
        image: '/images/tour1.jpg',
        social: {
            linkedin: '#',
            email: 'ceo@vngrouptourist.com'
        }
    },
    {
        id: '2',
        name: 'Trần Thị B',
        position: 'Giám Đốc Kinh Doanh',
        bio: '10+ năm kinh nghiệm xây dựng mối quan hệ với đối tác quốc tế và phát triển thị trường.',
        image: '/images/tour2.jpg',
        social: {
            email: 'sales@vngrouptourist.com'
        }
    },
    {
        id: '3',
        name: 'Lê Văn C',
        position: 'Trưởng Phòng Vận Hành',
        bio: 'Chuyên gia logistics du lịch với kinh nghiệm tổ chức hơn 500 tour đoàn thành công.',
        image: '/images/tour3.jpg',
        social: {
            email: 'operations@vngrouptourist.com'
        }
    },
    {
        id: '4',
        name: 'Phạm Thị D',
        position: 'Trưởng Phòng Marketing',
        bio: 'Chuyên gia marketing du lịch số, đã triển khai nhiều chiến dịch thành công.',
        image: '/images/tour4.jpg',
        social: {
            email: 'marketing@vngrouptourist.com'
        }
    }
];
