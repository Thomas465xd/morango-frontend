"use client"; 
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { parseBoolean, parseSortOrder } from "@/src/utils/params";
import AdminTableSkeleton from "@/components/skeletons/AdminTablesSkeleton";
import { useFilters } from "@/src/hooks/useFilters";
import { getUsers } from "@/src/api/AuthAPI";
import UsersTable from "@/components/admin/users/UsersTable";
import ErrorCard from "@/components/ui/ErrorCard";
import { UserRoundX } from "lucide-react";

export default function AdminUsersView() {
    const searchParams = useSearchParams(); 
    const { update, resetParams, toggleSort } = useFilters(); 

    //* Search parameters
    const search = searchParams.get("search") || ""; 
    const confirmed = parseBoolean(searchParams.get("confirmed"), false);

    const sortBy = "name";
    const sortOrder = parseSortOrder(searchParams.get("sortOrder") || "desc"); 

    const page = parseInt(searchParams.get("page") || "1", 10)

    const perPage = 10;

    const { data, isLoading, isError } = useQuery({
        queryKey: [
            "users", 
            page, 
            confirmed, 
            search, 
            sortBy, 
            sortOrder, 
        ],
        queryFn: () =>
            getUsers({
                page,
                perPage,
                confirmed, 
                search, 
                sortBy, // always "name"
                sortOrder, 
            }),
        retry: false,
    });

	const users = data?.users || [];
    const totalUsers = data?.totalUsers || 0; 
	const totalPages = data?.totalPages || 1;

    const hasActiveSearch = Boolean(
        search ||
        confirmed
    );

	if (isError) {
        return (
            <ErrorCard
                icon={UserRoundX}
                title="Error al cargar usuarios."
                description="Un error ha ocurrido al cargar los usuarios, comprueba tu conexión a internet y recarga la página."
                errorText={"API getUsers request error"}
                showPrevious
                showReload
            />
        )
	}

	if (isLoading) return <AdminTableSkeleton />;

    return (
        <UsersTable
            users={users}
            sortBy={sortBy}
            sortOrder={sortOrder}
            hasActiveSearch={hasActiveSearch}
            search={search}
            confirmed={confirmed}
            onFilterChange={update}
            onClearFilters={resetParams}
            onSortChange={toggleSort}
            totalUsers={totalUsers}
            totalPages={totalPages}
            page={page}
        />
    )
}
