import { Suspense } from "react";
import type { Metadata } from "next";
import { SiteNav } from "@/components/nav/SiteNav";
import { SiteFooter } from "@/components/footer/SiteFooter";
import { ThankYouContact } from "@/components/thank-you/ThankYouContact";

export const metadata: Metadata = {
  title: "Thanks! We'll be in touch · AnytimeHire",
  description:
    "Your request was received. An AnytimeHire specialist will reach you within 2 business hours.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      <SiteNav />
      <main className="pt-28 pb-24">
        <div className="container-page">
          <Suspense fallback={null}>
            <ThankYouContact />
          </Suspense>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
