export interface TicketPricing {
    audience: string;
    price: number | string; // Adjusted to allow string as some legacy data might have string prices or formatted ones, though strict number is better. The component handles it.
    priceLabel: string;
}

export interface Ticket {
    id: string;
    brand: string;
    location: string;
    title: string;
    productType: string;
    validity: string;
    description: string;
    pricing: TicketPricing[];
    notes?: string;
    categories?: string[];
    image?: string;
    links?: string[]; // Added links as it appears in json
}

export const tickets: Ticket[] = [
    {
        "id": "sunworld-baden-combo-buffet-nov",
        "brand": "Sun World",
        "location": "Bà Đen Mountain",
        "title": "Combo Cáp Đỉnh Vân Sơn – Chùa Hang + Buffet",
        "productType": "Combo cáp treo + buffet",
        "validity": "01/11/2025 – 30/11/2025",
        "description": "Combo cáp Đỉnh Vân Sơn, Chùa Hang kèm buffet trưa 270k trong chương trình khuyến mãi tháng 11.",
        "pricing": [
            {
                "audience": "Người lớn",
                "price": 550000,
                "priceLabel": "Giá công bố"
            },
            {
                "audience": "Trẻ em",
                "price": 400000,
                "priceLabel": "Giá công bố"
            }
        ],
        "notes": "Áp dụng duy nhất tháng 11/2025; Buffet trưa trị giá 270.000đ; cần đặt trước theo quy định khu du lịch.",
        "categories": [
            "Cáp treo",
            "Buffet",
            "Khuyến mãi"
        ],
        "image": "/images/ticket/sunworld.png"
    },
    {
        "id": "sunworld-baden-cable-full-2025",
        "brand": "Sun World",
        "location": "Bà Đen Mountain",
        "title": "Vé Cáp Đỉnh Vân Sơn (Ngoại tỉnh)",
        "productType": "Vé cáp treo",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "Vé cáp treo khứ hồi tuyến Đỉnh Vân Sơn dành cho khách ngoại tỉnh và quốc tế.",
        "pricing": [
            {
                "audience": "Người lớn",
                "price": 400000,
                "priceLabel": "Giá công bố"
            },
            {
                "audience": "Trẻ em",
                "price": 300000,
                "priceLabel": "Giá công bố"
            }
        ],
        "notes": "Giá áp dụng cho khách ngoài Tây Ninh & Long An; trẻ em dưới 1m miễn phí.",
        "categories": [
            "Cáp treo"
        ],
        "image": "/images/ticket/sunworld.png"
    },
    {
        "id": "sunworld-bana-cable-standard-2025",
        "brand": "Sun World",
        "location": "Bà Nà Hills",
        "title": "Vé Cáp Treo Bà Nà Hills",
        "productType": "Vé cáp treo",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "Vé cáp treo tiêu chuẩn kèm vui chơi tại Bà Nà Hills, áp dụng khách ngoại tỉnh.",
        "pricing": [
            {
                "audience": "Người lớn",
                "price": 950000,
                "priceLabel": "Giá công bố"
            },
            {
                "audience": "Trẻ em/Cao tuổi",
                "price": 750000,
                "priceLabel": "Giá công bố"
            }
        ],
        "notes": "Giá chưa bao gồm buffet; có thể kết hợp WOW Pass để ưu tiên cáp, trò chơi.",
        "categories": [
            "Cáp treo"
        ],
        "image": "/images/ticket/sunworld.png"
    },
    {
        "id": "sunworld-bana-night-combo",
        "brand": "Sun World",
        "location": "Bà Nà Hills",
        "title": "Night Combo sau 15h (Cáp + Buffet)",
        "productType": "Combo cáp treo + buffet tối",
        "validity": "02/08/2025 – 31/12/2025",
        "description": "Combo lên cáp buổi chiều hoặc tối kèm buffet, trải nghiệm không khí đêm Bà Nà.",
        "pricing": [
            {
                "audience": "Người lớn",
                "price": 1000000,
                "priceLabel": "Giá công bố"
            },
            {
                "audience": "Trẻ em",
                "price": 800000,
                "priceLabel": "Giá công bố"
            }
        ],
        "notes": "Đã bao gồm buffet tối, bus đón Downtown các khung giờ 14h/16h/17h (cập nhật theo lịch vận hành).",
        "categories": [
            "Combo",
            "Buffet",
            "Ưu đãi chiều/tối"
        ],
        "image": "/images/ticket/sunworld.png"
    },
    {
        "id": "sunworld-fansipan-cable-buffet",
        "brand": "Sun World",
        "location": "Fansipan Legend",
        "title": "Combo Cáp treo + Buffet",
        "productType": "Combo cáp treo + buffet",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "Combo vé cáp treo Fansipan kèm buffet tại nhà hàng Bản Mây, phù hợp đoàn gia đình.",
        "pricing": [
            {
                "audience": "Người lớn",
                "price": 1050000,
                "priceLabel": "Giá công bố"
            },
            {
                "audience": "Trẻ em",
                "price": 750000,
                "priceLabel": "Giá công bố"
            }
        ],
        "notes": "Trẻ em dưới 1m miễn phí; nên đặt trước để giữ chỗ buffet.",
        "categories": [
            "Combo",
            "Cáp treo",
            "Ẩm thực"
        ],
        "image": "/images/ticket/sunworld.png"
    },
    {
        "id": "sunworld-halong-combo-3-services",
        "brand": "Sun World",
        "location": "Hạ Long",
        "title": "Combo 3 Dịch vụ (Cáp + Công viên Rồng + Công viên Nước)",
        "productType": "Combo vui chơi 3 dịch vụ",
        "validity": "26/04/2025 – 02/09/2025",
        "description": "Combo 3 dịch vụ tại Sun World Hạ Long, dùng trong 2 ngày liên tiếp.",
        "pricing": [
            {
                "audience": "Người lớn",
                "price": 600000,
                "priceLabel": "Giá công bố"
            },
            {
                "audience": "Trẻ em",
                "price": 500000,
                "priceLabel": "Giá công bố"
            }
        ],
        "notes": "Gom trọn Cáp treo Nữ Hoàng, Công viên Rồng và Công viên Nước; phù hợp kỳ nghỉ gia đình dài ngày.",
        "categories": [
            "Combo",
            "Công viên chủ đề"
        ],
        "image": "/images/ticket/sunworld.png"
    },
    {
        "id": "vinwonders-phuquoc-standard-2025",
        "brand": "VinWonders",
        "location": "Phú Quốc",
        "title": "Vé Tiêu Chuẩn VinWonders Phú Quốc",
        "productType": "Vé công viên giải trí",
        "validity": "01/06/2025 – 31/12/2025",
        "description": "Vé vào cửa tiêu chuẩn VinWonders Phú Quốc, bao gồm hầu hết trò chơi và show nội khu.",
        "pricing": [
            {
                "audience": "Giá niêm yết NL",
                "price": 950000,
                "priceLabel": "Giá niêm yết"
            },
            {
                "audience": "Giá niêm yết TE/NCT",
                "price": 710000,
                "priceLabel": "Giá niêm yết"
            }
        ],
        "notes": "Có thể kết hợp voucher ẩm thực chương trình Wonders Ngon theo giai đoạn; giá TA áp dụng khóa booking T-2.",
        "categories": [
            "Công viên chủ đề"
        ],
        "links": [
            "https://drive.google.com/drive/folders/1VJ6kn2iYTFOpxau4Sn8Lq4jQ6Q6dkA-p"
        ],
        "image": "/images/ticket/vinwonders.png"
    },
    {
        "id": "vinwonders-phuquoc-combo-1day",
        "brand": "VinWonders",
        "location": "Phú Quốc",
        "title": "Combo VinWonders + Safari 1 ngày",
        "productType": "Combo 2 công viên",
        "validity": "01/06/2025 – 31/12/2025",
        "description": "Combo tham quan 2 khu VinWonders và Safari trong 1 ngày, phù hợp đoàn gia đình.",
        "pricing": [
            {
                "audience": "Giá niêm yết NL",
                "price": 1450000,
                "priceLabel": "Giá niêm yết"
            },
            {
                "audience": "Giá niêm yết TE/NCT",
                "price": 1050000,
                "priceLabel": "Giá niêm yết"
            }
        ],
        "notes": "Có thể nâng cấp gói Wonders Fast hoặc Wonders Ngon tùy thời điểm; nên đặt giữ slot xe đưa đón nội khu.",
        "categories": [
            "Combo",
            "Công viên chủ đề",
            "Safari"
        ],
        "image": "/images/ticket/vinwonders.png"
    },
    {
        "id": "vinwonders-nhatrang-standard",
        "brand": "VinWonders",
        "location": "Nha Trang",
        "title": "Vé Tiêu Chuẩn VinWonders Nha Trang",
        "productType": "Vé công viên giải trí",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "Vé vào cửa VinWonders Nha Trang bao gồm cáp treo 2 chiều, nhạc nước và Tata Show.",
        "pricing": [
            {
                "audience": "Giá niêm yết NL",
                "price": 950000,
                "priceLabel": "Giá niêm yết"
            },
            {
                "audience": "Giá niêm yết TE/NCT",
                "price": 710000,
                "priceLabel": "Giá niêm yết"
            }
        ],
        "notes": "Bao gồm cáp treo 2 chiều, xem Tatashow; có thêm gói Wonder Pass, buffet trưa/tối tùy chọn.",
        "categories": [
            "Công viên chủ đề",
            "Cáp treo"
        ],
        "image": "/images/ticket/vinwonders.png"
    },
    {
        "id": "vinwonders-grandworld-tinhhoavn",
        "brand": "VinWonders",
        "location": "Grand World Phú Quốc",
        "title": "Show Tinh Hoa Việt Nam",
        "productType": "Show biểu diễn",
        "validity": "01/06/2025 – 31/12/2025",
        "description": "Vé xem show Tinh Hoa Việt Nam (show ngày + Big Show tối) tại Grand World.",
        "pricing": [
            {
                "audience": "Giá niêm yết NL",
                "price": 300000,
                "priceLabel": "Giá niêm yết"
            },
            {
                "audience": "Giá niêm yết TE/NCT",
                "price": 230000,
                "priceLabel": "Giá niêm yết"
            }
        ],
        "notes": "Show diễn mỗi ngày; kết hợp tốt với tour Grand World hoặc combo Vinpearl Harbour.",
        "categories": [
            "Show",
            "Combo bổ sung"
        ],
        "image": "/images/ticket/vinwonders.png"
    },
    {
        "id": "hontam-all-island-lunch",
        "brand": "Hòn Tằm",
        "location": "Nha Trang",
        "title": "All Đảo + Ăn trưa (Khu A & B)",
        "productType": "Combo đảo Hòn Tằm",
        "validity": "Đến 31/05/2025",
        "description": "Gói trải nghiệm toàn đảo bao gồm tắm bùn, tắm biển, hồ bơi, ca múa nhạc và ăn trưa.",
        "pricing": [
            {
                "audience": "Giá công bố NL",
                "price": 900000,
                "priceLabel": "Giá công bố"
            },
            {
                "audience": "Giá công bố TE",
                "price": 630000,
                "priceLabel": "Giá công bố"
            }
        ],
        "notes": "Bao gồm buffet/setmenu trưa, tắm bùn khoáng, tắm biển khu A & B; có phụ thu lễ tết theo chính sách resort.",
        "categories": [
            "Combo đảo",
            "Ẩm thực",
            "Tắm bùn"
        ],
        "image": "/images/ticket/hontam.jpg"
    },
    {
        "id": "sunworld-baden-cable-chuahang-nov",
        "brand": "Sun World",
        "location": "Bà Đen Mountain",
        "title": "Vé Cáp Chùa Hang (CTKM tháng 11)",
        "productType": "Vé cáp treo",
        "validity": "01/11/2025 – 30/11/2025",
        "description": "Vé cáp treo khứ hồi tuyến Chùa Hang trong chương trình khuyến mãi tháng 11.",
        "pricing": [
            {
                "audience": "Người lớn",
                "price": 200000,
                "priceLabel": "Giá công bố"
            },
            {
                "audience": "Trẻ em",
                "price": 150000,
                "priceLabel": "Giá công bố"
            }
        ],
        "notes": "Áp dụng duy nhất tháng 11/2025; giá ưu đãi đặc biệt.",
        "categories": [
            "Cáp treo",
            "Khuyến mãi"
        ],
        "image": "/images/ticket/sunworld.png"
    },
    {
        "id": "sunworld-baden-combo-no-buffet-nov",
        "brand": "Sun World",
        "location": "Bà Đen Mountain",
        "title": "Combo Cáp Đỉnh Vân Sơn – Chùa Hang (Không buffet)",
        "productType": "Combo cáp treo",
        "validity": "01/11/2025 – 30/11/2025",
        "description": "Combo cáp Đỉnh Vân Sơn và Chùa Hang trong chương trình khuyến mãi tháng 11, không bao gồm buffet.",
        "pricing": [
            {
                "audience": "Người lớn",
                "price": 450000,
                "priceLabel": "Giá công bố"
            },
            {
                "audience": "Trẻ em",
                "price": 330000,
                "priceLabel": "Giá công bố"
            }
        ],
        "notes": "Áp dụng duy nhất tháng 11/2025; không bao gồm buffet.",
        "categories": [
            "Cáp treo",
            "Khuyến mãi"
        ],
        "image": "/images/ticket/sunworld.png"
    },
    {
        "id": "sunworld-baden-cable-after-17h",
        "brand": "Sun World",
        "location": "Bà Đen Mountain",
        "title": "Vé Cáp Đỉnh Vân Sơn sau 17h",
        "productType": "Vé cáp treo",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "Vé cáp treo khứ hồi tuyến Đỉnh Vân Sơn dành cho khách vào sau 17h.",
        "pricing": [
            {
                "audience": "Người lớn",
                "price": 300000,
                "priceLabel": "Giá công bố"
            },
            {
                "audience": "Trẻ em",
                "price": 220000,
                "priceLabel": "Giá công bố"
            }
        ],
        "notes": "Vé vào sau 17h; áp dụng cho khách ngoại tỉnh.",
        "categories": [
            "Cáp treo",
            "Ưu đãi chiều/tối"
        ],
        "image": "/images/ticket/sunworld.png"
    },
    {
        "id": "sunworld-baden-cable-tayninh",
        "brand": "Sun World",
        "location": "Bà Đen Mountain",
        "title": "Vé Cáp Đỉnh Vân Sơn (Khách Tây Ninh)",
        "productType": "Vé cáp treo",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "Vé cáp treo khứ hồi tuyến Đỉnh Vân Sơn dành cho khách Tây Ninh và Long An.",
        "pricing": [
            {
                "audience": "Người lớn",
                "price": 300000,
                "priceLabel": "Giá công bố"
            },
            {
                "audience": "Trẻ em",
                "price": 220000,
                "priceLabel": "Giá công bố"
            }
        ],
        "notes": "Giá áp dụng cho khách Tây Ninh & Long An; trẻ em dưới 1m miễn phí.",
        "categories": [
            "Cáp treo"
        ],
        "image": "/images/ticket/sunworld.png"
    },
    {
        "id": "sunworld-bana-cable-danang",
        "brand": "Sun World",
        "location": "Bà Nà Hills",
        "title": "Vé Cáp Treo Bà Nà Hills (Khách Đà Nẵng & Quảng Nam)",
        "productType": "Vé cáp treo",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "Vé cáp treo tiêu chuẩn kèm vui chơi tại Bà Nà Hills, áp dụng khách Đà Nẵng và Quảng Nam.",
        "pricing": [
            {
                "audience": "Người lớn",
                "price": 750000,
                "priceLabel": "Giá công bố"
            },
            {
                "audience": "Trẻ em/Cao tuổi",
                "price": 600000,
                "priceLabel": "Giá công bố"
            }
        ],
        "notes": "Giá ưu đãi cho khách Đà Nẵng & Quảng Nam; giá chưa bao gồm buffet.",
        "categories": [
            "Cáp treo"
        ],
        "image": "/images/ticket/sunworld.png"
    },
    {
        "id": "sunworld-bana-combo-buffet-lunch",
        "brand": "Sun World",
        "location": "Bà Nà Hills",
        "title": "Combo Cáp + Buffet Trưa",
        "productType": "Combo cáp treo + buffet trưa",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "Combo vé cáp treo Bà Nà Hills kèm buffet trưa tại nhà hàng.",
        "pricing": [
            {
                "audience": "Người lớn",
                "price": 1200000,
                "priceLabel": "Giá công bố"
            },
            {
                "audience": "Trẻ em",
                "price": 950000,
                "priceLabel": "Giá công bố"
            }
        ],
        "notes": "Đã bao gồm buffet trưa; áp dụng khách ngoại tỉnh.",
        "categories": [
            "Combo",
            "Buffet",
            "Ẩm thực"
        ],
        "image": "/images/ticket/sunworld.png"
    },
    {
        "id": "sunworld-bana-wow-pass-silver",
        "brand": "Sun World",
        "location": "Bà Nà Hills",
        "title": "WOW Pass Silver",
        "productType": "WOW Pass",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "WOW Pass Silver - ưu tiên cáp treo và một số trò chơi tại Bà Nà Hills.",
        "pricing": [
            {
                "audience": "Người lớn",
                "price": 200000,
                "priceLabel": "Giá công bố"
            },
            {
                "audience": "Trẻ em",
                "price": 200000,
                "priceLabel": "Giá công bố"
            }
        ],
        "notes": "Ưu tiên cáp treo và một số trò chơi; cần mua kèm vé cáp treo.",
        "categories": [
            "WOW Pass"
        ],
        "image": "/images/ticket/sunworld.png"
    },
    {
        "id": "sunworld-fansipan-cable-weekday",
        "brand": "Sun World",
        "location": "Fansipan Legend",
        "title": "Vé Cáp Treo Fansipan (Ngày thường)",
        "productType": "Vé cáp treo",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "Vé cáp treo khứ hồi Fansipan áp dụng ngày thường (thứ 2 - thứ 6).",
        "pricing": [
            {
                "audience": "Người lớn",
                "price": 750000,
                "priceLabel": "Giá công bố"
            },
            {
                "audience": "Trẻ em",
                "price": 550000,
                "priceLabel": "Giá công bố"
            }
        ],
        "notes": "Áp dụng thứ 2 - thứ 6; giá thứ 7, CN và lễ có thể khác.",
        "categories": [
            "Cáp treo"
        ],
        "image": "/images/ticket/sunworld.png"
    },
    {
        "id": "sunworld-fansipan-train-muonghoa",
        "brand": "Sun World",
        "location": "Fansipan Legend",
        "title": "Vé Tàu Mường Hoa",
        "productType": "Vé tàu hỏa",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "Vé tàu hỏa Mường Hoa từ ga Sapa đến ga Fansipan.",
        "pricing": [
            {
                "audience": "Người lớn",
                "price": 200000,
                "priceLabel": "Giá công bố"
            },
            {
                "audience": "Trẻ em",
                "price": 150000,
                "priceLabel": "Giá công bố"
            }
        ],
        "notes": "Vé tàu hỏa một chiều; có thể kết hợp với vé cáp treo.",
        "categories": [
            "Tàu hỏa"
        ],
        "image": "/images/ticket/sunworld.png"
    },
    {
        "id": "sunworld-halong-cable-queen",
        "brand": "Sun World",
        "location": "Hạ Long",
        "title": "Vé Cáp Treo Nữ Hoàng",
        "productType": "Vé cáp treo",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "Vé cáp treo Nữ Hoàng tại Sun World Hạ Long.",
        "pricing": [
            {
                "audience": "Người lớn",
                "price": 300000,
                "priceLabel": "Giá công bố"
            },
            {
                "audience": "Trẻ em",
                "price": 250000,
                "priceLabel": "Giá công bố"
            }
        ],
        "notes": "Vé cáp treo một chiều; có thể kết hợp với các dịch vụ khác.",
        "categories": [
            "Cáp treo"
        ],
        "image": "/images/ticket/sunworld.png"
    },
    {
        "id": "sunworld-halong-park-dragon",
        "brand": "Sun World",
        "location": "Hạ Long",
        "title": "Vé Công viên Rồng",
        "productType": "Vé công viên chủ đề",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "Vé vào cửa Công viên Rồng tại Sun World Hạ Long.",
        "pricing": [
            {
                "audience": "Người lớn",
                "price": 200000,
                "priceLabel": "Giá công bố"
            },
            {
                "audience": "Trẻ em",
                "price": 150000,
                "priceLabel": "Giá công bố"
            }
        ],
        "notes": "Vé vào cửa công viên; có thể kết hợp với các dịch vụ khác.",
        "categories": [
            "Công viên chủ đề"
        ],
        "image": "/images/ticket/sunworld.png"
    },
    {
        "id": "sunworld-halong-park-water",
        "brand": "Sun World",
        "location": "Hạ Long",
        "title": "Vé Công viên Nước",
        "productType": "Vé công viên nước",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "Vé vào cửa Công viên Nước tại Sun World Hạ Long.",
        "pricing": [
            {
                "audience": "Người lớn",
                "price": 200000,
                "priceLabel": "Giá công bố"
            },
            {
                "audience": "Trẻ em",
                "price": 150000,
                "priceLabel": "Giá công bố"
            }
        ],
        "notes": "Vé vào cửa công viên nước; có thể kết hợp với các dịch vụ khác.",
        "categories": [
            "Công viên nước"
        ],
        "image": "/images/ticket/sunworld.png"
    },
    {
        "id": "sunworld-halong-combo-2-services",
        "brand": "Sun World",
        "location": "Hạ Long",
        "title": "Combo 2 Dịch vụ (Cáp + Công viên Rồng)",
        "productType": "Combo vui chơi 2 dịch vụ",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "Combo 2 dịch vụ tại Sun World Hạ Long: Cáp treo Nữ Hoàng và Công viên Rồng.",
        "pricing": [
            {
                "audience": "Người lớn",
                "price": 450000,
                "priceLabel": "Giá công bố"
            },
            {
                "audience": "Trẻ em",
                "price": 350000,
                "priceLabel": "Giá công bố"
            }
        ],
        "notes": "Combo 2 dịch vụ; dùng trong 1 ngày.",
        "categories": [
            "Combo",
            "Công viên chủ đề"
        ],
        "image": "/images/ticket/sunworld.png"
    },
    {
        "id": "vinwonders-phuquoc-safari",
        "brand": "VinWonders",
        "location": "Phú Quốc",
        "title": "Vé Safari Phú Quốc",
        "productType": "Vé công viên động vật",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "Vé vào cửa Safari Phú Quốc - công viên động vật hoang dã.",
        "pricing": [
            {
                "audience": "Giá niêm yết NL",
                "price": 850000,
                "priceLabel": "Giá niêm yết"
            },
            {
                "audience": "Giá niêm yết TE/NCT",
                "price": 650000,
                "priceLabel": "Giá niêm yết"
            }
        ],
        "notes": "Vé vào cửa Safari; có thể kết hợp với VinWonders.",
        "categories": [
            "Safari",
            "Công viên động vật"
        ],
        "image": "/images/ticket/vinwonders.png"
    },
    {
        "id": "vinwonders-phuquoc-combo-2days",
        "brand": "VinWonders",
        "location": "Phú Quốc",
        "title": "Combo VinWonders + Safari 2 ngày (Tặng BT Gấu)",
        "productType": "Combo 2 công viên 2 ngày",
        "validity": "01/06/2025 – 31/12/2025",
        "description": "Combo tham quan 2 khu VinWonders và Safari trong 2 ngày, tặng kèm vé Bảo tàng Gấu.",
        "pricing": [
            {
                "audience": "Giá niêm yết NL",
                "price": 1950000,
                "priceLabel": "Giá niêm yết"
            },
            {
                "audience": "Giá niêm yết TE/NCT",
                "price": 1450000,
                "priceLabel": "Giá niêm yết"
            }
        ],
        "notes": "Combo 2 ngày, tặng kèm vé Bảo tàng Gấu; phù hợp kỳ nghỉ dài.",
        "categories": [
            "Combo",
            "Công viên chủ đề",
            "Safari"
        ],
        "image": "/images/ticket/vinwonders.png"
    },
    {
        "id": "vinwonders-phuquoc-wonders-fast",
        "brand": "VinWonders",
        "location": "Phú Quốc",
        "title": "Wonders Fast Pass",
        "productType": "Fast Pass",
        "validity": "01/06/2025 – 31/12/2025",
        "description": "Wonders Fast Pass - ưu tiên không xếp hàng tại các trò chơi VinWonders Phú Quốc.",
        "pricing": [
            {
                "audience": "Giá niêm yết",
                "price": 300000,
                "priceLabel": "Giá niêm yết"
            }
        ],
        "notes": "Ưu tiên không xếp hàng; cần mua kèm vé vào cửa.",
        "categories": [
            "Fast Pass"
        ],
        "image": "/images/ticket/vinwonders.png"
    },
    {
        "id": "vinwonders-phuquoc-wonders-ngon",
        "brand": "VinWonders",
        "location": "Phú Quốc",
        "title": "Wonders Ngon - Voucher Ẩm thực",
        "productType": "Voucher ẩm thực",
        "validity": "01/06/2025 – 31/12/2025",
        "description": "Voucher ẩm thực Wonders Ngon sử dụng tại các nhà hàng trong VinWonders Phú Quốc.",
        "pricing": [
            {
                "audience": "Giá niêm yết",
                "price": 200000,
                "priceLabel": "Giá niêm yết"
            }
        ],
        "notes": "Voucher ẩm thực; giá có thể thay đổi theo giai đoạn khuyến mãi.",
        "categories": [
            "Voucher",
            "Ẩm thực"
        ],
        "image": "/images/ticket/vinwonders.png"
    },
    {
        "id": "vinwonders-nhatrang-after-16h",
        "brand": "VinWonders",
        "location": "Nha Trang",
        "title": "Vé VinWonders Nha Trang sau 16h",
        "productType": "Vé công viên giải trí",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "Vé vào cửa VinWonders Nha Trang sau 16h, bao gồm cáp treo 2 chiều, nhạc nước và Tata Show.",
        "pricing": [
            {
                "audience": "Giá niêm yết NL",
                "price": 650000,
                "priceLabel": "Giá niêm yết"
            },
            {
                "audience": "Giá niêm yết TE/NCT",
                "price": 500000,
                "priceLabel": "Giá niêm yết"
            }
        ],
        "notes": "Vé vào sau 16h; giá ưu đãi so với vé tiêu chuẩn.",
        "categories": [
            "Công viên chủ đề",
            "Cáp treo",
            "Ưu đãi chiều/tối"
        ],
        "image": "/images/ticket/vinwonders.png"
    },
    {
        "id": "vinwonders-nhatrang-wonder-pass",
        "brand": "VinWonders",
        "location": "Nha Trang",
        "title": "Wonder Pass VinWonders Nha Trang",
        "productType": "Wonder Pass",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "Wonder Pass - ưu tiên cáp treo và một số trò chơi tại VinWonders Nha Trang.",
        "pricing": [
            {
                "audience": "Giá niêm yết",
                "price": 200000,
                "priceLabel": "Giá niêm yết"
            }
        ],
        "notes": "Ưu tiên cáp treo và trò chơi; cần mua kèm vé vào cửa.",
        "categories": [
            "Wonder Pass"
        ],
        "image": "/images/ticket/vinwonders.png"
    },
    {
        "id": "vinwonders-nhatrang-combo-buffet-1meal",
        "brand": "VinWonders",
        "location": "Nha Trang",
        "title": "Combo VinWonders + Buffet 1 bữa",
        "productType": "Combo công viên + buffet",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "Combo vé VinWonders Nha Trang kèm buffet trưa hoặc tối tại nhà hàng trong công viên.",
        "pricing": [
            {
                "audience": "Giá niêm yết NL",
                "price": 1250000,
                "priceLabel": "Giá niêm yết"
            },
            {
                "audience": "Giá niêm yết TE/NCT",
                "price": 950000,
                "priceLabel": "Giá niêm yết"
            }
        ],
        "notes": "Bao gồm buffet 1 bữa (trưa hoặc tối); có thể chọn thời gian.",
        "categories": [
            "Combo",
            "Buffet",
            "Ẩm thực"
        ],
        "image": "/images/ticket/vinwonders.png"
    },
    {
        "id": "vinwonders-nhatrang-vinpearl-harbour",
        "brand": "VinWonders",
        "location": "Nha Trang",
        "title": "Combo Vinpearl Harbour",
        "productType": "Combo Vinpearl Harbour",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "Combo tham quan Vinpearl Harbour bao gồm nhiều dịch vụ giải trí và ẩm thực.",
        "pricing": [
            {
                "audience": "Giá niêm yết NL",
                "price": 1200000,
                "priceLabel": "Giá niêm yết"
            },
            {
                "audience": "Giá niêm yết TE/NCT",
                "price": 900000,
                "priceLabel": "Giá niêm yết"
            }
        ],
        "notes": "Combo Vinpearl Harbour; có thể kết hợp với các dịch vụ khác.",
        "categories": [
            "Combo",
            "Vinpearl Harbour"
        ],
        "image": "/images/ticket/vinwonders.png"
    },
    {
        "id": "hontam-all-island-lunch-jun2025",
        "brand": "Hòn Tằm",
        "location": "Nha Trang",
        "title": "All Đảo + Ăn trưa (Khu A & B) - Từ 01/06/2025",
        "productType": "Combo đảo Hòn Tằm",
        "validity": "01/06/2025 – 31/12/2025",
        "description": "Gói trải nghiệm toàn đảo bao gồm tắm bùn, tắm biển, hồ bơi, ca múa nhạc và ăn trưa. Áp dụng từ 01/06/2025.",
        "pricing": [
            {
                "audience": "Giá công bố NL",
                "price": 950000,
                "priceLabel": "Giá công bố"
            },
            {
                "audience": "Giá công bố TE",
                "price": 650000,
                "priceLabel": "Giá công bố"
            }
        ],
        "notes": "Bao gồm buffet/setmenu trưa, tắm bùn khoáng, tắm biển khu A & B; áp dụng từ 01/06/2025.",
        "categories": [
            "Combo đảo",
            "Ẩm thực",
            "Tắm bùn"
        ],
        "image": "/images/ticket/hontam.jpg"
    },
    {
        "id": "hontam-mud-bath",
        "brand": "Hòn Tằm",
        "location": "Nha Trang",
        "title": "Tắm Bùn Khoáng",
        "productType": "Dịch vụ tắm bùn",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "Dịch vụ tắm bùn khoáng tại Hòn Tằm.",
        "pricing": [
            {
                "audience": "Giá công bố NL",
                "price": 200000,
                "priceLabel": "Giá công bố"
            },
            {
                "audience": "Giá công bố TE",
                "price": 150000,
                "priceLabel": "Giá công bố"
            }
        ],
        "notes": "Dịch vụ tắm bùn khoáng; có thể mua riêng hoặc kết hợp với các gói khác.",
        "categories": [
            "Tắm bùn"
        ],
        "image": "/images/ticket/hontam.jpg"
    },
    {
        "id": "hontam-zone-a",
        "brand": "Hòn Tằm",
        "location": "Nha Trang",
        "title": "Khu A - Tắm biển + Hồ bơi",
        "productType": "Vé khu A",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "Vé vào khu A bao gồm tắm biển và hồ bơi tại Hòn Tằm.",
        "pricing": [
            {
                "audience": "Giá công bố NL",
                "price": 300000,
                "priceLabel": "Giá công bố"
            },
            {
                "audience": "Giá công bố TE",
                "price": 200000,
                "priceLabel": "Giá công bố"
            }
        ],
        "notes": "Vé vào khu A; có thể kết hợp với các dịch vụ khác.",
        "categories": [
            "Khu A",
            "Tắm biển"
        ],
        "image": "/images/ticket/hontam.jpg"
    },
    {
        "id": "hontam-zone-b",
        "brand": "Hòn Tằm",
        "location": "Nha Trang",
        "title": "Khu B - Tắm biển + Hồ bơi",
        "productType": "Vé khu B",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "Vé vào khu B bao gồm tắm biển và hồ bơi tại Hòn Tằm.",
        "pricing": [
            {
                "audience": "Giá công bố NL",
                "price": 300000,
                "priceLabel": "Giá công bố"
            },
            {
                "audience": "Giá công bố TE",
                "price": 200000,
                "priceLabel": "Giá công bố"
            }
        ],
        "notes": "Vé vào khu B; có thể kết hợp với các dịch vụ khác.",
        "categories": [
            "Khu B",
            "Tắm biển"
        ],
        "image": "/images/ticket/hontam.jpg"
    },
    {
        "id": "sunworld-catba-cable",
        "brand": "Sun World",
        "location": "Cát Bà",
        "title": "Vé Cáp Treo Cát Bà",
        "productType": "Vé cáp treo",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "Vé cáp treo tại Sun World Cát Bà, ngắm toàn cảnh vịnh Lan Hạ.",
        "pricing": [
            {
                "audience": "Người lớn",
                "price": 300000,
                "priceLabel": "Giá công bố"
            },
            {
                "audience": "Trẻ em",
                "price": 250000,
                "priceLabel": "Giá công bố"
            }
        ],
        "notes": "Vé cáp treo khứ hồi; có thể kết hợp với các dịch vụ khác.",
        "categories": [
            "Cáp treo"
        ],
        "image": "/images/ticket/sunworld.png"
    },
    {
        "id": "sunworld-catba-combo",
        "brand": "Sun World",
        "location": "Cát Bà",
        "title": "Combo Cáp Treo + Show SOGI",
        "productType": "Combo cáp treo + show",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "Combo vé cáp treo Cát Bà kèm xem show SOGI - show biểu diễn nghệ thuật.",
        "pricing": [
            {
                "audience": "Người lớn",
                "price": 450000,
                "priceLabel": "Giá công bố"
            },
            {
                "audience": "Trẻ em",
                "price": 350000,
                "priceLabel": "Giá công bố"
            }
        ],
        "notes": "Bao gồm vé cáp treo và vé xem show SOGI.",
        "categories": [
            "Combo",
            "Cáp treo",
            "Show"
        ],
        "image": "/images/ticket/sunworld.png"
    },
    {
        "id": "sunworld-hanam-waterpark",
        "brand": "Sun World",
        "location": "Hà Nam",
        "title": "Vé Công viên Nước Hà Nam",
        "productType": "Vé công viên nước",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "Vé vào cửa Công viên Nước Sun World Hà Nam với nhiều trò chơi nước thú vị.",
        "pricing": [
            {
                "audience": "Người lớn",
                "price": 250000,
                "priceLabel": "Giá công bố"
            },
            {
                "audience": "Trẻ em",
                "price": 200000,
                "priceLabel": "Giá công bố"
            }
        ],
        "notes": "Vé vào cửa công viên nước; có thể kết hợp với các dịch vụ khác.",
        "categories": [
            "Công viên nước"
        ],
        "image": "/images/ticket/sunworld.png"
    },
    {
        "id": "sunworld-honthom-show",
        "brand": "Sun World",
        "location": "Hòn Thơm",
        "title": "Show Hòn Thơm",
        "productType": "Show biểu diễn",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "Vé xem show biểu diễn tại Sun World Hòn Thơm.",
        "pricing": [
            {
                "audience": "Người lớn",
                "price": 300000,
                "priceLabel": "Giá công bố"
            },
            {
                "audience": "Trẻ em",
                "price": 230000,
                "priceLabel": "Giá công bố"
            }
        ],
        "notes": "Vé xem show; có thể kết hợp với các dịch vụ khác.",
        "categories": [
            "Show"
        ],
        "image": "/images/ticket/sunworld.png"
    },
    {
        "id": "sunworld-honthom-cable",
        "brand": "Sun World",
        "location": "Hòn Thơm",
        "title": "Vé Cáp Treo Hòn Thơm",
        "productType": "Vé cáp treo",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "Vé cáp treo tại Sun World Hòn Thơm, ngắm toàn cảnh biển Phú Quốc.",
        "pricing": [
            {
                "audience": "Người lớn",
                "price": 400000,
                "priceLabel": "Giá công bố"
            },
            {
                "audience": "Trẻ em",
                "price": 300000,
                "priceLabel": "Giá công bố"
            }
        ],
        "notes": "Vé cáp treo khứ hồi; có thể kết hợp với các dịch vụ khác.",
        "categories": [
            "Cáp treo"
        ],
        "image": "/images/ticket/sunworld.png"
    },
    {
        "id": "sunworld-honthom-combo",
        "brand": "Sun World",
        "location": "Hòn Thơm",
        "title": "Combo Cáp Treo + Buffet",
        "productType": "Combo cáp treo + buffet",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "Combo vé cáp treo Hòn Thơm kèm buffet tại nhà hàng.",
        "pricing": [
            {
                "audience": "Người lớn",
                "price": 650000,
                "priceLabel": "Giá công bố"
            },
            {
                "audience": "Trẻ em",
                "price": 500000,
                "priceLabel": "Giá công bố"
            }
        ],
        "notes": "Bao gồm vé cáp treo và buffet; phù hợp đoàn gia đình.",
        "categories": [
            "Combo",
            "Cáp treo",
            "Buffet",
            "Ẩm thực"
        ],
        "image": "/images/ticket/sunworld.png"
    },
    {
        "id": "sunworld-samson-waterpark",
        "brand": "Sun World",
        "location": "Sầm Sơn",
        "title": "Vé Công viên Nước Sầm Sơn",
        "productType": "Vé công viên nước",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "Vé vào cửa Công viên Nước Sun World Sầm Sơn với nhiều trò chơi nước thú vị.",
        "pricing": [
            {
                "audience": "Người lớn",
                "price": 250000,
                "priceLabel": "Giá công bố"
            },
            {
                "audience": "Trẻ em",
                "price": 200000,
                "priceLabel": "Giá công bố"
            }
        ],
        "notes": "Vé vào cửa công viên nước; có thể kết hợp với các dịch vụ khác.",
        "categories": [
            "Công viên nước"
        ],
        "image": "/images/ticket/sunworld.png"
    },
    {
        "id": "sunworld-danang-sunwheel",
        "brand": "Sun World",
        "location": "Danang Downtown",
        "title": "Vé Sun Wheel Đà Nẵng",
        "productType": "Vé vòng quay",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "Vé vòng quay Sun Wheel tại Danang Downtown, ngắm toàn cảnh thành phố Đà Nẵng.",
        "pricing": [
            {
                "audience": "Người lớn",
                "price": 200000,
                "priceLabel": "Giá công bố"
            },
            {
                "audience": "Trẻ em",
                "price": 150000,
                "priceLabel": "Giá công bố"
            }
        ],
        "notes": "Vé vòng quay; có thể kết hợp với các dịch vụ khác.",
        "categories": [
            "Vòng quay"
        ],
        "image": "/images/ticket/sunworld.png"
    },
    {
        "id": "sunworld-danang-allinone",
        "brand": "Sun World",
        "location": "Danang Downtown",
        "title": "All-in-one Danang Downtown",
        "productType": "Combo All-in-one",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "Combo All-in-one bao gồm Sun Wheel và các dịch vụ giải trí tại Danang Downtown.",
        "pricing": [
            {
                "audience": "Người lớn",
                "price": 350000,
                "priceLabel": "Giá công bố"
            },
            {
                "audience": "Trẻ em",
                "price": 280000,
                "priceLabel": "Giá công bố"
            }
        ],
        "notes": "Combo All-in-one; bao gồm nhiều dịch vụ giải trí.",
        "categories": [
            "Combo",
            "All-in-one"
        ],
        "image": "/images/ticket/sunworld.png"
    },
    {
        "id": "vinwonders-namhoian-standard",
        "brand": "VinWonders",
        "location": "Nam Hội An",
        "title": "Vé Tiêu Chuẩn VinWonders Nam Hội An",
        "productType": "Vé công viên giải trí",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "Vé vào cửa tiêu chuẩn VinWonders Nam Hội An, bao gồm hầu hết trò chơi và show nội khu.",
        "pricing": [
            {
                "audience": "Giá niêm yết NL",
                "price": 850000,
                "priceLabel": "Giá niêm yết"
            },
            {
                "audience": "Giá niêm yết TE/NCT",
                "price": 650000,
                "priceLabel": "Giá niêm yết"
            }
        ],
        "notes": "Vé vào cửa tiêu chuẩn; có thể kết hợp với các gói bổ sung.",
        "categories": [
            "Công viên chủ đề"
        ],
        "image": "/images/ticket/vinwonders.png"
    },
    {
        "id": "vinwonders-namhoian-combo",
        "brand": "VinWonders",
        "location": "Nam Hội An",
        "title": "Combo VinWonders Nam Hội An + Buffet",
        "productType": "Combo công viên + buffet",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "Combo vé VinWonders Nam Hội An kèm buffet tại nhà hàng trong công viên.",
        "pricing": [
            {
                "audience": "Giá niêm yết NL",
                "price": 1150000,
                "priceLabel": "Giá niêm yết"
            },
            {
                "audience": "Giá niêm yết TE/NCT",
                "price": 880000,
                "priceLabel": "Giá niêm yết"
            }
        ],
        "notes": "Bao gồm vé vào cửa và buffet; phù hợp đoàn gia đình.",
        "categories": [
            "Combo",
            "Buffet",
            "Ẩm thực"
        ],
        "image": "/images/ticket/vinwonders.png"
    },
    {
        "id": "vinwonders-hanoi-op2",
        "brand": "VinWonders",
        "location": "Hà Nội",
        "title": "Vé OP2 VinWonders Hà Nội",
        "productType": "Vé công viên giải trí",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "Vé OP2 VinWonders Hà Nội - gói vé tiêu chuẩn với nhiều trò chơi.",
        "pricing": [
            {
                "audience": "Giá niêm yết NL",
                "price": 750000,
                "priceLabel": "Giá niêm yết"
            },
            {
                "audience": "Giá niêm yết TE/NCT",
                "price": 550000,
                "priceLabel": "Giá niêm yết"
            }
        ],
        "notes": "Vé OP2; có thể nâng cấp lên OP3.",
        "categories": [
            "Công viên chủ đề"
        ],
        "image": "/images/ticket/vinwonders.png"
    },
    {
        "id": "vinwonders-hanoi-op3",
        "brand": "VinWonders",
        "location": "Hà Nội",
        "title": "Vé OP3 VinWonders Hà Nội",
        "productType": "Vé công viên giải trí",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "Vé OP3 VinWonders Hà Nội - gói vé cao cấp với tất cả trò chơi và dịch vụ.",
        "pricing": [
            {
                "audience": "Giá niêm yết NL",
                "price": 950000,
                "priceLabel": "Giá niêm yết"
            },
            {
                "audience": "Giá niêm yết TE/NCT",
                "price": 710000,
                "priceLabel": "Giá niêm yết"
            }
        ],
        "notes": "Vé OP3; bao gồm tất cả trò chơi và dịch vụ.",
        "categories": [
            "Công viên chủ đề"
        ],
        "image": "/images/ticket/vinwonders.png"
    },
    {
        "id": "vinwonders-hanoi-combo",
        "brand": "VinWonders",
        "location": "Hà Nội",
        "title": "Combo VinWonders Hà Nội + Buffet",
        "productType": "Combo công viên + buffet",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "Combo vé VinWonders Hà Nội kèm buffet tại nhà hàng trong công viên.",
        "pricing": [
            {
                "audience": "Giá niêm yết NL",
                "price": 1150000,
                "priceLabel": "Giá niêm yết"
            },
            {
                "audience": "Giá niêm yết TE/NCT",
                "price": 880000,
                "priceLabel": "Giá niêm yết"
            }
        ],
        "notes": "Bao gồm vé vào cửa và buffet; phù hợp đoàn gia đình.",
        "categories": [
            "Combo",
            "Buffet",
            "Ẩm thực"
        ],
        "image": "/images/ticket/vinwonders.png"
    },
    {
        "id": "vinwonders-hochiminh-grandpark",
        "brand": "VinWonders",
        "location": "Hồ Chí Minh",
        "title": "Vé GrandPark VinWonders Hồ Chí Minh",
        "productType": "Vé công viên giải trí",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "Vé vào cửa GrandPark VinWonders Hồ Chí Minh với nhiều trò chơi và show.",
        "pricing": [
            {
                "audience": "Giá niêm yết NL",
                "price": 850000,
                "priceLabel": "Giá niêm yết"
            },
            {
                "audience": "Giá niêm yết TE/NCT",
                "price": 650000,
                "priceLabel": "Giá niêm yết"
            }
        ],
        "notes": "Vé vào cửa GrandPark; có thể kết hợp với các gói bổ sung.",
        "categories": [
            "Công viên chủ đề"
        ],
        "image": "/images/ticket/vinwonders.png"
    },
    {
        "id": "vinwonders-hochiminh-combo",
        "brand": "VinWonders",
        "location": "Hồ Chí Minh",
        "title": "Combo GrandPark + Buffet",
        "productType": "Combo công viên + buffet",
        "validity": "01/01/2025 – 31/12/2025",
        "description": "Combo vé GrandPark VinWonders Hồ Chí Minh kèm buffet tại nhà hàng trong công viên.",
        "pricing": [
            {
                "audience": "Giá niêm yết NL",
                "price": 1150000,
                "priceLabel": "Giá niêm yết"
            },
            {
                "audience": "Giá niêm yết TE/NCT",
                "price": 880000,
                "priceLabel": "Giá niêm yết"
            }
        ],
        "notes": "Bao gồm vé vào cửa và buffet; phù hợp đoàn gia đình.",
        "categories": [
            "Combo",
            "Buffet",
            "Ẩm thực"
        ],
        "image": "/images/ticket/vinwonders.png"
    }
];
