import { useCartStore } from "@/src/store/useCartStore";
import { EnrichedProduct } from "@/src/types";
import { formatToCLP } from "@/src/utils/price";
import { capitalizeFirstLetter } from "@/src/utils/text";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";

type CartProductProps = {
    product: EnrichedProduct;
};

export default function CartProduct({ product }: CartProductProps) {
    const hasDiscount = product.hasActiveDiscount && product.savings > 0;

    const { updateQuantity, removeItem } = useCartStore(); 

    const quantity = useCartStore(
        state => state.items.find(i => i.productId === product.id)?.quantity ?? 1
    );

    // Get first key attribute for display
    const getDisplayAttribute = () => {
        switch (product.productType) {
            case 'Anillo':
                return product.attributes.size ? `Talla ${product.attributes.size}` : null;
            case 'Collar':
                return product.attributes.length || null;
            case 'Pulsera':
                return product.attributes.length || null;
            case 'Aros':
                return product.attributes.type || null;
            default:
                return null;
        }
    };

    const displayAttribute = getDisplayAttribute();

    return (
        <div className="flex gap-4 border-b border-zinc-200 dark:border-zinc-700 pb-4">
            {/* Product Image */}
            <div className="relative w-24 h-24 flex-shrink-0 bg-zinc-100 dark:bg-zinc-800 rounded-md overflow-hidden">
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                />
            </div>

            {/* Product Info */}
            <div className="flex-1 flex flex-col justify-between min-w-0">
                {/* Top Section: Name & Remove Button */}
                <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-orange-100 line-clamp-1">
                            {capitalizeFirstLetter(product.name)}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase">
                                {product.productType}
                            </p>
                            {displayAttribute && (
                                <>
                                    <span className="text-zinc-300 dark:text-zinc-600">•</span>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                        {displayAttribute}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                    
                    {/* Remove Button */}
                    <button
                        onClick={() => removeItem(product.id)}
                        className="group p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors cursor-pointer"
                        aria-label="Quitar del carrito"
                    >
                        <X size={16} className="text-zinc-500 group-hover:text-red-500 dark:text-zinc-400 dark:group-hover:text-red-400 transition-colors" />
                    </button>
                </div>

                {/* Bottom Section: Price & Quantity Controls */}
                <div className="flex items-end justify-between gap-2">
                    {/* Price */}
                    <div className="flex flex-col">
                        {hasDiscount ? (
                            <>
                                <p className="text-xs line-through text-zinc-500 dark:text-zinc-400">
                                    {formatToCLP(product.basePrice)}
                                </p>
                                <p className="text-base font-bold text-zinc-900 dark:text-orange-200">
                                    {formatToCLP(product.finalPrice)}
                                </p>
                            </>
                        ) : (
                            <p className="text-base font-bold text-zinc-900 dark:text-orange-200">
                                {formatToCLP(product.finalPrice)}
                            </p>
                        )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 border border-zinc-300 dark:border-zinc-600 rounded-md">
                        <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            disabled={product.availableStock === 0}
                            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors rounded-l-md cursor-pointer"
                            aria-label="Reducir cantidad"
                        >
                            <Minus size={14} className="text-zinc-600 dark:text-zinc-400" />
                        </button>

                        <input 
                            className="min-w-[2rem] text-right text-sm font-medium text-zinc-900 dark:text-zinc-100"
                            type="number"
                            value={quantity}
                            min={1}
                            max={product.availableStock}
                            onChange={(e) => {
                                const value = Number(e.target.value);
                                if (!Number.isNaN(value)) {
                                    updateQuantity(product.id, Math.max(1, Math.min(value, product.availableStock)));
                                }
                            }}
                        />
                        
                        <button
                            onClick={() => updateQuantity(product.id, product.availableStock === quantity ? product.availableStock : quantity + 1)}
                            disabled={product.availableStock === 0}
                            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors rounded-r-md cursor-pointer"
                            aria-label="Aumentar cantidad"
                        >
                            <Plus size={14} className="text-zinc-600 dark:text-zinc-400" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}