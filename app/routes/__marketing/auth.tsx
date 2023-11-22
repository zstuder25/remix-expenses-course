import { type ActionFunction, type LinksFunction } from "@remix-run/node";
import authStyles from "~/styles/auth.css";
import AuthForm from "~/components/auth/AuthForm";
import { validateCredentials } from "~/data/validation.server"
import { signup, login } from "~/data/auth.server";


export const links: LinksFunction = () => [{ rel: "stylesheet", href: authStyles }];

export const action: ActionFunction = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";
  
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  try {
    validateCredentials(credentials);
  } catch (error) {
    return error;
  }

  try {
    if(authMode === "login"){
      // @ts-ignore
      return login(credentials)
    } else {
      // @ts-ignore
      return signup(credentials)
    }
  } catch (error: any) {
    if(error.status === 422 || error.status === 401){
      return {credentials: error.message};
    } else {
      throw error;
    }
  }
}

export default function AuthPage() {
    return (
      <AuthForm />
    );
  }
  