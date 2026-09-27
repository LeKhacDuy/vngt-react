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

      {/* Thứ tự đặt theo việc khách vào trang để làm gì: xem tour trước,
          rồi mới tới phần chứng minh công ty đáng tin.
          Trước đây hiệp hội và bài giới thiệu nằm ngay sau khối tour đầu
          tiên, chiếm 42% chiều dài trang trong khi tour chỉ được 17% —
          khách phải cuộn qua 7 logo hiệp hội mới thấy tour tiếp theo. */}

      {/* Danh mục theo mùa và chủ đề: điều hướng nhanh */}
      <CategoryGrid />

      {/* Tour trong ngày, tạo cảm giác cần quyết nhanh */}
      <HotToursOfDay />

      {/* Các khối tour chính */}
      <FeaturedTours />
      <GroupTours />

      {/* Số liệu và giới thiệu công ty */}
      <StatsSection />

      {/* Chứng nhận hội viên các hiệp hội */}
      <WhyChooseUs />

      {/* Khách hàng nói gì */}
      <TestimonialsSection />

      {/* Cẩm nang du lịch */}
      <TravelGuideSection />

    </div>
  );
}
