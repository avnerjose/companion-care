import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import stylesheet from "./tailwind.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SocketProvider } from "./contexts/socket.context.tsx";
import { Toaster } from "./components/ui/toaster.tsx";

export const links: LinksFunction = () => [
  ...(cssBundleHref
    ? [
        { rel: "stylesheet", href: cssBundleHref },
        {
          rel: "stylesheet",
          href: stylesheet,
        },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
        },
        {
          href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap",
          rel: "stylesheet",
        },
      ]
    : [
        {
          rel: "stylesheet",
          href: stylesheet,
        },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
        },
        {
          href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap",
          rel: "stylesheet",
        },
      ]),
];

export const meta = () => [{ title: "Companion Care" }];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <SocketProvider>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
          <Toaster />
        </SocketProvider>
      </body>
    </html>
  );
}
