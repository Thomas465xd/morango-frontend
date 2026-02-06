import { Metadata } from "next";
import NewCodeForm from "@/components/auth/NewCodeForm";
import Logo from "@/components/ui/Logo";
import { House } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Confirmación Pendiente",
    description: "Tu correo está en espera de confirmación. Revisa tu bandeja de entrada."
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

            <NewCodeForm />
        </section>
    )
}
