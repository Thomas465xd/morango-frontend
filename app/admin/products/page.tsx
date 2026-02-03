import AdminProductsView from "@/views/admin/AdminProductsView";
import { PencilLineIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Productos"
}

export default function page() {
    return (
        <section className="p-8">
            <div className="space-y-4 sm:flex-between">
                <div className="">
                    <h1 className="title">
                        Productos
                    </h1>
                    <p className="mt-2 text-stone-600 dark:text-stone-400">
                        Administra todos tus productos registrados. <br/>
                        <span className="font-bold">Los colores de los precios indican el estado del descuento.</span>
                    </p>
                </div>

                <Link
                    href="/admin/products/create"
                    className="button flex-align"
                >
                    <PencilLineIcon size={20} />
                    Crear Producto
                </Link>
            </div>

            <AdminProductsView />
        </section>
    )
}
