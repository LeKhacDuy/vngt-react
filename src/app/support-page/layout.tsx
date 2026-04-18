import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hỗ Trợ Khách Hàng — VNGroup Tourist',
  description:
    'Trung tâm hỗ trợ khách hàng VNGroup Tourist. Giải đáp thắc mắc về tour, đặt chỗ, hủy tour, hoàn tiền và các vấn đề liên quan. Hỗ trợ 24/7.',
  alternates: { canonical: '/support-page' },
  openGraph: {
    title: 'Hỗ Trợ Khách Hàng | VNGroup Tourist',
    description: 'Hỗ trợ 24/7 — Giải đáp tour, đặt chỗ, hủy và hoàn tiền.',
    url: '/support-page',
  },
};

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
