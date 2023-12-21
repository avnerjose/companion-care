"use client";
import { usePathname } from "next/navigation";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { NewHospitalProcedureDialog } from "./NewHospitalProcedureDialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHospitalProcedure } from "@/contexts/HospitalProcedure.context";

export function HeaderAction() {
  const pathName = usePathname();
  const isInPatientDetailPage = pathName.includes("/patients/");
  const { hospitalProcedure } = useHospitalProcedure();

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
    </div>
  );
}
