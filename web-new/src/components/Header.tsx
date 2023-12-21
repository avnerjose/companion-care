import DoctorIcon from "@/assets/icons/doctor-icon.png";
import Image from "next/image";
import Logo from "@/assets/companion_care_logo.png";
import { HeaderAction } from "./HeaderAction";

export function Header() {
  return (
    <header className="flex justify-between items-center absolute top-0 left-0 right-0 py-4 px-4 pl-24  gap-4">
      <Image src={Logo} alt="CompanionCare" className="w-56" />
      <div className="flex gap-2">
        <HeaderAction />
        <div className="bg-secondary-700 p-1 rounded-md">
          <Image alt="doctor icon" className="w-8 h-8" src={DoctorIcon} />
        </div>
      </div>
    </header>
  );
}
