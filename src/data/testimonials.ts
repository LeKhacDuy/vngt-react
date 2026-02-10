export interface Testimonial {
    id: string;
    name: string;
    role: string;
    company?: string;
    content: string;
    avatar: string;
    rating: number;
}

export const testimonials: Testimonial[] = [
    {
        id: '1',
        name: 'Nguyễn Thanh Tùng',
        role: 'CEO',
        company: 'Tech Solutions',
        content: 'Chuyến đi Company Trip vừa rồi thật sự ấn tượng. Dịch vụ chuyên nghiệp, hướng dẫn viên nhiệt tình và lịch trình rất hợp lý. Cả công ty đều rất hài lòng!',
        avatar: 'https://ui-avatars.com/api/?name=Nguyen+Thanh+Tung&background=random',
        rating: 5
    },
    {
        id: '2',
        name: 'Trần Minh Hương',
        role: 'Marketing Manager',
        content: 'Gia đình mình đã có kỳ nghỉ tuyệt vời tại Phú Quốc nhờ VNGroup Tourist. Khách sạn 5 sao sang trọng, view đẹp và đồ ăn rất ngon. Chắc chắn sẽ quay lại!',
        avatar: 'https://ui-avatars.com/api/?name=Tran+Minh+Huong&background=random',
        rating: 5
    },
    {
        id: '3',
        name: 'Lê Văn Nam',
        role: 'Khách hàng thân thiết',
        content: 'Mình đã đi tour Thái Lan và Hàn Quốc bên VNGroup, lần nào cũng rất ưng ý. Thủ tục visa nhanh gọn, giá cả hợp lý so với chất lượng.',
        avatar: 'https://ui-avatars.com/api/?name=Le+Van+Nam&background=random',
        rating: 4.5
    }
];
