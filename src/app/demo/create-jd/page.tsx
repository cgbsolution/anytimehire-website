import { DemoBanner } from "@/components/demo/DemoBanner";
import { CreateJDWizard } from "@/components/demo/CreateJDWizard";

export default function CreateJDDemo() {
  return (
    <>
      <DemoBanner stepLabel="Demo · Create a JD" />
      <main className="py-10 lg:py-16">
        <div className="container-page">
          <CreateJDWizard />
        </div>
      </main>
    </>
  );
}
