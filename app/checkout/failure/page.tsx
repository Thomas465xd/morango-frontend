import PaymentFailureWallet from "@/components/payment/PaymentFailureWallet";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pago Rechazado",
    description: "Tu pago no fue procesado. Revisa tu correo para más información o intenta nuevamente.",
};

type FailurePageProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function FailurePage({ searchParams }: FailurePageProps) {
    const params = await searchParams;
    
    const trackingNumber = typeof params.external_reference === "string" 
        ? params.external_reference 
        : undefined;

    return <PaymentFailureWallet trackingNumber={trackingNumber} />;
}
