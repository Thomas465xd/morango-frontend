import EditProductForm from "@/components/admin/products/EditProductForm";
import { Home } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Editar Producto",
    description: "Actualiza los detalles, precios y descripción de tu producto en Morango Joyas."
}

// TODO: implement generateStaticParams() with react query for faster page loads

export default async function page({ params } : { params: Promise<{ productId: string }>}) {
    const { productId } = await params; 

    // console.log(productId)

	return (
        <section className="p-8">
            <div className="flex-between mb-8">
                <div className="">
                    <h1 className="title w-50">
                        Editar Producto
                    </h1>
                    <p className="mt-2 text-stone-600 dark:text-stone-400">
                        Edita los campos deseados para actualizar tu joya.
                    </p>
                </div>

                <Link
                    href="/admin/products"
                    className="button flex-align"
                >
                    <Home size={20} />
                    Volver al panel
                </Link>
            </div>


            <EditProductForm
                productId={productId}
            />
        </section>
	);
}