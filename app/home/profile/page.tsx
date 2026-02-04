import UpdateProfileView from "@/views/profile/UpdateProfileView";
import { Metadata } from "next";

export const metadata : Metadata = {
    title: "Editar Perfil"
}

export default function page() {
    return (
        <UpdateProfileView />
    )
}
