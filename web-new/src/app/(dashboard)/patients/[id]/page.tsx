import { HistoryMapTabs } from "@/components/HistoryMapTabs";
import { ObservationForm } from "@/components/ObservationForm";
import { ObservationsSlider } from "@/components/ObservationsSlider";
import { PatientInfo } from "@/components/PatientInfo";

export default async function PatientDetailPage() {
  return (
    <div className="p-3 w-full">
      <div className="grid grid-cols-2 gap-4 w-full ">
        <PatientInfo />
        <HistoryMapTabs />
      </div>
      <div className="bg-white p-4 rounded-lg mt-4">
        <h2 className="text-lg font-bold">Observations</h2>
        <div className="grid grid-cols-[350px,1fr]">
          <ObservationForm />
          <div className="w-full h-full max-w-[60vw] mx-auto ml-4">
            <ObservationsSlider />
          </div>
        </div>
      </div>
    </div>
  );
}
