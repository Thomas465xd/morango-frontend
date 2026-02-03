"use client"; 
import { getPaymentStatus } from "@/src/api/PaymentAPI";
import { useQuery } from "@tanstack/react-query";
import { House, XCircle } from "lucide-react";
import Link from "next/link";
import ErrorMessage from "../ui/ErrorMessage";
import Loader from "../ui/Loader";

type PaymentFailureProps = {
    orderId: string; 
}

export default function PaymentFailure({ orderId } : PaymentFailureProps) {
    const { data, error, isFetching } = useQuery({
        queryKey: ["orders", orderId], 
        queryFn: () => getPaymentStatus(orderId), 
        retry: false,
    })

    const paymentStatus = data?.paymentStatus || "Not Provided"; 
    const orderStatus = data?.status; 
    const rejectionReason = data?.rejectionReason; 
    const trackingNumber = data?.trackingNumber; 
    const retryToken = data?.retryToken; 

    const failureStates = ["rejected", "cancelled", "expired"];

    if(isFetching) return (
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
                    Cargando datos del pago
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

    if (error || !failureStates.includes(paymentStatus)) return (
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
                    Pago no rechazado
                </h1>
            </div>

            <ErrorMessage variant="standard">
                Error al cargar datos de pago Fallido
            </ErrorMessage>

            <p className="paragraph">
                Estado del Pago: {" "} 
                <strong>
                    {paymentStatus === "pending" ? "Pendiente"
                        : paymentStatus === "approved" ? "Aprobado"
                        : paymentStatus === "refunded" ? "Reembolsado"
                        : paymentStatus
                    }
                </strong>
            </p>

            <p className=''>
                Recarga la página, lo mas probable es que sea un error de conexión.
            </p>

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
    ); 

    if (failureStates.includes(paymentStatus))return (
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
                    ❌ Pago Fallido ❌
                </h1>
            </div>

            <XCircle
                size={70}
                className='text-red-500 mt-4'
            />
            
            <div className="flex flex-col items-center">

                <p className="paragraph">
                    Estado del Pago: {" "} 
                    <strong>
                        {paymentStatus === "rejected" ? "Rechazado" 
                            : paymentStatus === "cancelled" ? "Cancelado"
                            : paymentStatus === "expired" ? "Expirado"
                            : paymentStatus
                        }
                    </strong>
                </p>

                {rejectionReason && (
                    <p className="paragraph">
                        Motivo de declinación: {" "} 
                        <strong>{rejectionReason}</strong>
                    </p>
                )}

                <p className="paragraph">
                    Estado de la Orden: {" "} 
                    <strong>{orderStatus}</strong>
                </p>
            </div>

            {trackingNumber && retryToken && (
                <Link
                    href={`/checkout/retry/${orderId}?token=${retryToken}`}
                    className='button tracking-widest uppercase'
                >
                    Reintentar Pago
                </Link>
            )}

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
