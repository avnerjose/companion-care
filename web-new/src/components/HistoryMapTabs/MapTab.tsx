"use client";

import { useEffect, useState } from "react";
import { HospitalMap } from "@/components/HospitalMap";
import { type LocationRecord } from "@/entities/LocationRecord";
import { api } from "@/services/api";
import { type Room } from "@/entities/Room";
import { type Sector } from "@/entities/Sector";
import { TabsContent } from "@/components/ui/tabs";

interface MapTabProps {
  locationRecords: LocationRecord[];
}

type RoomWithSector = Room & { sector: Sector };

export function MapTab({ locationRecords }: MapTabProps) {
  const [rooms, setRooms] = useState<RoomWithSector[]>([]);

  const mostRecentLocationId = locationRecords?.sort(
    (a, b) => +new Date(b.timestamp) - +new Date(a.timestamp)
  )[0]?.roomId;

  const loadRooms = async () => {
    const { data } = await api.get<RoomWithSector[]>("/room");

    setRooms(data.sort((a, b) => +a.id - +b.id));
  };

  useEffect(() => {
    loadRooms();
  }, []);

  return (
    <TabsContent value="map">
      <h2 className="text-lg font-bold">Hospital map</h2>
      {(mostRecentLocationId || mostRecentLocationId === 0) && (
        <div className="flex">
          <div>
            <span className="text-sm text-gray-500">Setor:</span>
            <span className="text-sm text-secondary-500 font-bold ml-1">
              {rooms[mostRecentLocationId]?.sector.name}
            </span>
          </div>{" "}
          |{" "}
          <div>
            <span className="text-sm text-gray-500">Quarto:</span>
            <span className="text-sm text-secondary-500 font-bold ml-1">
              {rooms[mostRecentLocationId]?.name}
            </span>
          </div>
        </div>
      )}
      <div
        className={`flex items-center ${
          mostRecentLocationId || mostRecentLocationId === 0
            ? "justify-center"
            : "justify-start"
        } w-auto`}
      >
        {mostRecentLocationId || mostRecentLocationId === 0 ? (
          <HospitalMap
            activeCoordinate={mostRecentLocationId}
            height={250}
            width={390}
            className="mt-2"
          />
        ) : (
          <span className="text-gray-500">
            No active procedure for this patient
          </span>
        )}
      </div>
    </TabsContent>
  );
}
