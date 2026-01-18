import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Editar Producto"
}

export default function page() {
	return (
        redirect("/admin") // Redirect to the clients page
	);
}