import { notFound } from 'next/navigation';
import { tourService } from '@/services/tour.service';
import TourDetailView from '@/components/tours/TourDetailView';

// Correctly type the params as a Promise for Next.js 15
interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function TourDetailsPage({ params }: PageProps) {
    // Await the params object itself
    const { slug } = await params;

    // Parallel request to get tour detail and related articles
    const [tourRes, articlesRes] = await Promise.all([
        tourService.getBySlug(slug),
        tourService.getArticles({ limit: 6 })
    ]);

    const tour = tourRes.data;
    const articles = articlesRes.data?.data || articlesRes.data || []; // Handle potential API response structure variations

    if (!tour) {
        notFound();
    }

    return <TourDetailView tour={tour} articles={articles} />;
}
