import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Reintentar Pago",
};

export default async function page() {
    return redirect("/home/cart")
}
