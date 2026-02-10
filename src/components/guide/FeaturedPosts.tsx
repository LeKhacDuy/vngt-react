'use client';

import Image from 'next/image';
import { Calendar, TrendingUp } from 'lucide-react';
import { Article } from '@/data/articles';

interface FeaturedPostsProps {
    featuredArticle: Article | undefined;
    trendingArticles: Article[];
}

export default function FeaturedPosts({ featuredArticle, trendingArticles }: FeaturedPostsProps) {
    if (!featuredArticle) return null;

    return (
        <section className="py-12 bg-white border-b border-gray-100">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                    {/* Main Featured */}
                    <div className="lg:col-span-8 group cursor-pointer relative rounded-3xl overflow-hidden h-[500px]">
                        <Image
                            src={featuredArticle.image}
                            alt={featuredArticle.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                            <span className="inline-block px-3 py-1 bg-[#00dba1] text-white text-xs font-bold uppercase tracking-wider mb-4 rounded-full">
                                {featuredArticle.categoryLabel}
                            </span>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight group-hover:text-[#00dba1] transition-colors">
                                {featuredArticle.title}
                            </h2>
                            <p className="text-gray-300 text-lg line-clamp-2 max-w-2xl mb-6">
                                {featuredArticle.excerpt}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-300">
                                <div className="flex items-center gap-2">
                                    <Image src={featuredArticle.author.avatar} width={24} height={24} alt={featuredArticle.author.name} className="rounded-full" />
                                    <span>{featuredArticle.author.name}</span>
                                </div>
                                <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{featuredArticle.publishedAt}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Side Trending */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-5 h-5 text-red-500" />
                            <h3 className="font-bold text-gray-900 uppercase tracking-widest text-sm">Xu hướng</h3>
                        </div>

                        {trendingArticles.map((article, index) => (
                            <div key={article.id} className="flex gap-4 group cursor-pointer">
                                <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                                    <span className="absolute top-0 left-0 bg-black/50 text-white w-6 h-6 flex items-center justify-center text-xs font-bold z-10 rounded-br-lg backdrop-blur-sm">
                                        {index + 1}
                                    </span>
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="text-xs font-bold text-[#00dba1] uppercase mb-1">{article.categoryLabel}</span>
                                    <h4 className="font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#00dba1] transition-colors mb-2">
                                        {article.title}
                                    </h4>
                                    <span className="text-xs text-gray-400">{article.readTime} đọc</span>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
