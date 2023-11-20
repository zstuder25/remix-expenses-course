import { type LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import marketingStyles from "~/styles/marketing.css";
import MainHeader from "~/components/navigation/MainHeader"

export const links: LinksFunction = () => [{rel: "stylesheet", href: marketingStyles }]

export default function MarketingLayout() {
    return (
        <>
            <MainHeader />
            <Outlet />
        </>
    )
}