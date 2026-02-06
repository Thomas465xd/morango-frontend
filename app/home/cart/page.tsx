import CartView from "@/views/cart/CartView"
import { Metadata } from "next"

export const metadata : Metadata = {
    title: "Ver Carrito",
    description: "Revisa y gestiona los productos en tu carrito de compras. Procede al checkout cuando estés listo."
}

export default function page() {
    return (
        <div className="flex-1">
            <CartView />
        </div>
    )
}
