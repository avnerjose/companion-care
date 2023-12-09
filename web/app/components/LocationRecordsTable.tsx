import { type LocationRecord } from "../entities/LocationRecord.ts";

interface LocationRecordsTableProps {
  locationRecords: LocationRecord[];
}

export function LocationRecordsTable({
  locationRecords,
}: LocationRecordsTableProps) {

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="text-start text-gray-700 font-normal">Data/Hora</th>
          <th className="text-start text-gray-700 font-normal">Setor</th>
          <th className="text-start text-gray-700 font-normal">Sala</th>
        </tr>
      </thead>
      <tbody>
        {locationRecords
          .sort((a, b) => +new Date(b.timestamp) - +new Date(a.timestamp))
          .map(({ timestamp, roomName, sectorName }) => (
            <tr key={timestamp} className="border-t border-b">
              <td>
                {new Intl.DateTimeFormat('pt-BR').format(new Date(timestamp))} -{" "}
                {new Intl.DateTimeFormat('pt-BR',{
                    hour: 'numeric',
                    minute: 'numeric',
                
                }).format(new Date(timestamp))}h
              </td>
              <td>{sectorName}</td>
              <td>{roomName}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
