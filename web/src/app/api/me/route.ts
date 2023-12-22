import { AUTH_TOKEN_NAME } from "@/constants";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Doctor } from "@/entities/Doctor";
import { api } from "@/services/api";

export async function GET() {
  const cookiesStore = cookies();

  const token = cookiesStore.get(AUTH_TOKEN_NAME);

  if (!token) {
    return new Response(null, {
      status: 401,
    });
  }

  const { value } = token;
  const decodedJWT = jwt.decode(value);
  const { data } = await api.get<Doctor>(
    `/doctor/${parseInt(decodedJWT?.sub as string)}`
  );

  return new Response(JSON.stringify(data), {
    status: 200,
  });
}
