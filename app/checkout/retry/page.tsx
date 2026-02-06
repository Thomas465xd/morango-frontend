import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Reintentar Pago",
	description: "Intenta realizar el pago nuevamente para completar tu orden en Morango Joyas."
};

export default async function page() {
    return redirect("/home/cart")
}
