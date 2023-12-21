"use client";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { NewHospitalProcedureDialog } from "./NewHospitalProcedureDialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { revalidatePatientsList } from "@/app/actions";
import { HospitalProcedure } from "@/entities/HospitalProcedure";

interface HeaderActionProps {
  patientId?: string;
  hospitalProcedure: HospitalProcedure | null;
}

export function HeaderAction({
  patientId,
  hospitalProcedure,
}: HeaderActionProps) {
  const isInPatientDetailPage = patientId !== undefined;

  return (
    <div>
      {isInPatientDetailPage && !hospitalProcedure && (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              New Procedure <Plus size={24} className="stroke-white" />
            </Button>
          </DialogTrigger>
          <NewHospitalProcedureDialog />
        </Dialog>
      )}

      {!isInPatientDetailPage && (
        <Button onClick={() => revalidatePatientsList()}>Test</Button>
      )}
    </div>
  );
}
