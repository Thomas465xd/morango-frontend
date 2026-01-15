"use client"; 
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Pen,
	Tag,
	Package,
	DollarSign,
	AlertCircle,
	Box,
    ThumbsUp,
    ThumbsDown
} from "lucide-react";
import { toast } from "react-toastify";
import { EnrichedProduct } from "@/src/types/product";
import Pagination from "@/components/ui/Pagination";
import SearchBar from "@/components/ui/SearchBar";
import Dialog from "@/components/ui/Dialog";
import { parseBoolean, parseProductType, parseSortBy, parseSortOrder, ProductType, productTypeValues, SortBy } from "@/src/utils/params";
import {
    ArrowUpDown,
    ArrowUp,
    ArrowDown,
    X,
    Plus,
} from "lucide-react";
import AdminTableSkeleton from "@/components/skeletons/AdminTablesSkeleton";
import ProductEntry from "./ProductEntry";
import { getProducts } from "@/src/api/ProductAPI";

export default function ProductsTable() {
    const searchParams = useSearchParams();

    //* Search parameters
    const search = searchParams.get("search") || ""; 

    const productType = parseProductType(searchParams.get("productType") || ""); 

    const tags = searchParams.getAll("tags") || ""; 
    const category = searchParams.get("category") || ""; 
    const minPrice = Number(searchParams.get("minPrice") || 0); 
    const maxPrice = Number(searchParams.get("maxPrice") || 0); 

    const sortBy = parseSortBy(searchParams.get("sortBy") || "name"); 
    const sortOrder = parseSortOrder(searchParams.get("sortOrder") || "desc"); 

    const sale = parseBoolean(searchParams.get("sale"), false); 
    const isActive = parseBoolean(searchParams.get("isActive"), true);

    const page = parseInt(searchParams.get("page") || "1", 10)

	const router = useRouter();

    const [showProductTypeModal, setShowProductTypeModal] = useState(false);
    const [tagInput, setTagInput] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>(tags as string[]);

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

    const hasActiveSearch =
        search ||
        productType ||
        tags.length > 0 ||
        category ||
        minPrice > 0 ||
        maxPrice > 0 ||
        sale ||
        searchParams.has("isActive");
        
	if (isError) {
		toast.error("Error al cargar productos");
		return ;
	}

	if (isLoading) return <AdminTableSkeleton />;



    // Will extract this logic to reuse it across different components
    const updateSearchParams = (key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams.toString());
        
        // console.log(key, value)

        if (value === null || value === "") {
            params.delete(key);
        } else {
            params.set(key, value);
        }
        
        // Reset to page 1 when filters change
        params.set("page", "1");

        // console.log(params.get("isActive"))
        
        router.push(`?${params.toString()}`);
    };

    const toggleSort = (field: SortBy) => {
        const params = new URLSearchParams(searchParams.toString());
        
        if (sortBy === field) {
            // Toggle sort order
            const newOrder = sortOrder === "asc" ? "desc" : "asc";
            params.set("sortOrder", newOrder);
        } else {
            // New field, default to asc
            params.set("sortBy", field);
            params.set("sortOrder", "asc");
        }
        
        params.set("page", "1");
        router.push(`?${params.toString()}`);
    };

    const getSortIcon = (field: SortBy) => {
    if (sortBy !== field) {
        return <ArrowUpDown size={14} className="text-zinc-400" />;
    }
    return sortOrder === "asc" 
        ? <ArrowUp size={14} className="text-white" />
        : <ArrowDown size={14} className="text-white" />;
    };

    const handleProductTypeSelect = (type: ProductType) => {
        updateSearchParams("productType", type);
        setShowProductTypeModal(false);
    };

    const handleTagAdd = () => {
        if (tagInput.trim() && !selectedTags.includes(tagInput.trim())) {
            const newTags = [...selectedTags, tagInput.trim()];
            setSelectedTags(newTags);
            
            const params = new URLSearchParams(searchParams.toString());
            params.delete("tags");
            newTags.forEach(tag => params.append("tags", tag));
            params.set("page", "1");
            
            router.push(`?${params.toString()}`);
            setTagInput("");
        }
    };

    const handleTagRemove = (tagToRemove: string) => {
        const newTags = selectedTags.filter(tag => tag !== tagToRemove);
        setSelectedTags(newTags);
        
        const params = new URLSearchParams(searchParams.toString());
        params.delete("tags");
        newTags.forEach(tag => params.append("tags", tag));
        params.set("page", "1");
        
        router.push(`?${params.toString()}`);
    };

    const toggleSale = () => {
        updateSearchParams("sale", sale ? null : "true");
    };

    const toggleIsActive = () => {
        console.log(isActive)
        updateSearchParams("isActive", isActive ? "false" : "true");
    };

    const clearAllFilters = () => {
        router.push("?page=1");
        setSelectedTags([]);
    };

	return (
		<div className="overflow-hidden rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 mt-12">
			<div className="bg-white dark:bg-zinc-800 p-4 border-b border-zinc-200 dark:border-zinc-700">
                <div className="space-y-4">
                    <div className="">
                        <SearchBar
                            route="admin/products"
                            param="search"
                            inputType="text"
                            formText="Buscar productos por nombre o descripción"
                            searchText="Producto"
                            defaultValue={search}
                            mini
                        />
                    </div>

                    {/* Filter controls */}
                    <div className="flex flex-wrap gap-3 items-center">
                        {/* Sale checkbox */}
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={sale}
                                onChange={toggleSale}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <span className="text-sm text-zinc-700 dark:text-zinc-300">
                                Solo en oferta
                            </span>
                        </label>

                        {/* Product Type Modal Trigger */}
                        <div className="relative">
                            <button
                                onClick={() => setShowProductTypeModal(!showProductTypeModal)}
                                className="px-3 py-1.5 text-sm border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-600 transition-colors"
                            >
                                {productType || "Tipo de producto"}
                                {productType && (
                                    <X
                                        size={14}
                                        className="inline ml-2"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            updateSearchParams("productType", null);
                                        }}
                                    />
                                )}
                            </button>

                            {/* Product Type Modal */}
                            {showProductTypeModal && (
                            <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 rounded-md shadow-lg z-10">
                                {productTypeValues.map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => handleProductTypeSelect(type)}
                                        className="w-full text-left px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-600 transition-colors"
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                            )}
                        </div>

                        {/* Tags input */}
                        <div className="flex items-center gap-2">
                            <div className="relative">
                            <input
                                type="text"
                                placeholder="Agregar etiqueta..."
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleTagAdd();
                                }
                                }}
                                className="w-40 px-3 py-1.5 text-sm border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            </div>
                            <button
                                onClick={handleTagAdd}
                                className="p-1.5 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition-colors"
                                title="Agregar etiqueta"
                            >
                                <Plus size={16} />
                            </button>
                        </div>

                        {/* Clear all filters */}
                        {hasActiveSearch && (
                            <button
                                onClick={clearAllFilters}
                                className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                            >
                                Limpiar filtros
                            </button>
                        )}

                        {/* Active tags display */}
                        {selectedTags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {selectedTags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-md"
                                    >
                                        {tag}
                                        <button
                                        onClick={() => handleTagRemove(tag)}
                                        className="hover:text-blue-600 dark:hover:text-blue-200"
                                        >
                                        <X size={12} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
			</div>

			<div className="overflow-x-auto">
				<table className="w-full">
					<thead>
						<tr className="bg-gradient-to-r from-zinc-800 to-zinc-700 text-left text-sm text-white">
							<th className="w-8 px-2 py-4"></th>
                            
                            {/* Producto - Sortable */}
                            <th className="px-6 py-4 font-medium">
                                <button
                                    onClick={() => toggleSort("name")}
                                    className="flex items-center gap-2 hover:text-zinc-300 
                                    transition-colors cursor-pointer group relative"
                                >
                                    <Package size={16} />
                                    <span>Producto</span>
                                    {getSortIcon("name")}

                                    <Dialog position="bottom">
                                        Filtrar ↑↓
                                    </Dialog>
                                </button>
                            </th>

                            {/* Tipo - Filterable */}
                            <th className="px-6 py-4 font-medium">
                                <div className="flex items-center gap-2">
                                    <Tag size={16} />
                                    <span>Tipo</span>
                                </div>
                            </th>
                    
                            {/* Categoría - Sortable */}
                            <th className="px-6 py-4 font-medium">
                                <button
                                    onClick={() => toggleSort("category")}
                                    className="flex items-center gap-2 hover:text-zinc-300 
                                    transition-colors cursor-pointer group relative"
                                >
                                    <Box size={16} />
                                    <span>Categoría</span>
                                    {getSortIcon("category")}

                                    <Dialog position="bottom">
                                        Filtrar ↑↓
                                    </Dialog>
                                </button>
                            </th>

                            {/* Precio - Sortable */}
                            <th className="px-6 py-4 font-medium">
                                <button
                                    onClick={() => toggleSort("basePrice")}
                                    className="flex items-center gap-2 hover:text-zinc-300 
                                    transition-colors cursor-pointer group relative"
                                >
                                    <DollarSign size={16} />
                                    <span>Precio</span>
                                    {getSortIcon("basePrice")}

                                    <Dialog position="bottom">
                                        Filtrar ↑↓
                                    </Dialog>
                                </button>
                            </th>

                            {/* Stock */}
                            <th className="px-6 py-4 font-medium">
                                <div className="flex items-center gap-2">
                                    <Package size={16} />
                                    <span>Stock</span>
                                </div>
                            </th>

                            {/* Estado - Filterable */}
                            <th className="px-6 py-4 font-medium">
                                <button
                                    onClick={toggleIsActive}
                                    className="flex items-center gap-2 hover:text-zinc-300 
                                    transition-colors cursor-pointer group relative"
                                >
                                    <AlertCircle size={16} />
                                    <span>Estado</span>
                                    {isActive ? (
                                        <ThumbsUp size={16} className="text-xs text-green-400" />
                                    ) : (
                                        <ThumbsDown size={16} className="text-xs text-red-300" />
                                    )}

                                    <Dialog position="bottom">
                                        Filtrar ↑↓
                                    </Dialog>
                                </button>
                            </th>

                            <th className="px-6 py-4 font-medium">
                                <div className="flex items-center gap-2">
                                    <Pen size={16} />
                                    <span>Acciones</span>
                                </div>
                            </th>
						</tr>
					</thead>

					<tbody className="divide-y divide-zinc-200 dark:divide-zinc-700 bg-white dark:bg-zinc-800">
						{products.length > 0 ? 
							products.map((product: EnrichedProduct) => {
                                return (
                                    <ProductEntry
                                        key={product.id}
                                        product={product}
                                    />
                                )
                            }
                        ) : (
							<tr>
								<td
									colSpan={8}
									className="px-6 py-8 text-center text-zinc-500 dark:text-zinc-400"
								>
									No se encontraron productos
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			<div className="bg-zinc-50 dark:bg-zinc-800 px-6 py-3 border-t border-zinc-200 dark:border-zinc-700">
				<div className="flex items-center justify-between">
					<p className="text-xs text-zinc-500 dark:text-zinc-400">
						Mostrando {products.length} de{" "}
						{totalProducts || 0} productos
					</p>
                    {totalPages > 1 && (
                        <Pagination
                            route="admin/products"
                            page={page}
                            totalPages={totalPages}
                        />
                    )}
				</div>
			</div>
		</div>
	);
}
