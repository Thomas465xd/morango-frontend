import UserPaymentDetailsView from "@/views/profile/UserPaymentDetailsView";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Detalles del Pago",
    description: "Consulta los detalles de tu pago, incluyendo monto, fecha y estado de la transacción."
}

export default async function page({ params } : { params: Promise<{ paymentId: string }>}) {
    const { paymentId } = await params; 

    // console.log(productId)

	return (
        <section className="p-3 sm:p-8">
            <UserPaymentDetailsView
                paymentId={paymentId}
            />
        </section>
	);
}