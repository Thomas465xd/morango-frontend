import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Editar Producto",
    description: "Selecciona un producto para editar sus detalles y características."
}

export default function page() {
	return (
        redirect("/admin") // Redirect to the clients page
	);
}