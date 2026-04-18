import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Liên Hệ — VNGroup Tourist',
  description:
    'Liên hệ VNGroup Tourist để được tư vấn tour du lịch miễn phí. Hotline: 0931.867.376 — 0938.322.487. Văn phòng: 93/8 Phạm Văn Hai, Quận Tân Bình, TP.HCM.',
  alternates: { canonical: '/contact-page' },
  openGraph: {
    title: 'Liên Hệ | VNGroup Tourist',
    description:
      'Liên hệ ngay: 0931.867.376. Tư vấn tour miễn phí 24/7. Văn phòng tại Quận Tân Bình, TP.HCM.',
    url: '/contact-page',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
