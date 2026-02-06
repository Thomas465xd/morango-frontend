import About from "@/components/home/about/About"
import { Metadata } from "next"

export const metadata : Metadata = {
    title: "Sobre Nosotros",
    description: "Conoce la historia de Morango Joyas, nuestra misión y compromiso con la calidad y excelencia."
}

export default function page() {
    return (
        <About />
    )
}
