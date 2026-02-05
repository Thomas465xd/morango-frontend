"use client";

import { XCircle, House, Mail, AlertCircle, Package } from "lucide-react";
import Link from "next/link";

type PaymentFailureWalletProps = {
    trackingNumber?: string;
};

export default function PaymentFailureWallet({ trackingNumber }: PaymentFailureWalletProps) {
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
                <div className="bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border-b border-red-200 dark:border-red-800/50 px-6 py-8 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
                            <XCircle size={48} className="text-red-600 dark:text-red-400" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                        Pago No Procesado
                    </h1>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Tu pago no pudo ser completado
                    </p>
                </div>

                {/* Content */}
                <div className="px-6 py-8 space-y-6">
                    {/* Error Message */}
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <AlertCircle size={20} className="text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-semibold text-red-800 dark:text-red-300 mb-1">
                                    ¿Qué sucedió?
                                </p>
                                <p className="text-xs text-red-700 dark:text-red-400">
                                    Tu pago fue rechazado. Esto puede deberse a fondos insuficientes, datos incorrectos o una restricción de tu banco.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Email Notification */}
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <Mail size={20} className="text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1">
                                    Información en tu correo
                                </p>
                                <p className="text-xs text-amber-700 dark:text-amber-400">
                                    Te hemos enviado los detalles sobre el rechazo y cómo reintentar tu pago.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Information Box */}
                    <div className="space-y-3 p-4 bg-zinc-50 dark:bg-zinc-700/30 rounded-lg">
                        <div>
                            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase mb-2">
                                Opciones disponibles
                            </p>
                            <ul className="text-sm text-zinc-700 dark:text-zinc-300 space-y-2">
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-500 dark:text-orange-400 font-bold mt-0.5">•</span>
                                    <span>Verifica los datos de tu tarjeta o cuenta bancaria</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-500 dark:text-orange-400 font-bold mt-0.5">•</span>
                                    <span>Contacta a tu banco para autorizar la transacción</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-500 dark:text-orange-400 font-bold mt-0.5">•</span>
                                    <span>Intenta nuevamente con otro método de pago</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Help Text */}
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 text-center">
                        ¿Tienes problemas? Contacta a nuestro equipo de soporte para recibir ayuda.
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
                                Ver Orden
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
