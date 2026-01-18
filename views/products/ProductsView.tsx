"use client"; 
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import Pagination from "@/components/ui/Pagination";
import SearchBar from "@/components/ui/SearchBar";
import { parseBoolean, parseProductType, parseSortBy, parseSortOrder, ProductType, productTypeValues } from "@/src/utils/params";
import {
    X,
    Plus,
} from "lucide-react";
import ProductsViewSkeleton from "@/components/skeletons/ProductsViewSkeleton";
import { getProducts } from "@/src/api/ProductAPI";
import ProductListing from "@/components/products/ProductListing";
import { useMobile } from "@/src/hooks/useMobile";

export default function ProductsView() {
    const isMobile = useMobile(); 
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

    const page = parseInt(searchParams.get("page") || "1", 10)

	const router = useRouter();

    const [showProductTypeModal, setShowProductTypeModal] = useState(false);
    const [tagInput, setTagInput] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>(tags as string[]);

    // Filters modal states
    const [showFiltersModal, setShowFiltersModal] = useState(false);
    const [tempMinPrice, setTempMinPrice] = useState(minPrice);
    const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice);
    const [tempSortBy, setTempSortBy] = useState(sortBy);
    const [tempSortOrder, setTempSortOrder] = useState(sortOrder);

    // Apply filters function
    const applyFilters = () => {
        const params = new URLSearchParams(searchParams.toString());
        
        if (tempMinPrice > 0) {
            params.set("minPrice", tempMinPrice.toString());
        } else {
            params.delete("minPrice");
        }
        
        if (tempMaxPrice > 0) {
            params.set("maxPrice", tempMaxPrice.toString());
        } else {
            params.delete("maxPrice");
        }
        
        params.set("sortBy", tempSortBy);
        params.set("sortOrder", tempSortOrder);
        params.set("page", "1");
        
        router.push(`?${params.toString()}`);
        setShowFiltersModal(false);
    };

    useEffect(() => {
        if (showFiltersModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showFiltersModal]);

    useEffect(() => {
        const el = document.getElementById("products-start");
        if (!el) return;

        el.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, [page]);

	const perPage = isMobile ? 10 : 16;

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
                isActive: true, 
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
		return 
	}

    // TODO: change skeleton to ProductsViewSkeleton
	if (isLoading) return <ProductsViewSkeleton />;

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

    const clearAllFilters = () => {
        router.push("?page=1");
        setSelectedTags([]);
    };

	return (
		<div id="products-start">
			<div className="pb-8 border-b border-zinc-200 dark:border-zinc-700">
                <div className="space-y-4">
                    <div className="">
                        <SearchBar
                            route="admin/products"
                            param="search"
                            inputType="text"
                            formText="Buscar productos por nombre o descripción"
                            searchText="Productos"
                            defaultValue={search}
                            mini
                            hideSubmit
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
                                {productType || "Tipo de Joya (4)"}
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

            {/* Total Products Display & Filters Modal button*/}
            <div className="flex-between">
                <p className="tracking-widest mt-4 text-zinc-500 dark:text-zinc-400">
                    {totalProducts} PRODUCTOS
                </p>

                <button
                    onClick={() => setShowFiltersModal(true)}
                    className="tracking-widest mt-4 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-600 transition-colors cursor-pointer"
                >
                    FILTROS
                </button>
            </div>

            {/* Filters Sidebar Modal */}

            {/* Backdrop */}
            <div
                onClick={() => setShowFiltersModal(false)}
                className={`
                    fixed inset-0 bg-black/50 z-50
                    transition-opacity duration-300
                    ${showFiltersModal ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
                `}
            />
            
            {/* Sidebar */}
            <aside
                className={`
                    fixed top-0 right-0 h-full w-full sm:w-96
                    bg-white dark:bg-zinc-900 z-60 shadow-2xl overflow-y-auto
                    transition-transform duration-300 ease-out
                    ${showFiltersModal ? "translate-x-0" : "translate-x-full"}
                `}
            >
                {/* Header */}
                <div className="sticky top-0 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 tracking-wider">
                        FILTROS
                    </h2>
                    <button
                        onClick={() => setShowFiltersModal(false)}
                        className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                    >
                        <X size={20} className="text-zinc-600 dark:text-zinc-400" />
                    </button>
                </div>

                {/* Filters Content */}
                <div className="px-6 py-4 space-y-6">
                    {/* Price Range */}
                    <div className="border-b border-zinc-200 dark:border-zinc-700 pb-6">
                        <button
                            className="w-full flex items-center justify-between text-left mb-4"
                        >
                            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 tracking-wider">
                                PRECIO
                            </h3>
                        </button>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs text-zinc-600 dark:text-zinc-400 mb-1">
                                    Precio mínimo
                                </label>
                                <input
                                    type="number"
                                    value={tempMinPrice || ""}
                                    onChange={(e) => setTempMinPrice(Number(e.target.value))}
                                    placeholder="$0"
                                    className="w-full px-3 py-2 text-sm border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-200"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-zinc-600 dark:text-zinc-400 mb-1">
                                    Precio máximo
                                </label>
                                <input
                                    type="number"
                                    value={tempMaxPrice || ""}
                                    onChange={(e) => setTempMaxPrice(Number(e.target.value))}
                                    placeholder="Sin límite"
                                    className="w-full px-3 py-2 text-sm border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-200"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sort Options */}
                    <div className="border-b border-zinc-200 dark:border-zinc-700 pb-6">
                        <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 tracking-wider mb-4">
                            ORDENAR POR
                        </h3>
                        <div className="space-y-2">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="radio"
                                    name="sortBy"
                                    checked={tempSortBy === "name" && tempSortOrder === "asc"}
                                    onChange={() => {
                                        setTempSortBy("name");
                                        setTempSortOrder("asc");
                                    }}
                                    className="w-4 h-4 text-orange-300 dark:text-orange-200 focus:ring-orange-300 dark:focus:ring-orange-200"
                                />
                                <span className="text-sm text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">
                                    Nombre (A-Z)
                                </span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="radio"
                                    name="sortBy"
                                    checked={tempSortBy === "name" && tempSortOrder === "desc"}
                                    onChange={() => {
                                        setTempSortBy("name");
                                        setTempSortOrder("desc");
                                    }}
                                    className="w-4 h-4 text-orange-300 dark:text-orange-200 focus:ring-orange-300 dark:focus:ring-orange-200"
                                />
                                <span className="text-sm text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">
                                    Nombre (Z-A)
                                </span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="radio"
                                    name="sortBy"
                                    checked={tempSortBy === "basePrice" && tempSortOrder === "asc"}
                                    onChange={() => {
                                        setTempSortBy("basePrice");
                                        setTempSortOrder("asc");
                                    }}
                                    className="w-4 h-4 text-orange-300 dark:text-orange-200 focus:ring-orange-300 dark:focus:ring-orange-200"
                                />
                                <span className="text-sm text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">
                                    Precio: Menor a Mayor
                                </span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="radio"
                                    name="sortBy"
                                    checked={tempSortBy === "basePrice" && tempSortOrder === "desc"}
                                    onChange={() => {
                                        setTempSortBy("basePrice");
                                        setTempSortOrder("desc");
                                    }}
                                    className="w-4 h-4 text-orange-300 dark:text-orange-200 focus:ring-orange-300 dark:focus:ring-orange-200"
                                />
                                <span className="text-sm text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">
                                    Precio: Mayor a Menor
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Footer with Apply Button */}
                <div className="sticky bottom-0 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-700 px-6 py-4">
                    <button
                        onClick={applyFilters}
                        className="w-full py-3 bg-zinc-900 dark:bg-orange-200 text-white dark:text-zinc-900 font-medium tracking-wider hover:bg-zinc-800 dark:hover:bg-orange-300 transition-colors rounded-md"
                    >
                        APLICAR
                    </button>
                </div>
            </aside>

            {/* Product Listing*/}
            {products.length > 0 ? (
                <ProductListing
                    products={products}
                />
            ) : (
                <p
                    className="px-6 py-8 text-center text-zinc-500 dark:text-zinc-400"
                >
                    No se encontraron productos
                </p>
            )}

			<div className="px-6 py-3">
				<div className="flex items-center justify-between">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Mostrando {products.length} de{" "}
                        {totalProducts || 0} productos
                    </p>
				</div>

                {totalPages > 1 && (
                    <Pagination
                        route="home/products"
                        page={page}
                        totalPages={totalPages}
                    />
                )}
			</div>
		</div>
	);
}
