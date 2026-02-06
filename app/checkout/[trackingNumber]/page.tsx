import { Metadata } from "next";
import CheckoutView from '@/views/checkout/CheckoutView'

export const metadata: Metadata = {
    title: "Checkout",
    description: "Completa tu compra en Morango Joyas. Proceso seguro y rápido."
}

export default async function page({ params } : { params: Promise<{ trackingNumber: string }>}) {
    const { trackingNumber } = await params; 

    return (
        <div className="min-h-screen">
            <CheckoutView
                trackingNumber={trackingNumber}
            />
        </div>
    )
}
