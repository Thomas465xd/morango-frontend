import { createOrder } from "@/src/api/OrderAPI";
import { useCartStore } from "@/src/store/useCartStore";
import { CreateOrderForm, EnrichedProduct } from "@/src/types";
import { formatToCLP } from "@/src/utils/price";
import { capitalizeFirstLetter } from "@/src/utils/text";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Minus, Plus, Truck, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type CartDetailsProps = {
	products: EnrichedProduct[];
    total: number; 
    freeShippingCostLeft: number; 
    freeShipping: boolean; 
};

export default function CartDetails({ products, total, freeShipping, freeShippingCostLeft }: CartDetailsProps) {
	const { updateQuantity, removeItem, items } = useCartStore();

    const router = useRouter()

	// Get display attribute helper
	const getDisplayAttribute = (product: EnrichedProduct) => {
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

    const queryClient = useQueryClient(); 

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

    const handleContinue = () => {
		mutate({ items })
    }

	return (
		<main className="mx-auto w-full max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
			<h1 
                className="tracking-widest text-3xl font-bold text-zinc-900 dark:text-orange-100 sm:text-4xl"
            >
				CESTA
			</h1>

			<div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
				{/* Products List */}
				<section
					aria-labelledby="cart-heading"
					className="lg:col-span-7"
				>
					<h2 id="cart-heading" className="sr-only">
						Productos en tu carrito
					</h2>

					<ul className="divide-y divide-zinc-200 dark:divide-zinc-700 border-t border-b border-zinc-200 dark:border-zinc-700">
						{products.map((product) => {
							const quantity = items.find(i => i.productId === product.id)?.quantity ?? 1;
							const hasDiscount = product.hasActiveDiscount && product.savings > 0;
							const displayAttribute = getDisplayAttribute(product);

							return (
								<li key={product.id} className="flex py-6 sm:py-8">
									{/* Product Image */}
									<div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden">
										<Link href={`/home/products/${product.id}`}>
											<Image
												alt={product.name}
												src={product.images[0]}
												fill
												className="object-cover hover:scale-105 transition-transform duration-300"
											/>
										</Link>
									</div>

									{/* Product Info */}
									<div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
										<div className="relative">
											<div className="flex justify-between">
												<div className="flex-1 min-w-0 pr-8">
													<h3 className="text-base font-semibold">
														<Link
															href={`/home/products/${product.id}`}
															className="text-zinc-900 dark:text-orange-100 hover:text-orange-500 dark:hover:text-orange-300 transition-colors"
														>
															{capitalizeFirstLetter(product.name)}
														</Link>
													</h3>
													
													<div className="mt-1 flex items-center gap-2">
														<p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
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

													{/* Price */}
													<div className="mt-2 flex flex-col">
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
												</div>

												{/* Remove Button */}
												<button
													type="button"
													onClick={() => removeItem(product.id)}
													className="group absolute top-0 right-0 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
												>
													<span className="sr-only">Quitar</span>
													<X
														className="h-5 w-5 text-zinc-400 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors"
													/>
												</button>
											</div>

											{/* Stock Status & Quantity */}
											<div className="mt-4 flex items-center justify-between">
												<div className="text-sm">
													{product.availableStock > 0 ? (
														<p className="text-green-600 dark:text-green-400 font-medium">
															✓ En stock ({product.availableStock} disponibles)
														</p>
													) : (
														<p className="text-red-600 dark:text-red-400 font-medium">
															✗ Agotado
														</p>
													)}
												</div>

												{/* Quantity Controls */}
												<div className="flex items-center gap-2 border border-zinc-300 dark:border-zinc-600 rounded-md">
													<button
														onClick={() => updateQuantity(product.id, quantity - 1)}
														disabled={product.availableStock === 0}
														className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors rounded-l-md disabled:opacity-50 disabled:cursor-not-allowed"
														aria-label="Reducir cantidad"
													>
														<Minus size={16} className="text-zinc-600 dark:text-zinc-400" />
													</button>

													<input 
														className="text-right text-sm font-medium text-zinc-900 dark:text-zinc-100 bg-transparent border-none focus:outline-none"
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
														disabled={product.availableStock === 0 || quantity >= product.availableStock}
														className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed"
														aria-label="Aumentar cantidad"
													>
														<Plus size={16} className="text-zinc-600 dark:text-zinc-400" />
													</button>
												</div>
											</div>
										</div>
									</div>
								</li>
							);
						})}
					</ul>
				</section>

				{/* Order Summary */}
				<section
					aria-labelledby="summary-heading"
					className="mt-16 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
				>
					<h2
						id="summary-heading"
						className="text-lg font-semibold text-zinc-900 dark:text-orange-100"
					>
						Resumen del Pedido
					</h2>

					<dl className="mt-6 space-y-4">
						<div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-700 pt-4">
							<dt className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
								<Truck className="mr-2 h-4 w-4" />
								<span>Envío</span>
							</dt>
							<dd className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
								{freeShipping ? (
                                    <span className="text-green-500 font-bold">
                                        GRATIS
                                    </span>
                                ) : (
                                    <span>  
                                        Por calcular...
                                    </span>
                                )}
							</dd>
						</div>

						{freeShipping ? (
							<p className="text-xs text-zinc-500 dark:text-zinc-400 -mt-2">
								Envío gratis en compras sobre {formatToCLP(parseInt(process.env.NEXT_PUBLIC_FREE_SHIPPING ?? "90000"))}
							</p>
						) : (
							<p className="text-xs text-zinc-500 dark:text-zinc-400 -mt-2">
								¡Gasta {" "}
                                <strong className="">
                                    {formatToCLP(freeShippingCostLeft)} 
                                </strong> {" "}
                                más y consigue envío gratuito
							</p>
                        )}

						<div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-700 pt-4">
							<dt className="text-sm text-zinc-600 dark:text-zinc-400">
								IVA (19% incluido)
							</dt>
							<dd className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        
							</dd>
						</div>

						<div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-700 pt-4">
							<dt className="text-base font-semibold text-zinc-900 dark:text-orange-100">
								Total
							</dt>
							<dd className="text-base font-bold text-zinc-900 dark:text-orange-200">
								{formatToCLP(total)}
							</dd>
						</div>
					</dl>

					<div className="mt-6">
						<button
							type="button"
                            onClick={handleContinue}
							className="button w-full tracking-widest uppercase"
						>
							Finalizar compra
						</button>
					</div>

					<div className="mt-6 text-center">
						<Link
							href="/home/products"
							className="text-sm font-medium text-orange-400 dark:text-orange-200 hover:text-orange-500 dark:hover:text-orange-300 transition-colors"
						>
							← Continuar Comprando
						</Link>
					</div>
				</section>
			</div>
		</main>
	);
}