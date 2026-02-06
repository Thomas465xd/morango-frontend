import UserOrdersView from "@/views/profile/UserOrdersView";
import { Metadata } from "next";

export const metadata : Metadata = {
    title: "Tus Órdenes",
    description: "Visualiza el historial de todas tus órdenes, estado de envío y detalles de compra."
}

export default function page() {
    return (
        <UserOrdersView />
    )
}
