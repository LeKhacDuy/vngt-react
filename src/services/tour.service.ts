import api from './api';

export interface Tour {
    id: number;
    tour_code: string;
    name: string;
    duration: number;
    transport: string;
    hotel_rating: string;
    web_price: number;
    highlights: string;
    thumbnail: string;
    cancellation_policy?: string;
    special_notes?: string;
    category_id: number;
    destination_id: number;
    subcategory_id?: number;
    subcategory_code?: string; // Added for subcategory filtering
    destination_code?: string; // Added for destination filtering
    // Expanded fields for detail view
    gallery?: string[];
    itinerary?: {
        day: number;
        title: string;
        description: string;
        image?: string;
    }[];
    inclusions?: string[];
    exclusions?: string[];
    policy?: string;
    rating?: number;
    reviews?: number;
    // UI helper fields (mapped from API)
    image: string; // mapped from thumbnail
    price: string; // formatted string
    originalPrice?: string; // formatted string for original price
    discount?: string;
    slug: string;
    category: string; // mapped from category_code or name
    destination: string; // mapped from destination name
    departure?: string; // departure date/info
}

// Helper to get full image URL
export const getImageUrl = (path?: string) => {
    if (!path) return '/images/tour-placeholder.jpg';
    if (path.startsWith('http')) return path;
    // Remove leading slash if present to avoid double slashes if BASE_URL ends with /
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    // If path starts with upload/, prepend API URL (or specific image base URL if different)
    // Based on reference: https://lekhacduy.io.vn/api/upload/tour/...
    // Our NEXT_PUBLIC_API_URL is /api (proxy) -> so we can just use /api/ + cleanPath matching the proxy
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://lekhacduy.io.vn/api';
    return `${baseUrl}/${cleanPath}`;
};

export const tourService = {
    getAll: async (params?: any) => {
        return api.get<any, { data: Tour[] }>('/tours', { params });
    },

    getHotTours: async () => {
        return api.get<any, { data: Tour[] }>('/tours', { params: { subcategory_code: 'hot' } });
    },

    getInternationalTours: async () => {
        return api.get<any, { data: Tour[] }>('/tours', { params: { category_code: 'international' } });
    },

    getDomesticTours: async () => {
        return api.get<any, { data: Tour[] }>('/tours', { params: { category_code: 'domestic' } });
    },

    getGroupTours: async () => {
        return api.get<any, { data: Tour[] }>('/tours', { params: { category_code: 'group' } });
    },

    getInboundTours: async () => {
        // Inbound tours often overlap with Domestic but targeted at foreigners.
        // If API has specific 'inbound' category, use it. Otherwise, might need 'domestic' with specific logic.
        // For now, let's try 'category_code: inbound'.
        return api.get<any, { data: Tour[] }>('/tours', { params: { category_code: 'inbound' } });
    },

    getPromotionTours: async () => {
        const res = await api.get<any, { data: any[] }>('/tours', { params: { subcategory_code: 'promotion' } });
        return { data: res.data.map(transformTourData) };
    },

    // Subcategory-based tour fetching
    getToursBySubcategory: async (subcategoryCode: string) => {
        return api.get<any, { data: Tour[] }>('/tours', { params: { subcategory_code: subcategoryCode } });
    },

    getSpringTours: async () => {
        return api.get<any, { data: Tour[] }>('/tours', { params: { subcategory_code: 'spring' } });
    },

    getSummerTours: async () => {
        return api.get<any, { data: Tour[] }>('/tours', { params: { subcategory_code: 'summer' } });
    },

    getAutumnTours: async () => {
        return api.get<any, { data: Tour[] }>('/tours', { params: { subcategory_code: 'autumn' } });
    },

    getWinterTours: async () => {
        return api.get<any, { data: Tour[] }>('/tours', { params: { subcategory_code: 'winter' } });
    },

    getHolidayTours: async () => {
        return api.get<any, { data: Tour[] }>('/tours', { params: { subcategory_code: 'holiday' } });
    },

    getMiniGroupTours: async () => {
        return api.get<any, { data: Tour[] }>('/tours', { params: { subcategory_code: 'mini-group' } });
    },

    getNoShoppingTours: async () => {
        return api.get<any, { data: Tour[] }>('/tours', { params: { subcategory_code: 'no-shopping' } });
    },

    getById: async (id: string | number) => {
        const res = await api.get<any, { data: any }>(`/tours/${id}`);
        return { data: transformTourData(res.data) };
    },

    getBySlug: async (slug: string) => {
        // API doesn't support filtering by slug/tour_code and returns a fixed list (approx 100 items).
        // We fetch all available tours and filter client-side.
        const res = await api.get<any, { data: any[] }>('/tours', { params: { limit: 1000 } });

        if (res.data && res.data.length > 0) {
            const normalizedSlug = slug.trim().toLowerCase();

            // Priority 1: Exact slug/code match (case-insensitive & trimmed)
            const exactMatch = res.data.find((item: any) => {
                const itemSlug = (item.slug || '').trim().toLowerCase();
                const itemCode = (item.tour_code || '').trim().toLowerCase();
                return itemSlug === normalizedSlug || itemCode === normalizedSlug;
            });

            if (exactMatch) {
                return { data: transformTourData(exactMatch) };
            }

            // Priority 2: ID match (if slug is numeric)
            if (!isNaN(Number(slug))) {
                const idMatch = res.data.find((item: any) => item.id == slug);
                if (idMatch) return { data: transformTourData(idMatch) };
            }
        }

        // Fallback: If search by slug fails, try getting by ID directly if it looks like an ID
        // This is a last resort call to the specific ID endpoint
        if (!isNaN(Number(slug))) {
            try {
                const idRes = await api.get<any, { data: any }>(`/tours/${slug}`);
                if (idRes.data) return { data: transformTourData(idRes.data) };
            } catch (e) {
                // ignore error
            }
        }

        return { data: null };
    },

    getCategories: async () => {
        return api.get<any, any>('/categories');
    },

    getDestinations: async () => {
        return api.get<any, any>('/destinations');
    },

    getSubcategories: async () => {
        return api.get<any, any>('/subcategories');
    },

    getDepartures: async () => {
        return api.get<any, any>('/departures');
    },

    getArticles: async (params: any = {}) => {
        return api.get<any, any>('/content/articles', { params });
    }
};

