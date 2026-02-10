import api from './api';

export interface Article {
    id: number;
    title: string;
    slug: string;
    intro_image: string;
    content: string;
    category_id: number;
    created_at: string;
    sections?: any[];
}

export const articleService = {
    getArticles: async (params?: any) => {
        return api.get<any, { articles: Article[], success: boolean }>('/content/articles', { params });
    },

    getArticleDetail: async (id: number | string) => {
        return api.get<any, { article: Article, success: boolean }>(`/content/articles/${id}?include_sections=true`);
    }
};
