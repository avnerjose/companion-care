"use client";

import axios from "axios";
import { LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export function LogoutButton() {
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
    <button>
      <LogOut className="stroke-white" onClick={handleLogout} size={24} />
    </button>
  );
}
