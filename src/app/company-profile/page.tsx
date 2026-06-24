import { Metadata } from 'next';
import CompanyProfileClient from '@/components/company-profile/CompanyProfileClient';

export const metadata: Metadata = {
    title: 'Hồ Sơ Năng Lực (Company Profile)',
    description: 'Hồ sơ năng lực (Company Profile) Công ty TNHH Thương mại - Dịch vụ và Du lịch VNGroup Tourist. Cập nhật chi tiết về tầm nhìn, sứ mệnh, giá trị cốt lõi TRUST, bộ máy tổ chức, các lĩnh vực kinh doanh lữ hành nội địa, quốc tế, teambuilding, MICE và dịch vụ visa.',
    keywords: [
        'hồ sơ năng lực vngroup tourist', 'company profile vngroup tourist',
        'giới thiệu vngroup tourist', 'tầm nhìn sứ mệnh vngroup',
        'du lịch mice vngroup tourist', 'tour đoàn doanh nghiệp vngroup tourist'
    ],
    openGraph: {
        title: 'Hồ Sơ Năng Lực (Company Profile) | VNGroup Tourist',
        description: 'Xem trực tuyến và tải về hồ sơ năng lực Công ty Du lịch VNGroup Tourist mới nhất 2026. Uy tín, chất lượng, trải nghiệm khác biệt.',
        images: [
            {
                url: '/cover/Cover Website tour nước ngoài.jpg',
                width: 1200,
                height: 630,
                alt: 'VNGroup Tourist Company Profile'
            }
        ]
    }
};

export default function CompanyProfilePage() {
    return <CompanyProfileClient />;
}
