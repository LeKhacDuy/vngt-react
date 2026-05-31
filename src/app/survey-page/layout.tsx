import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Khảo Sát Trải Nghiệm — VNGROUP TOURIST',
  description: 'Chia sẻ cảm nhận của bạn về chuyến đi cùng VNGROUP TOURIST để chúng tôi phục vụ tốt hơn.',
  alternates: { canonical: '/survey-page' },
};

export default function SurveyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
