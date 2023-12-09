import { type Patient } from "../entities/Patient.ts";

interface PatientInfoProps {
  patient: Patient;
}

export function PatientInfo({ patient }: PatientInfoProps) {
  return (
    <div className="bg-white p-4 rounded-lg border-l-8 border-primary-500 self-start">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold">Dados pessoais</h2>
        <span className="border border-blue-200 rounded-md px-4 py-2">
          Status: {patient.status}
        </span>
      </div>
      <div className="flex flex-col gap-1 mt-2">
        <div className="flex justify-between w-full">
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="" className="text-gray-700">
              Nome
            </label>
            <span>{patient.name}</span>
          </div>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="" className="text-gray-700">
              CPF:
            </label>
            <span>{patient.cpf}</span>
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="" className="text-gray-700">
              Data de nascimento
            </label>
            <span>{new Intl.DateTimeFormat('pt-BR').format(new Date(patient.dateOfBirth))}</span>
          </div>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="" className="text-gray-700">
              Sexo:
            </label>
            <span>{patient.sex}</span>
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="" className="text-gray-700">
              Cidade
            </label>
            <span>{patient.city}</span>
          </div>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="" className="text-gray-700">
              Telefone
            </label>
            <span>{patient.phoneNumber}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
