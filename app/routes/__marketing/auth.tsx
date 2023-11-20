import { type LinksFunction } from "@remix-run/node";
import authStyles from "~/styles/auth.css";
import AuthForm from "~/components/auth/AuthForm";


export const links: LinksFunction = () => [{ rel: "stylesheet", href: authStyles }];

export default function AuthPage() {
    return (
      <AuthForm />
    );
  }
  