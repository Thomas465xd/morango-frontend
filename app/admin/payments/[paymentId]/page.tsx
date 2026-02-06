import AdminPaymentDetailsView from "@/views/admin/AdminPaymentDetailsView";
import { Home } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Detalles del Pago",
    description: "Visualiza los detalles completos de una transacción de pago."
}

// TODO: implement generateStaticParams() with react query for faster page loads

export default async function page({ params } : { params: Promise<{ paymentId: string }>}) {
    const { paymentId } = await params; 

    // console.log(productId)

	return (
        <section className="p-8">
            <div className="space-y-4 sm:flex-between mb-8">
                <div className="">
                    <h1 className="title w-50">
                        Detalles pago 
                    </h1>
                    <p className="mt-2 text-stone-600 dark:text-stone-400 w-[20em] md:w-[35em]">
                        Aqui puedes ver todos los detalles de un pago incluyendo la información {" "}
                        proporcionada por Mercado Pago.
                    </p>
                </div>

                <Link
                    href="/admin/payments"
                    className="button flex-align"
                >
                    <Home size={20} />
                    Volver atras
                </Link>
            </div>


            <AdminPaymentDetailsView
                paymentId={paymentId}
            />
        </section>
	);
}