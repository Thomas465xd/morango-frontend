import CreateProductForm from '@/components/admin/products/CreateProductForm'
import { Metadata } from 'next'

export const metadata : Metadata = {
    title: "Crear Producto",
    description: "Crea un nuevo producto para añadir a tu catálogo de joyas en Morango."
}

export default function page() {
    return (
        <CreateProductForm />
    )
}
