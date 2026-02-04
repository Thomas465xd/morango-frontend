"use client"; 
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { parseOrderStatus, parseSortOrder } from "@/src/utils/params";
import { getAuthUserOrders } from "@/src/api/OrderAPI";
import { useFilters } from "@/src/hooks/useFilters";
import ErrorCard from "@/components/ui/ErrorCard";
import { PackageXIcon } from "lucide-react";
import UserOrdersListing from "@/components/home/profile/UserOrdersListing";
import UserOrdersViewSkeleton from "@/components/skeletons/UserOrdersViewSkeleton";

export default function UserOrdersView() {
    const searchParams = useSearchParams(); 
    const { update, resetParams, toggleSort } = useFilters(); 

    //* Search parameters
    const status = parseOrderStatus(searchParams.get("status")); 
    const sortBy = "date";
    const sortOrder = parseSortOrder(searchParams.get("sortOrder") || "desc"); 

    const page = parseInt(searchParams.get("page") || "1", 10)

    // Add trackingNumber from searchParams or default values
    const trackingNumber = searchParams.get("trackingNumber") || "";

    const perPage = 10;

    const { data, isLoading, isError, error } = useQuery({
        queryKey: [
            "orders", 
            page, 
            status, 
            trackingNumber,
            sortBy, 
            sortOrder,  
        ],
        queryFn: () =>
            getAuthUserOrders({
                page,
                perPage,
                trackingNumber,
                status, 
                sortBy, // always "date"
                sortOrder, 
            }),
        retry: false,
    });

	const orders = data?.orders || [];
    const totalOrders = data?.totalOrders || 0; 
	const totalPages = data?.totalPages || 1;

    const hasActiveSearch = Boolean(
        status ||
        trackingNumber
    );

	if (isError) {
        const errorMessage = error instanceof Error 
            ? error.message 
            : "API getOrders request error";

        return (
            <ErrorCard
                icon={PackageXIcon}
                title="Error al cargar ordenes."
                description="Un error ha ocurrido al cargar tus ordenes, comprueba tu conexión a internet y recarga la página."
                errorText={errorMessage}
                showPrevious
                showReload
            />
        )
	}

	if (isLoading) return <UserOrdersViewSkeleton />;

    return (
        <UserOrdersListing
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
            trackingNumber={trackingNumber}
            status={status}
        />
    )
}
