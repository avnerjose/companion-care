import { Patient } from "@/entities/Patient";
import { UserCircle } from "lucide-react";
import Link from "next/link";

interface PatientLinkProps {
  patient: Patient;
}

export function PatientLink({patient}:PatientLinkProps) {
  return (
    <Link
      href={`/app/patients/${patient.id}`}
      key={patient.cpf}
      className="flex flex-col bg-white rounded-md p-5 cursor-pointer"
    >
      <div className="flex items-center">
        <UserCircle size={64} className="text-primary-500" />
      </div>
      <h3 className="text-xl font-bold text-gray-900">{patient.name}</h3>
      <div className="flex flex-col w-full">
        <label htmlFor="" className="text-gray-700">
          Gender
        </label>
        <span className="text-gray-900">{patient.sex}</span>
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="" className="text-gray-700">
          Phone Number
        </label>
        <span className="text-gray-900">{patient.phoneNumber}</span>
      </div>
    </Link>
  );
}
