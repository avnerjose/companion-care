"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HistoryTab } from "./HistoryTab";
import { MapTab } from "./MapTab";
import { useHospitalProcedure } from "@/contexts/HospitalProcedure.context";

export function HistoryMapTabs() {
  const { hospitalProcedure } = useHospitalProcedure();

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
