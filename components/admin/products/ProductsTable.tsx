"use client"; 
import { useState, useEffect, useRef } from "react";
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
import { EnrichedProduct } from "@/src/types/product";
import Pagination from "@/components/ui/Pagination";
import SearchBar from "@/components/ui/SearchBar";
import Dialog from "@/components/ui/Dialog";
import { ProductSortBy, ProductType, productTypeValues, SortOrder, } from "@/src/utils/params";
import {
    ArrowUpDown,
    ArrowUp,
    ArrowDown,
    X,
    Plus,
} from "lucide-react";
import ProductEntry from "./ProductEntry";

type ProductsTableProps = {
    products: EnrichedProduct[]
    totalProducts: number
    totalPages: number 
    page: number 
    sortBy: ProductSortBy 
    sortOrder: SortOrder
    hasActiveSearch: boolean 

    // Params
    sale?: boolean
    isActive?: boolean 
    minPrice?: number 
    maxPrice?: number 
    category?: string 
    tags?: string[] 
    productType?: ProductType
    search?: string

    // URL params updates
    onFilterChange: (key: string, value: string | string[] | null) => void;
    onClearFilters: () => void;
    onSortChange: (field: ProductSortBy) => void;
}

export default function ProductsTable({
    products, 
    totalProducts, 
    totalPages, 
    page, 
    sortBy, 
    sortOrder, 
    hasActiveSearch, 
    sale, 
    isActive, 
    minPrice, 
    maxPrice, 
    category, 
    tags, 
    productType, 
    search,
    onFilterChange, 
    onClearFilters, 
    onSortChange
} : ProductsTableProps) {
    const [showProductTypeModal, setShowProductTypeModal] = useState(false);
    const [tagInput, setTagInput] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>(tags as string[]);
    const [minPriceInput, setMinPriceInput] = useState<string>(minPrice ? minPrice.toString() : "");
    const [maxPriceInput, setMaxPriceInput] = useState<string>(maxPrice ? maxPrice.toString() : "");
    
    const minPriceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const maxPriceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const getSortIcon = (field: ProductSortBy) => {
        if (sortBy !== field) {
            return <ArrowUpDown size={14} className="text-zinc-400" />
        }

        return sortOrder === "asc"
            ? <ArrowUp size={14} className="text-white" />
            : <ArrowDown size={14} className="text-white" />
    }

    const handleProductTypeSelect = (type: ProductType) => {
        onFilterChange("productType", type);
        setShowProductTypeModal(false);
    };
    
    const handleTagAdd = () => {
        const value = tagInput.trim();
        if (!value || selectedTags.includes(value)) return;

        const newTags = [...selectedTags, value];
        setSelectedTags(newTags);

        onFilterChange("tags", newTags);
        setTagInput("");
    };

    const handleTagRemove = (tagToRemove: string) => {
        const newTags = selectedTags.filter(tag => tag !== tagToRemove);
        setSelectedTags(newTags);

        onFilterChange("tags", newTags.length ? newTags : null);
    };

    const handleMinPriceChange = (value: string) => {
        setMinPriceInput(value);
        
        // Clear existing timeout
        if (minPriceTimeoutRef.current) {
            clearTimeout(minPriceTimeoutRef.current);
        }
        
        //! Debounce the API call | timeout before submitting filters to URL params
        minPriceTimeoutRef.current = setTimeout(() => {
            const numValue = value ? parseFloat(value) : 0;
            onFilterChange("minPrice", numValue > 0 ? numValue.toString() : null);
        }, 1000);
    };

    const handleMaxPriceChange = (value: string) => {
        setMaxPriceInput(value);
        
        // Clear existing timeout
        if (maxPriceTimeoutRef.current) {
            clearTimeout(maxPriceTimeoutRef.current);
        }
        
        // Debounce the API call
        maxPriceTimeoutRef.current = setTimeout(() => {
            const numValue = value ? parseFloat(value) : 0;
            onFilterChange("maxPrice", numValue > 0 ? numValue.toString() : null);
        }, 500);
    };

    const toggleSale = () => {
        onFilterChange("sale", sale ? null : "true");
    };

    const toggleIsActive = () => {
        onFilterChange("isActive", isActive ? "false" : "true");
    };

    const clearAllFilters = () => {
        // Clear any pending timeouts
        if (minPriceTimeoutRef.current) clearTimeout(minPriceTimeoutRef.current);
        if (maxPriceTimeoutRef.current) clearTimeout(maxPriceTimeoutRef.current);
        
        onClearFilters(); 
        setMinPriceInput("");
        setMaxPriceInput("");
    };

    // Cleanup timeouts on unmount
    useEffect(() => {
        return () => {
            if (minPriceTimeoutRef.current) clearTimeout(minPriceTimeoutRef.current);
            if (maxPriceTimeoutRef.current) clearTimeout(maxPriceTimeoutRef.current);
        };
    }, []);

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
                                            onFilterChange("productType", null);
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

                        {/* Price Range Inputs */}
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                placeholder="Precio mín."
                                value={minPriceInput}
                                onChange={(e) => handleMinPriceChange(e.target.value)}
                                className="w-32 px-3 py-1.5 text-sm border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="text-zinc-400">-</span>
                            <input
                                type="number"
                                placeholder="Precio máx."
                                value={maxPriceInput}
                                onChange={(e) => handleMaxPriceChange(e.target.value)}
                                className="w-32 px-3 py-1.5 text-sm border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
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
                                    onClick={() => onSortChange("name")}
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
                                    onClick={() => onSortChange("category")}
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
                                    onClick={() => onSortChange("basePrice")}
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
				</div>
                
                {totalPages > 1 && (
                    <Pagination
                        route="admin/products"
                        page={page}
                        totalPages={totalPages}
                    />
                )}
			</div>
		</div>
	);
}
