import Loader from "@/components/ui/Loader";
import { getProductsByIds } from "@/src/api/ProductAPI";
import { CartItem, CreateOrderForm } from "@/src/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import CartProduct from "./CartProduct";
import { formatToCLP } from "@/src/utils/price";
import { useRouter } from "next/navigation";
import { createOrder } from "@/src/api/OrderAPI";
import { toast } from "react-toastify";

type CartDetailsModalProps = {
    open: boolean; 
    items: CartItem[]; 
    onToggle: () => void; 
}

export default function CartDetailsModal({ open, onToggle, items } : CartDetailsModalProps) { 
    const router = useRouter(); 
    const queryClient = useQueryClient(); 

    const productIds = items.map(item => item.productId); 

    // Make query to retrieve cart products
    const { data, isLoading, isError } = useQuery({
        queryKey: ["products", productIds],
        queryFn: () => getProductsByIds(productIds),
        retry: false, 
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: Infinity,
    }); 

    //! Mutation for registering a DRAFT order 
    // customer & address info not set yet, redirect to checkout form page
    const { mutate } = useMutation({
        mutationFn: (formData: CreateOrderForm) => createOrder(formData),
        onError: (error) => {
            toast.error(error.message || "Error al registrar orden ❌");
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            toast.success(data.message || "Orden creada exitosamente 🎉");
            router.push(`/checkout/${data.order.trackingNumber}`)
        },
    });

    const productMap = new Map(
        data?.products.map(product => [product.id, product]) ?? []
    );

    const total = items.reduce((acc, item) => {
        const product = productMap.get(item.productId);
        if (!product) return acc;

        return acc + product.finalPrice * item.quantity;
    }, 0);

    const freeShippingValue = Number(process.env.NEXT_PUBLIC_FREE_SHIPPING ?? 90000);
    const freeShippingCostLeft = Math.max(0, freeShippingValue - total);
    const freeShipping = freeShippingCostLeft <= 0 ? true : false

    const handleViewCart = () => {
        onToggle(); 
        router.push("/home/cart"); 
    }

    const handleContinue = () => {
		mutate({ items })
    }

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onToggle}
                className={`
                    fixed inset-0 bg-black/50 z-50
                    transition-opacity duration-300
                    ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
                `}
            />

            <aside
                className={`
                    fixed top-0 right-0 h-full w-full sm:w-96
                    bg-white dark:bg-zinc-900 z-60 shadow-2xl
                    transition-transform duration-300 ease-out
                    flex flex-col
                    ${open ? "translate-x-0" : "translate-x-full"}
                `}
            >
                {/* Header */}
                <div className="sticky top-0 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 tracking-widest">
                        CESTA
                    </h2>
                    <button
                        onClick={onToggle}
                        className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                    >
                        <X size={20} className="text-zinc-600 dark:text-zinc-400" />
                    </button>
                </div>

                {items.length === 0 ? (
                    <div className="flex-1 flex-center ">
                        <p className="uppercase tracking-widest text-zinc-900 dark:text-zinc-400">
                            La cesta está vacía
                        </p>
                    </div>
                ) : (
                    <>
                        <span
                            className="
                                px-[24px] py-[12px] 
                                border-b border-zinc-200 dark:border-zinc-700 
                                text-xs text-zinc-700 dark:text-zinc-300
                            "
                        >
                            {!freeShipping ? (
                                <p>
                                    ¡Gasta <strong>{formatToCLP(freeShippingCostLeft)}</strong> más y consigue envío gratuito!
                                </p>
                            ) : (
                                <p>
                                    Tu pedido cumple los requisitos de {" "}
                                    <strong>envío gratuito.</strong>
                                </p>
                            )} 
                        </span>

                        { isError && (
                            <div className="flex-1 flex-center ">
                                <p className="uppercase tracking-widest text-red-700 dark:text-red-500">
                                    Error al cargar Productos
                                </p>
                            </div>
                        )}

                        {/* Cart Content | Products added to cart */}
                        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                            {isLoading ? (
                                <Loader />
                            ) : (
                                data?.products.map(product => (
                                    <CartProduct
                                        key={product.id}
                                        product={product}
                                    />
                                ))
                            )}
                        </div>

                        {/* Footer with Action buttons */}
                        <div className="sticky bottom-0 space-y-6 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-700 px-6 py-4">
                            <button
                                onClick={handleViewCart}
                                className="button w-full h-[56px] flex-center tracking-widest border-orange-200/40 dark:hover:border-orange-200/50 text-orange-200 hover:text-orange-300"
                            >
                                VER CESTA
                            </button>

                            <button
                                onClick={handleContinue}
                                className="
                                    group
                                    button w-full h-[56px] flex-center 
                                    tracking-widest border-orange-200/40 dark:hover:border-orange-200/50 
                                    text-orange-200 hover:text-orange-300
                                "
                            >
                                FINALIZAR COMPRA 
                                <span className="px-2 text-orange-200 group-hover:text-orange-300">•</span>
                                {formatToCLP(total)}
                            </button>
                        </div>
                    </>
                )}
            </aside>        
        </>
    )
}
