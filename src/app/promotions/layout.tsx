import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Khuyến Mãi Du Lịch — Ưu Đãi Mới Nhất',
  description:
    'Tổng hợp khuyến mãi du lịch mới nhất từ VNGroup Tourist. Tour trong nước và quốc tế giảm giá sốc, ưu đãi đặc biệt dịp lễ tết. Đặt ngay kẻo hết!',
  alternates: { canonical: '/promotions' },
  openGraph: {
    title: 'Khuyến Mãi Du Lịch | VNGroup Tourist',
    description: 'Ưu đãi du lịch mới nhất — Tour giảm giá sốc trong và ngoài nước.',
    url: '/promotions',
  },
};

export default function PromotionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
