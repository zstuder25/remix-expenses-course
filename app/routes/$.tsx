import { redirect, type LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = ({params}) => {
    if(params["*"] === "exp"){
        return redirect("/expenses")
    }

    return new Response("Not Found", { status: 404 });
}