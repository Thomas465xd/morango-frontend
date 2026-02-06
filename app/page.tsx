import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Inicio",
    description: "Bienvenido a Morango Joyas. Descubre las mejores joyas y accesorios exclusivos."
}

export default function page() {
    return redirect("/home")
}
