import Link from "next/link";

export default function page() {
    return (
        <section className="p-8">
            <div className="flex-between">
                <h1 className="title">
                    Productos
                </h1>

                <Link
                    href="/admin/products/create"
                    className="button"
                >
                    Crear Producto
                </Link>
            </div>
        </section>
    )
}
