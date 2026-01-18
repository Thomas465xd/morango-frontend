import ProductsView from "@/views/products/ProductsView"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Nuestas Joyas"
}

export default function page() {
    return (
        <div className="p-3 sm:p-8">
            <ProductsView />
        </div>
    )
}
