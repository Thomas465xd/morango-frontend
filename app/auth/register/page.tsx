import RegisterForm from "@/components/auth/RegisterForm";
import { Metadata } from "next";
import Logo from "@/components/ui/Logo";

export const metadata: Metadata = {
    title: "Crear Cuenta",
    description: "Regístrate en Morango Joyas para comenzar a comprar nuestras joyas exclusivas."
};
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

            <RegisterForm />

            <div className="flex flex-col items-center gap-5 mt-5 mb-5">
                <Link 
                    className="link" 
                    href="/auth/login"
                >
                    ¿Ya tienes una cuenta? {' '}
                    <span className='font-semibold'>Iniciar sesión</span>
                </Link>

                <Link 
                    className="link" 
                    href="/auth/forgot"
                >
                    ¿Olvidaste tu contraseña? {' '}
                    <span className='font-semibold'>Reestablecer</span>
                </Link>
            </div>
        </section>
    )
}
