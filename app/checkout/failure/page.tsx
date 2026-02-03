import PaymentFailureWallet from "@/components/payment/PaymentFailureWallet";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pago Rechazado | Morango",
    description: "Tu pago no fue procesado. Revisa tu correo para más información.",
};

export default function FailurePage() {
    return <PaymentFailureWallet />;
}
