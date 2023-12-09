import { redirect, type LoaderArgs, type ActionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useEffect } from "react";
import { getUserSession } from "../utils/session.server.ts";
import Logo from "../assets/companion_care_logo.png";
import CompanyIcon from "../assets/icons/logo.svg";
import { api } from "../services/api.ts";
import { useToast } from "../components/ui/use-toast.ts";

export async function loader({ request }: LoaderArgs) {
  const session = await getUserSession(request);

  if (session) {
    return redirect("/app");
  }

  return null;
}

export async function action({ request }: ActionArgs) {
  const body = await request.formData();

  try {
    await api.post("/auth/login", {
      destination: body.get("email"),
    });
    return { success: true };
  } catch (e) {
    return { success: false };
  }
}

export default function Login() {
  const actionData = useActionData<typeof action>();
  const { toast } = useToast();

  useEffect(() => {
    if (actionData?.success) {
      toast({
        title: "E-mail verificado com sucesso!",
        description: "Verifique seu e-mail para fazer o login",
      });
    } else if (typeof actionData?.success !== "undefined") {
      toast({
        title: "Erro ao fazer login",
        description: "Verifique se digitou o e-mail corretamente",
      });
    }
  }, [actionData, toast]);

  return (
    <div className="grid h-screen w-screen grid-cols-[60%,1fr]">
      <div className="bg-secondary-700 flex h-full w-full items-end justify-center" />
      <div className="flex flex-col items-start justify-center gap-4 px-20">
        <div className="mb-5 flex items-center gap-2">
          <img src={CompanyIcon} className="w-10" alt="CompanionCare" />
          <img src={Logo} alt="CompanionCare" className="h-6" />
        </div>
        <h1 className="text-secondary-700 text-2xl font-bold">Login</h1>
        <Form method="post" className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-gray-500">
              Entre com seu e-mail para fazer login na plataforma
            </p>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              className="w-full rounded-md bg-gray-400 p-2 placeholder:text-gray-500"
            />
          </div>

          <button
            type="submit"
            className="bg-primary-500 hover:bg-primary-700 w-full rounded-md px-4 py-2 font-bold text-white"
          >
            Entrar
          </button>
        </Form>
      </div>
    </div>
  );
}
