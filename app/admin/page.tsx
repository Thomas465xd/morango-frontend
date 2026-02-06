import { Metadata } from "next";
import AdminDashboard from "@/components/admin/dashboard/AdminDashboard";

export const metadata: Metadata = {
    title: "Administración",
    description: "Panel de administración de Morango Joyas. Gestiona órdenes, productos, pagos y usuarios."
}

export default function page() {
    return (
        <section className="p-8">
            <h1 className="title">
                Administración
            </h1>
            <AdminDashboard />
        </section>
    )
}
