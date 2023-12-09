import { TabsContent } from '../ui/tabs.tsx';
import { type HospitalProcedure } from '../../entities/HospitalProcedure.ts';
import { LocationRecordsTable } from '../LocationRecordsTable.tsx';

interface HistoryTabProps {
  hospitalProcedure: HospitalProcedure | null;
}

export function HistoryTab({ hospitalProcedure }: HistoryTabProps) {
  const { locationRecords } = hospitalProcedure || { locationRecords: [] };

  return (
    <TabsContent value="history">
      <h2 className="text-lg font-bold">Histórico de localização</h2>
      <div
        data-active={locationRecords?.length > 0}
        className="max-h-[138px] data-[active=true]:overflow-y-scroll"
      >
        {hospitalProcedure ? (
          <>
            {hospitalProcedure.locationRecords.length ? (
              <LocationRecordsTable
                locationRecords={hospitalProcedure.locationRecords}
              />
            ) : (
              <span className="text-gray-500">
                Nenhum registro de localização para essa consulta
              </span>
            )}
          </>
        ) : (
          <span className="text-gray-500">
            Nenhuma consulta ativa para esse paciente
          </span>
        )}
      </div>
    </TabsContent>
  );
}
