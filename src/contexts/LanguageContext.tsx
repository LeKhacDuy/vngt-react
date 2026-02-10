'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Locale = 'vi' | 'en';

interface LanguageContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string) => string;
    isHydrated: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Vietnamese translations (default)
const vi: Record<string, string> = {
    // Header
    'header.slogan': 'Hành trình đẳng cấp – Trải nghiệm khác biệt.',
    'header.visa': 'Dịch vụ Visa',
    'header.guide': 'Cẩm nang du lịch',
    'header.about': 'Về chúng tôi',
    'header.contact': 'Liên hệ',
    'header.international': 'Tour quốc tế',
    'header.domestic': 'Tour trong nước',
    'header.luxury': 'Tour cao cấp',
    'header.group': 'Tour đoàn',
    'header.inbound': 'Tour inbound',
    'header.tickets': 'Vé tham quan',
    'header.promotions': 'Khuyến mãi',
    'header.hotCombo': 'HOT COMBO',
    'header.phone': 'Liên hệ',

    // Hero Section
    'hero.title': 'Khám phá thế giới cùng VNGROUP TOURIST',
    'hero.subtitle': 'Trải nghiệm những hành trình đẳng cấp với dịch vụ chuyên nghiệp',
    'hero.search': 'Tìm kiếm tour...',
    'hero.searchBtn': 'Tìm kiếm',

    // Common
    'common.viewMore': 'Xem thêm',
    'common.bookNow': 'Đặt ngay',
    'common.seeDetails': 'Xem chi tiết',
    'common.loading': 'Đang tải...',
    'common.noResults': 'Không tìm thấy kết quả',
    'common.price': 'Giá',
    'common.duration': 'Thời gian',
    'common.departure': 'Khởi hành',
    'common.contact': 'Liên hệ',
    'common.all': 'Tất cả',

    // Tour Categories
    'tour.international': 'Tour Quốc Tế',
    'tour.domestic': 'Tour Trong Nước',
    'tour.luxury': 'Tour Cao Cấp',
    'tour.group': 'Tour Đoàn',

    // Footer
    'footer.copyright': '© 2024 VNGROUP TOURIST. Tất cả quyền được bảo lưu.',
    'footer.hotline': 'Hotline',
    'footer.email': 'Email',
    'footer.address': 'Địa chỉ',

    // Guide
    'guide.title': 'Cẩm nang Du lịch',
    'guide.readMore': 'Đọc thêm',
    'guide.relatedPosts': 'Bài viết liên quan',

    // CTA
    'cta.bookTour': 'Đặt tour ngay!',
    'cta.consultNow': 'Tư vấn ngay',
};

// English translations
const en: Record<string, string> = {
    // Header
    'header.slogan': 'Premium Journeys – Unique Experiences.',
    'header.visa': 'Visa Services',
    'header.guide': 'Travel Guide',
    'header.about': 'About Us',
    'header.contact': 'Contact',
    'header.international': 'International Tours',
    'header.domestic': 'Domestic Tours',
    'header.luxury': 'Luxury Tours',
    'header.group': 'Group Tours',
    'header.inbound': 'Inbound Tours',
    'header.tickets': 'Tickets',
    'header.promotions': 'Promotions',
    'header.hotCombo': 'HOT COMBO',
    'header.phone': 'Contact',

    // Hero Section
    'hero.title': 'Explore the World with VNGROUP TOURIST',
    'hero.subtitle': 'Experience premium journeys with professional services',
    'hero.search': 'Search tours...',
    'hero.searchBtn': 'Search',

    // Common
    'common.viewMore': 'View More',
    'common.bookNow': 'Book Now',
    'common.seeDetails': 'See Details',
    'common.loading': 'Loading...',
    'common.noResults': 'No results found',
    'common.price': 'Price',
    'common.duration': 'Duration',
    'common.departure': 'Departure',
    'common.contact': 'Contact',
    'common.all': 'All',

    // Tour Categories
    'tour.international': 'International Tours',
    'tour.domestic': 'Domestic Tours',
    'tour.luxury': 'Luxury Tours',
    'tour.group': 'Group Tours',

    // Footer
    'footer.copyright': '© 2024 VNGROUP TOURIST. All rights reserved.',
    'footer.hotline': 'Hotline',
    'footer.email': 'Email',
    'footer.address': 'Address',

    // Guide
    'guide.title': 'Travel Guide',
    'guide.readMore': 'Read More',
    'guide.relatedPosts': 'Related Posts',

    // CTA
    'cta.bookTour': 'Book a Tour!',
    'cta.consultNow': 'Consult Now',
};

const translations: Record<Locale, Record<string, string>> = { vi, en };

export function LanguageProvider({ children }: { children: ReactNode }) {
    // Always start with 'vi' to match server render
    const [locale, setLocaleState] = useState<Locale>('vi');
    const [isHydrated, setIsHydrated] = useState(false);

    // Load saved locale from localStorage ONLY after mount (client-side)
    useEffect(() => {
        const saved = localStorage.getItem('locale') as Locale;
        if (saved && (saved === 'vi' || saved === 'en')) {
            setLocaleState(saved);
        }
        setIsHydrated(true);
    }, []);

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale);
        localStorage.setItem('locale', newLocale);
    };

    // Translation function
    const t = (key: string): string => {
        return translations[locale][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ locale, setLocale, t, isHydrated }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

export default LanguageContext;
