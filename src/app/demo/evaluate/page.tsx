import { DemoBanner } from "@/components/demo/DemoBanner";
import { EvaluationDashboard } from "@/components/demo/EvaluationDashboard";

export default function EvaluateDemo() {
  return (
    <>
      <DemoBanner stepLabel="Demo · Candidate scoring" />
      <main className="py-8 lg:py-10">
        <div className="container-page">
          <EvaluationDashboard />
        </div>
      </main>
    </>
  );
}
