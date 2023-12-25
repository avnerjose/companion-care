"use client";

import { useEffect } from "react";
import { useSocket } from "@/contexts/Socket.context";
import { Patient } from "@/entities/Patient";
import { HospitalProcedure } from "@/entities/HospitalProcedure";
import {
  revalidateCurrentHospitalProcedure,
  revalidatePatient,
} from "@/app/actions";

interface UseHospitalProcedureSocketProps {
  patient?: Patient | null;
  hospitalProcedure: HospitalProcedure | null;
}
export function useHospitalProcedureSocket({
  hospitalProcedure,
  patient,
}: UseHospitalProcedureSocketProps) {
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket || !patient || !hospitalProcedure) return;

    const updateHospitalProcedure = () => revalidateCurrentHospitalProcedure();
    const updatePatient = () => revalidatePatient(String(patient.id));

    socket.on(`patient_${patient?.cpf}_update`, () => updatePatient());
    socket.on(`hospitalProcedure_${hospitalProcedure?.id}_update`, () =>
      updateHospitalProcedure()
    );

    return () => {
      socket.off(`patient_${patient?.cpf}_update`, updatePatient);
      if (hospitalProcedure?.id) {
        socket.off(
          `hospitalProcedure_${hospitalProcedure?.id}_update`,
          updateHospitalProcedure
        );
      }
    };
  }, [socket, patient?.cpf, hospitalProcedure?.id]);
}
