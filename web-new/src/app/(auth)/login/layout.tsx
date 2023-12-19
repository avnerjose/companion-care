import { PropsWithChildren } from "react";
import Image from "next/image";
import Logo from "@/assets/companion_care_logo.png";
import CompanyIcon from "@/assets/icons/logo.svg";

export default function LoginLayout({ children }: PropsWithChildren) {
  return (
    <main className="grid h-screen w-screen grid-cols-[60%,1fr]">
      <div className="bg-secondary-700 flex h-full w-full items-end justify-center" />
      <div className="flex flex-col w-full items-start justify-center gap-4 px-20 bg-white">
        <div className="mb-5 flex items-center gap-2 max-w-[80%]">
          <Image src={CompanyIcon} className="w-10" alt="CompanionCare" />
          <Image src={Logo} alt="CompanionCare" className="w-full" />
        </div>
        {children}
      </div>
    </main>
  );
}
