import AdminUsersView from "@/views/admin/AdminUsersView";
import { Metadata } from "next";

export const metadata : Metadata = {
    title: "Administrar usuarios"
}

export default function page() {
    return (
        <section className="p-8">
            <div className="flex-between">
                <div className="">
                    <h1 className="title">
                        Usuarios
                    </h1>
                    <p className="mt-2 text-stone-600 dark:text-stone-400">
                        Administra a todos tus usuarios registrados. <br/>
                        <span className="font-bold">Los colores de los precios indican el estado del descuento.</span>
                    </p>
                </div>
            </div>

            <AdminUsersView />
        </section>
    )
}
