import {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { useAuth } from "./auth.context";
import { api } from "@/services/api";
import { ApiHospitalProcedure } from "@/entities/api/ApiHospitalProcedure";
import { Patient } from "@/entities/Patient";
import { LocationRecord } from "@/entities/LocationRecord";
import { mapApiHospitalProcedureToFrontendModel } from "@/mappers/HospitalProcedure.mapper";
import { Doctor } from "@/entities/Doctor";
import { useSocket } from "./socket.context";
import { Observation } from "@/entities/Observation";
import { Hospital } from "@/entities/Hospital";
import { HospitalProcedure } from "@/entities/HospitalProcedure";

type HospitalProcedureContextProps = {
  patient?: Patient;
  doctor?: Doctor;
  hospital?: Hospital;
  hospitalProcedure?: HospitalProcedure;
  locationRecords: LocationRecord[];
  observations: Observation[];
  fetchHospitalProcedureData: () => void;
};

const HospitalProcedureContext = createContext<HospitalProcedureContextProps>(
  {} as HospitalProcedureContextProps
);

export function HospitalProcedureProvider({ children }: PropsWithChildren) {
  const { userSession } = useAuth();
  const { socket } = useSocket();
  const [patient, setPatient] = useState<Patient>();
  const [doctor, setDoctor] = useState<Doctor>();
  const [hospital, setHospital] = useState<Hospital>();
  const [locationRecords, setLocationRecords] = useState<LocationRecord[]>([]);
  const [observations, setObservations] = useState<Observation[]>([]);
  const [hospitalProcedure, setHospitalProcedure] = useState<
    HospitalProcedure
  >();

  const fetchHospitalProcedureData = async () => {
    const { data: hospitalProcedure } = await api.get<ApiHospitalProcedure>(
      `/hospital-procedure/${userSession?.hospitalProcedureId}`
    );
    const { data: patient } = await api.get(
      `/patient/${hospitalProcedure.patientId}`
    );
    const { data: doctor } = await api.get(
      `/doctor/${hospitalProcedure.doctorId}`
    );
    const { data: hospital } = await api.get(
      `/hospital/${hospitalProcedure.hospitalId}`
    );

    const mappedHospitalProcedure = mapApiHospitalProcedureToFrontendModel(
      hospitalProcedure
    );

    setPatient(patient);
    setDoctor(doctor);
    setHospital(hospital);
    setHospitalProcedure(mappedHospitalProcedure);
    setLocationRecords(mappedHospitalProcedure.locationRecords);
    setObservations(mappedHospitalProcedure.observations);
  };

  useEffect(() => {
    if (!socket || !patient) return;

    const patientUpdateEvent = `patient_${patient.id}_update`;
    const procedureUpdateEvent = `hospitalProcedure_${hospitalProcedure?.id}_update`;

    const updateHandler = () => fetchHospitalProcedureData();

    socket.on(patientUpdateEvent, updateHandler);
    if (hospitalProcedure?.id) {
      socket.on(procedureUpdateEvent, updateHandler);
    }

    // Cleanup function to remove the listeners when they're no longer needed
    return () => {
      socket.off(patientUpdateEvent, updateHandler);
      if (hospitalProcedure?.id) {
        socket.off(procedureUpdateEvent, updateHandler);
      }
    };
  }, [socket, patient, hospitalProcedure?.id, fetchHospitalProcedureData]);

  useEffect(() => {
    if (userSession && !hospitalProcedure) {
      fetchHospitalProcedureData();
    }
  }, [userSession, hospitalProcedure]);

  return (
    <HospitalProcedureContext.Provider
      value={{
        patient,
        doctor,
        hospital,
        hospitalProcedure,
        locationRecords,
        observations,
        fetchHospitalProcedureData,
      }}
    >
      {children}
    </HospitalProcedureContext.Provider>
  );
}

export const useHospitalProcedure = () => useContext(HospitalProcedureContext);
