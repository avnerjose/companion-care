import { createCookieSessionStorage, redirect } from "@remix-run/node";
import axios from "axios";
import jwtDecode from "jwt-decode";

type DoctorSession = {
  id: number;
  cpf: string;
  name: string;
  crm: string;
  email: string;
  specialty: string;
  dateOfBirth: string;
  sex: string;
  phoneNumber: string;
  city: string;
  hospitalId: 1;
  accessToken: string;
};

export type Doctor = Omit<DoctorSession, "accessToken">;

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "hospital_app_session",
    secure: process.env.NODE_ENV === "production",
    secrets: ["fasdfa"],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
  },
});

async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function createUserSession({
  request,
  userSession,
}: {
  request: Request;
  userSession: DoctorSession;
}) {
  const session = await getSession(request);
  session.set("user", userSession);
  return redirect("/app/patients", {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: 60 * 60 * 24 * 7,
      }),
    },
  });
}

export async function verifyLogin(token: string) {
  try {
    const { data } = await axios.get<{
      access_token: string;
    }>(`${process.env.API_URL}/auth/login/callback?token=${token}`);
    const user = jwtDecode(data.access_token) as { sub: string };

    const { data: doctor } = await axios.get<Doctor>(
      `${process.env.API_URL}/doctor/${user.sub}`,
      {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      },
    );

    const loggedUserSession: DoctorSession = {
      ...doctor,
      accessToken: data.access_token,
    };

    axios.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;

    return loggedUserSession;
  } catch (e) {
    throw new Error(e as any);
  }
}

export async function getUserSession(request: Request) {
  const session = await getSession(request);
  const user: DoctorSession | undefined = session.get("user");
  return user;
}

export async function logout(request: Request) {
  const session = await getSession(request);
  return redirect("/auth/login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}
