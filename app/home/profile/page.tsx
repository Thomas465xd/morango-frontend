import UpdateProfileView from "@/views/profile/UpdateProfileView";
import { Metadata } from "next";

export const metadata : Metadata = {
    title: "Editar Perfil",
    description: "Actualiza tu información personal y datos de contacto en tu cuenta de Morango Joyas."
}

export default function page() {
    return (
        <UpdateProfileView />
    )
}
