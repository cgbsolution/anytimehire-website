import { DemoBanner } from "@/components/demo/DemoBanner";
import { BookingFlow } from "@/components/booking/BookingFlow";

export default function DemoIndex() {
  return (
    <>
      <DemoBanner />
      <main className="py-20 lg:py-28">
        <div className="container-page">
          <BookingFlow />
        </div>
      </main>
    </>
  );
}
