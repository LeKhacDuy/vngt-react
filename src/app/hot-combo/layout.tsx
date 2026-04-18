import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Combo Du Lịch Hot — Ưu Đãi Đặc Biệt',
  description:
    'Săn ngay combo du lịch hot nhất từ VNGroup Tourist. Combo tour + khách sạn + vé máy bay với giá siêu ưu đãi. Đặt combo giá tốt, tiết kiệm đến 40%!',
  alternates: { canonical: '/hot-combo' },
  openGraph: {
    title: 'Combo Du Lịch Hot | VNGroup Tourist',
    description: 'Combo tour + khách sạn + vé máy bay giá siêu ưu đãi. Tiết kiệm đến 40%!',
    url: '/hot-combo',
  },
};

export default function HotComboLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
