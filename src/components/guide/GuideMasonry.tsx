'use client';

import { Article } from '@/data/articles';
import ArticleCard from './ArticleCard';

interface GuideMasonryProps {
    articles: Article[];
}

export default function GuideMasonry({ articles }: GuideMasonryProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
            ))}
        </div>
    );
}
