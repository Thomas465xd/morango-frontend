"use client"; 
import CheckoutPayment from '@/components/checkout/CheckoutPayment'
import Loader from '@/components/ui/Loader';
import { retryPaymentPreference } from '@/src/api/PaymentAPI';
import { useMutation } from '@tanstack/react-query';
import { House, XCircle } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';

type RetryPaymentViewProps = {
    orderId: string; 
    token: string; 
}

export default function RetryPaymentView({ orderId, token } : RetryPaymentViewProps) {;
    const [paymentId, setPaymentId] = useState<string | null>(null); 
    const [preferenceId, setPreferenceId] = useState<string | null>(null); 
    const [initPoint, setInitPoint] = useState<string | null>(null);
    const [amount, setAmount] = useState<number | null>(null); 
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { mutate, isError } = useMutation({
        mutationFn: retryPaymentPreference,
        onSuccess: (data) => {
            setPaymentId(data?.paymentId ?? null)
            setPreferenceId(data?.preferenceId ?? null) 
            setInitPoint(data?.initPoint ?? null)
            setAmount(data?.amount ?? null)
            toast.info(data?.message || "Token de reintento válido")
        },
        onError: (error: Error) => {
            setErrorMessage(error.message || "Token inválido o expirado")
            toast.error(error.message || "Token inválido o expirado");
        },
    });

    // Trigger validation once token exists
    const hasTriggered = useRef(false);

    useEffect(() => {
        if (!token || !orderId || hasTriggered.current) return;

        hasTriggered.current = true; // Guard so that useEffect does not run twice

        mutate({ orderId, token });
    }, [orderId, token, mutate]);

    // console.log(paymentId, preferenceId, initPoint, amount)

    if (isError) {
        return (
            <div className="
                    max-w-xs sm:max-w-xl md:max-w-2xl mx-auto p-8 rounded-lg shadow-lg
                    flex flex-col items-center my-[200px] gap-8
                    bg-white dark:bg-zinc-900
                "
            >
                <div className="border-b md:w-xl flex-center">
                    <h1 className='
                        text-2xl uppercase tracking-widest 
                        w-[12em] md:w-[20em] text-center pb-2'
                    >
                        Intento de pago no Aprobado
                    </h1>
                </div>

                <XCircle
                    size={70}
                    className='text-red-500 mt-4'
                />

                <p className="paragraph">
                    Razón: {" "} 
                    <strong>{errorMessage}</strong>
                </p>

                <p className=''>
                    Vuelve a registrar tu orden y completa el formulario de compra. 
                </p>

                <Link
                    href={`/home/cart`}
                    className='button tracking-widest uppercase'
                >
                    Reingresar orden
                </Link>

                <div className="flex-center">
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
        )
    }

    // ⏳ Loading state
    if (!paymentId && !preferenceId && !amount && !initPoint && !isError ) {
        return (
            <div className="
                    max-w-xs sm:max-w-xl md:max-w-2xl mx-auto p-8 rounded-lg shadow-lg
                    flex flex-col items-center my-[200px] gap-8
                    bg-white dark:bg-zinc-900
                "
            >
                <div className="border-b md:w-xl flex-center">
                    <h1 className='
                        text-2xl uppercase tracking-widest 
                        w-[12em] md:w-[20em] text-center pb-2'
                    >
                        Validando intento de pago
                    </h1>
                </div>
    
                <Loader />
    
                <div 
                    className="bg-zinc-800 max-w-40 w-full h-8 rounded animate-pulse"
                />
    
                <div 
                    className="bg-zinc-800 max-w-80 w-full h-8 rounded animate-pulse"
                />
            </div>
        )
    }

    if (paymentId && preferenceId && amount && initPoint) return (
        <div className='my-[150px] space-y-8'>
            <div className="">
                <h2 className="heading uppercase mb-0">
                    Reintentar Pago Fallido
                </h2>

                <p className='text-zinc-500'>
                    Orden: {orderId}
                </p>
            </div>

            <CheckoutPayment
                orderId={orderId}
                paymentId={paymentId}
                preferenceId={preferenceId}
                initPoint={initPoint}
                amount={amount}
            />
        </div>
    )
}
