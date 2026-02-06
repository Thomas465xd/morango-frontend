import { Metadata } from "next";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
    title: "Restablecer Contraseña",
    description: "Crea una nueva contraseña para tu cuenta de Morango Joyas."
};
import Logo from "@/components/ui/Logo";
import { House } from "lucide-react";
import Link from "next/link";

export default function page() {
    return (
        <section>
            <Logo center />

            <div className="flex justify-center mb-8">
                <Link 
                    className="link flex items-center gap-2" 
                    href="/home"
                >
                    <House size={16} />
                    Volver al {' '}
                    <span className='font-semibold'>Inicio</span>
                </Link>
            </div>

            <ResetPasswordForm />
        </section>
    )
}
