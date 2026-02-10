export interface Promotion {
    id: string;
    title: string;
    description: string;
    discount: string;
    endDate: string; // ISO date string
    isFlashSale?: boolean;
}

export interface Coupon {
    id: string;
    code: string;
    title: string;
    discount: string;
    minSpend?: number;
    validUntil: string;
    description: string;
}

export const activePromotions: Promotion[] = [
    {
        id: '1',
        title: 'Ưu đãi đặc biệt cuối năm!',
        description: 'Giảm giá lên đến 30% cho các tour du lịch. Đặt ngay để không bỏ lỡ!',
        discount: '30%',
        endDate: '2026-12-31T23:59:59',
        isFlashSale: false
    },
    {
        id: '2',
        title: 'Flash Sale Tour Phú Quốc',
        description: 'Chỉ trong 48h! Giảm 40% tour Phú Quốc 3N2Đ',
        discount: '40%',
        endDate: '2026-02-05T23:59:59',
        isFlashSale: true
    }
];

export const coupons: Coupon[] = [
    {
        id: '1',
        code: 'WELCOME2026',
        title: 'Khách hàng mới',
        discount: '500.000đ',
        minSpend: 5000000,
        validUntil: '2026-03-31',
        description: 'Giảm 500k cho đơn hàng đầu tiên từ 5 triệu'
    },
    {
        id: '2',
        code: 'TET2026',
        title: 'Tết Nguyên Đán',
        discount: '15%',
        minSpend: 10000000,
        validUntil: '2026-02-15',
        description: 'Giảm 15% cho tour Tết, đơn tối thiểu 10 triệu'
    },
    {
        id: '3',
        code: 'GROUP20',
        title: 'Đoàn từ 20 người',
        discount: '20%',
        minSpend: 0,
        validUntil: '2026-12-31',
        description: 'Giảm 20% cho đoàn từ 20 người trở lên'
    },
    {
        id: '4',
        code: 'FLASH40',
        title: 'Flash Sale 40%',
        discount: '40%',
        minSpend: 0,
        validUntil: '2026-02-05',
        description: 'Mã giới hạn 50 suất đầu tiên'
    }
];
