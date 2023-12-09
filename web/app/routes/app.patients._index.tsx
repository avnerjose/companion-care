import { Link, useLoaderData } from "@remix-run/react";
import { UserCircle } from "phosphor-react";
import { type Patient } from "~/entities/Patient";
import { api } from "../services/api";

export async function loader() {
  const { data } = await api.get<Patient[]>("/patient");

  return {
    patients: data,
  };
}

export default function PatientsList() {
  const { patients } = useLoaderData<typeof loader>();

  return (
    <div className="grid grid-cols-5 gap-2 p-2">
      {patients.map((patient) => (
        <Link
          to={`/app/patients/${patient.id}`}
          key={patient.cpf}
          className="flex flex-col bg-white rounded-md p-5 cursor-pointer"
        >
          <div className="flex items-center">
            <UserCircle size={64} className="text-primary-500" />
          </div>
          <h3 className="text-xl font-bold">{patient.name}</h3>
          <div className="flex flex-col w-full">
            <label htmlFor="" className="text-gray-700">
              Sexo
            </label>
            <span>{patient.sex}</span>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="" className="text-gray-700">
              Telefone
            </label>
            <span>{patient.phoneNumber}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
