import UserOrdersView from "@/views/profile/UserOrdersView";
import { Metadata } from "next";

export const metadata : Metadata = {
    title: "Tus Ordenes"
}

export default function page() {
    return (
        <UserOrdersView />
    )
}
