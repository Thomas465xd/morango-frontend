"use client"; 
import PaymentDetails from '@/components/admin/payments/PaymentDetails';
import { getPaymentByIdAdmin } from '@/src/api/PaymentAPI';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { CreditCard } from 'lucide-react';
import ErrorCard from '@/components/ui/ErrorCard';
import AdminPaymentDetailsSkeleton from '@/components/skeletons/AdminPaymentDetailsSkeleton';

type AdminPaymentDetailsViewProps = {
    paymentId: string; 
}

export default function AdminPaymentDetailsView({ paymentId } : AdminPaymentDetailsViewProps) {
    //* Get payment by ID
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["payments", paymentId],
        queryFn: () => getPaymentByIdAdmin(paymentId),
        retry: false, 
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: Infinity,
    }); 

    const payment = useMemo(() => data, [data]);

    if (isLoading) return (
        <AdminPaymentDetailsSkeleton />
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
                title="Pago no Encontrado."
                description="El pago solicitado no existe, comprueba tu conexión a internet y recarga la página si crees que se trata de un error."
                errorText="404 - Payment Not Found"
                showPrevious
                showReload
            />
        );
    }

    return (
        <PaymentDetails
            payment={payment}
        />
    )
}
