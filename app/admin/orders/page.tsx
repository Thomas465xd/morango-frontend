import AdminOrdersView from "@/views/admin/AdminOrdersView"
import { Metadata } from "next"

export const metadata : Metadata = {
    title: "Administrar Órdenes",
    description: "Gestiona todas las órdenes de los clientes. Controla estados, envíos y seguimiento."
}

export default function page() {
    return (
        <section className="p-8">
            <h1 className="title">
                Ordenes
            </h1>

            <p className="mt-2 text-stone-600 dark:text-stone-400">
                Administra todas tus ordenes registradas. <br/>
                <span className="font-bold">Para ver los detalles de pago de una orden presiona en &quot;Ver&quot;.</span>
            </p>

            <AdminOrdersView />
        </section>
    )
}
