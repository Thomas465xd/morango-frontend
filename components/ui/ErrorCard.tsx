import { LucideIcon } from 'lucide-react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'

type ErrorCardProps = {
    icon: LucideIcon;
    title: string; 
    description: string; 
    errorText: string; 
    showHome?: boolean; 
    showContact?: boolean; 
    showReload?: boolean; 
    showPrevious?: boolean; 
}

export default function ErrorCard({ 
    icon, 
    title, 
    description, 
    errorText, 
    showReload = false, 
    showPrevious = false,  
    showHome = false, 
    showContact = false, 
} : ErrorCardProps) {
    const router = useRouter(); 

    return (
        <main className="mx-auto max-w-2xl px-4 pt-24 pb-24 sm:px-6 lg:px-8">
            <div className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-8 sm:p-12 text-center">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                        {
                            React.createElement(icon, { className: "w-10 h-10 text-red-600 dark:text-red-400" })
                        }
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-orange-100 mb-3">
                    { title }
                </h1>

                {/* Description */}
                <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-md mx-auto">
                    { description }
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    {showHome && (
                        <Link
                            href="/home"
                            className="button h-14 px-8 inline-flex items-center justify-center tracking-widest"
                        >
                            VOLVER AL INICIO
                        </Link>
                    )}

                    {showContact && (
                        <Link
                            href="/home/contact"
                            className="h-14 px-8 inline-flex items-center justify-center tracking-widest border border-zinc-300 dark:border-zinc-600 rounded-md text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                        >
                            CONTACTAR SOPORTE
                        </Link>
                    )}

                    {showReload && (
                        <button
                            onClick={() => window.location.reload()}
                            className="h-14 px-8 inline-flex items-center justify-center tracking-widest border border-zinc-300 dark:border-zinc-600 rounded-md text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                        >
                            RECARGAR PÁGINA
                        </button>
                    )}


                    {showPrevious && (
                        <button
                            onClick={() => router.back()}
                            className="h-14 px-8 inline-flex items-center justify-center tracking-widest border border-zinc-300 dark:border-zinc-600 rounded-md text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                        >
                            VOLVER ATRAS
                        </button>
                    )}
                </div>

                {/* Help Text */}
                <p className="text-xs text-red-500 font-bold dark:text-red-400 dark:font-normal mt-6">
                    Código de error: {errorText}
                </p>
            </div>
        </main>
    )
}
