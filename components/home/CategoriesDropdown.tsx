"use client";

import { CategoryCount } from "@/src/types";
import { ChevronDownIcon, Grid3x3, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

type CategoriesDropdownProps = {
    categories: CategoryCount[]; 
}

export default function CategoriesDropdown({ categories } : CategoriesDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 150); // Small delay before closing
    };

    // Get top 5 categories or all if less than 5
    const displayedCategories = categories.slice(0, 5);
    const hasMore = categories.length > 5;

    return (
        <div 
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={dropdownRef}
        >
            <button
                className="
                    flex-align gap-1
                    text-sm font-medium text-white 
                    hover:text-orange-100 transition-colors duration-200
                "
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                Colecciones
                <ChevronDownIcon
                    aria-hidden="true"
                    className={`size-5 text-gray-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>

            {/* Dropdown Menu */}
            <div
                className={`
                    absolute left-0 z-10 mt-2 w-72 origin-top-left
                    rounded-lg
                    bg-zinc-800/95 backdrop-blur-md shadow-xl ring-1 ring-white/10
                    border border-zinc-700
                    
                    transition-all duration-200 ease-out
                    ${isOpen 
                        ? 'opacity-100 scale-100 pointer-events-auto' 
                        : 'opacity-0 scale-95 pointer-events-none'
                    }
                `}
                role="menu"
                aria-orientation="vertical"
            >
                {/* Header */}
                <div className="px-4 py-3 border-b border-zinc-700/50">
                    <div className="flex items-center gap-2">
                        <Grid3x3 size={16} className="text-orange-300" />
                        <p className="text-sm font-semibold text-white">
                            Colecciones
                        </p>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">
                        Explora nuestras colecciones de joyas
                    </p>
                </div>

                {/* Categories List */}
                <div className="py-2" role="none">
                    {displayedCategories.length > 0 ? (
                        displayedCategories.map((categoryItem, index) => (
                            <Link
                                key={categoryItem.category}
                                href={`/home/products?category=${encodeURIComponent(categoryItem.category)}`}
                                onClick={() => setIsOpen(false)}
                                className={`
                                    flex items-center justify-between px-4 py-2.5
                                    text-sm text-gray-300 
                                    hover:bg-white/5 hover:text-orange-200
                                    transition-colors duration-150
                                    ${index === 0 ? 'border-t border-zinc-700/50' : ''}
                                `}
                                role="menuitem"
                            >
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                    <span className="text-orange-300/60 font-semibold text-xs">
                                        ◆
                                    </span>
                                    <span className="truncate">
                                        {categoryItem.category}
                                    </span>
                                </div>
                                <span className="ml-2 px-2 py-0.5 bg-orange-500/10 text-orange-300 rounded text-xs font-medium flex-shrink-0">
                                    {categoryItem.productCount}
                                </span>
                            </Link>
                        ))
                    ) : (
                        <div className="px-4 py-6 text-center">
                            <p className="text-sm text-zinc-400">
                                No hay categorías disponibles
                            </p>
                        </div>
                    )}
                </div>

                {/* View All Categories Button */}
                {hasMore && (
                    <div className="border-t border-zinc-700/50 px-4 py-2">
                        <Link
                            href="/home/products"
                            onClick={() => setIsOpen(false)}
                            className="
                                flex items-center justify-center gap-1
                                w-full px-3 py-2
                                text-xs font-semibold text-orange-300
                                bg-orange-500/10 hover:bg-orange-500/20
                                rounded transition-colors duration-150
                                group
                            "
                            role="menuitem"
                        >
                            <span>Ver todas las categorías</span>
                            <TrendingUp size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                        </Link>
                    </div>
                )}

                {/* Featured Section - Show popular collections */}
                {categories.length > 0 && (
                    <div className="border-t border-zinc-700/50 px-4 py-3 bg-zinc-800/50">
                        <p className="text-xs font-semibold text-zinc-400 mb-2 flex items-center gap-1">
                            <Sparkles size={12} />
                            COLECCIONES DESTACADAS
                        </p>
                        <div className="space-y-1">
                            {displayedCategories.slice(0, 2).map((categoryItem) => (
                                <Link
                                    key={`featured-${categoryItem.category}`}
                                    href={`/home/products?category=${encodeURIComponent(categoryItem.category)}`}
                                    onClick={() => setIsOpen(false)}
                                    className="
                                        block px-2 py-1.5 rounded text-xs
                                        text-zinc-300 hover:text-orange-200
                                        hover:bg-white/5
                                        transition-colors duration-150
                                        truncate
                                    "
                                >
                                    ★ {categoryItem.category}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}