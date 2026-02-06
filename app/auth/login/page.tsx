import { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";
import Logo from "@/components/ui/Logo";
import { House } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Inicia Sesión",
    description: "Inicia sesión en tu cuenta de Morango Joyas para ver tus órdenes y pagos."
};

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

            <LoginForm />

            <div className="flex flex-col items-center gap-5 mt-5 mb-5">
                <Link 
                    className="link" 
                    href="/auth/register"
                >
                    ¿Aún no tienes cuenta? {' '}
                    <span className='font-semibold'>Registrate aquí</span>
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
