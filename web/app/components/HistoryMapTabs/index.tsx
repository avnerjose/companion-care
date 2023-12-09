import { type HospitalProcedure } from "../../entities/HospitalProcedure.ts";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs.tsx";
import { HistoryTab } from "./HistoryTab.tsx";
import { MapTab } from "./MapTab.tsx";

interface HistoryMapTabsProps {
  hospitalProcedure: HospitalProcedure | null;
}

export function HistoryMapTabs({ hospitalProcedure }: HistoryMapTabsProps) {
  return (
    <div className="bg-white p-4 rounded-lg  self-start">
      <Tabs defaultValue="history">
        <TabsList>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="map">Mapa</TabsTrigger>
        </TabsList>
        <HistoryTab hospitalProcedure={hospitalProcedure}/>
        <MapTab locationRecords={hospitalProcedure?.locationRecords ?? []}/>
      </Tabs>
    </div>
  );
}
