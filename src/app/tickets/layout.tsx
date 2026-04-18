import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vé Tham Quan — Đặt Vé Điểm Du Lịch Nổi Tiếng',
  description:
    'Đặt vé tham quan các điểm du lịch nổi tiếng Việt Nam và quốc tế qua VNGroup Tourist. Vé Vinpearl, Bà Nà Hills, vui chơi giải trí và nhiều địa điểm hấp dẫn.',
  alternates: { canonical: '/tickets' },
  openGraph: {
    title: 'Vé Tham Quan | VNGroup Tourist',
    description: 'Đặt vé tham quan Vinpearl, Bà Nà Hills và nhiều điểm du lịch nổi tiếng.',
    url: '/tickets',
  },
};

export default function TicketsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
