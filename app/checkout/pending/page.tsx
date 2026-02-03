import PaymentPendingWallet from "@/components/payment/PaymentPendingWallet";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pago Pendiente | Morango",
    description: "Tu pago está siendo procesado. Te notificaremos por correo cuando se confirme.",
};

export default function PendingPage() {
    return <PaymentPendingWallet />;
}
