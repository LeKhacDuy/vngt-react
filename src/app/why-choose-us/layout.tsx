import JsonLd, { breadcrumbSchema } from '@/components/common/JsonLd';

// Layout nay chi de gan BreadcrumbList cho route. Metadata van nam
// trong page.tsx nhu cu.
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd data={breadcrumbSchema([
                { name: 'Trang chủ', url: '/' },
                { name: 'Vì sao chọn chúng tôi', url: '/why-choose-us' },
            ])} />
            {children}
        </>
    );
}