// Adapter function to transform API response to clean Tour interface
const transformTourData = (apiData: any): Tour => {
    // 1. Parse special_notes for inclusions/exclusions/policy
    let inclusions: string[] = [];
    let exclusions: string[] = [];
    let policy = '';

    if (apiData.special_notes) {
        const notes = apiData.special_notes;

        // Extract Inclusions
        const incMatch = notes.match(/GIÁ TOUR BAO GỒM([\s\S]*?)(?=GIÁ TOUR KHÔNG BAO GỒM|$)/);
        if (incMatch) {
            inclusions = incMatch[1]
                .split(/[•\u2022-]/) // Split by bullet points or dashes
                .map((s: string) => s.trim())
                .filter((s: string) => s.length > 0);
        }

        // Extract Exclusions
        const excMatch = notes.match(/GIÁ TOUR KHÔNG BAO GỒM([\s\S]*?)(?=QUY ĐỊNH|LƯU Ý|$)/);
        if (excMatch) {
            exclusions = excMatch[1]
                .split(/[•\u2022-]/)
                .map((s: string) => s.trim())
                .filter((s: string) => s.length > 0);
        }

        // Extract Policy/Notes (LƯU Ý)
        const noteMatch = notes.match(/LƯU Ý([\s\S]*?)$/);
        if (noteMatch) {
            policy = noteMatch[1].trim();
        }
    }

    if (apiData.cancellation_policy) {
        policy += (policy ? '\n\n' : '') + 'CHÍNH SÁCH HỦY:\n' + apiData.cancellation_policy;
    }

    // 2. Transform Itinerary
    const itinerary = Array.isArray(apiData.itineraries) ? apiData.itineraries.map((it: any) => {
        let desc = '';
        if (it.morning?.description) desc += `SÁNG: ${it.morning.description}\n\n`;
        if (it.noon?.description) desc += `TRƯA: ${it.noon.description}\n\n`;
        if (it.evening?.description) desc += `TỐI: ${it.evening.description}`;

        return {
            day: it.day_number || 0,
            title: it.title || `Ngày ${it.day_number}`,
            description: desc.trim(),
            image: getImageUrl(it.image) // Assuming itinerary has image, or fallback
        };
    }) : [];

    // 3. Transform Gallery
    const gallery = Array.isArray(apiData.gallery_images)
        ? apiData.gallery_images.map((img: string) => getImageUrl(img))
        : [getImageUrl(apiData.thumbnail)];

    return {
        id: apiData.id,
        tour_code: apiData.tour_code,
        name: apiData.name,
        duration: apiData.duration, // Number from API
        transport: apiData.transport,
        hotel_rating: apiData.hotel_rating,
        web_price: apiData.web_price,
        highlights: apiData.highlights,
        thumbnail: getImageUrl(apiData.thumbnail),
        cancellation_policy: apiData.cancellation_policy,
        special_notes: apiData.special_notes,
        category_id: apiData.category_id,
        destination_id: apiData.destination_id,
        subcategory_id: apiData.subcategory_id,
        subcategory_code: apiData.subcategory?.code || apiData.subcategory_code || '', // Map subcategory code
        destination_code: apiData.destination?.code || apiData.destination_code || '', // Map destination code

        // Mapped fields
        gallery: gallery,
        itinerary: itinerary,
        inclusions: inclusions,
        exclusions: exclusions,
        policy: policy,
        rating: 4.8, // Default, not in API yet
        reviews: 124, // Default

        // Helper accessors for UI (required by Tour interface)
        image: getImageUrl(apiData.thumbnail), // Map thumbnail to image
        price: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(apiData.web_price),
        originalPrice: apiData.original_price
            ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(apiData.original_price)
            : undefined,
        slug: apiData.slug || apiData.tour_code || '', // Ensure slug exists, fallback to tour_code
        category: apiData.category?.name || 'Uncategorized', // Map category name
        destination: apiData.destination?.name || 'Vietnam', // Map destination name
        departure: apiData.departure_date || 'Liên hệ' // Map departure info
    };
};
