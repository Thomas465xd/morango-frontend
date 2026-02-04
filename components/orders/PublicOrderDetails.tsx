"use client"; 
import { PublicOrder, shippingOptions } from "@/src/types";
import { formatDate } from "@/src/utils/date";
import Image from "next/image";
import { Package, Truck, CheckCircle, Clock, User } from "lucide-react";
import { formatToCLP } from "@/src/utils/price";
import Link from "next/link";

type PublicOrderDetailsProps = {
    order: PublicOrder;
};

const capitalizeFirstLetter = (str: string) => 
    str.charAt(0).toUpperCase() + str.slice(1);

export default function PublicOrderDetails({ order }: PublicOrderDetailsProps) {
    const shipmentStage = (
        order.status === "Esperando Pago" ? 0
        : order.status === "Procesando" ? 1
        : order.status === "En Transito" ? 2 
        : order.status === "Entregado" ? 3 
        : 0
    );

    const selectedShipping = shippingOptions.find(opt => opt.id === order.shippingMethod);

    const statusConfig = {
        "Esperando Pago": { icon: Clock, color: "text-amber-600 dark:text-amber-400", bgColor: "bg-amber-100 dark:bg-amber-900/20" },
        "Procesando": { icon: Package, color: "text-blue-600 dark:text-blue-400", bgColor: "bg-blue-100 dark:bg-blue-900/20" },
        "En Transito": { icon: Truck, color: "text-orange-600 dark:text-orange-400", bgColor: "bg-orange-100 dark:bg-orange-900/20" },
        "Entregado": { icon: CheckCircle, color: "text-green-600 dark:text-green-400", bgColor: "bg-green-100 dark:bg-green-900/20" },
    };

    const currentStatus = statusConfig[order.status as keyof typeof statusConfig] || statusConfig["Esperando Pago"];
    const StatusIcon = currentStatus.icon;

    return (
        <main className="mx-auto max-w-2xl pt-8 pb-24 sm:px-6 sm:pt-16 lg:max-w-7xl lg:px-8">
            {/* Header */}
            <div className="space-y-2 px-4 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 sm:px-0">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:space-x-4">
                    <h1 className="uppercase text-2xl font-bold tracking-widest text-zinc-900 dark:text-orange-100">
                        {order.trackingNumber}
                    </h1>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${currentStatus.bgColor} ${currentStatus.color} w-fit mt-2 sm:mt-0`}>
                        <StatusIcon size={16} />
                        {order.status}
                    </div>
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-300">
                    Orden registrada el{" "}
                    <time dateTime={order.createdAt.toISOString()} className="font-medium text-zinc-900 dark:text-orange-200">
                        {formatDate(order.createdAt)}
                    </time>
                </div>
            </div>

            {/* Products */}
            <section aria-labelledby="products-heading" className="mt-8 px-4 sm:px-0">
                {order.items.map((item) => {
                    const hasDiscount = item.discount > 0;

                    return (
                        <div
                            key={item.productId}
                            className={`
                                bg-white dark:bg-zinc-800 
                                border rounded-lg p-4 sm:p-6
                                ${
                                    hasDiscount
                                        ? "border-orange-300 dark:border-orange-500/40"
                                        : "border-zinc-200 dark:border-zinc-700"
                                }
                            `}
                        >
                            <div className="flex gap-4">
                                {/* Image */}
                                <div className="relative">
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-zinc-100 dark:bg-zinc-700 rounded-md overflow-hidden">
                                        <Image
                                            src={item.productImage}
                                            alt={item.productName}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Quantity badge */}
                                    <div className="
                                            absolute -top-2 -right-2 w-[24px] h-[24px] 
                                            bg-zinc-900 border border-white text-white 
                                            text-xs rounded-lg flex items-center justify-center
                                        "
                                    >
                                        {item.quantity}
                                    </div>

                                    {/* Discount badge */}
                                    {hasDiscount && (
                                        <div className="absolute -bottom-2 -left-2 px-2 py-0.5 rounded-full text-xs font-semibold
                                            bg-orange-500 text-white shadow">
                                            -{item.discount}%
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-base font-medium text-zinc-900 dark:text-orange-100">
                                        <a
                                            href={`/products/${item.productId}`}
                                            className="hover:text-orange-500 dark:hover:text-orange-300"
                                        >
                                            {capitalizeFirstLetter(item.productName)}
                                        </a>
                                    </h3>

                                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                                        Cantidad: {item.quantity}
                                    </p>

                                    {/* Prices */}
                                    <div className="mt-2 flex flex-col">
                                        {hasDiscount && (
                                            <span className="text-sm text-zinc-500 dark:text-zinc-400 line-through">
                                                {formatToCLP(item.basePrice * item.quantity)}
                                            </span>
                                        )}

                                        <span
                                            className={`
                                                text-base font-semibold
                                                ${
                                                    hasDiscount
                                                        ? "text-orange-600 dark:text-orange-300"
                                                        : "text-zinc-900 dark:text-orange-200"
                                                }
                                            `}
                                        >
                                            {formatToCLP(item.finalPrice * item.quantity)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>

            {/* Progress Bar */}
            <div className="mt-8 px-4 sm:px-0">
                <div className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                    <div aria-hidden="true">
                        <div className="overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                            <div
                                style={{ width: `${(shipmentStage / 2.65) * 100}%` }}
                                className="h-2 rounded-full bg-orange-300 dark:bg-orange-300 transition-all duration-500"
                            />
                        </div>
                        <div className="mt-6 grid grid-cols-4 text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400">
                            <div className={shipmentStage >= 0 ? "text-orange-600 dark:text-orange-200" : ""}>
                                Orden registrada
                            </div>
                            <div className={`text-center ${shipmentStage >= 1 ? "text-orange-600 dark:text-orange-200" : ""}`}>
                                Procesando
                            </div>
                            <div className={`text-center ${shipmentStage >= 2 ? "text-orange-600 dark:text-orange-200" : ""}`}>
                                En tránsito
                            </div>
                            <div className={`text-right ${shipmentStage >= 3 ? "text-orange-600 dark:text-orange-200" : ""}`}>
                                Entregado
                            </div>
                        </div>
                    </div>

                    {order.deliveredAt && (
                        <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                Entregado el{" "}
                                <time dateTime={order.deliveredAt.toString()} className="font-medium text-zinc-900 dark:text-orange-200">
                                    {formatDate(new Date(order.deliveredAt))}
                                </time>
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Order Details Grid */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 px-4 sm:px-0">
                <div className="
                        bg-zinc-50 dark:bg-zinc-800 
                        border border-zinc-200 dark:border-zinc-700 
                        rounded-lg p-6
                    "
                >
                    {/* Shipping Address */}
                    <div className="border-b-2 border-zinc-300 dark:border-zinc-600 pb-2 mb-2">
                        <h3 className="text-base font-semibold text-zinc-900 dark:text-orange-100 mb-3">
                            Dirección de Envío
                        </h3>
                        <address className="not-italic text-sm text-zinc-600 dark:text-zinc-300 space-y-1">
                            <p className="font-medium text-zinc-900 dark:text-orange-200">
                                {order.customer.name} {order.customer.surname}
                            </p>
                            <p>{order.shippingAddress.cityArea}</p>
                            <p>{order.shippingAddress.city}</p>
                            <p>{order.shippingAddress.region}</p>
                            <p>{order.shippingAddress.country}</p>
                        </address>
                    </div>

                    {/* Shipping Method */}
                    <div>
                        <h3 className="text-base font-semibold text-zinc-900 dark:text-orange-100 mb-3">
                            Método de Envío
                        </h3>
                        {selectedShipping ? (
                            <div className="text-sm text-zinc-600 dark:text-zinc-300 space-y-1">
                                <p className="font-medium text-zinc-900 dark:text-orange-200">
                                    {selectedShipping.name}
                                </p>
                                <p>Entrega estimada: {selectedShipping.estimatedDays}</p>
                                {selectedShipping.zones && (
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                                        Zonas: {selectedShipping.zones}
                                    </p>
                                )}
                            </div>
                        ) : (
                            <p className="text-sm text-zinc-600 dark:text-zinc-300">
                                Retiro en Domicilio Las Condes
                            </p>
                        )}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                    <h2 id="summary-heading" className="text-lg font-semibold text-zinc-900 dark:text-orange-100 mb-4">
                        Resumen de la Orden
                    </h2>

                    <dl className="space-y-3 text-sm">
                        <div className="flex items-center justify-between">
                            <dt className="text-zinc-600 dark:text-zinc-400">Subtotal</dt>
                            <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                                {formatToCLP(order.totals.subtotal)}
                            </dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-zinc-600 dark:text-zinc-400">Envío</dt>
                            <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                                {order.totals.shipping === 0 ? (
                                    <span className="text-green-600 dark:text-green-400">Gratis</span>
                                ) : (
                                    formatToCLP(order.totals.shipping ?? 0)
                                )}
                            </dd>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-zinc-200 dark:border-zinc-700">
                            <dt className="text-base font-semibold text-zinc-900 dark:text-orange-100">
                                Total
                            </dt>
                            <dd className="text-base font-bold text-orange-500 dark:text-orange-300">
                                {formatToCLP(order.totals.total)}
                            </dd>
                        </div>
                    </dl>
                </div>
            </section>

            <section
                className="
                    mt-10 mx-4 sm:mx-0
                    rounded-xl border border-orange-200 dark:border-orange-500/30
                    bg-orange-50 dark:bg-orange-500/10
                    p-5 sm:p-6
                    flex flex-col gap-4
                "
            >
                <div className="flex items-start gap-3">
                    <div className="
                        flex-shrink-0 w-10 h-10 rounded-full
                        bg-orange-500 text-white
                        flex items-center justify-center
                    ">
                        <User size={18} />
                    </div>

                    <div className="flex-1">
                        <h3 className="text-base font-semibold text-zinc-900 dark:text-orange-100">
                            ¿Quieres ver más detalles de tu pedido?
                        </h3>

                        <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                            Si creas una cuenta con el correo usado en esta orden,
                            podrás acceder a información adicional como
                            <span className="font-medium"> estado de pago, comprobantes y reintentos de pago</span>.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                    <div className="flex gap-3">
                        <Link
                            href={`/auth/register`}
                            className="
                                inline-flex items-center justify-center
                                px-4 py-2 rounded-md
                                bg-orange-500 hover:bg-orange-600
                                text-white text-sm font-medium
                                transition
                            "
                        >
                            Crear cuenta
                        </Link>

                        <Link
                            href={`/auth/login`}
                            className="
                                inline-flex items-center justify-center
                                px-4 py-2 rounded-md
                                border border-orange-500/40
                                text-orange-600 dark:text-orange-300
                                text-sm font-medium
                                hover:bg-orange-500/10
                                transition
                            "
                        >
                            Ya tengo cuenta
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}