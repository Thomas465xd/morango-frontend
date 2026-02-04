import UserPaymentDetailsView from "@/views/profile/UserPaymentDetailsView";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Detalles pago"
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