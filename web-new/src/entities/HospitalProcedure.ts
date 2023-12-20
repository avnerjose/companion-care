import { type LocationRecord } from "./LocationRecord";
import { type Observation } from "./Observation";

export type HospitalProcedure = {
  id: number;
  type: string;
  status: string;
  startDate: string;
  doctorCpf: string;
  patientCpf: string;
  companionId: number;
  hospitalId: number;
  locationRecords: LocationRecord[];
  observations: Observation[];
};
