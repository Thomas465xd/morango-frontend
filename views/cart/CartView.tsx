"use client"; 
import CartDetails from "@/components/home/cart/CartDetails";
import CartDetailsSkeleton from "@/components/skeletons/CartDetailsSkeleton";
import { getProductsByIds } from "@/src/api/ProductAPI";
import { useCartStore } from "@/src/store/useCartStore";
import { useQuery } from "@tanstack/react-query";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CartView() {
    const items = useCartStore(state => state.items); 
    const productIds = items.map(item => item.productId); 

    // Make query to retrieve cart products
    const { data, isLoading } = useQuery({
        queryKey: ["products", productIds],
        queryFn: () => getProductsByIds(productIds),
        retry: false, 
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: Infinity,
    }); 

    const products = data?.products ?? []; 

    const productMap = new Map(
        data?.products.map(product => [product.id, product]) ?? []
    );

    const total = items.reduce((acc, item) => {
        const product = productMap.get(item.productId);
        if (!product) return acc;

        return acc + product.finalPrice * item.quantity;
    }, 0);

    const freeShippingCostLeft = Math.max(0, 90000 - total);
    const freeShipping = freeShippingCostLeft <= 0 ? true : false

    if (isLoading) return <CartDetailsSkeleton />

	if (products.length === 0) {
		return (
			<main className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
				<div className="text-center space-y-8 py-16">
                    <div className="">
                        <ShoppingBag className="mx-auto h-12 w-12 text-zinc-400 dark:text-zinc-600" />
                        <h2 className="mt-4 text-lg font-medium text-zinc-900 dark:text-zinc-100">
                            Tu carrito está vacío
                        </h2>
                        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                            Agrega productos para comenzar tu compra
                        </p>
                    </div>
					<Link
						href="/home/products"
						className="button"
					>
						Explorar productos
					</Link>
				</div>
			</main>
		);
	}

    return (
        <CartDetails
            products={products}
            total={total}
            freeShipping={freeShipping}
            freeShippingCostLeft={freeShippingCostLeft}
        />
    )
}
