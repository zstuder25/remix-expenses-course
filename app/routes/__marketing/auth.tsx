import { ActionFunction, type LinksFunction } from "@remix-run/node";
import authStyles from "~/styles/auth.css";
import AuthForm from "~/components/auth/AuthForm";


export const links: LinksFunction = () => [{ rel: "stylesheet", href: authStyles }];

export const action: ActionFunction = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";
  
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  // add validation

  if(authMode === "login"){
    // login
  } else {
    //create user
  }
}

export default function AuthPage() {
    return (
      <AuthForm />
    );
  }
  