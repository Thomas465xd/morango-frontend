import UserPaymentsView from "@/views/profile/UserPaymentsView"
import { Metadata } from "next"

export const metadata : Metadata = {
    title: "Ver Pagos",
    description: "Consulta el historial de tus pagos y transacciones realizadas en Morango Joyas."
}

export default function page() {
    return (
        <UserPaymentsView />
    )
}
