export interface Partner {
    id: string;
    name: string;
    logo?: string;
    category: 'airline' | 'finance' | 'corporate' | 'education';
}

export const partners: Partner[] = [
    // Airlines & Finance
    { id: '1', name: 'Vietnam Airlines', category: 'airline' },
    { id: '2', name: 'Vietjet Air', category: 'airline' },
    { id: '3', name: 'Bamboo Airways', category: 'airline' },
    { id: '4', name: 'Emirates', category: 'airline' },
    { id: '5', name: 'MB Bank', category: 'finance' },
    { id: '6', name: 'Techcombank', category: 'finance' },

    // Corporate Clients
    { id: '7', name: 'Học viện Hàng không Quốc gia Việt Nam', category: 'education' },
    { id: '8', name: 'Công ty Kết cấu thép ATAD', category: 'corporate' },
    { id: '9', name: 'ĐHQG TP.HCM', category: 'education' },
    { id: '10', name: 'Trường Tiểu học Kim Đồng', category: 'education' },
];

export const partnerCategories = {
    airline: { title: 'Hàng không & Tài chính', icon: '✈️' },
    finance: { title: 'Hàng không & Tài chính', icon: '💳' },
    corporate: { title: 'Khách hàng doanh nghiệp', icon: '🏢' },
    education: { title: 'Khách hàng doanh nghiệp', icon: '🎓' }
};
