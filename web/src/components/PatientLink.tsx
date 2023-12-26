"use client";

import { Patient } from "@/entities/Patient";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";
import { remoteApi } from "@/services/remote-api";
import { useToast } from "@/components/ui/use-toast";
import { revalidatePatientsList } from "@/app/actions";
import MalePatient from "@/assets/icons/patient-M.png";
import FemalePatient from "@/assets/icons/patient-F.png";
import Image from "next/image";

interface PatientLinkProps {
  patient: Patient;
}

export function PatientLink({ patient }: PatientLinkProps) {
  const { toast } = useToast();
  const handleDeletePatient = async () => {
    try {
      await remoteApi(`/patient/${String(patient.id)}`, {
        method: "DELETE",
        headers: {
          "access-control-allow-origin": "*",
        },
      });
      revalidatePatientsList();
      toast({
        title: "Patient deleted",
        description: "Your patient has been deleted successfully",
      });
    } catch (e) {
      toast({
        title: "Error deleting patient",
        description: "Make sure you entered the patient correctly",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-md p-5 cursor-pointer">
      <div className="flex items-start justify-between">
        <Image
          className="w-16 h-16"
          src={patient.sex === "M" ? MalePatient : FemalePatient}
          alt="Patient icon"
        />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={handleDeletePatient}
            >
              <Trash className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Link href={`/patients/${patient.id}`} key={patient.cpf}>
        <h3 className="text-xl font-bold text-gray-900">{patient.name}</h3>
        <div className="flex flex-col w-full">
          <label htmlFor="" className="text-gray-700">
            Gender
          </label>
          <span className="text-gray-900">{patient.sex}</span>
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="" className="text-gray-700">
            Phone Number
          </label>
          <span className="text-gray-900">{patient.phoneNumber}</span>
        </div>
      </Link>
    </div>
  );
}
