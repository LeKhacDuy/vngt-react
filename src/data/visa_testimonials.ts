export interface VisaTestimonial {
    id: string;
    name: string;
    visaType: string;
    country: string;
    content: string;
    avatar: string;
    rating: number;
    date: string;
}

export const visaTestimonials: VisaTestimonial[] = [
    {
        id: '1',
        name: 'Trần Mỹ Linh',
        visaType: 'Du lịch (B1/B2)',
        country: 'Mỹ',
        content: 'Hồ sơ mình khá yêu (độc thân, tài chính vừa đủ), bị rớt 1 lần tự nộp. Nhờ team VNGROUP tư vấn lại cách giải trình và sắp xếp hồ sơ, mình đã đậu visa 10 năm ngay lần phỏng vấn sau đó. Cảm ơn team rất nhiều!',
        avatar: 'https://ui-avatars.com/api/?name=My+Linh&background=random',
        rating: 5,
        date: '15/01/2024'
    },
    {
        id: '2',
        name: 'Nguyễn Văn Hùng',
        visaType: 'Công tác',
        country: 'Châu Âu (Schengen)',
        content: 'Dịch vụ chuyên nghiệp, xử lý hồ sơ rất nhanh. Mình cần gấp visa đi Pháp công tác trong 2 tuần và các bạn đã hỗ trợ kịp thời. Rất uy tín!',
        avatar: 'https://ui-avatars.com/api/?name=Van+Hung&background=random',
        rating: 5,
        date: '20/12/2023'
    },
    {
        id: '3',
        name: 'Gia đình chị Hạnh',
        visaType: 'Thăm thân',
        country: 'Úc',
        content: 'Cả gia đình 4 người xin visa Úc thăm con du học. Thủ tục hơi phức tạp nhưng nhân viên hướng dẫn rất tận tình, chu đáo từng chút một. Đã nhận visa 3 năm nhiều lần.',
        avatar: 'https://ui-avatars.com/api/?name=Hanh+Nguyen&background=random',
        rating: 5,
        date: '05/02/2024'
    },
    {
        id: '4',
        name: 'Lê Hoàng Nam',
        visaType: 'Du lịch tự túc',
        country: 'Nhật Bản',
        content: 'Tư vấn kỹ, giá cả hợp lý. Mình thích cách làm việc rõ ràng của các bạn. Sẽ giới thiệu cho bạn bè.',
        avatar: 'https://ui-avatars.com/api/?name=Hoang+Nam&background=random',
        rating: 4.5,
        date: '10/11/2023'
    }
];
