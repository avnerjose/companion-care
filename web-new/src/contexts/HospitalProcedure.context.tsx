"use client";

import { ApiHospitalProcedure } from "@/entities/ApiHospitalProcedure";
import { HospitalProcedure } from "@/entities/HospitalProcedure";
import { Patient } from "@/entities/Patient";
import { mapApiHospitalProcedureToFrontendModel } from "@/mappers/HospitalProcedure.mapper";
import { api } from "@/services/api";
import { usePathname } from "next/navigation";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSocket } from "./Socket.context";

interface HospitalProcedureContextProps {
  hospitalProcedure: HospitalProcedure | null;
  patient: Patient | null;
  handleUpdateHospitalProcedureData: () => Promise<void>;
}

const HospitalProcedureContext = createContext<HospitalProcedureContextProps>(
  {} as HospitalProcedureContextProps
);

export function HospitalProcedureProvider({ children }: PropsWithChildren) {
  const [hospitalProcedure, setHospitalProcedure] =
    useState<HospitalProcedure | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const pathName = usePathname();
  const isPatientDetailPage = pathName.includes("/patients/");
  const { socket } = useSocket();

  const handleUpdateHospitalProcedureData = async () => {
    const id = pathName.split("/").pop();
    const { data: _patient } = await api.get<Patient>(`/patient/${id}`);
    const { data: _hospitalProcedures } = await api.get<ApiHospitalProcedure[]>(
      `/hospital-procedure?patientId=${id}`
    );
    const _hospitalProcedure = _hospitalProcedures.length
      ? mapApiHospitalProcedureToFrontendModel(_hospitalProcedures[0])
      : null;

    setHospitalProcedure(_hospitalProcedure);
    setPatient(_patient);
  };

  useEffect(() => {
    if (isPatientDetailPage) {
      handleUpdateHospitalProcedureData();
    }
  }, [pathName, isPatientDetailPage]);

  useEffect(() => {
    if (!socket) return;
    const updateHandler = () => handleUpdateHospitalProcedureData();

    if (!patient) return;

    if (!hospitalProcedure) return;

    socket.on(`patient_${patient?.cpf}_update`, () =>
      handleUpdateHospitalProcedureData()
    );
    socket.on(`hospitalProcedure_${hospitalProcedure?.id}_update`, () =>
      handleUpdateHospitalProcedureData()
    );

    return () => {
      socket.off(`patient_${patient?.cpf}_update`, updateHandler);
      if (hospitalProcedure?.id) {
        socket.off(
          `hospitalProcedure_${hospitalProcedure?.id}_update`,
          updateHandler
        );
      }
    };
  }, [socket, patient?.cpf, hospitalProcedure?.id]);

  return (
    <HospitalProcedureContext.Provider
      value={{ hospitalProcedure, patient, handleUpdateHospitalProcedureData }}
    >
      {children}
    </HospitalProcedureContext.Provider>
  );
}

export function useHospitalProcedure() {
  const context = useContext(HospitalProcedureContext);

  if (!context) {
    throw new Error(
      "useHospitalProcedure must be used within a HospitalProcedureProvider"
    );
  }

  return context;
}
