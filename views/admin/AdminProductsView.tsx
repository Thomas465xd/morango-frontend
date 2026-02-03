"use client"; 
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { parseBoolean, parseProductType, parseSortByProducts, parseSortOrder } from "@/src/utils/params";
import AdminTableSkeleton from "@/components/skeletons/AdminTablesSkeleton";
import { useFilters } from "@/src/hooks/useFilters";
import ProductsTable from "@/components/admin/products/ProductsTable";
import { getProducts } from "@/src/api/ProductAPI";
import ErrorCard from "@/components/ui/ErrorCard";
import { XCircleIcon } from "lucide-react";

export default function AdminProductsView() {
    const searchParams = useSearchParams();
    const { setFilter, resetParams, toggleSort } = useFilters(); 

    //* Search parameters
    const search = searchParams.get("search") || ""; 

    const productType = parseProductType(searchParams.get("productType") || ""); 

    const tags = searchParams.getAll("tags").filter(Boolean); 
    const category = searchParams.get("category") || ""; 
    const minPrice = Number(searchParams.get("minPrice") || 0); 
    const maxPrice = Number(searchParams.get("maxPrice") || 0); 

    const sortBy = parseSortByProducts(searchParams.get("sortBy") || "name"); 
    const sortOrder = parseSortOrder(searchParams.get("sortOrder") || "desc"); 

    const sale = parseBoolean(searchParams.get("sale"), false); 
    const isActive = parseBoolean(searchParams.get("isActive"), true);

    const page = parseInt(searchParams.get("page") || "1", 10)

    const perPage = 10;

    const { data, isLoading, isError } = useQuery({
        queryKey: [
            "products", 
            page, 
            search, 
            productType, 
            tags, 
            category, 
            minPrice, 
            maxPrice, 
            sortBy, 
            sortOrder, 
            sale, 
            isActive, 
        ],
        queryFn: () =>
            getProducts({
                page,
                perPage,
                productType, 
                tags, 
                category, 
                minPrice, 
                maxPrice, 
                sortBy, 
                sortOrder, 
                sale, 
                isActive, 
                search,
            }),
        retry: false,
    });

    const products = data?.products || [];
    const totalProducts = data?.totalProducts || 0; 
	const totalPages = data?.totalPages || 1;

    const hasActiveSearch: boolean =
        Boolean(search) ||
        Boolean(productType) ||
        tags.length > 0 ||
        category !== "" ||
        minPrice > 0 ||
        maxPrice > 0 ||
        sale ||
        searchParams.has("isActive");

	if (isError) {
        return (
            <ErrorCard
                icon={XCircleIcon}
                title="Error al cargar productos."
                description="Un error ha ocurrido al cargar los productos, comprueba tu conexión a internet y recarga la página."
                errorText={"API request error"}
                showPrevious
                showReload
            />
        )
	}

	if (isLoading) return <AdminTableSkeleton />;

    return (
        <ProductsTable 
            products={products}
            totalPages={totalPages}
            totalProducts={totalProducts}
            page={page}
            sortBy={sortBy}
            sortOrder={sortOrder}
            hasActiveSearch={hasActiveSearch}
            sale={sale}
            isActive={isActive}
            minPrice={minPrice}
            maxPrice={maxPrice}
            category={category}
            tags={tags}
            search={search}
            productType={productType}
            onFilterChange={setFilter}
            onClearFilters={resetParams}
            onSortChange={toggleSort}
        />
    )
}
