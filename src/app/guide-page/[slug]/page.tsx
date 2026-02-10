'use client';

import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { articles } from '@/data/articles';
import { ArrowLeft, Clock, Calendar, User, Tag, Share2, Heart, ChevronRight } from 'lucide-react';

export default function ArticleDetailPage() {
    const params = useParams();
    const slug = params.slug as string;

    // Find article by id (since static data uses id, not slug)
    const article = articles.find(a => a.id === slug);

    if (!article) {
        notFound();
    }

    // Get related articles (same category, exclude current)
    const relatedArticles = articles
        .filter(a => a.category === article.category && a.id !== article.id)
        .slice(0, 3);

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative h-[50vh] lg:h-[60vh] bg-gray-900">
                <Image
                    src={article.image}
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
                            <Link href="/guide-page" className="hover:text-white transition-colors">Cẩm nang</Link>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-white truncate max-w-[200px]">{article.title}</span>
                        </nav>

                        {/* Category Badge */}
                        <span className="inline-block px-4 py-1.5 bg-[#00dba1] text-white text-sm font-bold rounded-full mb-4">
                            {article.categoryLabel}
                        </span>

                        {/* Title */}
                        <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6 max-w-4xl leading-tight">
                            {article.title}
                        </h1>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-6 text-gray-300">
                            <div className="flex items-center gap-3">
                                <Image
                                    src={article.author.avatar}
                                    alt={article.author.name}
                                    width={40}
                                    height={40}
                                    className="rounded-full ring-2 ring-white/30"
                                />
                                <span className="font-medium text-white">{article.author.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(article.publishedAt)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{article.readTime} đọc</span>
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
                                {/* Excerpt/Intro */}
                                <p className="text-xl text-gray-600 leading-relaxed mb-8 font-medium italic border-l-4 border-[#00dba1] pl-6">
                                    {article.excerpt}
                                </p>

                                {/* Article Content - Placeholder for now since static data doesn't have full content */}
                                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                                    <p>
                                        Đây là nội dung chi tiết của bài viết "{article.title}". Nội dung đang được cập nhật từ hệ thống quản lý nội dung.
                                    </p>

                                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Giới thiệu</h2>
                                    <p>
                                        {article.excerpt} Hãy cùng khám phá những điều thú vị nhất trong bài viết này.
                                    </p>

                                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Nội dung chính</h2>
                                    <p>
                                        Chúng tôi đang cập nhật nội dung chi tiết cho bài viết này. Vui lòng quay lại sau hoặc liên hệ với chúng tôi để được tư vấn thêm.
                                    </p>

                                    <div className="mt-8 p-6 bg-[#00dba1]/10 rounded-2xl border border-[#00dba1]/20">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">📞 Liên hệ tư vấn</h3>
                                        <p className="text-gray-600 mb-0">
                                            Hotline: <strong className="text-[#00dba1]">0931 867 376</strong><br />
                                            Email: <strong className="text-[#00dba1]">info@vngrouptourist.com</strong>
                                        </p>
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="mt-12 pt-8 border-t border-gray-100">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <Tag className="w-5 h-5 text-gray-400" />
                                        {article.tags.map((tag, idx) => (
                                            <Link
                                                key={idx}
                                                href={`/guide-page?tag=${encodeURIComponent(tag)}`}
                                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-[#00dba1] hover:text-white transition-colors"
                                            >
                                                #{tag}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Share & Like */}
                                <div className="mt-8 flex items-center justify-between">
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
                            {/* Author Card */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <h3 className="font-bold text-gray-900 mb-4">Tác giả</h3>
                                <div className="flex items-center gap-4">
                                    <Image
                                        src={article.author.avatar}
                                        alt={article.author.name}
                                        width={60}
                                        height={60}
                                        className="rounded-full"
                                    />
                                    <div>
                                        <p className="font-bold text-gray-900">{article.author.name}</p>
                                        <p className="text-sm text-gray-500">Travel Writer</p>
                                    </div>
                                </div>
                            </div>

                            {/* Related Articles */}
                            {relatedArticles.length > 0 && (
                                <div className="bg-white rounded-2xl p-6 shadow-sm">
                                    <h3 className="font-bold text-gray-900 mb-4">Bài viết liên quan</h3>
                                    <div className="space-y-4">
                                        {relatedArticles.map(related => (
                                            <Link
                                                key={related.id}
                                                href={`/guide-page/${related.id}`}
                                                className="flex gap-4 group"
                                            >
                                                <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                                                    <Image
                                                        src={related.image}
                                                        alt={related.title}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-medium text-gray-900 line-clamp-2 group-hover:text-[#00dba1] transition-colors text-sm">
                                                        {related.title}
                                                    </h4>
                                                    <p className="text-xs text-gray-500 mt-1">{related.readTime}</p>
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
