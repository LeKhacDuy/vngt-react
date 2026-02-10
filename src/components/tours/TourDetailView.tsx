'use client';

import Image from 'next/image';
import { Tour } from '@/services/tour.service';
import { MapPin, Calendar, Clock, Star, Check, Phone, Mail, Share2, Heart, Flag } from 'lucide-react';

interface TourDetailViewProps {
    tour: Tour;
}

interface Article {
    id: number;
    title: string;
    slug: string;
    intro_image?: string;
    category_name?: string;
}

interface TourDetailViewProps {
    tour: Tour;
    articles?: Article[];
}

export default function TourDetailView({ tour, articles = [] }: TourDetailViewProps) {
    // Helper to check if image is a placeholder or invalid
    const isValidImage = (img?: string) => {
        if (!img) return false;
        if (img.includes('placeholder')) return false;
        if (img === '/images/tour-placeholder.jpg') return false;
        if (img.startsWith('/images/tour') && img.includes('.jpg')) return false; // Filter mock images like tour2.jpg
        return true;
    };

    // Only use real images from tour.gallery, filter out placeholders
    const galleryImages = (tour.gallery || []).filter(isValidImage);

    // Use main image only if valid
    const mainImage = isValidImage(tour.image) ? tour.image : null;

    // Calculate prices for Pricing Table
    const basePrice = tour.web_price || 0;
    const childPrice = Math.round(basePrice * 0.75);
    const infantPrice = Math.round(basePrice * 0.5);

    const formatPrice = (price: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

    // Helper to get article image
    const getArticleImage = (article: Article) => {
        if (!article.intro_image) return '/images/default-article.jpg';
        if (article.intro_image.startsWith('http')) return article.intro_image;
        const cleanPath = article.intro_image.replace('/upload/article/', '');
        return `https://lekhacduy.io.vn/api/upload/article/${cleanPath}`;
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* ... (Hero Section maps to existing code) ... */}
            <section className="relative bg-white pb-12 pt-8 lg:pt-12">
                <div className="container mx-auto px-4">
                    {/* Breadcrumbs */}
                    <div className="flex items-center text-sm text-gray-500 mb-6">
                        <a href="/" className="hover:text-[#00dba1]">Trang chủ</a>
                        <span className="mx-2">/</span>
                        <a href={`/tours/${tour.category}`} className="hover:text-[#00dba1] capitalize">{tour.category} Tours</a>
                        <span className="mx-2">/</span>
                        <span className="text-gray-800 line-clamp-1">{tour.name}</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Left: Gallery */}
                        <div className="space-y-4">
                            {mainImage && (
                                <div className="relative h-[300px] lg:h-[400px] rounded-2xl overflow-hidden shadow-lg group">
                                    <Image
                                        src={mainImage}
                                        alt={tour.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        priority
                                    />
                                </div>
                            )}
                            {galleryImages.length > 0 && (
                                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                                    {galleryImages.map((img, idx) => (
                                        <div key={idx} className="relative w-24 h-16 lg:w-32 lg:h-20 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border-2 border-transparent hover:border-[#00dba1]">
                                            <Image src={img} alt="" fill className="object-cover" />
                                        </div>
                                    ))}
                                </div>
                            )}
                            {/* Fallback if no images at all */}
                            {!mainImage && galleryImages.length === 0 && (
                                <div className="h-[200px] rounded-2xl bg-gradient-to-br from-[#00dba1]/20 to-blue-500/20 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-4xl mb-2">🌍</div>
                                        <p className="text-gray-500 text-sm">Hình ảnh đang được cập nhật</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4 font-serif">
                                {tour.name}
                            </h1>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center text-yellow-400 gap-1">
                                    <Star className="w-5 h-5 fill-current" />
                                    <span className="font-bold text-xl text-gray-800">{tour.rating || 4.8}</span>
                                    <span className="text-gray-500 text-sm">({tour.reviews || 124} đánh giá)</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                                    <Flag className="w-4 h-4" />
                                    {tour.destination}
                                </div>
                            </div>

                            {/* Price & Booking Box */}
                            <div className="mt-auto bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                                <div className="flex justify-between items-end mb-6">
                                    <div>
                                        <p className="text-gray-500 text-sm mb-1">Giá trọn gói chỉ từ</p>
                                        <div className="flex items-baseline gap-3">
                                            <span className="text-3xl font-bold text-red-600">{tour.price}</span>
                                            {tour.originalPrice && (
                                                <span className="text-lg text-gray-400 line-through">{tour.originalPrice}</span>
                                            )}
                                        </div>
                                    </div>
                                    {tour.discount && (
                                        <span className="px-3 py-1 bg-red-100 text-red-600 font-bold rounded-lg animate-pulse">
                                            {tour.discount}
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <Clock className="w-5 h-5 text-[#00dba1]" />
                                        <span className="font-medium">Thời gian:</span>
                                        <span>{tour.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <Calendar className="w-5 h-5 text-[#00dba1]" />
                                        <span className="font-medium">Khởi hành:</span>
                                        <span>{tour.departure}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <MapPin className="w-5 h-5 text-[#00dba1]" />
                                        <span className="font-medium">Phương tiện:</span>
                                        <span>Hàng không quốc gia / Xe đời mới</span>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button className="flex-1 py-3 px-6 bg-gradient-to-r from-[#00dba1] to-[#00b894] text-white font-bold rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all">
                                        Đặt ngay
                                    </button>
                                    <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors">
                                        <Heart className="w-6 h-6" />
                                    </button>
                                    <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors">
                                        <Share2 className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </section >

            {/* Pricing Table Section (New) */}
            {
                basePrice > 0 && (
                    <section className="container mx-auto px-4 py-8">
                        <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-[#00dba1]/10 flex items-center justify-center text-[#00dba1]">$</div>
                                Bảng giá tour
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 text-gray-700">
                                            <th className="p-4 border-b rounded-tl-xl font-bold">Đối tượng</th>
                                            <th className="p-4 border-b font-bold">Giá tour</th>
                                            <th className="p-4 border-b rounded-tr-xl font-bold">Độ tuổi / Điều kiện</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600">
                                        <tr>
                                            <td className="p-4 border-b font-medium text-gray-900">Người lớn</td>
                                            <td className="p-4 border-b text-red-600 font-bold">{formatPrice(basePrice)}</td>
                                            <td className="p-4 border-b">Từ 12 tuổi trở lên</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 border-b font-medium text-gray-900">Trẻ em</td>
                                            <td className="p-4 border-b text-red-600 font-bold">{formatPrice(childPrice)}</td>
                                            <td className="p-4 border-b">Từ 5 - 11 tuổi</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 border-b font-medium text-gray-900">Em bé</td>
                                            <td className="p-4 border-b text-red-600 font-bold">{formatPrice(infantPrice)}</td>
                                            <td className="p-4 border-b">Dưới 5 tuổi</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                )
            }

            {/* Content Section */}
            <section className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content (Left) */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Highlights / Inclusions */}
                    <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Star className="w-6 h-6 text-yellow-400 fill-current" /> Dịch vụ bao gồm
                        </h2>
                        {tour.inclusions ? (
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {tour.inclusions.map((item, i) => (
                                    <li key={i} className="flex gap-3 text-gray-700 bg-gray-50 p-3 rounded-lg">
                                        <Check className="w-5 h-5 text-[#00dba1] flex-shrink-0 mt-0.5" />
                                        <span className="text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 italic">Chi tiết dịch vụ đang được cập nhật...</p>
                        )}
                    </div>

                    {/* Exclusions (New) */}
                    {tour.exclusions && tour.exclusions.length > 0 && (
                        <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500 font-bold text-xs">!</div>
                                Không bao gồm
                            </h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {tour.exclusions.map((item, i) => (
                                    <li key={i} className="flex gap-3 text-gray-700 bg-red-50/50 p-3 rounded-lg">
                                        <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                                        <span className="text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Itinerary */}
                    <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8 font-serif border-l-4 border-[#00dba1] pl-4">Lịch trình chi tiết</h2>

                        {tour.itinerary ? (
                            <div className="border-l-2 border-[#00dba1]/30 ml-3 space-y-10 pl-8 relative">
                                {tour.itinerary.map((day, idx) => (
                                    <div key={idx} className="relative group">
                                        <span className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-[#00dba1] text-white flex items-center justify-center text-xs font-bold ring-4 ring-white transition-transform group-hover:scale-110 shadow-md">
                                            {day.day}
                                        </span>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#00dba1] transition-colors">{day.title}</h3>
                                        <p className="text-gray-600 leading-relaxed mb-4 whitespace-pre-line text-justify">
                                            {day.description}
                                        </p>
                                        {day.image && isValidImage(day.image) && (
                                            <div className="relative h-64 rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow mt-4">
                                                <Image src={day.image} alt={day.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500 italic">
                                Lịch trình đang được cập nhật...
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar (Right) */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                        <h3 className="font-bold text-lg mb-4 text-gray-900">Hỗ trợ tư vấn</h3>
                        <div className="space-y-4">
                            <a href="tel:0931867376" className="flex items-center gap-3 p-4 bg-[#00dba1]/5 rounded-xl hover:bg-[#00dba1]/10 transition-colors group">
                                <div className="w-10 h-10 rounded-full bg-[#00dba1] flex items-center justify-center text-white shadow-lg shadow-[#00dba1]/30 group-hover:scale-110 transition-transform">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Hotline 24/7</p>
                                    <p className="font-bold text-gray-900 text-lg">0931 867 376</p>
                                </div>
                            </a>
                            <a href="mailto:info@vngrouptourist.com" className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group">
                                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email tư vấn</p>
                                    <p className="font-bold text-gray-900">info@vngrouptourist.com</p>
                                </div>
                            </a>
                        </div>

                        {/* Policy Mini Section */}
                        {tour.policy && (
                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <h4 className="font-bold text-gray-900 mb-2 text-sm flex items-center gap-2">
                                    <div className="w-1 h-4 bg-orange-400 rounded-full"></div>
                                    Chính sách & Lưu ý
                                </h4>
                                <p className="text-xs text-gray-500 line-clamp-4 leading-relaxed">
                                    {tour.policy}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Related Articles / Travel Guides (New) */}
            {
                articles.length > 0 && (
                    <section className="bg-white py-12 lg:py-16 mt-8">
                        <div className="container mx-auto px-4">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 font-serif">
                                    Cẩm nang du lịch
                                </h2>
                                <a href="/guide-page" className="text-[#00dba1] font-medium hover:underline flex items-center gap-1">
                                    Xem tất cả <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px]">&rarr;</div>
                                </a>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {articles.map((article) => (
                                    <a key={article.id} href={`/guide-page/${article.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                                        <div className="relative h-48 overflow-hidden">
                                            <Image
                                                src={getArticleImage(article)}
                                                alt={article.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                                            {article.category_name && (
                                                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                                                    {article.category_name}
                                                </span>
                                            )}
                                        </div>
                                        <div className="p-5 flex flex-col flex-grow">
                                            <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-[#00dba1] transition-colors">
                                                {article.title}
                                            </h3>
                                            <div className="mt-auto flex items-center text-sm text-[#00dba1] font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                                Đọc tiếp &rarr;
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </section>
                )
            }
        </div >
    );
}
