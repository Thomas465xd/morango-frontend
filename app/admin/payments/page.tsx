import AdminPaymentsView from "@/views/admin/AdminPaymentsView"
import { Metadata } from "next"

export const metadata : Metadata = {
    title: "Administrar Pagos",
    description: "Visualiza y gestiona todos los pagos realizados por los clientes en Morango Joyas."
}

export default function page() {
    return (
        <section className="p-8">
            <h1 className="title">
                Pagos
            </h1>

            <p className="mt-2 text-stone-600 dark:text-stone-400">
                Administra todas tus ordenes registradas. <br/>
                <span className="font-bold">Para ver los detalles de pago de una orden presiona en &quot;Ver&quot;.</span>
            </p>

            <AdminPaymentsView />
        </section>
    )
}
