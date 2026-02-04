import SearchBar from '@/components/ui/SearchBar';
import Pagination from '@/components/ui/Pagination';
import { Order, OrderStatusKeys } from '@/src/types';
import { OrderSortBy, SortOrder } from '@/src/utils/params';
import { 
    AlertCircle, ArrowDown, ArrowUp, ArrowUpDown, CheckCircle, Clock, 
    Package, Truck, XCircle, Eye, ChevronRight, Calendar, DollarSign,
    MapPin, Zap,
    Clipboard,
    X,
    ChevronDown,
    CreditCard
} from 'lucide-react';
import React, { useState } from 'react'
import { formatDate } from '@/src/utils/date';
import { formatToCLP } from '@/src/utils/price';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { capitalizeFirstLetter } from '@/src/utils/text';
import { copyToClipboard } from '@/src/utils/copy';
import Dialog from '@/components/ui/Dialog';

type UserOrdersListingProps = {
    orders: Order[];
    totalOrders: number;
    totalPages: number; 
    page: number; 
    sortBy: OrderSortBy;
    sortOrder: SortOrder;
    hasActiveSearch: boolean;  
    trackingNumber?: string; 
    status?: OrderStatusKeys;
    onFilterChange: (key: string, value: string | null) => void;
    onClearFilters: () => void;
    onSortChange: (field: OrderSortBy) => void;
}

const orderStatusValues: OrderStatusKeys[] = [
    "Pending",
    "Processing",
    "Sent",
    "Delivered",
    "Cancelled",
    "Expired"
];

const orderStatusLabels: Record<OrderStatusKeys, string> = {
    Pending: "Esperando Pago",
    Processing: "Procesando",
    Sent: "En Transito",
    Delivered: "Entregado",
    Cancelled: "Cancelado",
    Expired: "Orden Expirada"
};

const statusConfig: Record<string, { icon: typeof Clock; color: string; bgColor: string; label: string }> = {
    "Esperando Pago": { icon: Clock, color: "text-amber-600 dark:text-amber-400", bgColor: "bg-amber-100 dark:bg-amber-900/20", label: "Esperando Pago" },
    "Procesando": { icon: Package, color: "text-blue-600 dark:text-blue-400", bgColor: "bg-blue-100 dark:bg-blue-900/20", label: "Procesando" },
    "En Transito": { icon: Truck, color: "text-orange-600 dark:text-orange-400", bgColor: "bg-orange-100 dark:bg-orange-900/20", label: "En Tránsito" },
    "Entregado": { icon: CheckCircle, color: "text-green-600 dark:text-green-400", bgColor: "bg-green-100 dark:bg-green-900/20", label: "Entregado" },
    "Cancelado": { icon: XCircle, color: "text-red-600 dark:text-red-400", bgColor: "bg-red-100 dark:bg-red-900/20", label: "Cancelado" },
    "Orden Expirada": { icon: AlertCircle, color: "text-zinc-600 dark:text-zinc-400", bgColor: "bg-zinc-100 dark:bg-zinc-900/20", label: "Expirada" }
};

const statusIcons = {
    "Esperando Pago": Clock,
    "Procesando": Package,
    "En Transito": Truck,
    "Entregado": CheckCircle,
    "Cancelado": XCircle,
    "Orden Expirada": AlertCircle
};

const statusColors = {
    "Esperando Pago": "text-amber-600 dark:text-amber-400",
    "Procesando": "text-blue-600 dark:text-blue-400",
    "En Transito": "text-orange-600 dark:text-orange-400",
    "Entregado": "text-green-600 dark:text-green-400",
    "Cancelado": "text-red-600 dark:text-red-400",
    "Orden Expirada": "text-zinc-600 dark:text-zinc-400"
};

