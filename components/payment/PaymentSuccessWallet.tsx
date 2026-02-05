"use client";

import { CheckCircle2, House, Mail, Package } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useCartStore } from "@/src/store/useCartStore";

type PaymentSuccessWalletProps = {
    trackingNumber?: string;
};

export default function PaymentSuccessWallet({ trackingNumber }: PaymentSuccessWalletProps) {
    const { clearCart, closeCart } = useCartStore();

    useEffect(() => {
        clearCart();
        closeCart();
    }, [clearCart, closeCart]);

    return (
        <main className="flex items-center justify-center min-h-screen px-4 my-12">
            <div className="
                    w-full max-w-xl 
                    bg-white dark:bg-zinc-800 
                    rounded-xl shadow-lg 
                    border border-zinc-200 dark:border-zinc-700 
                    overflow-hidden
                "
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-b border-green-200 dark:border-green-800/50 px-6 py-8 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                            <CheckCircle2 size={48} className="text-green-600 dark:text-green-400" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                        ¡Pago Exitoso!
                    </h1>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Tu pago ha sido procesado correctamente
                    </p>
                </div>

                {/* Content */}
                <div className="px-6 py-8 space-y-6">
                    {/* Status Message */}
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <Mail size={20} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-semibold text-green-800 dark:text-green-300 mb-1">
                                    Revisa tu correo electrónico
                                </p>
                                <p className="text-xs text-green-700 dark:text-green-400">
                                    Te hemos enviado la confirmación de tu orden con el número de seguimiento y detalles de entrega.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Information Box */}
                    <div className="space-y-3 p-4 bg-zinc-50 dark:bg-zinc-700/30 rounded-lg">
                        <div>
                            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase mb-1">
                                ¿Qué sigue?
                            </p>
                            <ul className="text-sm text-zinc-700 dark:text-zinc-300 space-y-2">
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-500 dark:text-orange-400 font-bold mt-0.5">•</span>
                                    <span>Recibe la confirmación en tu correo</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-500 dark:text-orange-400 font-bold mt-0.5">•</span>
                                    <span>Usa el número de seguimiento para rastrear tu pedido</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-500 dark:text-orange-400 font-bold mt-0.5">•</span>
                                    <span>Recibirás actualizaciones por correo sobre el estado de tu entrega</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Help Text */}
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 text-center">
                        Si no recibiste el correo, revisa tu carpeta de spam o contacta a nuestro equipo de soporte.
                    </p>
                </div>

                {/* Footer */}
                <div className="border-t border-zinc-200 dark:border-zinc-700 px-6 py-4 bg-zinc-50 dark:bg-zinc-700/30">
                    <div className="flex flex-col items-center gap-3">
                        {trackingNumber && (
                            <Link 
                                className="button flex items-center gap-2 tracking-widest uppercase text-sm" 
                                href={`/home/orders/public/${trackingNumber}`}
                            >
                                <Package size={16} />
                                Seguimiento Orden
                            </Link>
                        )}
                        <Link 
                            className="link flex items-center gap-2" 
                            href="/home"
                        >
                            <House size={16} />
                            Volver al {' '}
                            <span className='font-semibold'>Inicio</span>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
