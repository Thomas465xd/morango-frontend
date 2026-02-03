"use client"; 
import CheckoutForm from "@/components/checkout/CheckoutForm";
import CheckoutViewSkeleton from "@/components/skeletons/CheckoutViewSkeleton";
import { getOrderByNumber } from "@/src/api/OrderAPI";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { CheckoutExpiredView } from "./CheckoutExpiredView";
import ErrorCard from "@/components/ui/ErrorCard";
import { PackageX } from "lucide-react";

type CheckoutViewProps = {
    trackingNumber: string; 
}

export default function CheckoutView({ trackingNumber } :  CheckoutViewProps) {
    //! Get order by ID
    const { data, isLoading, isError } = useQuery({
        queryKey: ["orders", trackingNumber],
        queryFn: () => getOrderByNumber(trackingNumber),
        retry: false, 
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 1000 * 60 * 20, // 20 minutes = time it takes for an order to expire
    }); 

    const order = useMemo(() => data, [data]);

    // Return custom error component
    if (isError) return (
        <ErrorCard
            icon={PackageX}
            title="Orden No Encontrada"
            description="No pudimos encontrar la orden que estás buscando. Verifica que el número de orden sea correcto o intenta nuevamente más tarde."
            errorText={"404 - Order Not Found"}
            showHome
            showContact
        />
    );

    // Custom checkout page skeleton loader
    if (isLoading) return (
        <CheckoutViewSkeleton />
    ); 

    // Ensures no typescript errors later...
    if(!order) return (
        <ErrorCard
            icon={PackageX}
            title="Orden No Encontrada"
            description="No pudimos encontrar la orden que estás buscando. Verifica que el número de orden sea correcto o intenta nuevamente más tarde."
            errorText={"404 - Order Not Found"}
            showHome
            showContact
        />
    )

    if(order.status !== "Esperando Pago") return (
        <CheckoutExpiredView
            trackingNumber={trackingNumber}
            order={order}
        />
    ); 

    return (
        <CheckoutForm 
            order={order}
        />
    )
}
