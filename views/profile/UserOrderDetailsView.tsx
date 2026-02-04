"use client"; 
import UserOrderDetails from "@/components/home/profile/UserOrderDetails";
import UserOrderDetailsSkeleton from "@/components/skeletons/UserOrderDetailsSkeleton";
import ErrorCard from "@/components/ui/ErrorCard";
import { getAuthUserOrderById } from "@/src/api/OrderAPI";
import { useQuery } from "@tanstack/react-query";
import { PackageXIcon } from "lucide-react";
import { useMemo } from "react";

type UserOrderDetailsViewProps = {
    orderId: string; 
}

export default function UserOrderDetailsView({ orderId } :  UserOrderDetailsViewProps) {
    //! Get order by ID (auth tracking)
    const { data, isLoading, isError } = useQuery({
        queryKey: ["orders", orderId],
        queryFn: () => getAuthUserOrderById(orderId),
        retry: false, 
    });

    const order = useMemo(() => data, [data]);

    if(isLoading) {
        return <UserOrderDetailsSkeleton />
    }

    if(isError) {
        return (
            <ErrorCard
                icon={PackageXIcon}
                title="Error al cargar orden."
                description={`Un error ha ocurrido al cargar la orden ${orderId}, comprueba tu conexión a internet y recarga la página.`}
                errorText={"API getOrders request error"}
                showPrevious
                showReload
            />
        )
    }

    if(order) return (
        <UserOrderDetails
            order={order}
        />
    )
}
