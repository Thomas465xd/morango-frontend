import AwaitingPayment from "@/components/payment/AwaitingPayment";
import { Metadata } from "next";

export const metadata : Metadata = {
    title: "Esperando pago..."
}

export default async function page({ params } : { params: Promise<{ orderId: string }>}) {
    const { orderId } = await params; 

    return (
        <AwaitingPayment
            orderId={orderId}
        />
    )
}
