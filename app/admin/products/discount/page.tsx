import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Configurar Descuentos"
}

export default function page() {
	return (
        redirect("/admin/products") // Redirect to the clients page
	);
}