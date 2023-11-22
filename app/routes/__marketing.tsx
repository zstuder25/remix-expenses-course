import { type LoaderFunction, type LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import marketingStyles from "~/styles/marketing.css";
import MainHeader from "~/components/navigation/MainHeader"
import { getUserFromSession } from "~/data/auth.server";

export const links: LinksFunction = () => [{rel: "stylesheet", href: marketingStyles }]

export const loader: LoaderFunction = ({request}) => {
    return getUserFromSession(request);
}

export default function MarketingLayout() {
    return (
        <>
            <MainHeader />
            <Outlet />
        </>
    )
}