import PaymentSuccess from "@/components/payment/PaymentSuccess";
import { Metadata } from "next";

export const metadata : Metadata = {
    title: "Pago Aprobado",
    description: "Tu pago ha sido aprobado exitosamente. Tu orden está confirmada y en preparación."
}

export default async function page({ params } : { params: Promise<{ orderId: string }>}) {
    const { orderId } = await params; 

    return (
        <PaymentSuccess
            orderId={orderId}
        />
    )
}
