import { ArrowRight } from "lucide-react";
import NavBar from "../home/NavBar";
import Logo from "./Logo";
import Link from "next/link";

export default function Example() {
	return (
        <>
            <NavBar />
            <main className="grid min-h-screen place-items-center bg-white px-6 pb-24 sm:pb-32 lg:px-8 dark:bg-zinc-900">
                <div className="text-center">
                    <div className="flex justify-center shrink-0 items-center mb-12">
                        <Logo mini />
                    </div>
                    <p className="text-base font-semibold text-orange-200 dark:text-orange-200">
                        404
                    </p>
                    <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-zinc-900 sm:text-7xl dark:text-white">
                        Page not found
                    </h1>
                    <p className="mt-6 text-lg font-medium text-pretty text-zinc-500 sm:text-xl/8 dark:text-zinc-400">
                        Lo sentimos, no pudimos encontrar la página que buscabas
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            href="/home"
                            className="rounded-md bg-zinc-200 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-zinc-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus-visible:outline-zinc-400 transition-colors duration-200"
                        >
                            Volver al inicio
                        </Link>
                        <Link
                            href="mailto:javiera@morangojoyas.cl"
                            className="flex-align text-sm text-gray-300 px-3.5 py-2.5 dark:text-gray-400 hover:text-blue-400 transition duration-200 p-2 rounded-md hover:bg-white/10"
                            aria-label="Enviar correo a soporte"
                        >
                            Contactar a soporte
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </main>
        </>
	);
}
