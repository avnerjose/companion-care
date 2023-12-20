"use client";

import { FormEvent, useState } from "react";
import { api } from "@/services/api";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components//ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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
        <Label htmlFor="email" className="sr-only">E-mail </Label>
        <Input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
      </div>
      <Button type="submit" onClick={handleSendEmail}>
        Log In
      </Button>
    </form>
  );
}
