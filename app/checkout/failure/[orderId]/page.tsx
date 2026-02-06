import PaymentFailure from "@/components/payment/PaymentFailure";
import { Metadata } from "next";

export const metadata : Metadata = {
    title: "Pago Rechazado",
    description: "Hubo un problema al procesar tu pago. Por favor intenta nuevamente con otro método de pago."
}

type FailureParams = {
    params: Promise<{ orderId: string }>, 
}

export default async function page({ params } : FailureParams) {
    const { orderId } = await params; 

    return (
        <PaymentFailure
            orderId={orderId}
        />
    )
}
