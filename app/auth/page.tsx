import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Autenticación",
    description: "Inicia sesión o regístrate para acceder a tu cuenta en Morango."
}

export default function page() {
    return (
        redirect('/auth/login')
    )
}