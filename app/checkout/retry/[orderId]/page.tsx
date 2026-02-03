import RetryPaymentView from "@/views/payments/RetryPaymentView";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Reintentar Pago",
};

type RetryPaymentParams = {
	params: Promise<{ orderId: string }>;
	searchParams: { [key: string]: string | string[] | undefined };
};

export default async function page({ params, searchParams }: RetryPaymentParams) {
	const { orderId } = await params;

	const { token } = await searchParams;
	if (typeof token !== "string") {
        return redirect("/404"); 
	}

	return (
        <div className="max-w-2xl mx-auto">
            <RetryPaymentView 
                orderId={orderId} 
                token={token} 
            />
        </div>
    )
}
