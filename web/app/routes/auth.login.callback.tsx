import { type LoaderArgs } from "@remix-run/node";
import { createUserSession, verifyLogin } from "../utils/session.server.ts";

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const queryParams = new URLSearchParams(url.search);

  const token = queryParams.get("token");
  const userSession = await verifyLogin(token as string);

  return createUserSession({
    request,
    userSession,
  });
}

export default function AuthLoginCallback() {}
