import { useEffect } from 'react';
import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { useLoaderData, useRevalidator } from '@remix-run/react';
import { type ApiHospitalProcedure } from '../entities/api/ApiHospitalProcedure.ts';
import { type Patient } from '../entities/Patient.ts';
import { api } from '../services/api.ts';
import { mapApiHospitalProcedureToFrontendModel } from '../mappers/HospitalProcedure.mapper.ts';
import { useSocket } from '../contexts/socket.context.tsx';
import { PatientInfo } from '../components/PatientInfo.tsx';
import { ObservationForm } from '../components/ObservationForm.tsx';
import { HistoryMapTabs } from '../components/HistoryMapTabs/index.tsx';
import { ObservationsSlider } from '../components/ObservationsSlider.tsx';

export async function loader({ params }: LoaderArgs) {
  const { patientId } = params;
  const { data: patient } = await api.get<Patient>(`/patient/${patientId}`);
  const { data: hospitalProcedures } = await api.get<ApiHospitalProcedure[]>(
    `/hospital-procedure?patientId=${patientId}`,
  );

  return {
    patient,
    hospitalProcedure: hospitalProcedures.length
      ? mapApiHospitalProcedureToFrontendModel(hospitalProcedures[0])
      : null,
  };
}

export async function action({ request }: ActionArgs) {
  const body = await request.formData();

  const content = body.get('content') as string;
  const type = body.get('type') as string;
  const hospitalProcedureId = body.get('hospitalProcedureId') as string;

  if (!content.trim() || !type.trim() || !hospitalProcedureId.trim()) {
    return null;
  }

  try {
    await api.post('/observation', {
      content,
      type,
      hospitalProcedureId: Number(hospitalProcedureId),
    });
  } catch (e) {
    console.log(e);
  }

  return null;
}

export default function PatientDetail() {
  const { patient, hospitalProcedure } = useLoaderData<typeof loader>();
  const revalidator = useRevalidator();
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;
    const updateHandler = () => revalidator.revalidate();

    socket.on(`patient_${patient.cpf}_update`, () => revalidator.revalidate());
    socket.on(`hospitalProcedure_${hospitalProcedure?.id}_update`, () =>
      revalidator.revalidate(),
    );

    return () => {
      socket.off(`patient_${patient.cpf}_update`, updateHandler);
      if (hospitalProcedure?.id) {
        socket.off(
          `hospitalProcedure_${hospitalProcedure?.id}_update`,
          updateHandler,
        );
      }
    };
  }, [socket, patient.cpf, hospitalProcedure?.id, revalidator]);

  return (
    <div className="p-3 w-full">
      <div className="grid grid-cols-2 gap-4 w-full ">
        <PatientInfo patient={patient} />
        <HistoryMapTabs hospitalProcedure={hospitalProcedure} />
      </div>
      <div className="bg-white p-4 rounded-lg mt-4">
        <h2 className="text-lg font-bold">Observações</h2>
        <div className="grid grid-cols-[350px,1fr]">
          <ObservationForm hospitalProcedure={hospitalProcedure} />
          <div className="w-full h-full max-w-[60vw] mx-auto ml-4">
            {hospitalProcedure && (
              <ObservationsSlider
                observations={hospitalProcedure.observations}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
