import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import StoryParallax from "@/components/StoryParallax";
import Process from "@/components/Process";
import FeaturedProducts from "@/components/FeaturedProducts";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <StoryParallax />
      <FeaturedProducts />
      <Process />
      <Testimonials />
      <CTASection />
    </>
  );
}
