"use client"; 
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { parsePaymentStatus, parseSortOrder } from "@/src/utils/params";
import AdminTableSkeleton from "@/components/skeletons/AdminTablesSkeleton";
import { getPayments } from "@/src/api/PaymentAPI";
import { useFilters } from "@/src/hooks/useFilters";
import PaymentsTable from "@/components/admin/payments/PaymentsTable";
import ErrorCard from "@/components/ui/ErrorCard";
import { XCircleIcon } from "lucide-react";

export default function AdminPaymentsView() {
    const searchParams = useSearchParams(); 
    const { update, resetParams, toggleSort } = useFilters(); 

    //* Search parameters
    const search = searchParams.get("search") || ""; 

    const status = parsePaymentStatus(searchParams.get("status")); 

    const sortBy = "date";
    const sortOrder = parseSortOrder(searchParams.get("sortOrder") || "desc"); 

    const page = parseInt(searchParams.get("page") || "1", 10)

    // startDate, and endDate from searchParams or default values
    const startDate = searchParams.get("startDate") ? new Date(searchParams.get("startDate")!) : undefined;
    const endDate = searchParams.get("endDate") ? new Date(searchParams.get("endDate")!) : undefined;

    const perPage = 10;

    const { data, isLoading, isError } = useQuery({
        queryKey: [
            "payments", 
            page, 
            search, 
            status, 
            sortBy, 
            sortOrder, 
            startDate,
            endDate,
        ],
        queryFn: () =>
            getPayments({
                page,
                perPage,
                status, 
                search, 
                startDate, 
                endDate, 
                sortBy, // always "date"
                sortOrder, 
            }),
        retry: false,
    });

	const payments = data?.payments || [];
    const totalPayments = data?.totalPayments || 0; 
	const totalPages = data?.totalPages || 1;

    const hasActiveSearch = Boolean(
        status ||
        search || 
        startDate ||
        endDate
    );

	if (isError) {
        return (
            <ErrorCard
                icon={XCircleIcon}
                title="Error al cargar pagos."
                description="Un error ha ocurrido al cargar los pagos, comprueba tu conexión a internet y recarga la página."
                errorText={"API request error"}
                showPrevious
                showReload
            />
        )
	}

	if (isLoading) return <AdminTableSkeleton />;

    return (
        <PaymentsTable
            payments={payments}
            sortBy={sortBy}
            sortOrder={sortOrder}
            hasActiveSearch={hasActiveSearch}
            onFilterChange={update}
            onClearFilters={resetParams}
            onSortChange={toggleSort}
            totalPayments={totalPayments}
            totalPages={totalPages}
            page={page}
            status={status}
            search={search}
        />
    )
}
