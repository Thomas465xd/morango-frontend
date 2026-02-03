import PaymentSuccess from "@/components/payment/PaymentSuccess";
import { Metadata } from "next";

export const metadata : Metadata = {
    title: "Pago aprobado"
}

export default async function page({ params } : { params: Promise<{ orderId: string }>}) {
    const { orderId } = await params; 

    return (
        <PaymentSuccess
            orderId={orderId}
        />
    )
}
