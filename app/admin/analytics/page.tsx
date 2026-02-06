import AdminAnalyticsView from "@/views/admin/AdminAnalyticsView";
import { Metadata } from "next";

export const metadata : Metadata = {
    title: "Ver Estadísticas",
    description: "Análisis y estadísticas de ventas, productos, y desempeño del negocio."
}

export default function page() {
    return (
        <section className="p-8">
            <h1 className="title">
                Estadísticas
            </h1>

            <AdminAnalyticsView />
        </section>
    )
}
