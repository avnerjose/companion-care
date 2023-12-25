import { Observation } from "../Observation";

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
  type: string;
  status: string;
  startDate: string;
  doctorId: string;
  patientId: string;
  companionId: number;
  hospitalId: 1;
  observations: Observation[];
  locationRecords: ApiLocationRecord[];
};
