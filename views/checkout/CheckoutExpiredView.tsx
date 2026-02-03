"use client";
import { createOrder } from "@/src/api/OrderAPI";
import { CreateOrderForm, PublicOrder } from "@/src/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type CheckoutExpiredViewProps = {
    trackingNumber: string;
    order: PublicOrder; 
};

export function CheckoutExpiredView({ trackingNumber, order }: CheckoutExpiredViewProps) {
    const router = useRouter(); 
    const queryClient = useQueryClient(); 

    //! Mutation for registering a DRAFT order 
    // customer & address info not set yet, redirect to checkout form page
    const { mutate, isPending } = useMutation({
        mutationFn: (formData: CreateOrderForm) => createOrder(formData),
        onError: (error) => {
            toast.error(error.message || "Error al registrar orden ❌");
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            toast.success("Orden Reemitida exitosamente 🎉");
            router.push(`/checkout/${data.order.trackingNumber}`)
        },
    });

    // Construct array of items to reemit the order
    const items = order.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity
    }));

    const handleReemit = async () => {
        mutate({ items })
    };

    return (
        <main className="mx-auto max-w-2xl px-4 pt-24 pb-24 sm:px-6 lg:px-8">
            <div className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-8 sm:p-12 text-center">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
                        <AlertCircle className="w-10 h-10 text-amber-600 dark:text-amber-400" />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-orange-100 mb-3">
                    Orden Expirada
                </h1>

                {/* Tracking Number */}
                <p className="text-zinc-600 dark:text-zinc-400 mb-2">
                    Número de orden:{" "}
                    <span className="font-mono font-semibold text-zinc-900 dark:text-orange-200">
                        {trackingNumber}
                    </span>
                </p>

                {/* Description */}
                <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-md mx-auto">
                    Esta orden ha expirado. Las órdenes tienen un tiempo límite de 20 minutos para completar el pago.
                    Puedes reemitir la orden para continuar con tu compra.
                </p>

                {/* Reemit Button */}
                <button
                    onClick={handleReemit}
                    disabled={isPending}
                    className="button h-14 px-8 inline-flex items-center justify-center gap-2 tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? (
                        <>
                            <RefreshCw className="w-5 h-5 animate-spin" />
                            REEMITIENDO...
                        </>
                    ) : (
                        <>
                            <RefreshCw className="w-5 h-5" />
                            REEMITIR ORDEN
                        </>
                    )}
                </button>

                {/* Help Text */}
                <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-6">
                    ¿Necesitas ayuda?{" "}
                    <a href="/home/contact" className="text-orange-500 dark:text-orange-300 hover:underline">
                        Contáctanos
                    </a>
                </p>
            </div>
        </main>
    );
}