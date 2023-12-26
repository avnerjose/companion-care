"use client";
import axios from "axios";
import MaleDoctor from "@/assets/icons/doctor-M.png";
import FemaleDoctor from "@/assets/icons/doctor-F.png";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useUser } from "@/contexts/User.context";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function DoctorProfilePopover() {
  const { user } = useUser();
  const { toast } = useToast();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      toast({
        title: "Signing out",
      });
      await axios.post("/api/logout");

      router.replace("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="bg-secondary-700 p-1 rounded-md">
          <Image
            alt="doctor icon"
            className="w-8 h-8"
            src={user?.sex === "M" ? MaleDoctor : FemaleDoctor}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-bold leading-none text-lg">Doctor Profile</h4>

            <p className="text-sm">
              <span className="font-bold"> Name: </span> {user?.name}
            </p>
            <p className="text-sm">
              <span className="font-bold"> E-mail: </span> {user?.email}
            </p>
            <p className="text-sm">
              <span className="font-bold"> CRM: </span> {user?.crm}
            </p>
            <p className="text-sm">
              <span className="font-bold"> CPF: </span> {user?.cpf}
            </p>
            <p className="text-sm">
              <span className="font-bold"> Specialty: </span> {user?.specialty}
            </p>

            <Button
              className="flex items-center gap-2 w-full border-primary-500 text-primary-500"
              variant="outline"
              onClick={handleLogout}
            >
              Logout
              <LogOut className="stroke-primary-500" size={24} />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
