import Questions from "@/components/home/questions/Questions";
import { Metadata } from "next"

export const metadata : Metadata = {
    title: "Preguntas Frecuentes",
    description: "Encuentra respuestas a las preguntas más comunes sobre nuestros productos, envíos y políticas."
}

export default function page() {
    return (
        <Questions />
    )
}
