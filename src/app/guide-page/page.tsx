'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { articleService, Article } from '@/services/article.service';
import { Search, ChevronRight, Hash, Calendar, Clock } from 'lucide-react';

// Helper to get article image URL
const getArticleImage = (img?: string) => {
    if (!img) return '/images/tour1.jpg';
    if (img.startsWith('http')) return img;
    const cleanPath = img.replace(/^\/?(upload\/article\/)?/, '');
    return `https://lekhacduy.io.vn/api/upload/article/${cleanPath}`;
};

export default function GuidePage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch articles from API
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await articleService.getArticles({ limit: 50 });
                if (response && response.success && response.articles) {
                    setArticles(response.articles);
                }
            } catch (error) {
                console.error("Failed to fetch articles:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, []);

    // Category mapping based on category_id from API
    const categoryLabels: Record<string, string> = {
        'All': 'Tất cả',
        '1': 'Kinh nghiệm',
        '2': 'Ẩm thực',
        '3': 'Điểm đến',
        '4': 'Văn hóa'
    };

    const categories = ['All', '1', '2', '3', '4'];

    // Get unique category IDs from articles
    const uniqueCategories = useMemo(() => {
        const cats = new Set(articles.map(a => String(a.category_id)));
        return ['All', ...Array.from(cats)];
    }, [articles]);

    // Featured article (first one or most recent)
    const featuredArticle = articles[0];
    const trendingArticles = articles.slice(1, 4);

    // Filter articles
    const filteredArticles = useMemo(() => {
        return articles.filter(article => {
            const matchCategory = activeCategory === 'All' || String(article.category_id) === activeCategory;
            const matchSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchCategory && matchSearch;
        });
    }, [articles, activeCategory, searchQuery]);

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00dba1] mx-auto"></div>
                    <p className="mt-4 text-gray-500">Đang tải bài viết...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans">

            {/* Header */}
            <section className="bg-white border-b border-gray-100">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div>
                            <nav className="text-sm text-gray-500 mb-2">
                                <Link href="/" className="hover:text-gray-900 transition-colors">Trang chủ</Link>
                                <span className="mx-2">/</span>
                                <span className="text-gray-900 font-semibold">Cẩm nang</span>
                            </nav>
                            <h1 className="text-3xl font-bold text-gray-900">Tạp chí Du lịch</h1>
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full md:w-96">
                            <input
                                type="text"
                                placeholder="Tìm kiếm bài viết..."
                                className="w-full pl-12 pr-4 py-3 bg-gray-100 border-none rounded-full focus:ring-2 focus:ring-[#00dba1] focus:bg-white transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Section */}
            {!searchQuery && activeCategory === 'All' && featuredArticle && (
                <section className="py-12 bg-gradient-to-b from-white to-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Main Featured */}
                            <Link href={`/guide/${featuredArticle.id}`} className="group block relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-xl">
                                <Image
                                    src={getArticleImage(featuredArticle.intro_image)}
                                    alt={featuredArticle.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <span className="inline-block px-4 py-1.5 bg-[#00dba1] text-white text-sm font-bold rounded-full mb-4">
                                        Nổi bật
                                    </span>
                                    <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-[#00dba1] transition-colors">
                                        {featuredArticle.title}
                                    </h2>
                                    <div className="flex items-center gap-4 text-gray-300 text-sm">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {formatDate(featuredArticle.created_at)}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            5 phút đọc
                                        </span>
                                    </div>
                                </div>
                            </Link>

                            {/* Trending List */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Đang thịnh hành</h3>
                                {trendingArticles.map((article) => (
                                    <Link
                                        key={article.id}
                                        href={`/guide/${article.id}`}
                                        className="group flex gap-4 bg-white p-4 rounded-2xl shadow-sm hover:shadow-lg transition-all"
                                    >
                                        <div className="relative w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden">
                                            <Image
                                                src={getArticleImage(article.intro_image)}
                                                alt={article.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                                            <h4 className="font-bold text-gray-900 line-clamp-2 group-hover:text-[#00dba1] transition-colors mb-2">
                                                {article.title}
                                            </h4>
                                            <span className="text-sm text-gray-500 flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {formatDate(article.created_at)}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Main Content */}
            <section className="py-12">
                <div className="container mx-auto px-4">

                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* Left Sidebar (Filters) */}
                        <div className="w-full lg:w-64 flex-shrink-0 space-y-8">
                            {/* Categories */}
                            <div>
                                <h3 className="font-bold text-gray-900 mb-4 text-lg">Chuyên mục</h3>
                                <div className="flex flex-col gap-2">
                                    {uniqueCategories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setActiveCategory(cat)}
                                            className={`text-left px-4 py-3 rounded-xl transition-all flex justify-between items-center group ${activeCategory === cat
                                                ? 'bg-[#00dba1] text-white shadow-lg shadow-[#00dba1]/30'
                                                : 'bg-white text-gray-600 hover:bg-gray-100'
                                                }`}
                                        >
                                            <span>{categoryLabels[cat] || `Chuyên mục ${cat}`}</span>
                                            {activeCategory === cat && <ChevronRight className="w-4 h-4" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Grid */}
                        <div className="flex-grow">
                            {searchQuery && (
                                <div className="mb-6 flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-gray-900">
                                        Kết quả cho: <span className="text-[#00dba1]">&quot;{searchQuery}&quot;</span>
                                    </h2>
                                    <button onClick={() => setSearchQuery('')} className="text-sm text-gray-500 hover:text-red-500 underline">
                                        Xóa tìm kiếm
                                    </button>
                                </div>
                            )}

                            {/* Articles Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredArticles.map(article => (
                                    <Link
                                        key={article.id}
                                        href={`/guide/${article.id}`}
                                        className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                                    >
                                        <div className="relative h-48 overflow-hidden">
                                            <Image
                                                src={getArticleImage(article.intro_image)}
                                                alt={article.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold rounded-full">
                                                    {categoryLabels[String(article.category_id)] || 'Cẩm nang'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-[#00dba1] transition-colors mb-3">
                                                {article.title}
                                            </h3>
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {formatDate(article.created_at)}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    5 phút
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {filteredArticles.length === 0 && (
                                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                                    <p className="text-gray-500 text-lg">Không tìm thấy bài viết nào phù hợp.</p>
                                    <button
                                        onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                                        className="mt-4 px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors"
                                    >
                                        Quay lại tất cả
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>

                </div>
            </section>

        </div>
    );
}
