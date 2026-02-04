import Questions from "@/components/home/questions/Questions";
import { Metadata } from "next"

export const metadata : Metadata = {
    title: "Preguntas Frecuentes"
}

export default function page() {
    return (
        <Questions />
    )
}
