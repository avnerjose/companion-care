import { PropsWithChildren } from "react";
import Image from "next/image";
import Logo from "@/assets/companion_care_logo.png";
import Illustration from "@/assets/hospital_people.png";
import Dots from "@/assets/dots.svg";
import CompanyIcon from "@/assets/icons/logo.svg";

export default function LoginLayout({ children }: PropsWithChildren) {
  return (
    <main className="grid bg-primary-500 h-screen w-screen grid-cols-[60%,1fr] max-md:grid-cols-[1fr,2fr] max-sm:flex max-sm:px-4 max-sm:pt-4 overflow-hidden">
      <div className="bg-gradient-to-r from-secondary-700 via-secondary-500 via-30% to-primary-500 flex relative h-full w-full items-end justify-center max-sm:hidden">
        <Image
          src={Illustration}
          className="w-[70%]"
          alt="Hospital illustration"
        />
      </div>
      <div className="bg-white rounded-tl-2xl max-sm:rounded-t-2xl overflow-y-auto overflow-x-hidden w-full p-5 ">
        <div className="flex flex-col mx-auto items-start justify-center gap-4 bg-white ">
          <div className="mb-5 flex items-center gap-2 mt-4">
            <Image
              src={CompanyIcon}
              className="h-10 w-10"
              alt="CompanionCare"
            />
            <Image
              src={Logo}
              alt="CompanionCare"
              className="w-64 max-sm:w-[80%]"
            />
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}
