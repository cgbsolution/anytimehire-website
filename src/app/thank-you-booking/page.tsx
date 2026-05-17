import { Suspense } from "react";
import type { Metadata } from "next";
import { SiteNav } from "@/components/nav/SiteNav";
import { SiteFooter } from "@/components/footer/SiteFooter";
import { ThankYouBooking } from "@/components/thank-you/ThankYouBooking";

export const metadata: Metadata = {
  title: "Demo confirmed · AnytimeHire",
  description:
    "Your 30-min AnytimeHire demo is booked. The Google Meet invite is on its way.",
  robots: { index: false, follow: false },
};

export default function ThankYouBookingPage() {
  return (
    <>
      <SiteNav />
      <main className="pt-28 pb-24">
        <div className="container-page">
          <Suspense fallback={null}>
            <ThankYouBooking />
          </Suspense>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
