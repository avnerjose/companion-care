"use client";

import { api } from "@/services/api";
import { useToast } from "@/components/ui/use-toast";
import { FormEvent, useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSendEmail = async (e: FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return;

    try {
      await api.post("/auth/login", {
        destination: email,
      });
      toast({
        title: "E-mail successfully verified!",
        description: "Check your email to log in",
      });
    } catch (e) {
      toast({
        title: "Error logging in",
        description: "Make sure you entered the email correctly",
        variant: "destructive",
      });
    } finally {
      setEmail("");
    }
  };

  return (
    <form onSubmit={handleSendEmail} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <p className="text-gray-500">
          Enter your email to log in to the platform
        </p>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full rounded-md bg-gray-400 p-2 placeholder:text-gray-500 text-gray-700"
        />
      </div>
      <button
        type="submit"
        className="bg-primary-500 hover:bg-primary-700 w-full rounded-md px-4 py-2 font-bold text-white"
        onClick={handleSendEmail}
      >
        Log In
      </button>
    </form>
  );
}
