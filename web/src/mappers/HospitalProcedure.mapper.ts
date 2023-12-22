import { type HospitalProcedure } from "@/entities/HospitalProcedure";
import { type ApiHospitalProcedure } from "@/entities/ApiHospitalProcedure";

export const mapApiHospitalProcedureToFrontendModel = (
  apiHospitalProcedure: ApiHospitalProcedure
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
      (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
    ),
  };

  return hospitalProcedure;
};
