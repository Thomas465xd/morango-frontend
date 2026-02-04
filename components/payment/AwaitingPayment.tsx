"use client"; 
import { getPaymentStatus } from '@/src/api/PaymentAPI';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import Loader from '../ui/Loader';
import { useRouter } from 'next/navigation';
import ErrorMessage from '../ui/ErrorMessage';
import { CheckCircle2, CircleDollarSignIcon, XCircle } from 'lucide-react';

type AwaitingPaymentProps = {
    orderId: string; 
}

export default function AwaitingPayment({ orderId } : AwaitingPaymentProps) {
    const router = useRouter(); 

    const { data, error, isFetching } = useQuery({
        queryKey: ["orders", orderId], 
        queryFn: () => getPaymentStatus(orderId), 
        refetchInterval: 2500
    })
    
    const paymentStatus = data?.paymentStatus ?? "pending"
    const rejectionReason = data?.rejectionReason ?? null

    useEffect(() => {
        if (paymentStatus === "approved") {
            router.replace(`/checkout/success/${orderId}`)
        }

        if (paymentStatus === "rejected") {
            router.replace(`/checkout/failure/${orderId}?rejectionReason=${rejectionReason}`)
        }
    }, [paymentStatus, rejectionReason, orderId, router])

    if(error) return (
        <div className="
                max-w-2xl mx-auto p-8 rounded-lg shadow-lg
                flex flex-col items-center my-[200px] gap-8
                bg-white dark:bg-zinc-900
            "
        >
            <div className="border-b md:w-xl flex-center">
                <h1 className='
                    text-2xl uppercase tracking-widest 
                    w-[12em] md:w-[20em] text-center pb-2'
                >
                    Error
                </h1>
            </div>

            <ErrorMessage variant="standard">
                Error al solicitar estado de pago
            </ErrorMessage>

            <p className="paragraph">
                Estado actual: {" "} 
                <strong>No definido</strong>
            </p>

            <p className=''>
                Recarga la página, lo mas probable es que sea un error de conexión.
            </p>
        </div>
    ); 

    if(paymentStatus === "pending") return (
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
                    Autorizando Pago
                </h1>
            </div>

            <Loader />

            <p className="paragraph">
                Estado actual: {" "} 
                <strong>Pendiente</strong>
            </p>

            {isFetching && (
                <p className=''>
                    Una vez tu pago haya sido confirmado seras redirigido...
                </p>
                
            )}
        </div>
    )

    if(paymentStatus === "approved") return (
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
                    🎉 Pago Aprobado 🎉
                </h1>
            </div>

            <CheckCircle2 
                size={32}
                className='text-green-500'
            />

            <p className="paragraph">
                Estado actual: {" "} 
                <strong>Aprobado</strong>
            </p>

            <p className=''>
                Redirigiendo...
            </p>
        </div>
    )

    if(paymentStatus === "rejected" || "expired" || "cancelled" ) return (
        <div className="
                max-w-xs sm:max-w-xl md:max-w-2xl mx-auto p-8 rounded-lg shadow-lg
                flex flex-col items-center my-[200px] gap-8
                bg-white dark:bg-zinc-900
            "
        >
            <h1 className='
                text-2xl uppercase tracking-widest 
                border-b w-xl text-center pb-2'
            >
                Pago Rechazado
            </h1>

            <XCircle
                size={32}
                className='text-red-500'
            />

            <p className="paragraph">
                Estado actual: {" "} 
                <strong>{paymentStatus}</strong>
            </p>

            <p className=''>
                Redirigiendo...
            </p>
        </div>
    )

    if(paymentStatus === "refunded" ) return (
        <div className="
                max-w-xs sm:max-w-xl md:max-w-2xl mx-auto p-8 rounded-lg shadow-lg
                flex flex-col items-center my-[200px] gap-8
                bg-white dark:bg-zinc-900
            "
        >
            <h1 className='
                text-2xl uppercase tracking-widest 
                border-b w-xl text-center pb-2'
            >
                Pago Reembolsado
            </h1>

            <CircleDollarSignIcon
                size={32}
                className='text-amber-500'
            />

            <p className="paragraph">
                Estado actual: {" "} 
                <strong>Reembolsado</strong>
            </p>

            <p className=''>
                Redirigiendo...
            </p>
        </div>
    )
}
