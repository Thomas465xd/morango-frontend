import UpdatePasswordForm from "@/components/home/profile/UpdatePasswordForm";
import { Metadata } from "next";

export const metadata : Metadata = {
    title: "Actualizar Contraseña"
}

export default function page() {
    return (
        <UpdatePasswordForm />
    )
}
