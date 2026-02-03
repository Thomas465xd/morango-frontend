import { useMobile } from '@/src/hooks/useMobile'
import { useCartStore } from '@/src/store/useCartStore'
import { EnrichedProduct } from '@/src/types'
import { formatToCLP } from '@/src/utils/price'
import { capitalizeFirstLetter } from '@/src/utils/text'
import { Plus, Sparkles, Tag, TagsIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type ProductCardProps = {
    product: EnrichedProduct
}

// Helper function to get key attributes based on product type
const getKeyAttributes = (product: EnrichedProduct): string[] => {
    const attrs: string[] = [];
    
    switch (product.productType) {
        case 'Anillo':
            if (product.attributes.material) attrs.push(product.attributes.material);
            if (product.attributes.size) attrs.push(`Talla ${product.attributes.size}`);
            if (product.attributes.gemstone) attrs.push(product.attributes.gemstone);
            break;
        case 'Collar':
            if (product.attributes.material) attrs.push(product.attributes.material);
            if (product.attributes.length) attrs.push(product.attributes.length);
            if (product.attributes.chainType) attrs.push(product.attributes.chainType);
            break;
        case 'Pulsera':
            if (product.attributes.material) attrs.push(product.attributes.material);
            if (product.attributes.length) attrs.push(product.attributes.length);
            if (product.attributes.style) attrs.push(product.attributes.style);
            break;
        case 'Aros':
            if (product.attributes.material) attrs.push(product.attributes.material);
            if (product.attributes.type) attrs.push(product.attributes.type);
            break;
    }
    
    return attrs;
};

export default function ProductCard({ product } : ProductCardProps) {
    const isMobile = useMobile(); 

    const { addItem, openCart } = useCartStore(); 

    const cartQuantity = useCartStore(
        state => state.items.find(i => i.productId === product.id)?.quantity ?? 1
    );

    const handleAdd = () => {
        addItem(product.id, 1); 
        openCart(); 
    }

    const keyAttributes = getKeyAttributes(product);
    const hasDiscount = product.hasActiveDiscount && product.savings > 0;

    // Check if product is new (created within last 7 days)
    const isNew = () => {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return product.createdAt > oneWeekAgo;
    };
    
    const showNewBadge = !hasDiscount && isNew();

    return (
        <div
            className="group/card relative flex flex-col h-full
                    overflow-hidden rounded-lg border border-zinc-200 
                    bg-white dark:bg-zinc-800 dark:border-zinc-700
                    hover:shadow-lg dark:hover:shadow-zinc-900/50
                    transition-all duration-300"
        >
            {/* Discount Badge */}
            {hasDiscount && (
                <div 
                    className="
                        absolute top-3 left-3 z-10 
                        flex items-center gap-1 
                        bg-black text-white 
                        px-2.5 py-1 
                        rounded-full 
                        tracking-widest text-xs font-semibold shadow-md
                    "
                >
                    <TagsIcon size={12} />
                    AHORRA {Math.round((product.savings / product.basePrice) * 100)}%
                </div>
            )}

            {/* New Badge */}
            {showNewBadge && (
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-orange-300 text-white px-2.5 py-1 rounded-full text-xs font-semibold shadow-md">
                    <Sparkles size={12} />
                    NUEVO
                </div>
            )}

            {/* Low Stock Badge */}
            {product.availableStock > 0 && product.availableStock <= 5 && (
                <div className="absolute top-3 right-3 z-10 bg-red-500 text-white px-2.5 py-1 rounded-full text-xs font-medium shadow-md">
                    ¡Últimos {product.availableStock}!
                </div>
            )}

            {/* Out of Stock Overlay */}
            {product.availableStock === 0 && (
                <div className="absolute inset-0 z-10 bg-black/60 flex items-center justify-center">
                    <span className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-2 rounded-lg font-semibold text-sm">
                        Agotado
                    </span>
                </div>
            )}

            {/* Product Image & add to cart "+" button */}
            <div className="relative w-full aspect-square bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
                {/* First Image */}
                <Image
                    alt={`${product.name} Image`}
                    src={product.images[0]}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="aspect-square w-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                />
                
                {/* Second Image - Shows on Hover */}
                {product.images[1] && (
                    <Image
                        alt={`${product.name} Image 2`}
                        src={product.images[1]}
                        fill
                        sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="aspect-square w-full object-cover opacity-0 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-300"
                    />
                )}

                {/* Add to cart */}
                <div className="
                        group/cart 
                        absolute z-10 bottom-2 right-0 w-[40px] h-[40px] 
                        opacity-0 group-hover/card:opacity-100 transition-all duration-300
                        flex-center
                        bg-black
                    "
                >
                    <button
                        onClick={handleAdd}
                        disabled={cartQuantity === product.availableStock}
                        className='
                            group-hover/cart:rotate-90 transition-all duration-300 
                            disabled:opacity-50 disabled:group-hover/cart:rotate-0 disabled:cursor-not-allowed
                        '
                    >
                        <Plus 
                            size={20}
                            color='white'
                        />
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-1 flex-col p-4 space-y-2">
                {/* Product Type */}
                <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                        {product.productType}
                    </span>
                    {product.category && (
                        <>
                            <span className="text-zinc-300 dark:text-zinc-600">•</span>
                            <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                {product.category}
                            </span>
                        </>
                    )}
                </div>

                {/* Product Name */}
                <h3 className="text-base font-semibold text-zinc-900 dark:text-orange-100 line-clamp-1 group-hover/card:text-orange-500 dark:group-hover/card:text-orange-300 transition-colors">
                    <Link href={`/home/products/${product.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {capitalizeFirstLetter(product.name)}
                    </Link>
                </h3>

                {/* Description */}
                {!isMobile && (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 min-h-[40px]">
                        {product.description}
                    </p>
                )}

                {/* Key Attributes */}
                {keyAttributes.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {keyAttributes.slice(0, 3).map((attr, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center gap-1 text-xs bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 px-2 py-1 rounded"
                            >
                                {attr}
                            </span>
                        ))}
                    </div>
                )}

                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                        <Tag size={12} className="text-zinc-400" />
                        {product.tags.slice(0, 2).map((tag, index) => (
                            <span
                                key={index}
                                className="text-xs text-zinc-500 dark:text-zinc-400"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Price Section */}
                <div className="flex flex-1 flex-col justify-end pt-2 space-y-1">
                    {hasDiscount && (
                        <div className="flex items-center gap-2">
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 line-through">
                                {formatToCLP(product.basePrice)}
                            </p>
                            <span className="text-xs font-medium text-green-600 dark:text-green-400">
                                Ahorra {formatToCLP(product.savings)}
                            </span>
                        </div>
                    )}
                    <p className="text-lg font-bold text-zinc-900 dark:text-orange-200">
                        {formatToCLP(product.finalPrice)}
                    </p>
                </div>
            </div>
        </div>
    )
}