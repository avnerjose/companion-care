import { fetchPatientsList } from "@/app/actions";
import { Header } from "@/components/Header";
import { PatientLink } from "@/components/PatientLink";

export default async function PatientsListPage() {
  const patients = await fetchPatientsList();

  return (
    <>
      <Header />
      <div className="grid grid-cols-5 gap-2 p-2">
        {patients.map((patient) => (
          <PatientLink patient={patient} key={patient.id} />
        ))}
      </div>
    </>
  );
}
