import { HospitalProcedureType } from "./HospitalProcedure";
import type { Observation } from "./Observation";

type ApiLocationRecord = {
  id: number;
  timestamp: string;
  roomId: number;
  hospitalProcedureId: number;
  room: {
    id: number;
    name: string;
    sectorId: number;
    sector: {
      id: number;
      name: string;
      hospitalId: number;
    };
  };
};

export type ApiHospitalProcedure = {
  id: number;
  type: HospitalProcedureType;
  status: string;
  startDate: string;
  doctorCpf: string;
  patientCpf: string;
  companionId: number;
  hospitalId: 1;
  observations: Observation[];
  locationRecords: ApiLocationRecord[];
};
