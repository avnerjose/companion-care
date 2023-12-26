import { Header } from "@/components/Header";
import { UserCircle } from "lucide-react";
import Link from "next/link";

export default function DashboardHome() {
  return (
    <>
      <Header />
      <div className="grid grid-cols-4">
        <Link href="/patients" className="flex gap-2  items-center bg-white w-full p-4 rounded-md">
          <UserCircle className="stroke-primary-500 w-16 h-16"/>
          <div>
            <h2 className="font-bold ">Patients List</h2>
            <p>See full list of patients</p>
          </div>
        </Link>
      </div>
    </>
  );
}
