import { type HospitalProcedure } from "@/entities/HospitalProcedure";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HistoryTab } from "./HistoryTab";
import { MapTab } from "./MapTab";

interface HistoryMapTabsProps {
  hospitalProcedure: HospitalProcedure | null;
}

export function HistoryMapTabs({ hospitalProcedure }: HistoryMapTabsProps) {
  return (
    <div className="bg-white p-4 rounded-lg  self-start">
      <Tabs defaultValue="history">
        <TabsList>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="map">Map</TabsTrigger>
        </TabsList>
        <HistoryTab hospitalProcedure={hospitalProcedure} />
        <MapTab locationRecords={hospitalProcedure?.locationRecords ?? []} />
      </Tabs>
    </div>
  );
}
