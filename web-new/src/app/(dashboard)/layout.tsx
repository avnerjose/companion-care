import { PropsWithChildren } from "react";
import Logo from "@/assets/icons/logo.svg";
import Image from "next/image";
import { User } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { LogoutButton } from "@/components/LogoutButton";
import { HospitalProcedureProvider } from "@/contexts/HospitalProcedure.context";
import { UserProvider } from "@/contexts/User.context";
import { SocketProvider } from "@/contexts/Socket.context";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <SocketProvider>
      <HospitalProcedureProvider>
        <UserProvider>
          <Header />
          <div className="bg-[#F5F7FB] min-h-screen flex">
            <aside className="fixed top-0 left-0 bottom-0 flex flex-col items-center justify-between z-10 py-6 px-2 bg-secondary-700 rounded-tr-lg shadow-default">
              <div>
                <Image
                  src={Logo}
                  alt=""
                  className="bg-background border border-background h-10 rounded-full w-full"
                />
              </div>
              <nav className="mt-4">
                <ol>
                  <li>
                    <Link
                      href="/patients"
                      className="flex items-center gap-2 px-4 py-2 text-lg text-white"
                    >
                      <User size={24} className="stroke-white" />
                    </Link>
                  </li>
                </ol>
              </nav>
              <div>
                <LogoutButton />
              </div>
            </aside>
            <main className="w-full ml-20 mt-20">{children}</main>
          </div>
        </UserProvider>
      </HospitalProcedureProvider>
    </SocketProvider>
  );
}
