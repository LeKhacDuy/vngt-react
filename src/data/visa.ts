export interface VisaCountry {
    id: string;
    code: string;
    flag: string;
    name: string;
    tagline: string;
    requirements: string[];
}

export const visaCountries: VisaCountry[] = [
    {
        id: 'usa',
        code: 'US',
        flag: '🇺🇸',
        name: 'VISA Mỹ',
        tagline: 'Du lịch / Thăm thân / Công tác',
        requirements: [
            'Hộ chiếu còn hạn tối thiểu 6 tháng, kèm hộ chiếu cũ (nếu có).',
            'Ảnh thẻ tiêu chuẩn Mỹ 5x5cm chụp nền trắng (file mềm & cứng).',
            'Form DS-160 đã điền, thư hẹn phỏng vấn và biên lai phí MRV.',
            'Sao kê ngân hàng 3-6 tháng, giấy tờ chứng minh công việc/kinh doanh.',
            'Lịch trình dự kiến, booking khách sạn và vé máy bay (nếu có).'
        ]
    },
    {
        id: 'canada',
        code: 'CA',
        flag: '🇨🇦',
        name: 'VISA Canada',
        tagline: 'Du lịch / Thăm thân',
        requirements: [
            'Hộ chiếu còn hạn, photo tất cả trang có đóng dấu.',
            'Form IMM5257, IMM5645 và bảng thông tin gia đình.',
            'Chứng minh tài chính: sổ tiết kiệm, sao kê, tài sản cố định.',
            'Giấy xác nhận việc làm hoặc đăng ký kinh doanh.',
            'Lịch trình chi tiết, bảo hiểm du lịch (khuyến khích).'
        ]
    },
    {
        id: 'australia',
        code: 'AU',
        flag: '🇦🇺',
        name: 'VISA Úc',
        tagline: 'Subclass 600 - Du lịch',
        requirements: [
            'Hộ chiếu còn hạn, bản sao công chứng CMND/CCCD và hộ khẩu.',
            'Form 1419 đã ký tên, đơn tường trình lịch sử du lịch.',
            'Chứng minh tài chính: sổ tiết kiệm, tài sản, sao kê 3-6 tháng.',
            'Giấy tờ công việc: hợp đồng, đơn nghỉ phép, bảng lương.',
            'Lịch trình chi tiết, vé máy bay/khách sạn.'
        ]
    },
    {
        id: 'uk',
        code: 'UK',
        flag: '🇬🇧',
        name: 'VISA Anh',
        tagline: 'Standard Visitor Visa',
        requirements: [
            'Hộ chiếu còn hạn và bản sao công chứng các trang.',
            'Đơn xin visa trực tuyến, xác nhận lịch sinh trắc.',
            'Sao kê ngân hàng, xác nhận công việc, ĐKKD (nếu có).',
            'Lộ trình tham quan, booking dịch vụ.',
            'Thư mời từ người thân/đối tác (nếu có).'
        ]
    },
    {
        id: 'japan',
        code: 'JP',
        flag: '🇯🇵',
        name: 'VISA Nhật Bản',
        tagline: 'Single / Multiple Entry',
        requirements: [
            'Hộ chiếu còn hạn, đơn xin visa (mẫu mới) kèm ảnh 4.5x4.5cm.',
            'Lịch trình du lịch (Taiken), booking dịch vụ.',
            'Chứng minh công việc và tài chính (sổ tiết kiệm/sao kê).',
            'Giấy tờ nhân thân: CCCD, Hộ khẩu.',
            'Giấy lý do mời (nếu thăm thân/công tác).'
        ]
    },
    {
        id: 'schengen',
        code: 'EU',
        flag: '🇪🇺',
        name: 'VISA Schengen',
        tagline: 'Du lịch khối EU',
        requirements: [
            'Hộ chiếu còn hạn 6 tháng, 2 trang trống.',
            'Đơn xin visa Schengen, 02 ảnh 3.5x4.5cm nền trắng.',
            'Bảo hiểm du lịch (mức 30.000 EUR), lịch trình.',
            'Xác nhận đặt phòng, vé máy bay khứ hồi.',
            'Chứng minh tài chính và công việc chi tiết.'
        ]
    }
];

export const processSteps = [
    {
        number: '01',
        title: 'Nhận thông tin & tư vấn',
        description: 'Tiếp nhận yêu cầu, đánh giá sơ bộ hồ sơ và tư vấn giải pháp visa phù hợp nhất.'
    },
    {
        number: '02',
        title: 'Bổ sung & hoàn thiện hồ sơ',
        description: 'Hỗ trợ khách hàng chuẩn bị, dịch thuật và sắp xếp hồ sơ theo chuẩn đại sứ quán.'
    },
    {
        number: '03',
        title: 'Nộp hồ sơ & Xử lý',
        description: 'Đại diện nộp hồ sơ, đặt lịch hẹn và hướng dẫn phỏng vấn/lấy sinh trắc học.'
    },
    {
        number: '04',
        title: 'Nhận kết quả Visa',
        description: 'Theo dõi trạng thái, nhận kết quả visa và bàn giao lại cho khách hàng.'
    }
];
