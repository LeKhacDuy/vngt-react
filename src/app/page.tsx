import type { Metadata } from 'next';
import HeroSection from "@/components/home/HeroSection";
import HotToursOfDay from "@/components/home/HotToursOfDay";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedTours from "@/components/home/FeaturedTours";
import GroupTours from "@/components/home/GroupTours";
import TravelGuideSection from "@/components/home/TravelGuideSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import StatsSection from "@/components/home/StatsSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PromoPopup from "@/components/common/PromoPopup";

export const metadata: Metadata = {
  title: "Tour Du Lịch Uy Tín Giá Tốt — VNGroup Tourist",
  description:
    "VNGroup Tourist — Đặt tour trong nước và quốc tế uy tín tại TP.HCM. Tour Hàn Quốc, Nhật Bản, Thái Lan, Việt Nam với giá tốt nhất. Liên hệ ngay: 0931 867 376.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Tour Du Lịch Uy Tín Giá Tốt — VNGroup Tourist",
    description:
      "Đặt tour trong nước và quốc tế uy tín. Tour Hàn Quốc, Nhật Bản, Thái Lan với giá tốt nhất tại VNGroup Tourist.",
    url: '/',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
};



export default function Home() {
  return (
    <div className="pb-20">
      <PromoPopup />
      <HeroSection />
      {/* CategoryGrid: Default White - Đưa lên đầu để khơi gợi cảm hứng khám phá sớm */}
      <CategoryGrid />
      {/* HotToursOfDay: Tour hot trong ngày - Tạo tâm lý khẩn cấp */}
      <HotToursOfDay />
      {/* FeaturedTours: Gray 50 - Các tour nổi bật chính */}
      <FeaturedTours />
      {/* Memberships Section / WhyChooseUs: Đưa lên sớm để củng cố độ tin cậy của thương hiệu */}
      <WhyChooseUs />
      {/* StatsSection: Ocean Gradient - Đi liền sau phần Why Choose Us để bổ trợ số liệu thực tế */}
      <StatsSection />
      {/* GroupTours: Premium Dark - Tour đoàn phân khúc cao cấp */}
      <GroupTours />
      {/* TestimonialsSection: White - Phản hồi từ khách hàng thực tế */}
      <TestimonialsSection />
      {/* TravelGuideSection: Gray 50 - Cẩm nang chia sẻ kinh nghiệm du lịch */}
      <TravelGuideSection />
      
    </div>
  );
}
