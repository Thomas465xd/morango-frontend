import PaymentFailure from "@/components/payment/PaymentFailure";
import { Metadata } from "next";

export const metadata : Metadata = {
    title: "Pago Rechazado"
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
