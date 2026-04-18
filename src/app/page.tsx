import type { Metadata } from 'next';
import HeroSection from "@/components/home/HeroSection";
import PromoBannerSlider from "@/components/home/PromoBannerSlider";
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
      {/* PromoBannerSlider: Ưu đãi nổi bật */}
      <PromoBannerSlider />
      {/* CategoryGrid: Default White */}
      <CategoryGrid />
      {/* FeaturedTours: Gray 50 */}
      <FeaturedTours />
      {/* GroupTours: Premium Dark */}
      <GroupTours />
      {/* TravelGuideSection: Gray 50 */}
      <TravelGuideSection />
      {/* TestimonialsSection: White */}
      <TestimonialsSection />
      {/* StatsSection: Ocean Gradient */}
      <StatsSection />
      {/* WhyChooseUs: Gray 50 */}
      <div className="bg-gray-50">
        <WhyChooseUs />
      </div>
    </div>
  );
}
