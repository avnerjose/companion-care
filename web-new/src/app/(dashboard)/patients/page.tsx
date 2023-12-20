import { PatientLink } from "@/components/PatientLink";
import type { Patient } from "@/entities/Patient";
import { api } from "@/services/api";

export default async function PatientsListPage() {
  const { data: patients } = await api.get<Patient[]>("/patient");

  return (
    <div className="grid grid-cols-5 gap-2 p-2">
      {patients.map((patient) => (
        <PatientLink patient={patient} />
      ))}
    </div>
  );
}
