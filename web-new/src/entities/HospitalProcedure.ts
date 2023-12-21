import { type LocationRecord } from "./LocationRecord";
import { type Observation } from "./Observation";

export enum HospitalProcedureType {
  CONSULTATION = "consultation",
  EXAM = "exam",
  SURGERY = "surgery",
}

export type HospitalProcedure = {
  id: number;
  type: HospitalProcedureType;
  status: string;
  startDate: string;
  doctorCpf: string;
  patientCpf: string;
  companionId: number;
  hospitalId: number;
  locationRecords: LocationRecord[];
  observations: Observation[];
};
