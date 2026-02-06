import AwaitingPayment from "@/components/payment/AwaitingPayment";
import { Metadata } from "next";

export const metadata : Metadata = {
    title: "Esperando Pago",
    description: "Tu pago está siendo procesado. Revisa el estado de tu orden en tiempo real."
}

export default async function page({ params } : { params: Promise<{ orderId: string }>}) {
    const { orderId } = await params; 

    return (
        <AwaitingPayment
            orderId={orderId}
        />
    )
}
