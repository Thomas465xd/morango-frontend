import UpdatePasswordForm from "@/components/home/profile/UpdatePasswordForm";
import { Metadata } from "next";

export const metadata : Metadata = {
    title: "Actualizar Contraseña",
    description: "Cambia tu contraseña para mantener tu cuenta de Morango Joyas segura y protegida."
}

export default function page() {
    return (
        <UpdatePasswordForm />
    )
}
