import { HistoryMapTabs } from "@/components/HistoryMapTabs";
import { ObservationForm } from "@/components/ObservationForm";
import { ObservationsSlider } from "@/components/ObservationsSlider";
import { PatientInfo } from "@/components/PatientInfo";
import { ApiHospitalProcedure } from "@/entities/ApiHospitalProcedure";
import { Patient } from "@/entities/Patient";
import { mapApiHospitalProcedureToFrontendModel } from "@/mappers/HospitalProcedure.mapper";
import { api } from "@/services/api";

export default async function PatientDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const { data: patient } = await api.get<Patient>(`/patient/${id}`);
  const { data: hospitalProcedures } = await api.get<ApiHospitalProcedure[]>(
    `/hospital-procedure?patientId=${id}`
  );
  const hospitalProcedure = hospitalProcedures.length
    ? mapApiHospitalProcedureToFrontendModel(hospitalProcedures[0])
    : null;

  return (
    <div className="p-3 w-full">
      <div className="grid grid-cols-2 gap-4 w-full ">
        <PatientInfo patient={patient} />
        <HistoryMapTabs hospitalProcedure={hospitalProcedure} />
      </div>
      <div className="bg-white p-4 rounded-lg mt-4">
        <h2 className="text-lg font-bold">Observations</h2>
        <div className="grid grid-cols-[350px,1fr]">
          <ObservationForm hospitalProcedure={hospitalProcedure} />
          <div className="w-full h-full max-w-[60vw] mx-auto ml-4">
            {hospitalProcedure && (
              <ObservationsSlider
                observations={hospitalProcedure.observations}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
