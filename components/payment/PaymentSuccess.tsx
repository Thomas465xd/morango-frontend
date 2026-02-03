"use client"; 
import { getPaymentStatus } from "@/src/api/PaymentAPI";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, House } from "lucide-react";
import Link from "next/link";
import ErrorMessage from "../ui/ErrorMessage";
import Loader from "../ui/Loader";
import { useCartStore } from "@/src/store/useCartStore";
import { useEffect } from "react";

type PaymentSuccessProps = {
    orderId: string; 
}

export default function PaymentSuccess({ orderId } : PaymentSuccessProps) {
    const { clearCart, closeCart } = useCartStore(); 

    const { data, error, isFetching } = useQuery({
        queryKey: ["orders", orderId], 
        queryFn: () => getPaymentStatus(orderId), 
        retry: false,
    })

    const paymentStatus = data?.paymentStatus; 
    const orderStatus = data?.status; 
    const trackingNumber = data?.trackingNumber; 

    useEffect(() => {
        if (paymentStatus === "approved") {
            clearCart();
            closeCart(); 
        }
    }, [paymentStatus, clearCart]);


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
                    Cargando datos de pago
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

    if(error || paymentStatus !== "approved") return (
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
                    Pago no aprobado
                </h1>
            </div>

            <ErrorMessage variant="standard">
                Error al cargar datos de pago exitoso
            </ErrorMessage>

            <p className="paragraph">
                Estado del Pago: {" "} 
                <strong>{paymentStatus}</strong>
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
                size={70}
                className='text-green-500 mt-4'
            />
            
            <div className="flex flex-col items-center">

                <p className="paragraph">
                    Estado del Pago: {" "} 
                    <strong>Aprobado</strong>
                </p>

                <p className="paragraph">
                    Estado de la Orden: {" "} 
                    <strong>{orderStatus}</strong>
                </p>
            </div>

            <Link
                href={`/home/orders/public/${trackingNumber}`}
                className='button tracking-widest uppercase'
            >
                Seguimiento Orden
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
