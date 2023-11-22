import type { ErrorBoundaryComponent, LinksFunction } from "@remix-run/node";
import {
  type CatchBoundaryComponent,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
  useCatch
} from "@remix-run/react";
import { type ReactNode } from "react";
import sharedStyles from "~/styles/shared.css";
import Error from "~/components/util/Error";

type DocumentProps = {
  title: string;
  children: ReactNode;
}

const Document = ({title, children}: DocumentProps) => {
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: sharedStyles }];

export const CatchBoundary: CatchBoundaryComponent = () => {
  const caughtResponse = useCatch();
  return (
    <Document title={caughtResponse.statusText}>
      <main>
        <Error title={caughtResponse.statusText}>
          <p>{caughtResponse.data?.message || "Something went wrong"}</p>
          <p>Back to <Link to="/">safety</Link></p>
        </Error>
      </main>
    </Document>
  )
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }: any) => {
  return (
    <Document title="An error occured">
      <main>
        <Error title="An error occured">
          <p>{error.message || "Something went wrong"}</p>
          <p>Back to <Link to="/">safety</Link></p>
        </Error>
      </main>
    </Document>
  )
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}
