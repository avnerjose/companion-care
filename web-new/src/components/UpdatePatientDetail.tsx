"use client";

import { HospitalProcedure } from "@/entities/HospitalProcedure";
import { Patient } from "@/entities/Patient";
import { useHospitalProcedureSocket } from "@/hooks/useHospitalProcedureSocket";

interface UpdatePatientDetailProps {
  patient: Patient | null;
  hospitalProcedure: HospitalProcedure | null;
}
export function UpdatePatientDetail({
  hospitalProcedure,
  patient,
}: UpdatePatientDetailProps) {
  useHospitalProcedureSocket({
    hospitalProcedure,
    patient,
  });

  return null;
}
