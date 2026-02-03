import PaymentSuccessWallet from "@/components/payment/PaymentSuccessWallet";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pago Exitoso | Morango",
    description: "Tu pago ha sido procesado exitosamente. Revisa tu correo para los detalles de tu orden.",
};

export default function SuccessPage() {
    return <PaymentSuccessWallet />;
}
