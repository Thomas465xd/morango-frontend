import CartView from "@/views/cart/CartView"
import { Metadata } from "next"

export const metadata : Metadata = {
    title: "Ver Carrito"
}

export default function page() {
    return (
        <div className="flex-1">
            <CartView />
        </div>
    )
}
