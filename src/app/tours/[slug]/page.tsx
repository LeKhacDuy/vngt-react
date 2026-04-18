import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { tourService } from '@/services/tour.service';
import TourDetailView from '@/components/tours/TourDetailView';
import JsonLd, { tourSchema } from '@/components/common/JsonLd';

// Correctly type the params as a Promise for Next.js 15
interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const { data: tour } = await tourService.getBySlug(slug);

    if (!tour) {
        return {
            title: 'Tour không tồn tại',
            robots: { index: false, follow: false },
        };
    }

    const description = tour.highlights
        ? tour.highlights.replace(/<[^>]+>/g, '').slice(0, 160)
        : `Khám phá ${tour.name} cùng VNGroup Tourist. Đặt tour ngay với giá tốt nhất!`;

    return {
        title: tour.name,
        description,
        alternates: {
            canonical: `/tours/${slug}`,
        },
        openGraph: {
            title: `${tour.name} | VNGroup Tourist`,
            description,
            url: `/tours/${slug}`,
            type: 'article',
            images: tour.thumbnail
                ? [{ url: tour.thumbnail, width: 1200, height: 630, alt: tour.name }]
                : [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
        },
        twitter: {
            card: 'summary_large_image',
            title: tour.name,
            description,
            images: [tour.thumbnail || '/images/og-default.jpg'],
        },
    };
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

    return (
        <>
            <JsonLd data={tourSchema({
                name: tour.name,
                description: tour.highlights?.replace(/<[^>]+>/g, '').slice(0, 300) || tour.name,
                image: tour.thumbnail || '/images/og-default.jpg',
                slug: tour.slug || slug,
                price: tour.price,
                duration: tour.duration,
                destination: tour.destination,
            })} />
            <TourDetailView tour={tour} articles={articles} />
        </>
    );
}

