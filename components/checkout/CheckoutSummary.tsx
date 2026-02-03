import { Order } from '@/src/types'
import { formatToCLP } from '@/src/utils/price'
import { capitalizeFirstLetter } from '@/src/utils/text'
import { Shield, Truck } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type CheckoutSummaryProps = {
    isFreeShipping: boolean, 
    deliveryType: "delivery" | "pickup", 
    shippingCost: number, 
    savingsAmount: number, 
    amountToFreeShipping: number, 
    subtotal: number, 
    total: number, 
    items: Order["items"]
}

export default function CheckoutSummary({ 
    isFreeShipping, 
    deliveryType, 
    subtotal,
    total,  
    shippingCost,
    items, 
    savingsAmount, 
    amountToFreeShipping
}: CheckoutSummaryProps) {
    // Calculate total items counting quantities
    const totalQuantities = items.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.quantity
    }, 0) // 0 is initial value of the accumulator

    const tax = Math.round(total * 0.19)

    return (
        <>
            {/* Free Shipping Progress */}
            {!isFreeShipping && deliveryType === 'delivery' && amountToFreeShipping > 0 && (
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                    <div className="flex items-start gap-3 mb-2">
                        <Truck size={18} className="text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                            <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                                ¡Estás cerca del envío gratis!
                            </p>
                            <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                                Agrega {formatToCLP(amountToFreeShipping)} más para obtener envío gratis
                            </p>
                        </div>
                    </div>
                    <div className="w-full bg-amber-200 dark:bg-amber-800 rounded-full h-2 mt-3">
                        <div 
                            className="bg-amber-500 dark:bg-amber-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min((subtotal / 90000) * 100, 100)}%` }}
                        />
                    </div>
                </div>
            )}

            <div className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-orange-100 mb-4">
                    Resumen del Pedido
                </h2>

                <ul className="space-y-4 mb-6">
                    {items.map((item) => (
                        <li key={item.productId} className="flex gap-4">
                            <div className="relative">
                                <div className="w-16 h-16 flex-shrink-0 bg-zinc-100 dark:bg-zinc-700 rounded-md overflow-hidden">
                                    <Image
                                        src={item.productImage}
                                        alt={item.productName}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="
                                        absolute -top-2 -right-2 w-[24px] h-[24px] 
                                        bg-zinc-900 border border-white text-white 
                                        text-xs rounded-lg flex items-center justify-center
                                    "
                                >
                                    {item.quantity}
                                </div>
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 line-clamp-1">
                                    {capitalizeFirstLetter(item.productName)}
                                </p>
                            </div>
                            <p className="text-sm font-semibold text-zinc-900 dark:text-orange-200">
                                {formatToCLP(item.finalPrice * item.quantity)}
                            </p>
                        </li>
                    ))}
                </ul>

                {/* Totals */}
                <div className="space-y-3 border-t border-zinc-200 dark:border-zinc-700 pt-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-zinc-600 dark:text-zinc-400">Subtotal • {totalQuantities} artículos</span>
                        <span className="font-medium text-zinc-900 dark:text-zinc-100">
                            {formatToCLP(subtotal)}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-zinc-600 dark:text-zinc-400">
                            {deliveryType === "delivery" ? "Envío" : "Retiro en Tienda"}
                        </span>
                        <span className="font-medium text-zinc-900 dark:text-zinc-100">
                            {deliveryType === 'pickup' ? (
                                <span className="text-green-600 dark:text-green-400">Gratis</span>
                            ) : isFreeShipping ? (
                                <span className="text-green-600 dark:text-green-400">Gratis</span>
                            ) : (
                                formatToCLP(shippingCost)
                            )}
                        </span>
                    </div>
                    {savingsAmount > 0 && (
                        <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                            <span>Ahorros</span>
                            <span className="font-medium">-{formatToCLP(savingsAmount)}</span>
                        </div>
                    )}
                    <div className="flex justify-between text-base font-bold border-t border-zinc-200 dark:border-zinc-700 pt-3">
                        <span className="text-zinc-900 dark:text-orange-100">Total</span>
                        <span className="text-zinc-900 dark:text-orange-200">
                            {formatToCLP(total)}
                        </span>
                    </div>
                    <span className='text-sm text-zinc-500'>
                        Incluye {formatToCLP(tax)} de impuestos
                    </span>
                </div>

                {/* Trust Badges */}
                <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
                    <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                        <Shield size={16} className="text-green-600 dark:text-green-400" />
                        <span>Compra 100% segura y protegida</span>
                    </div>
                </div>
            </div>
        </>
    ) 
}
