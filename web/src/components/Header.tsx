import Image from "next/image";
import Logo from "@/assets/companion_care_logo.png";
import { HeaderAction } from "@/components/HeaderAction";
import { HospitalProcedure } from "@/entities/HospitalProcedure";
import { DoctorProfilePopover } from "@/components/DoctorProfilePopover";

interface HeaderProps {
  patientId?: string;
  hospitalProcedure?: HospitalProcedure | null;
}

export async function Header({
  hospitalProcedure = null,
  patientId,
}: HeaderProps) {
  return (
    <header className="flex justify-between items-center absolute top-0 left-0 right-0 py-4 px-4 pl-24  gap-4">
      <Image src={Logo} alt="CompanionCare" className="w-56" />
      <div className="flex gap-2">
        <HeaderAction
          hospitalProcedure={hospitalProcedure}
          patientId={patientId}
        />

        <DoctorProfilePopover />
      </div>
    </header>
  );
}
