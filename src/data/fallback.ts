import { tours as localTours, type Tour as LocalTour } from './tours';
import { articles as localArticles } from './articles';

/**
 * Dữ liệu dự phòng cho trang chủ.
 *
 * Các khối trên trang chủ gọi API để lấy tour. Khi API không phản hồi,
 * trước đây chúng trả về null nên trang chủ trống trơn — một công ty du
 * lịch mà trang chủ không có tour nào. Lớp này lấy dữ liệu sẵn có trong
 * repo để trang luôn có nội dung.
 *
 * API vẫn được ưu tiên: chỉ khi gọi lỗi hoặc không có dữ liệu thì mới
 * dùng tới đây.
 */

/** Định dạng thẻ tour mà các khối giao diện đang dùng. */
export interface TourCardData {
    id: string;
    name: string;
    image: string;
    price: string;
    originalPrice?: string | null;
    duration: string;
    departure: string;
    discount?: string | null;
    slug: string;
    category?: string;
}

/**
 * Ảnh thay thế cho từng tour.
 *
 * CẦN LÀM: đây là ảnh mượn từ các thư mục khác trong repo vì dữ liệu gốc
 * trỏ tới /images/tour1.jpg … tour4.jpg mà những file đó không tồn tại.
 * Khi có ảnh thật của từng tour thì sửa trực tiếp trong data/tours.ts và
 * xoá bảng này đi.
 */
const REPLACEMENT_IMAGES: Record<string, string> = {
    '1': '/images/inbound/danang-central.png',
    '2': '/images/benbich/cbich.jpg',
    '5': '/hanh-trinh-tinh-hoa-trung-hoa/images/food_dimsum.png',
    '6': '/hanh-trinh-tinh-hoa-trung-hoa/images/beijing_forbiddencity.png',
    '7': '/images/ticket/hontam.jpg',
    '8': '/images/inbound/nhatrang-south.png',
    '9': '/images/inbound/sapa-north.png',
    '10': '/images/inbound/halong-north.png',
    '11': '/images/inbound/sapa-north.png',
    'inbound-1': '/images/inbound/halong-north.png',
    'group-dn-1': '/images/inbound/hero.png',
    'group-gd-1': '/images/inbound/danang-central.png',
    'group-hh-1': '/hanh-trinh-tinh-hoa-trung-hoa/images/beijing_forbiddencity.png',
    'group-hocsinh-1': '/images/inbound/sapa-north.png',
};

const DEFAULT_IMAGE = '/images/default-tour.jpg';

function resolveImage(tour: LocalTour): string {
    const replacement = REPLACEMENT_IMAGES[tour.id];
    if (replacement) return replacement;
    // Ảnh gốc trỏ tới file không tồn tại thì dùng ảnh mặc định
    if (!tour.image || tour.image.startsWith('/images/tour')) return DEFAULT_IMAGE;
    return tour.image;
}

function toCard(tour: LocalTour): TourCardData {
    return {
        id: tour.id,
        name: tour.name,
        image: resolveImage(tour),
        price: tour.price,
        originalPrice: tour.originalPrice ?? null,
        duration: tour.duration,
        departure: tour.departure,
        discount: tour.discount ?? null,
        slug: tour.slug,
        category: tour.category,
    };
}

/** Tour nổi bật: ưu tiên tour có giảm giá, trộn cả trong nước lẫn quốc tế. */
export function getFallbackHotTours(limit = 4): TourCardData[] {
    const ranked = [...localTours].sort((a, b) => {
        const aHasDiscount = a.discount ? 0 : 1;
        const bHasDiscount = b.discount ? 0 : 1;
        if (aHasDiscount !== bHasDiscount) return aHasDiscount - bHasDiscount;
        return (a.priceValue ?? 0) - (b.priceValue ?? 0);
    });
    return ranked.slice(0, limit).map(toCard);
}

/** Tour đoàn: team building, gia đình, hành hương, học sinh. */
export function getFallbackGroupTours(limit = 4): TourCardData[] {
    return localTours
        .filter((t) => t.category === 'group')
        .slice(0, limit)
        .map(toCard);
}

/** Tour giá tốt trong ngày, sắp theo giá tăng dần. */
export function getFallbackDealTours(limit = 8): TourCardData[] {
    return [...localTours]
        .sort((a, b) => (a.priceValue ?? 0) - (b.priceValue ?? 0))
        .slice(0, limit)
        .map(toCard);
}

/**
 * Bài viết cẩm nang du lịch.
 *
 * data/articles.ts dùng định dạng khác với API nên phải chuyển đổi lại
 * cho khớp với kiểu Article mà khối giao diện đang nhận.
 */
const ARTICLE_CATEGORY_IDS: Record<string, number> = {
    Destination: 1,
    Food: 2,
    Tips: 3,
    Culture: 4,
};

/** Ảnh minh hoạ bài viết, xoay vòng vì data gốc trỏ tới file không tồn tại. */
const ARTICLE_IMAGES = [
    '/images/inbound/sapa-north.png',
    '/hanh-trinh-tinh-hoa-trung-hoa/images/food_dimsum.png',
    '/images/inbound/halong-north.png',
    '/hanh-trinh-tinh-hoa-trung-hoa/images/beijing_forbiddencity.png',
    '/images/inbound/nhatrang-south.png',
    '/hanh-trinh-tinh-hoa-trung-hoa/images/food_hotpot.png',
];

function slugify(text: string): string {
    return text
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 60);
}

export function getFallbackArticles(limit = 6) {
    return localArticles.slice(0, limit).map((article, index) => ({
        id: index + 1,
        title: article.title,
        slug: slugify(article.title),
        intro_image:
            article.image && !article.image.startsWith('/images/tour')
                ? article.image
                : ARTICLE_IMAGES[index % ARTICLE_IMAGES.length],
        content: article.excerpt,
        category_id: ARTICLE_CATEGORY_IDS[article.category] ?? 1,
        created_at: article.publishedAt,
    }));
}
