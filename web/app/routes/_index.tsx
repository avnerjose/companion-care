import { redirect, type LoaderArgs } from "@remix-run/node";
import { getUserSession } from "../utils/session.server.ts";

export async function loader({ request }: LoaderArgs) {
  const session = await getUserSession(request);

  if(session){
    return redirect("/app");
  }

  return redirect("/auth/login");
}

export default function Index() {
  return null;
}
