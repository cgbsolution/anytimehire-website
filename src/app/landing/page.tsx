import type { Metadata } from "next";
import { SiteNav } from "@/components/nav/SiteNav";
import { SiteFooter } from "@/components/footer/SiteFooter";
import { Hero } from "@/components/lp/Hero";
import { BadHireStats } from "@/components/lp/BadHireStats";
import { Process } from "@/components/lp/Process";
import { DashboardSection } from "@/components/lp/DashboardSection";
import { Features } from "@/components/lp/Features";
import { Switch } from "@/components/lp/Switch";
import { StatsAndROI } from "@/components/lp/StatsAndROI";
import { Testimonials } from "@/components/lp/Testimonials";
import { Pricing } from "@/components/lp/Pricing";
import { FinalCTA } from "@/components/lp/FinalCTA";

export const metadata: Metadata = {
  title: "AnytimeHire — Screen 500 candidates while your team sleeps tonight",
  description:
    "AI-led structured interviews for hundreds of candidates simultaneously — scored on Trust, Integrity, and Communication. Get a ranked shortlist before your team opens Slack.",
  keywords: [
    "AI hiring",
    "AI interviews",
    "candidate screening",
    "ATS",
    "recruitment automation",
    "AnytimeHire",
  ],
  openGraph: {
    title: "AnytimeHire — Screen 500 candidates while your team sleeps tonight",
    description:
      "AI interviews every applicant, scores them on a fair rubric, and hands you a ranked shortlist with evidence — before your recruiter pours a second coffee.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function LandingPage() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <BadHireStats />
        <Process />
        <DashboardSection />
        <Features />
        <Switch />
        <StatsAndROI />
        <Testimonials />
        <Pricing />
        <FinalCTA />
      </main>
      <SiteFooter />
    </>
  );
}
