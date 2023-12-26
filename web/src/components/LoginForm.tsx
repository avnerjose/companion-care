"use client";

import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components//ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { remoteApi } from "@/services/remote-api";
import Link from "next/link";

const loginFormSchema = z.object({
  email: z
    .string({
      required_error: "E-mail is required",
    })
    .email({
      message: "Invalid e-mail",
    }),
});

type LoginFormType = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const { toast } = useToast();
  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (values: LoginFormType) => {
    try {
      await remoteApi("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          destination: values.email,
        }),
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
      form.reset({
        email: "",
      });
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 px-4 w-full"
        >
          <div className="flex flex-col gap-1">
            <p className="text-gray-500">
              Enter your email to log in to the platform
            </p>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail: </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Log In</Button>
        </form>
      </Form>
      <div>
        <div className="flex items-center gap-2 max-sm:gap-1 max-sm:text-sm">
          <p>Don&apos;t have an account?</p>
          <Link href="/sign-up" className="text-primary-500 font-bold">
            Create a new account
          </Link>
        </div>
        <div className="flex items-center gap-2 max-sm:gap-1 max-sm:text-sm">
          <p>Are you a companion?</p>
          <Link
            href={process.env.NEXT_PUBLIC_APP_DOWNLOAD ?? ""}
            className="text-primary-500 font-bold"
          >
            Download our app
          </Link>
        </div>
      </div>
    </>
  );
}
