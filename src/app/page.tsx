import HeroSection from "@/components/home/HeroSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedTours from "@/components/home/FeaturedTours";
import GroupTours from "@/components/home/GroupTours";
import TravelGuideSection from "@/components/home/TravelGuideSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import StatsSection from "@/components/home/StatsSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PromoPopup from "@/components/common/PromoPopup";

export default function Home() {
  return (
    <div className="pb-20">
      <PromoPopup />
      <HeroSection />
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
