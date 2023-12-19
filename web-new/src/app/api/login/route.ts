import { cookies } from "next/headers";
import { api } from "@/services/api";
import { AUTH_TOKEN_NAME } from "@/constants";

export async function POST(req: Request) {
  const { token } = await req.json();

  try {
    const { data } = await api.get<{
      access_token: string;
    }>(`/auth/login/callback?token=${token}`);

    cookies().set({
      name: AUTH_TOKEN_NAME,
      value: data.access_token,
      maxAge: 60 * 60 * 24,
      path: "/",
      sameSite: "none",
      secure: process.env.NODE_ENV === "production",
    });

    return new Response(
      JSON.stringify({
        message: "Success",
      }),
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${data.access_token}`,
        },
      }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({
        message: (e as Error).message,
      }),
      {
        status: 500,
      }
    );
  }
}
