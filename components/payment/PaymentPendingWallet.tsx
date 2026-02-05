"use client";

import { Clock, House, Mail, AlertCircle, Package } from "lucide-react";
import Link from "next/link";

type PaymentPendingWalletProps = {
    trackingNumber?: string;
};

export default function PaymentPendingWallet({ trackingNumber }: PaymentPendingWalletProps) {
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
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-b border-amber-200 dark:border-amber-800/50 px-6 py-8 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                            <Clock size={48} className="text-amber-600 dark:text-amber-400 animate-pulse" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                        Pago en Espera
                    </h1>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Tu pago está siendo procesado
                    </p>
                </div>

                {/* Content */}
                <div className="px-6 py-8 space-y-6">
                    {/* Pending Message */}
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <AlertCircle size={20} className="text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1">
                                    Por favor, espera
                                </p>
                                <p className="text-xs text-amber-700 dark:text-amber-400">
                                    Tu pago está siendo verificado. Este proceso puede tomar algunos minutos.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Email Notification */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <Mail size={20} className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">
                                    Recibirás una notificación
                                </p>
                                <p className="text-xs text-blue-700 dark:text-blue-400">
                                    Te enviaremos un correo electrónico cuando tu pago sea confirmado o si hay algún problema.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Information Box */}
                    <div className="space-y-3 p-4 bg-zinc-50 dark:bg-zinc-700/30 rounded-lg">
                        <div>
                            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase mb-2">
                                Próximos pasos
                            </p>
                            <ul className="text-sm text-zinc-700 dark:text-zinc-300 space-y-2">
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-500 dark:text-orange-400 font-bold mt-0.5">•</span>
                                    <span>No cierres esta página ni realices transacciones duplicadas</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-500 dark:text-orange-400 font-bold mt-0.5">•</span>
                                    <span>Revisa tu correo (incluida la carpeta de spam) en los próximos minutos</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-500 dark:text-orange-400 font-bold mt-0.5">•</span>
                                    <span>Conserva el número de tu orden para futuras consultas</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Help Text */}
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 text-center">
                        Si no recibiste notificaciones en 24 horas, contacta a nuestro equipo de soporte.
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
