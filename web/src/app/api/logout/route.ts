import { AUTH_TOKEN_NAME } from "@/constants";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  if (!cookies().get(AUTH_TOKEN_NAME)) {
    return new Response(
      JSON.stringify({
        message: "Not logged int",
      }),
      {
        status: 304,
      }
    );
  }

  try {
    cookies().delete(AUTH_TOKEN_NAME);

    return new Response(
      JSON.stringify({
        message: "Successfully logged in",
      }),
      {
        status: 200,
        headers: {
          "Set-Cookie": `${AUTH_TOKEN_NAME}=; Max-Age=0; Path=/; HttpOnly`,
        },
      }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({
        message: "Internal server error",
      }),
      {
        status: 500,
      }
    );
  }
}
