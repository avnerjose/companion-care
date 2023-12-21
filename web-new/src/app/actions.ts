"use server";

import { ApiHospitalProcedure } from "@/entities/ApiHospitalProcedure";
import { Patient } from "@/entities/Patient";
import { mapApiHospitalProcedureToFrontendModel } from "@/mappers/HospitalProcedure.mapper";
import { remoteApi } from "@/services/remote-api";
import { revalidateTag } from "next/cache";

export const fetchPatient = async (id: string) => {
  return await remoteApi<Patient>(`/patient/${id}`, {
    next: {
      tags: [`patient-${id}`],
    },
  });
};

export const revalidatePatient = (id: string) => revalidateTag(`patient-${id}`);

export const fetchCurrentHospitalProcedure = async (patientId: string) => {
  const hospitalProcedures = await remoteApi<ApiHospitalProcedure[]>(
    `/hospital-procedure?patientId=${patientId}`,
    {
      next: {
        tags: ["hospital-procedures"],
      },
    }
  );

  const hospitalProcedure = hospitalProcedures.length
    ? mapApiHospitalProcedureToFrontendModel(hospitalProcedures[0])
    : null;

  return hospitalProcedure;
};

export const revalidateCurrentHospitalProcedure = () =>
  revalidateTag("hospital-procedures");

export const fetchPatientsList = async () =>
  await remoteApi<Patient[]>("/patient", {
    next: {
      tags: ["patients-list"],
    },
  });

export const revalidatePatientsList = () => revalidateTag("patients-list");
