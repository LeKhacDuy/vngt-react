'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import { Article } from '@/data/articles';

interface ArticleCardProps {
    article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
    return (
        <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full border border-gray-100">
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold rounded-lg text-gray-800">
                    {article.categoryLabel}
                </span>
            </div>

            {/* Body */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <Calendar className="w-3 h-3" />
                    <span>{article.publishedAt}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                </div>

                <h3 className="font-bold text-gray-900 text-lg mb-3 line-clamp-2 group-hover:text-[#00dba1] transition-colors leading-snug">
                    <Link href={`/guide/${article.id}`}>{article.title}</Link>
                </h3>

                <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-grow leading-relaxed">
                    {article.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                    <div className="flex items-center gap-2">
                        <Image src={article.author.avatar} width={20} height={20} alt={article.author.name} className="rounded-full" />
                        <span className="text-xs text-gray-500 font-medium">{article.author.name}</span>
                    </div>
                </div>
            </div>
        </article>
    );
}
