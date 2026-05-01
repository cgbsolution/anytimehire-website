import { SiteNav } from "@/components/nav/SiteNav";
import { SiteFooter } from "@/components/footer/SiteFooter";
import { Hero } from "@/components/landing/Hero";
import { LogoStrip } from "@/components/landing/LogoStrip";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { JDSection } from "@/components/landing/JDSection";
import { ScoringSection } from "@/components/landing/ScoringSection";
import { Comparison } from "@/components/landing/Comparison";
import { Testimonial } from "@/components/landing/Testimonial";
import { FAQ } from "@/components/landing/FAQ";
import { ContactSection } from "@/components/landing/ContactSection";
import { FinalCTA } from "@/components/landing/FinalCTA";

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <LogoStrip />
        <HowItWorks />
        <FeatureGrid />
        <JDSection />
        <ScoringSection />
        <Comparison />
        <Testimonial />
        <FAQ />
        <ContactSection />
        <FinalCTA />
      </main>
      <SiteFooter />
    </>
  );
}
