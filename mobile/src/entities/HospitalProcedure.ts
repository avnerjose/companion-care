import { type LocationRecord } from "./LocationRecord";
import { type Observation } from "./Observation";

export type HospitalProcedure = {
  id: number;
  type: string;
  status: string;
  startDate: string;
  locationRecords: LocationRecord[];
  observations: Observation[];
  patientId: number;
  doctorId: number;
};
