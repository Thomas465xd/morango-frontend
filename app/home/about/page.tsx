import About from "@/components/home/about/About"
import { Metadata } from "next"

export const metadata : Metadata = {
    title: "Sobre Nosotros"
}

export default function page() {
    return (
        <About />
    )
}
