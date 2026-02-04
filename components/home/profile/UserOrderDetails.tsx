"use client"; 
import { Order, shippingOptions, Payment } from "@/src/types";
import { formatDate } from "@/src/utils/date";
import Image from "next/image";
import { Package, Truck, CheckCircle, Clock, MapPin, Phone, DollarSign, CreditCard, Calendar, ArrowRight, AlertCircle } from "lucide-react";
import { formatToCLP } from "@/src/utils/price";
import { useRouter } from "next/navigation";
import { capitalizeFirstLetter } from "@/src/utils/text";

type UserOrderDetailsProps = {
    order: Order;
    payment?: Payment;
};

const paymentStatusConfig = {
    "pending": { label: "Esperando Pago", color: "text-amber-600 dark:text-amber-400", bgColor: "bg-amber-100 dark:bg-amber-900/20" },
    "approved": { label: "Aprobado", color: "text-green-600 dark:text-green-400", bgColor: "bg-green-100 dark:bg-green-900/20" },
    "rejected": { label: "Rechazado", color: "text-red-600 dark:text-red-400", bgColor: "bg-red-100 dark:bg-red-900/20" },
    "cancelled": { label: "Cancelado", color: "text-zinc-600 dark:text-zinc-400", bgColor: "bg-zinc-100 dark:bg-zinc-900/20" },
    "refunded": { label: "Reembolsado", color: "text-blue-600 dark:text-blue-400", bgColor: "bg-blue-100 dark:bg-blue-900/20" },
    "expired": { label: "Expirado", color: "text-zinc-600 dark:text-zinc-400", bgColor: "bg-zinc-100 dark:bg-zinc-900/20" }
};

