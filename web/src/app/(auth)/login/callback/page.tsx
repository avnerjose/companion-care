"use client";

import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    const handleLogin = async () => {
      try {
        await axios.post("/api/login", { token });
        router.push("/");
      } catch (e) {
        console.log(e);
        router.push("/auth/login");
      }
    };

    if (token) {
      handleLogin();
    }
  }, [token]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Skeleton className="w-16 h-8" />
        <div>
          <Skeleton className="w-64 h-6 rounded-md" />
          <Skeleton className="w-24 h-6 rounded-md" />
          <Skeleton className="w-64 h-10 rounded-md mt-2" />
        </div>
      </div>
      <Skeleton className="w-64 h-10 rounded-md" />
    </div>
  );
}
