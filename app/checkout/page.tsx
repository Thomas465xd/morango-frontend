import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Checkout",
    description: "Revisa tu pedido y procede al pago de forma segura en Morango Joyas."
}

export default function page() {
    return redirect("/home/cart")
}
