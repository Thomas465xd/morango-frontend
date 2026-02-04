"use client"; 
import PublicOrderDetails from "@/components/orders/PublicOrderDetails";
import PublicOrderDetailsSkeleton from "@/components/skeletons/PublicOrderDetailsSkeleton";
import ErrorCard from "@/components/ui/ErrorCard";
import { getOrderByNumber } from "@/src/api/OrderAPI";
import { useQuery } from "@tanstack/react-query";
import { PackageX } from "lucide-react";
import { useMemo } from "react";

type PublicOrderViewProps = {
    trackingNumber: string; 
}

export default function PublicOrderView({ trackingNumber } :  PublicOrderViewProps) {
    //! Get order by tracking number (public tracking)
    const { data, isLoading, isError } = useQuery({
        queryKey: ["orders", trackingNumber],
        queryFn: () => getOrderByNumber(trackingNumber),
        retry: false, 
    });

    const order = useMemo(() => data, [data]);

    if(isLoading) {
        return <PublicOrderDetailsSkeleton />
    }

    if(isError) {
        return (
            <ErrorCard
                icon={PackageX}
                title="Error al cargar orden."
                description="Un error ha ocurrido al cargar los detalles de la orden, comprueba tu conexión a internet y recarga la página."
                errorText={"API getOrderByNumber request error"}
                showPrevious
                showReload
            />
        )
    }

    if(order) return (
        <PublicOrderDetails
            order={order}
        />
    )
}
