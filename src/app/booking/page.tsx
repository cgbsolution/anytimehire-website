import type { Metadata } from "next";
import { SiteNav } from "@/components/nav/SiteNav";
import { SiteFooter } from "@/components/footer/SiteFooter";
import { BookingFlow } from "@/components/booking/BookingFlow";

export const metadata: Metadata = {
  title: "Book a Demo · AnytimeHire",
  description:
    "Pick a 30-minute slot with our hiring specialist and see AnytimeHire interview your real candidates, live.",
};

export default function BookingPage() {
  return (
    <>
      <SiteNav />
      <main className="pt-28 pb-24">
        <div className="container-page">
          <BookingFlow />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
