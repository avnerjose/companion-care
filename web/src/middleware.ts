import { NextRequest, NextResponse } from "next/server";
import { AUTH_TOKEN_NAME } from "./constants";
import { api } from "./services/api";

const protectedRoutes = ["/"];
const authRoutes = ["/login"];

export default function middleware(req: NextRequest) {
  const { cookies } = req;
  const token = cookies.get(AUTH_TOKEN_NAME)?.value;
  const url = req.nextUrl.pathname;
 
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
 
  if (token && authRoutes.includes(url)) {
    const absoluteUrl = new URL("/", req.nextUrl.origin);

    return NextResponse.redirect(absoluteUrl.toString());
  } else if (!token && protectedRoutes.includes(url)) {
    const absoluteUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
}
