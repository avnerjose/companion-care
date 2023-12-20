import { type Observation } from "@/entities/Observation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash } from "lucide-react";
import { api } from "@/services/api";
import {
  OBSERVATION_TYPE_TO_ICON,
  OBSERVATION_TYPE_TO_TEXT,
} from "@/constants";

interface ObservationItemProps {
  observation: Observation;
}

export function ObservationItem({
  observation: { type, content, id },
}: ObservationItemProps) {
  const handleDeleteObservation = async () => {
    try {
      await api.delete(`/observation/${id}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="overflow-hidden self-start px-1 pb-1">
      <div className="border-2 border-primary-500 rounded-lg">
        <header className="bg-primary-500 p-2 px-4 text-white font-bold flex items-center justify-between gap-2">
          <div className="flex gap-2">
            <img
              className="w-5"
              src={OBSERVATION_TYPE_TO_ICON[type]}
              alt={OBSERVATION_TYPE_TO_TEXT[type] + " icon"}
            />
            <h3>{OBSERVATION_TYPE_TO_TEXT[type]}</h3>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleDeleteObservation}>
                <Trash className="mr-2 h-4 w-4" />
                <span>Deletar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <div className="p-4">
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
}
