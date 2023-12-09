import { type HospitalProcedure } from "../entities/HospitalProcedure.ts";
import { type ApiHospitalProcedure } from "../entities/api/ApiHospitalProcedure.ts";

export const mapApiHospitalProcedureToFrontendModel = (
  apiHospitalProcedure: ApiHospitalProcedure,
): HospitalProcedure => {
  const hospitalProcedure: HospitalProcedure = {
    ...apiHospitalProcedure,
    locationRecords: apiHospitalProcedure.locationRecords.map((lr) => ({
      id: lr.id,
      timestamp: lr.timestamp,
      roomId: lr.roomId,
      roomName: lr.room.name,
      hospitalProcedureId: lr.hospitalProcedureId,
      sectorId: lr.room.sectorId,
      sectorName: lr.room.sector.name,
    })),
    observations: apiHospitalProcedure.observations.sort(
      (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
    ),
  };

  return hospitalProcedure;
};
