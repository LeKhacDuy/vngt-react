'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { articleService, Article } from '@/services/article.service';
import { ArrowLeft, Clock, Calendar, Share2, Heart, ChevronRight } from 'lucide-react';

export default function ArticleDetailPage() {
    const params = useParams();
    const slug = params.slug as string;

    const [article, setArticle] = useState<Article | null>(null);
    const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const getArticleImage = (img?: string) => {
        if (!img) return '/images/tour1.jpg';
        if (img.startsWith('http')) return img;
        // Clean path and build full URL
        const cleanPath = img.replace(/^\/?(upload\/article\/)?/, '');
        return `https://lekhacduy.io.vn/api/upload/article/${cleanPath}`;
    };

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                // Fetch article detail directly by ID (matching legacy pattern)
                const response = await articleService.getArticleDetail(slug);

                if (response && response.success && response.article) {
                    setArticle(response.article);

                    // Also fetch related articles
                    try {
                        const listResponse = await articleService.getArticles({ limit: 10 });
                        if (listResponse && listResponse.success && listResponse.articles) {
                            const related = listResponse.articles
                                .filter(a => a.category_id === response.article.category_id && String(a.id) !== slug)
                                .slice(0, 3);
                            setRelatedArticles(related);
                        }
                    } catch (e) {
                        console.error("Failed to fetch related articles:", e);
                    }
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error("Failed to fetch article:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchArticle();
    }, [slug]);

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00dba1] mx-auto"></div>
                    <p className="mt-4 text-gray-500">Đang tải nội dung bài viết...</p>
                </div>
            </div>
        );
    }

    if (error || !article) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative h-[50vh] lg:h-[60vh] bg-gray-900">
                <Image
                    src={getArticleImage(article.intro_image)}
                    alt={article.title}
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end">
                    <div className="container mx-auto px-4 pb-12 lg:pb-16">
                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-sm text-gray-300 mb-6">
                            <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
                            <ChevronRight className="w-4 h-4" />
                            <Link href="/guide-page" className="hover:text-white transition-colors">Cẩm nang du lịch</Link>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-white truncate max-w-[200px]">{article.title}</span>
                        </nav>

                        {/* Category Badge */}
                        <span className="inline-block px-4 py-1.5 bg-[#00dba1] text-white text-sm font-bold rounded-full mb-4">
                            Cẩm nang du lịch
                        </span>

                        {/* Title */}
                        <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6 max-w-4xl leading-tight">
                            {article.title}
                        </h1>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-6 text-gray-300">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(article.created_at)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>5 phút đọc</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-12 lg:py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <article className="lg:col-span-2">
                            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm">
                                {/* Render sections from API (matching legacy tourRenderer pattern) */}
                                {article.sections && article.sections.length > 0 ? (
                                    <div className="space-y-12">
                                        {article.sections.map((section: any, idx: number) => (
                                            <div key={idx} className="article-section">
                                                {/* Section Title */}
                                                {section.title && (
                                                    <h2 className="text-2xl font-bold text-[#00dba1] mb-6 pb-3 border-b-2 border-[#00dba1]/20">
                                                        {section.title}
                                                    </h2>
                                                )}

                                                {/* Section Content (intro paragraph) */}
                                                {section.content && (
                                                    <div
                                                        className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-8"
                                                        dangerouslySetInnerHTML={{ __html: section.content }}
                                                    />
                                                )}

                                                {/* Section Image */}
                                                {section.image && section.image.trim() !== '' && (
                                                    <div className="relative h-64 lg:h-96 rounded-2xl overflow-hidden my-6">
                                                        <Image
                                                            src={getArticleImage(section.image)}
                                                            alt={section.title || 'Hình ảnh bài viết'}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                )}

                                                {/* Subsections - THIS IS WHERE THE DETAILED CONTENT IS */}
                                                {section.subsections && section.subsections.length > 0 && (
                                                    <div className="space-y-8 mt-6">
                                                        {section.subsections.map((sub: any, subIdx: number) => (
                                                            <div key={subIdx} className="subsection bg-gray-50 rounded-2xl p-6 lg:p-8">
                                                                {/* Subsection Title */}
                                                                {sub.title && (
                                                                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                                                                        {sub.title}
                                                                    </h3>
                                                                )}

                                                                {/* Subsection Image */}
                                                                {sub.image && (
                                                                    <div className="relative h-56 lg:h-72 rounded-xl overflow-hidden mb-4">
                                                                        <Image
                                                                            src={getArticleImage(sub.image)}
                                                                            alt={sub.title || 'Hình ảnh'}
                                                                            fill
                                                                            className="object-cover"
                                                                        />
                                                                    </div>
                                                                )}

                                                                {/* Subsection Content */}
                                                                {sub.content && (
                                                                    <div
                                                                        className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                                                                        dangerouslySetInnerHTML={{ __html: sub.content }}
                                                                    />
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : article.content ? (
                                    <div
                                        className="prose prose-lg max-w-none text-gray-700 leading-relaxed
                                            prose-headings:text-gray-900 prose-h2:text-2xl prose-h2:font-bold prose-h2:text-[#00dba1]
                                            prose-h3:text-xl prose-h3:font-semibold prose-p:mb-4 
                                            prose-img:rounded-2xl prose-img:my-6"
                                        dangerouslySetInnerHTML={{ __html: article.content }}
                                    />
                                ) : (
                                    <div className="text-center py-12">
                                        <p className="text-gray-500 mb-6">Nội dung bài viết đang được cập nhật.</p>
                                        <div className="p-6 bg-[#00dba1]/10 rounded-2xl border border-[#00dba1]/20 inline-block text-left">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">📞 Liên hệ tư vấn</h3>
                                            <p className="text-gray-600 mb-0">
                                                Hotline: <strong className="text-[#00dba1]">0931 867 376</strong><br />
                                                Email: <strong className="text-[#00dba1]">info@vngrouptourist.com</strong>
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Share & Like */}
                                <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
                                    <button className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-500 rounded-xl font-semibold hover:bg-red-100 transition-colors">
                                        <Heart className="w-5 h-5" />
                                        Yêu thích
                                    </button>
                                    <button className="flex items-center gap-2 px-6 py-3 bg-blue-50 text-blue-600 rounded-xl font-semibold hover:bg-blue-100 transition-colors">
                                        <Share2 className="w-5 h-5" />
                                        Chia sẻ
                                    </button>
                                </div>
                            </div>

                            {/* Back Link */}
                            <div className="mt-8">
                                <Link
                                    href="/guide-page"
                                    className="inline-flex items-center gap-2 text-[#00dba1] font-semibold hover:underline"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                    Quay lại danh sách bài viết
                                </Link>
                            </div>
                        </article>

                        {/* Sidebar */}
                        <aside className="space-y-8">
                            {/* Related Articles */}
                            {relatedArticles.length > 0 && (
                                <div className="bg-white rounded-2xl p-6 shadow-sm">
                                    <h3 className="font-bold text-gray-900 mb-4">Bài viết liên quan</h3>
                                    <div className="space-y-4">
                                        {relatedArticles.map(related => (
                                            <Link
                                                key={related.id}
                                                href={`/guide/${related.id}`}
                                                className="flex gap-4 group"
                                            >
                                                <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                                                    <Image
                                                        src={getArticleImage(related.intro_image)}
                                                        alt={related.title}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-medium text-gray-900 line-clamp-2 group-hover:text-[#00dba1] transition-colors text-sm">
                                                        {related.title}
                                                    </h4>
                                                    <p className="text-xs text-gray-500 mt-1">5 phút đọc</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* CTA */}
                            <div className="bg-gradient-to-br from-[#00dba1] to-[#00b894] rounded-2xl p-6 text-white">
                                <h3 className="font-bold text-xl mb-3">Đặt tour ngay!</h3>
                                <p className="text-white/80 text-sm mb-4">
                                    Liên hệ để được tư vấn và đặt tour với giá tốt nhất.
                                </p>
                                <Link
                                    href="/tours/international"
                                    className="block w-full py-3 bg-white text-[#00dba1] font-bold rounded-xl text-center hover:bg-gray-100 transition-colors"
                                >
                                    Xem các tour
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </div>
    );
}
