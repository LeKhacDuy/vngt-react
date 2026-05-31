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
      
      {/* SEO Content Section */}
      <section className="py-12 bg-white border-t border-gray-50">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">VNGroup Tourist — Công ty du lịch uy tín tại TP.HCM</h2>
          <div className="text-gray-600 leading-relaxed space-y-4 text-sm md:text-base">
            <p>
              Chào mừng bạn đến với <strong>VNGroup Tourist</strong>, người đồng hành tin cậy trên mọi hành trình khám phá. 
              Chúng tôi tự hào là đơn vị chuyên nghiệp trong việc cung cấp các <strong>tour du lịch trong nước</strong> và 
              <strong> tour du lịch quốc tế</strong> với chất lượng dịch vụ đẳng cấp 4-5 sao.
            </p>
            <p>
              Với đội ngũ nhân sự tận tâm và am hiểu sâu sắc về điểm đến, VNGroup Tourist mang đến cho khách hàng những trải nghiệm khác biệt tại 
              <strong> Hàn Quốc</strong>, <strong>Nhật Bản</strong>, <strong>Thái Lan</strong>, <strong>Trung Quốc</strong>, và khắp các vùng miền Việt Nam. 
              Bên cạnh các tour trọn gói, chúng tôi còn cung cấp dịch vụ <strong>visa du lịch</strong>, vé máy bay và tổ chức 
              <strong> tour MICE</strong> (hội thảo, teambuilding) chuyên nghiệp cho doanh nghiệp.
            </p>
            <p>
              Hãy để VNGroup Tourist biến mỗi chuyến đi của bạn thành một kỷ niệm đáng nhớ. Liên hệ ngay Hotline <strong>0931 867 376</strong> để được tư vấn miễn phí!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
