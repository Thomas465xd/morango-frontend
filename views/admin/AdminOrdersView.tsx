"use client"; 
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { parseBoolean, parseOrderStatus, parseSortOrder } from "@/src/utils/params";
import AdminTableSkeleton from "@/components/skeletons/AdminTablesSkeleton";
import { getOrders } from "@/src/api/OrderAPI";
import { useFilters } from "@/src/hooks/useFilters";
import OrdersTable from "@/components/admin/orders/OrdersTable";
import ErrorCard from "@/components/ui/ErrorCard";
import { PackageXIcon } from "lucide-react";

export default function AdminOrdersView() {
    const searchParams = useSearchParams(); 
    const { update, resetParams, toggleSort } = useFilters(); 

    //* Search parameters
    const email = searchParams.get("email") || ""; 

    const status = parseOrderStatus(searchParams.get("status")); 
    const sortBy = "date";
    const sortOrder = parseSortOrder(searchParams.get("sortOrder") || "desc"); 
    const hasPayment = parseBoolean(searchParams.get("hasPayment"), false); 
    const includeArchived = parseBoolean(searchParams.get("includeArchived"), false); 
    const isGuest = parseBoolean(searchParams.get("isGuest"), false);

    const page = parseInt(searchParams.get("page") || "1", 10)

    // Add trackingNumber, startDate, and endDate from searchParams or default values
    const trackingNumber = searchParams.get("trackingNumber") || "";
    const startDate = searchParams.get("startDate") ? new Date(searchParams.get("startDate")!) : undefined;
    const endDate = searchParams.get("endDate") ? new Date(searchParams.get("endDate")!) : undefined;

    const perPage = 10;

    const { data, isLoading, isError } = useQuery({
        queryKey: [
            "orders", 
            page, 
            email, 
            status, 
            sortBy, 
            sortOrder, 
            hasPayment, 
            includeArchived,
            isGuest, 
            trackingNumber,
            startDate,
            endDate,
        ],
        queryFn: () =>
            getOrders({
                page,
                perPage,
                trackingNumber,
                status, 
                email, 
                hasPayment, 
                isGuest, 
                includeArchived, 
                startDate, 
                endDate, 
                sortBy, // always "date"
                sortOrder, 
            }),
        retry: false,
    });

	const orders = data?.orders || [];
    const totalOrders = data?.totalOrders || 0; 
	const totalPages = data?.totalPages || 1;

    const hasActiveSearch = Boolean(
        email ||
        status ||
        hasPayment ||
        isGuest ||
        trackingNumber ||
        startDate ||
        endDate
    );

	if (isError) {
        return (
            <ErrorCard
                icon={PackageXIcon}
                title="Error al cargar ordenes."
                description="Un error ha ocurrido al cargar las ordenes, comprueba tu conexión a internet y recarga la página."
                errorText={"API getOrders request error"}
                showPrevious
                showReload
            />
        )
	}

	if (isLoading) return <AdminTableSkeleton />;

    return (
        <OrdersTable 
            orders={orders}
            sortBy={sortBy}
            sortOrder={sortOrder}
            hasActiveSearch={hasActiveSearch}
            onFilterChange={update}
            onClearFilters={resetParams}
            onSortChange={toggleSort}
            totalOrders={totalOrders}
            totalPages={totalPages}
            page={page}
            hasPayment={hasPayment}
            email={email}
            trackingNumber={trackingNumber}
            isGuest={isGuest}
            includeArchived={includeArchived}
            status={status}
        />
    )
}