export default function UserOrderDetails({ order }: UserOrderDetailsProps) {
    const router = useRouter();

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

    const handleProductClick = (productId: string) => {
        window.open(`/home/products/${productId}`, '_blank');
    };

    const paymentStatus = (typeof order.paymentId === "object" ? order.paymentId?.status : undefined) as keyof typeof paymentStatusConfig;
    const paymentConfig = paymentStatus ? paymentStatusConfig[paymentStatus] : paymentStatusConfig["pending"];

    return (
        <main className="mx-auto max-w-7xl pt-8 pb-24 px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8 space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-orange-100 uppercase">
                            Detalles de Orden
                        </h1>
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                            Orden #{order.trackingNumber}
                        </p>
                    </div>
                    <button
                        onClick={() => router.back()}
                        className="text-nowrap px-4 py-2 text-sm font-medium text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
                    >
                        ← Volver
                    </button>
                </div>

                {/* Status badge */}
                <div className={`w-fit inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${currentStatus.bgColor} ${currentStatus.color}`}>
                    <StatusIcon size={16} />
                    {order.status}
                </div>
            </div>

            {/* Main Grid */}
            <div className="lg:grid lg:grid-cols-3 lg:gap-8 space-y-8 lg:space-y-0">
                {/* Left Column - Order Overview */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Progress Bar */}
                    <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-6">
                            Estado del Envío
                        </h2>
                        
                        <div aria-hidden="true">
                            <div className="overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                                <div
                                    style={{ width: `${(shipmentStage / 2.65) * 100}%` }}
                                    className="h-2 rounded-full bg-orange-400 dark:bg-orange-300 transition-all duration-500"
                                />
                            </div>
                            <div className="mt-6 grid grid-cols-4 text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400">
                                <div className={shipmentStage >= 0 ? "text-orange-600 dark:text-orange-200" : ""}>
                                    Registrada
                                </div>
                                <div className={`text-center ${shipmentStage >= 1 ? "text-orange-600 dark:text-orange-200" : ""}`}>
                                    Procesando
                                </div>
                                <div className={`text-center ${shipmentStage >= 2 ? "text-orange-600 dark:text-orange-200" : ""}`}>
                                    En Tránsito
                                </div>
                                <div className={`text-right ${shipmentStage >= 3 ? "text-orange-600 dark:text-orange-200" : ""}`}>
                                    Entregada
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

                    {/* Items Section */}
                    <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-6 flex items-center gap-2">
                            <Package size={20} />
                            Productos ({order.items.length})
                        </h2>

                        <div className="space-y-4">
                            {order.items.map((item) => {
                                const hasDiscount = item.discount > 0;

                                return (
                                    <div
                                        key={item.productId}
                                        className={`
                                            flex gap-4 p-4 border rounded-lg
                                            transition-all duration-200 cursor-pointer
                                            hover:shadow-md hover:border-orange-300 dark:hover:border-orange-300
                                            ${hasDiscount
                                                ? "border-orange-300 dark:border-orange-500/40 bg-orange-50/50 dark:bg-orange-900/10"
                                                : "border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700/50"
                                            }
                                        `}
                                        onClick={() => handleProductClick(item.productId)}
                                    >
                                        {/* Product Image */}
                                        <div className="relative">
                                            <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-zinc-100 dark:bg-zinc-700 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-600 group">
                                                <Image
                                                    src={item.productImage}
                                                    alt={item.productName}
                                                    fill
                                                    className="object-cover group-hover:opacity-80 transition-opacity duration-200"
                                                />
                                            </div>

                                            {/* Quantity Badge */}
                                            <div className="
                                                    absolute -top-2 -right-2 w-[24px] h-[24px] 
                                                    bg-zinc-900 border border-white text-white 
                                                    text-xs rounded-lg flex items-center justify-center
                                                "
                                            >
                                                {item.quantity}
                                            </div>

                                            {/* Discount Badge */}
                                            {hasDiscount && (
                                                <div className="absolute -bottom-2 -left-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-orange-500 text-white shadow">
                                                    -{item.discount}%
                                                </div>
                                            )}
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-base font-medium text-zinc-900 dark:text-orange-100 hover:text-orange-600 dark:hover:text-orange-300 transition-colors truncate">
                                                {capitalizeFirstLetter(item.productName)}
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

                                                <span className={`text-base font-semibold ${hasDiscount ? "text-orange-600 dark:text-orange-300" : "text-zinc-900 dark:text-orange-200"}`}>
                                                    {formatToCLP(item.finalPrice * item.quantity)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Arrow Indicator */}
                                        <div className="flex items-center justify-center">
                                            <ArrowRight size={20} className="text-zinc-400 dark:text-zinc-500 group-hover:text-orange-500 transition-colors" />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Shipping Details */}
                    <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-6 flex items-center gap-2">
                            <MapPin size={20} />
                            Dirección de Envío
                        </h2>

                        <div className="space-y-4">
                            {/* Recipient */}
                            <div className="pb-4 border-b border-zinc-200 dark:border-zinc-700">
                                <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase mb-2">
                                    Destinatario
                                </p>
                                <p className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                                    {order.customer.name} {order.customer.surname}
                                </p>
                                {order.customer.phone && (
                                    <div className="flex items-center gap-2 mt-2">
                                        <Phone size={14} className="text-zinc-400" />
                                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                            {order.customer.phone}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Address Details */}
                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase mb-1">
                                        Dirección
                                    </p>
                                    <p className="text-sm text-zinc-800 dark:text-zinc-200 font-medium">
                                        {order.shippingAddress.street}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase mb-1">
                                            Comuna
                                        </p>
                                        <p className="text-sm text-zinc-800 dark:text-zinc-200">
                                            {order.shippingAddress.cityArea}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase mb-1">
                                            Ciudad
                                        </p>
                                        <p className="text-sm text-zinc-800 dark:text-zinc-200">
                                            {order.shippingAddress.city}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase mb-1">
                                            Región
                                        </p>
                                        <p className="text-sm text-zinc-800 dark:text-zinc-200">
                                            {order.shippingAddress.region}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase mb-1">
                                            País
                                        </p>
                                        <p className="text-sm text-zinc-800 dark:text-zinc-200">
                                            {order.shippingAddress.country}
                                        </p>
                                    </div>
                                </div>

                                {order.shippingAddress.reference && (
                                    <div>
                                        <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase mb-1">
                                            Referencia
                                        </p>
                                        <p className="text-sm text-zinc-800 dark:text-zinc-200">
                                            {order.shippingAddress.reference}
                                        </p>
                                    </div>
                                )}

                                {order.shippingAddress.zipCode && (
                                    <div>
                                        <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase mb-1">
                                            Código Postal
                                        </p>
                                        <p className="text-sm text-zinc-800 dark:text-zinc-200">
                                            {order.shippingAddress.zipCode}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <button 
                        className="button px-8 flex-center gap-2"
                        onClick={() => {
                            if (typeof order.paymentId === "object" && order.paymentId?.id) {
                                router.push(`/home/profile/payments/${order.paymentId.id}`);
                            }
                        }}
                    >
                        <CreditCard size={24} />
                        Ver Detalles de Pago
                    </button>
                </div>

                {/* Right Column - Order Summary & Shipping Method */}
                <div className="space-y-6">
                    {/* Shipping Method */}
                    <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                            <Truck size={20} />
                            Método de Envío
                        </h2>

                        {selectedShipping ? (
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                        {selectedShipping.name}
                                    </p>
                                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                                        Entrega estimada: {selectedShipping.estimatedDays}
                                    </p>
                                </div>
                                {selectedShipping.zones && (
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 p-2 bg-zinc-50 dark:bg-zinc-700/50 rounded">
                                        Zonas: {selectedShipping.zones}
                                    </p>
                                )}
                            </div>
                        ) : (
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                Retiro en Domicilio Las Condes
                            </p>
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                            <DollarSign size={20} />
                            Resumen
                        </h2>

                        <dl className="space-y-3 text-sm">
                            <div className="flex items-center justify-between">
                                <dt className="text-zinc-600 dark:text-zinc-400">Subtotal</dt>
                                <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                                    {formatToCLP(order.subtotal)}
                                </dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-zinc-600 dark:text-zinc-400">Envío</dt>
                                <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                                    {order.shipping === 0 || !order.shipping ? (
                                        <span className="text-green-600 dark:text-green-400">Gratis</span>
                                    ) : (
                                        formatToCLP(order.shipping)
                                    )}
                                </dd>
                            </div>
                            <div className="flex items-center justify-between pt-3 border-t border-zinc-200 dark:border-zinc-700">
                                <dt className="text-base font-semibold text-zinc-900 dark:text-orange-100">
                                    Total
                                </dt>
                                <dd className="text-base font-bold text-orange-600 dark:text-orange-300">
                                    {formatToCLP(order.total)}
                                </dd>
                            </div>
                        </dl>
                    </div>

                    {/* Payment Information */}
                    {typeof order.paymentId === "object" && order.paymentId?.amount && (
                        <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                                <CreditCard size={20} />
                                Pago
                            </h2>

                            <div className="space-y-3 text-sm">
                                {/* Payment Status */}
                                <div>
                                    <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase mb-1">
                                        Estado
                                    </p>
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${paymentConfig.bgColor} ${paymentConfig.color}`}>
                                        {paymentConfig.label}
                                    </span>
                                </div>

                                {/* Payment Method */}
                                {order.paymentId.paymentMethod && (
                                    <div>
                                        <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase mb-1">
                                            Método
                                        </p>
                                        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 capitalize">
                                            {order.paymentId.paymentMethod}
                                        </p>
                                    </div>
                                )}

                                {/* Provider */}
                                <div>
                                    <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase mb-1">
                                        Proveedor
                                    </p>
                                    <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 capitalize">
                                        {order.paymentId.provider}
                                    </p>
                                </div>

                                {/* Amount */}
                                <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700">
                                    <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase mb-1">
                                        Monto
                                    </p>
                                    <p className="text-base font-bold text-zinc-900 dark:text-orange-200">
                                        {formatToCLP(order.paymentId.amount)}
                                    </p>
                                </div>

                                {/* Payment Date */}
                                <div>
                                    <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase mb-1 flex items-center gap-1">
                                        <Calendar size={12} />
                                        Fecha
                                    </p>
                                    <p className="text-sm text-zinc-800 dark:text-zinc-200">
                                        {formatDate(order.paymentId.createdAt)}
                                    </p>
                                </div>

                                {/* Rejection Reason */}
                                {order.paymentId.status === "rejected" && order.paymentId.rejectionReason && (
                                    <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
                                        <div className="flex items-start gap-2">
                                            <AlertCircle size={16} className="text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-xs font-semibold text-red-800 dark:text-red-300 mb-1">
                                                    Motivo del Rechazo
                                                </p>
                                                <p className="text-xs text-red-700 dark:text-red-400">
                                                    {order.paymentId.rejectionReason}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Order Info */}
                    <div className="bg-zinc-50 dark:bg-zinc-700/50 border border-zinc-200 dark:border-zinc-600 rounded-lg p-6">
                        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                            Información de Orden
                        </h2>

                        <dl className="space-y-3 text-sm">
                            <div>
                                <dt className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase mb-1">
                                    Número de Seguimiento
                                </dt>
                                <dd className="font-mono font-medium text-zinc-900 dark:text-zinc-100">
                                    {order.trackingNumber}
                                </dd>
                            </div>

                            <div>
                                <dt className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase mb-1 flex items-center gap-1">
                                    <Calendar size={12} />
                                    Fecha de Orden
                                </dt>
                                <dd className="text-zinc-900 dark:text-zinc-100">
                                    {formatDate(order.createdAt)}
                                </dd>
                            </div>

                            {order.deliveredAt && (
                                <div>
                                    <dt className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase mb-1 flex items-center gap-1">
                                        <CheckCircle size={12} />
                                        Fecha de Entrega
                                    </dt>
                                    <dd className="text-green-700 dark:text-green-300 font-medium">
                                        {formatDate(new Date(order.deliveredAt))}
                                    </dd>
                                </div>
                            )}
                        </dl>
                    </div>
                </div>
            </div>
        </main>
    );
}