import { TabsContent } from "@/components/ui/tabs";
import { type HospitalProcedure } from "@/entities/HospitalProcedure";
import { LocationRecordsTable } from "@/components/LocationRecordsTable";

interface HistoryTabProps {
  hospitalProcedure: HospitalProcedure | null;
}

export function HistoryTab({ hospitalProcedure }: HistoryTabProps) {
  const { locationRecords } = hospitalProcedure || { locationRecords: [] };

  return (
    <TabsContent value="history">
      <h2 className="text-lg font-bold">Location history</h2>
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
                No location history for this procedure
              </span>
            )}
          </>
        ) : (
          <span className="text-gray-500">
            No active procedure for this patient
          </span>
        )}
      </div>
    </TabsContent>
  );
}
