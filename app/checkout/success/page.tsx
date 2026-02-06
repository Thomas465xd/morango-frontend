import PaymentSuccessWallet from "@/components/payment/PaymentSuccessWallet";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pago Exitoso",
    description: "Tu pago ha sido procesado exitosamente. Revisa tu correo para los detalles de tu orden.",
};

type SuccessPageProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
    const params = await searchParams;
    
    // MP appends external_reference (trackingNumber) on wallet redirects
    const trackingNumber = typeof params.external_reference === "string" 
        ? params.external_reference 
        : undefined;

    return <PaymentSuccessWallet trackingNumber={trackingNumber} />;
}
