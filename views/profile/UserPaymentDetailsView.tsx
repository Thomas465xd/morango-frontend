"use client"; 
import { getPaymentByIdUser } from '@/src/api/PaymentAPI';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { CreditCard } from 'lucide-react';
import ErrorCard from '@/components/ui/ErrorCard';
import UserPaymentDetailsSkeleton from '../../components/skeletons/UserPaymentDetailsSkeleton';
import UserPaymentDetails from '../../components/home/profile/UserPaymentDetails';

type UserPaymentDetailsViewProps = {
    paymentId: string; 
}

export default function UserPaymentDetailsView({ paymentId } : UserPaymentDetailsViewProps) {
    //* Get payment by ID
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["payments", paymentId],
        queryFn: () => getPaymentByIdUser(paymentId),
        retry: false, 
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: Infinity,
    }); 

    const payment = useMemo(() => data, [data]);

    if (isLoading) return (
        <UserPaymentDetailsSkeleton />
    )

    if (isError) {
        const errorMessage = error instanceof Error 
            ? error.message 
            : "Ocurrió un error al cargar los detalles del pago";

        return (
            <ErrorCard
                icon={CreditCard}
                title="Error al cargar pago."
                description="Un error ha ocurrido al cargar tu pago, comprueba tu conexión a internet y recarga la página."
                errorText={errorMessage}
                showPrevious
                showReload
            />
        );
    }

    if (!payment) {
        return (
            <ErrorCard
                icon={CreditCard}
                title="Error al cargar pago."
                description="Un error ha ocurrido al cargar tu pago, comprueba tu conexión a internet y recarga la página."
                errorText={"API getAuthUserPaymentById request error"}
                showPrevious
                showReload
            />
        );  
    }

    return (
        <UserPaymentDetails
            payment={payment}
        />
    )
}