export default function UserOrdersListing({
    orders,
    totalOrders,
    totalPages, 
    page, 
    sortBy,
    sortOrder,
    hasActiveSearch,
    status,
    trackingNumber, 
    onFilterChange,
    onClearFilters,
    onSortChange,
}: UserOrdersListingProps) {
    const router = useRouter();
    const [showStatusFilter, setShowStatusFilter] = useState(false);

    const getSortIcon = (field: OrderSortBy) => {
        if (sortBy !== field) {
            return <ArrowUpDown size={14} className="text-zinc-400" />;
        }
        return sortOrder === "asc" 
            ? <ArrowUp size={14} className="text-white group-hover:text-orange-500 dark:group-hover:text-orange-200" />
            : <ArrowDown size={14} className="text-white group-hover:text-orange-500 dark:group-hover:text-orange-200" />;
    };

    const handleViewDetails = (orderId: string) => {
        router.push(`/home/profile/orders/${orderId}`);
    };

    const handleViewPayment = (paymentId: string) => {
        router.push(`/home/profile/payments/${paymentId}`);
    };

    const handleProductClick = (productId: string) => {
        window.open(`/home/products/${productId}`, '_blank');
    };

    const getStatusConfig = (orderStatus: string) => {
        return statusConfig[orderStatus] || statusConfig["Esperando Pago"];
    };

    const handleStatusSelect = (selectedStatus: OrderStatusKeys) => {
        onFilterChange("status", selectedStatus);
        setShowStatusFilter(false);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-16 my-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-orange-100 uppercase">
                    Mis Órdenes
                </h1>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    Total de órdenes: <span className="font-semibold text-zinc-900 dark:text-zinc-100">{totalOrders}</span>
                </p>
            </div>

            {/* Search and Filters */}
            <div className="space-y-4 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
                <div>
                    <SearchBar
                        route="home/profile/orders"
                        param="trackingNumber"
                        inputType="text"
                        formText="Buscar orden por Número de Pedido"
                        searchText="Orden"
                        defaultValue={trackingNumber}
                        mini
                    />
                </div>

                {/* Filter Controls */}
                <div className="flex flex-wrap gap-3 items-center">
                    {/* Status Filter */}
                    <div className="relative">
                        <button
                            onClick={() => setShowStatusFilter(!showStatusFilter)}
                            className="px-3 py-1.5 text-sm border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-600 transition-colors flex items-center gap-2"
                        >
                            <ChevronDown size={14} />
                            {status || "Estado"}
                            {status && (
                                <X
                                    size={14}
                                    className="inline ml-1"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onFilterChange("status", null);
                                    }}
                                />
                            )}
                        </button>

                        {showStatusFilter && (
                            <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 rounded-md shadow-lg z-10">
                                <button
                                    onClick={() => {
                                        onFilterChange("status", null);
                                        setShowStatusFilter(false);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-600 transition-colors"
                                >
                                    Todas
                                </button>
                                
                                {orderStatusValues.map((statusValue) => {
                                    const label = orderStatusLabels[statusValue] as keyof typeof statusColors;
                                    const StatusIcon = statusIcons[label];
                                    const colorClass = statusColors[label];
                                    
                                    return (
                                        <button
                                            key={statusValue}
                                            onClick={() => handleStatusSelect(statusValue)}
                                            className="w-full text-left px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-600 transition-colors flex items-center gap-2"
                                        >
                                            <StatusIcon size={16} className={colorClass} />
                                            <span>{label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Sort by Date */}
                    <label className="flex items-center gap-2 cursor-pointer">
                        <button
                            onClick={() => onSortChange("date")}
                            className="
                                flex items-center gap-2 
                                hover:text-orange-500 dark:hover:text-orange-200 
                                transition-colors cursor-pointer group relative
                            "
                        >
                            <Calendar 
                                size={16} 
                                className='group-hover:text-orange-500 dark:group-hover:text-orange-200'
                            />

                            <span className="text-sm text-zinc-700 dark:text-zinc-300 group-hover:text-orange-500 dark:group-hover:text-orange-200">
                                Ordenar por Fecha
                            </span>

                            {getSortIcon("date")}

                            <Dialog 
                                position="bottom"
                            >
                                Filtrar ↑↓
                            </Dialog>
                        </button>
                    </label>

                    {/* Clear Filters */}
                    {hasActiveSearch && (
                        <button
                            onClick={onClearFilters}
                            className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                        >
                            Limpiar filtros
                        </button>
                    )}
                </div>
            </div>

            {/* Orders List */}
            {orders.length > 0 ? (
                <div className="space-y-4">
                    {orders.map((order) => {
                        const config = getStatusConfig(order.status);
                        const StatusIcon = config.icon;
                        const previewItems = order.items.slice(0, 2);
                        const hasMoreItems = order.items.length > 2;
                        const isDelivered = order.status === "Entregado" && order.deliveredAt;

                        return (
                            <div
                                key={order.id}
                                className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:shadow-md dark:hover:shadow-lg transition-shadow duration-200 overflow-hidden"
                            >
                                {/* Card Header */}
                                <div className={`px-6 py-4 ${config.bgColor} border-b border-zinc-200 dark:border-zinc-700`}>
                                    <div className="flex items-start justify-between md:gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="flex-align text-lg font-semibold text-zinc-900 dark:text-zinc-100 font-mono truncate">
                                                    {order.trackingNumber}

                                                    <button
                                                        onClick={() => copyToClipboard(order.trackingNumber)}
                                                        className="text-zinc-400 hover:text-blue-500 transition-colors duration-200 group relative"
                                                    >
                                                        <Dialog position="right-top">Copiar tracking number</Dialog>
                                                        <Clipboard size={14} />
                                                    </button>
                                                </h3>
                                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${config.bgColor} ${config.color}`}>
                                                    <StatusIcon size={14} />
                                                    {order.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                                                <div className="flex items-center gap-1">
                                                    <Calendar size={14} />
                                                    {formatDate(order.createdAt)}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Package size={14} />
                                                    {order.items.length} {order.items.length === 1 ? 'producto' : 'productos'}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="text-sm text-zinc-600 dark:text-zinc-400">Total</p>
                                            <p className="sm:text-2xl font-bold text-orange-600 dark:text-orange-300">
                                                {formatToCLP(order.total)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="px-6 py-4 space-y-4">
                                    {/* Product Preview */}
                                    <div>
                                        <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase mb-3">
                                            Productos
                                        </p>
                                        <div className="flex items-start gap-3">
                                            {previewItems.map((item) => (
                                                <div
                                                    key={item.productId}
                                                    className="flex flex-col items-center gap-2 cursor-pointer"
                                                    onClick={() => handleProductClick(item.productId)}
                                                >
                                                    <div className="relative">
                                                        <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-700 rounded-lg overflow-hidden flex-shrink-0 border border-zinc-200 dark:border-zinc-600 group hover:shadow-lg transition-all duration-200">
                                                            <Image
                                                                src={item.productImage}
                                                                alt={item.productName}
                                                                fill
                                                                className="object-cover group-hover:opacity-80 transition-opacity duration-200 rounded-lg"
                                                            />

                                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20">
                                                                <Eye size={20} className="text-white" />
                                                            </div>
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
                                                    </div>
                                                    <p className="text-xs text-zinc-600 dark:text-zinc-400 text-center max-w-16 truncate hover:text-orange-500 dark:hover:text-orange-300 transition-colors duration-200">
                                                        {capitalizeFirstLetter(item.productName)}
                                                    </p>
                                                </div>
                                            ))}
                                            {hasMoreItems && (
                                                <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-700 rounded-lg border border-zinc-200 dark:border-zinc-600 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">
                                                        +{order.items.length - 2}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Detailed Shipping & Status Info */}
                                    <div className="space-y-3 pt-4 border-t border-zinc-200 dark:border-zinc-700">
                                        {/* Customer Info */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                            <div>
                                                <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase mb-2">
                                                    Destinatario
                                                </p>
                                                <div className="text-sm text-zinc-700 dark:text-zinc-300 space-y-0.5">
                                                    <p className="font-medium">{order.customer.name} {order.customer.surname}</p>
                                                    <p className="text-xs text-zinc-600 dark:text-zinc-400">{order.customer.email}</p>
                                                    {order.customer.phone && (
                                                        <p className="text-xs text-zinc-600 dark:text-zinc-400">{order.customer.phone}</p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Shipping Address */}
                                            <div className="">
                                                <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase mb-2 flex items-center gap-1">
                                                    <MapPin size={14} />
                                                    Dirección de Envío
                                                </p>
                                                <div className="text-sm text-zinc-700 dark:text-zinc-300 space-y-0.5">
                                                    <p className="font-medium">{order.shippingAddress.street}</p>
                                                    <p>{order.shippingAddress.cityArea}, {order.shippingAddress.city}</p>
                                                    <p className="text-xs text-zinc-600 dark:text-zinc-400">{order.shippingAddress.region}</p>
                                                    {order.shippingAddress.reference && (
                                                        <p className="text-xs text-zinc-600 dark:text-zinc-400">Ref: {order.shippingAddress.reference}</p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Shipping Method & Cost */}
                                            <div className="space-y-6">
                                                <div>
                                                    <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase mb-1 flex items-center gap-1">
                                                        <Truck size={14} />
                                                        Método de Envío
                                                    </p>
                                                    <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                                        {order.shippingMethod || 'Retiro domicilio'}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase mb-1 flex items-center gap-1">
                                                        <DollarSign size={14} />
                                                        Costo de Envío
                                                    </p>
                                                    <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                                        {(order.shipping ?? 0) > 0 ? formatToCLP(order.shipping ?? 0) : 'Gratis'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Delivery Status - Show different content based on status */}
                                        {isDelivered && (
                                            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                                                <div className="flex items-start gap-2">
                                                    <CheckCircle size={18} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-xs font-semibold text-green-800 dark:text-green-300 mb-1">
                                                            Entregado
                                                        </p>
                                                        <p className="text-sm text-green-700 dark:text-green-200 font-medium">
                                                            {formatDate(order.deliveredAt!)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {order.status === "En Transito" && (
                                            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3">
                                                <div className="flex items-center gap-2">
                                                    <Zap size={18} className="text-orange-600 dark:text-orange-400" />
                                                    <p className="text-sm font-medium text-orange-700 dark:text-orange-200">
                                                        Tu orden está en camino hacia {order.shippingAddress.city}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {order.status === "Procesando" && (
                                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                                                <div className="flex items-center gap-2">
                                                    <Package size={18} className="text-blue-600 dark:text-blue-400" />
                                                    <p className="text-sm font-medium text-blue-700 dark:text-blue-200">
                                                        Preparando tu pedido para envío
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Card Footer - Action */}
                                    <div className="
                                            px-6 py-4 bg-zinc-50 dark:bg-zinc-700/30 
                                            border-t border-zinc-200 dark:border-zinc-700 
                                            flex flex-col md:flex-row items-center justify-end gap-4
                                        "
                                    >
                                        <button
                                            onClick={() => handleViewDetails(order.id)}
                                            className="flex-center w-full md:w-auto gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                                        >
                                            <Eye size={16} />
                                            Ver detalles
                                            <ChevronRight size={16} />
                                        </button>

                                        {typeof order.paymentId === "string" && (
                                            <button
                                                onClick={() => handleViewPayment(order.paymentId as string)}
                                                className="flex-center w-full md:w-auto gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-900 dark:bg-zinc-700 dark:hover:bg-zinc-700/30 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                                            >
                                                <CreditCard size={16} />
                                                Ver detalles de pago
                                                <ChevronRight size={16} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-12 text-center">
                    <Package size={48} className="mx-auto mb-4 text-zinc-400 dark:text-zinc-500" />
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                        No hay órdenes
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
                        {hasActiveSearch 
                            ? "No encontramos órdenes que coincidan con tu búsqueda. Intenta con otros criterios."
                            : "Aún no tienes órdenes. ¡Comienza a comprar joyas hermosas hoy!"
                        }
                    </p>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && orders.length > 0 && (
                <div className="mt-8">
                    <Pagination
                        route="home/profile/orders"
                        page={page}
                        totalPages={totalPages}
                    />
                </div>
            )}
        </div>
    );
}
