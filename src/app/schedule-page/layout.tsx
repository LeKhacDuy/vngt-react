import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lịch Khởi Hành Tour — Xem Lịch Đặt Tour',
  description:
    'Lịch khởi hành tour du lịch từ VNGroup Tourist. Xem ngày xuất phát, còn chỗ và đặt tour nhanh chóng. Lịch cập nhật liên tục theo tuần và tháng.',
  alternates: { canonical: '/schedule-page' },
  openGraph: {
    title: 'Lịch Khởi Hành Tour | VNGroup Tourist',
    description: 'Xem lịch khởi hành tour đầy đủ và đặt ngay — cập nhật liên tục.',
    url: '/schedule-page',
  },
};

export default function ScheduleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
