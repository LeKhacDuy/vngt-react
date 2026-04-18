import type { Metadata } from 'next';
import VisaLandingPage from '@/components/visa/VisaLandingPage';

export const metadata: Metadata = {
  title: 'Dịch Vụ Visa — Hỗ Trợ Visa Du Lịch Công Tác',
  description:
    'VNGroup Tourist hỗ trợ xin visa du lịch, công tác, thăm thân tất cả các nước. Tỷ lệ đậu cao, quy trình nhanh chóng, chi phí hợp lý. Liên hệ ngay!',
  alternates: { canonical: '/visa-page' },
  openGraph: {
    title: 'Dịch Vụ Visa | VNGroup Tourist',
    description: 'Hỗ trợ visa du lịch, công tác, thăm thân. Tỷ lệ đậu cao, nhanh chóng.',
    url: '/visa-page',
  },
};

export default function VisaPage() {
  return <VisaLandingPage />;
}
