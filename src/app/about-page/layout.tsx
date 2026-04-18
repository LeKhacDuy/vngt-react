import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Về Chúng Tôi — VNGroup Tourist',
  description:
    'Tìm hiểu về VNGroup Tourist — công ty du lịch uy tín thành lập năm 2023 tại TP.HCM. Đội ngũ tâm huyết, giá trị cốt lõi TRUST và cam kết mang đến hành trình đẳng cấp.',
  alternates: { canonical: '/about-page' },
  openGraph: {
    title: 'Về Chúng Tôi | VNGroup Tourist',
    description:
      'VNGroup Tourist — thành lập 2023, 3000+ khách hàng tin tưởng. Đội ngũ chuyên nghiệp, tận tâm.',
    url: '/about-page',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
