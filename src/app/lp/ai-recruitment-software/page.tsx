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
  title:
    "AI Recruitment Software & Hiring Platform | Automate Screening | AnytimeHire",
  description:
    "Top-rated AI hiring software trusted by enterprises worldwide. Automate candidate screening, run AI interviews simultaneously & shortlist top talent instantly. Start free.",
  keywords: [
    "AI recruitment software",
    "AI hiring platform",
    "automated candidate screening",
    "AI interview platform",
    "AI hiring software",
    "automated recruitment",
    "AnytimeHire",
  ],
  alternates: {
    canonical: "/lp/ai-recruitment-software",
  },
  openGraph: {
    title:
      "AI Recruitment Software & Hiring Platform | Automate Screening | AnytimeHire",
    description:
      "Top-rated AI hiring software trusted by enterprises worldwide. Automate candidate screening, run AI interviews simultaneously & shortlist top talent instantly. Start free.",
    type: "website",
    url: "/lp/ai-recruitment-software",
    siteName: "AnytimeHire",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Recruitment Software & Hiring Platform | AnytimeHire",
    description:
      "Top-rated AI hiring software trusted by enterprises worldwide. Automate candidate screening, run AI interviews simultaneously & shortlist top talent instantly.",
  },
  robots: { index: true, follow: true },
};

export default function AiRecruitmentSoftwareLanding() {
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
