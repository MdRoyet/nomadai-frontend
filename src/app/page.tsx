import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import AIFeaturesSection from "@/components/home/AIFeaturesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <StatsSection />
      <CategoriesSection />
      <HowItWorksSection />
      <AIFeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
