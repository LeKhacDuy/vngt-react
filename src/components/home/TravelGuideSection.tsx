'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Clock, MapPin, Tag } from 'lucide-react';
import { articleService, Article } from '@/services/article.service';
import { getImageUrl } from '@/services/tour.service';

export default function TravelGuideSection() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await articleService.getArticles({ limit: 10 });
                if (response && response.success) {
                    setArticles(response.articles || []);
                }
            } catch (error) {
                console.error("Failed to fetch articles:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, []);

    // Layout Logic
    const tipsArticle = articles.find(a => a.category_id === 1) || articles[0];
    const cuisineArticle = articles.find(a => a.category_id === 2);
    const destArticle = articles.find(a => a.category_id === 3);

    // Filter out used for Hero
    const heroId = tipsArticle?.id;
    // Get list of remaining articles for sidebar (excluding hero)
    // Prioritize Cuisine and Destination if they exist and are not Hero
    const sidebarCandidates = articles.filter(a => a.id !== heroId);

    // Build sidebar list: [Cuisine, Destination, ...others]
    let sidebarList: Article[] = [];
    if (cuisineArticle && cuisineArticle.id !== heroId) sidebarList.push(cuisineArticle);
    if (destArticle && destArticle.id !== heroId) sidebarList.push(destArticle);

    // Fill remaining slots up to 3
    const remaining = sidebarCandidates.filter(a => !sidebarList.find(s => s.id === a.id));
    sidebarList = [...sidebarList, ...remaining].slice(0, 3);

    if (loading) return null; // Or skeleton
    if (articles.length === 0) return null;

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'Mới cập nhật';
        return new Date(dateString).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    return (
        <section className="py-24 bg-[#FAFAFA]">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <span className="text-[#00dba1] font-bold tracking-widest uppercase text-sm mb-3 block">Travel Blog</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Cẩm Nang <span className="text-[#00dba1]">Du Lịch</span></h2>
                        <p className="text-gray-500 text-lg">Khám phá những điểm đến tuyệt vời, mẹo du lịch hữu ích và ẩm thực đặc sắc qua lăng kính của VNG Tourist.</p>
                    </div>
                    <Link href="/guide" className="hidden md:flex items-center gap-2 bg-white px-6 py-3 rounded-full border border-gray-200 text-gray-700 font-bold hover:border-[#00dba1] hover:text-[#00dba1] transition-all shadow-sm hover:shadow-md">
                        Xem tất cả <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Hero Article (Left - Large) */}
                    {tipsArticle && (
                        <div className="lg:col-span-7 xl:col-span-8">
                            <Link href={`/guide/${tipsArticle.slug || tipsArticle.id}`} className="group block relative h-[500px] lg:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl">
                                <Image
                                    src={getImageUrl(tipsArticle.intro_image)}
                                    alt={tipsArticle.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                                <div className="absolute top-6 left-6">
                                    <span className="bg-[#00dba1] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                                        Tiêu điểm
                                    </span>
                                </div>

                                <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
                                    <div className="flex items-center gap-4 text-gray-300 text-sm mb-4 font-medium">
                                        <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full"><Calendar className="w-4 h-4" /> {formatDate(tipsArticle.created_at)}</span>
                                        <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full"><Clock className="w-4 h-4" /> 5 phút đọc</span>
                                    </div>
                                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight group-hover:text-[#00dba1] transition-colors line-clamp-2">
                                        {tipsArticle.title}
                                    </h3>
                                    <p className="text-gray-300 text-lg line-clamp-2 mb-6 max-w-2xl font-light">
                                        {tipsArticle.title} - Trải nghiệm hành trình đầy cảm hứng cùng VNG Tourist. Bấm để xem chi tiết bài viết.
                                    </p>
                                    <span className="inline-flex items-center gap-3 text-white font-bold group-hover:gap-4 transition-all border-b-2 border-[#00dba1] pb-1">
                                        Đọc bài viết <ArrowRight className="w-5 h-5 text-[#00dba1]" />
                                    </span>
                                </div>
                            </Link>
                        </div>
                    )}

                    {/* Sidebar List (Right) */}
                    <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
                        {sidebarList.map((article, index) => (
                            <Link key={article.id} href={`/guide/${article.slug || article.id}`} className="group flex gap-5 bg-white p-4 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 flex-1 items-center">
                                <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-xl overflow-hidden flex-shrink-0 shadow-inner">
                                    <Image
                                        src={getImageUrl(article.intro_image)}
                                        alt={article.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div className="flex flex-col flex-1 py-1 pr-2">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#00dba1] bg-[#00dba1]/10 px-2 py-0.5 rounded">
                                            {index === 0 ? 'Mới nhất' : 'Phổ biến'}
                                        </span>
                                        <span className="text-xs text-gray-400 font-medium flex items-center gap-1"><Calendar className="w-3 h-3" /> {formatDate(article.created_at)}</span>
                                    </div>
                                    <h4 className="font-bold text-gray-800 text-lg leading-snug mb-2 line-clamp-2 group-hover:text-[#00dba1] transition-colors">
                                        {article.title}
                                    </h4>
                                    <span className="text-xs font-semibold text-gray-400 group-hover:text-[#00dba1] flex items-center gap-1 mt-auto">
                                        Xem chi tiết <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </Link>
                        ))}

                        {/* View More Mobile Context */}
                        <Link href="/guide" className="lg:hidden w-full flex items-center justify-center gap-2 bg-white px-6 py-4 rounded-xl border border-gray-200 text-gray-700 font-bold hover:border-[#00dba1] hover:text-[#00dba1] transition-all shadow-sm">
                            Xem tất cả bài viết <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
