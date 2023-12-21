import { fetchCurrentHospitalProcedure, fetchPatient } from "@/app/actions";
import { Header } from "@/components/Header";
import { HistoryMapTabs } from "@/components/HistoryMapTabs";
import { ObservationForm } from "@/components/ObservationForm";
import { ObservationsSlider } from "@/components/ObservationsSlider";
import { PatientInfo } from "@/components/PatientInfo";
import { UpdatePatientDetail } from "@/components/UpdatePatientDetail";

export default async function PatientDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const patient = await fetchPatient(id);
  const hospitalProcedure = await fetchCurrentHospitalProcedure(id);

  return (
    <>
      <Header patientId={id} hospitalProcedure={hospitalProcedure} />
      <div className="p-3 w-full">
        <UpdatePatientDetail
          patient={patient}
          hospitalProcedure={hospitalProcedure}
        />
        <div className="grid grid-cols-2 gap-4 w-full ">
          <PatientInfo patient={patient} />
          <HistoryMapTabs hospitalProcedure={hospitalProcedure} />
        </div>
        <div className="bg-white p-4 rounded-lg mt-4">
          <h2 className="text-lg font-bold">Observations</h2>
          <div className="grid grid-cols-[350px,1fr]">
            <ObservationForm hospitalProcedure={hospitalProcedure} />
            <div className="w-full h-full max-w-[60vw] mx-auto ml-4">
              <ObservationsSlider
                observations={hospitalProcedure?.observations || []}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
