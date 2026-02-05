import PaymentPendingWallet from "@/components/payment/PaymentPendingWallet";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pago Pendiente | Morango",
    description: "Tu pago está siendo procesado. Te notificaremos por correo cuando se confirme.",
};

type PendingPageProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function PendingPage({ searchParams }: PendingPageProps) {
    const params = await searchParams;
    
    const trackingNumber = typeof params.external_reference === "string" 
        ? params.external_reference 
        : undefined;

    return <PaymentPendingWallet trackingNumber={trackingNumber} />;
}
