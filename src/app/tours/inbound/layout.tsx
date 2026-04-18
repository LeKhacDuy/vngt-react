import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tour Inbound Việt Nam — Đón Khách Quốc Tế',
  description:
    'Dịch vụ tour inbound Việt Nam chuyên nghiệp từ VNGroup Tourist. Thiết kế hành trình khám phá Việt Nam cho khách quốc tế: Hà Nội, Hội An, TP.HCM, Hạ Long và nhiều hơn.',
  alternates: { canonical: '/tours/inbound' },
  openGraph: {
    title: 'Tour Inbound Việt Nam | VNGroup Tourist',
    description: 'Tour Việt Nam cho khách quốc tế: Hà Nội, Hội An, Hạ Long, TP.HCM.',
    url: '/tours/inbound',
  },
};

export default function InboundLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
