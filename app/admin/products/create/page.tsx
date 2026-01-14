import CreateProductForm from '@/components/admin/products/CreateProductForm'
import { Metadata } from 'next'

export const metadata : Metadata = {
    title: "Registrar Producto"
}

export default function page() {
    return (
        <CreateProductForm />
    )
}
