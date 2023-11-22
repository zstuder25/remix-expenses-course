import { redirect, type LoaderFunction } from "@remix-run/node";
// renamed because it was removed, $.tsx would be splat route
export const loader: LoaderFunction = ({params}) => {
    if(params["*"] === "exp"){
        return redirect("/expenses")
    }

    return new Response("Not Found", { status: 404 });
}