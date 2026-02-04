import { Order, OrderStatusKeys } from '@/src/types';
import { OrderSortBy, SortOrder } from '@/src/utils/params';
import { 
    ArrowDown, 
    ArrowUp, 
    ArrowUpDown, 
    Package, 
    User, 
    Calendar,
    DollarSign,
    AlertCircle,
    X,
    Filter,
    Clock,
    Truck,
    CheckCircle,
    XCircle,
} from 'lucide-react';
import React, { useState } from 'react';
import Dialog from '@/components/ui/Dialog';
import OrderEntry from './OrderEntry';
import SearchBar from '@/components/ui/SearchBar';
import Pagination from '@/components/ui/Pagination';

type OrdersTableProps = {
    orders: Order[];
    totalOrders: number;
    totalPages: number; 
    page: number; 
    sortBy: OrderSortBy;
    sortOrder: SortOrder;
    hasActiveSearch: boolean; 
    email?: string; 
    trackingNumber?: string; 
    status?: OrderStatusKeys;
    hasPayment?: boolean;
    includeArchived?: boolean; 
    isGuest?: boolean;
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

// Add this near the top of the component with other constants
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

export default function OrdersTable({
    orders,
    totalOrders,
    totalPages, 
    page, 
    sortBy,
    sortOrder,
    hasActiveSearch,
    status,
    hasPayment = false,
    isGuest = false,
    includeArchived = false, 
    email,
    trackingNumber, 
    onFilterChange,
    onClearFilters,
    onSortChange,
}: OrdersTableProps) {
    const [showStatusModal, setShowStatusModal] = useState(false);

    const getSortIcon = (field: OrderSortBy) => {
        if (sortBy !== field) {
            return <ArrowUpDown size={14} className="text-zinc-400" />;
        }
        return sortOrder === "asc" 
            ? <ArrowUp size={14} className="text-white" />
            : <ArrowDown size={14} className="text-white" />;
    };

    const toggleSort = (field: OrderSortBy) => {
        onSortChange(field);
    };

    const handleStatusSelect = (selectedStatus: OrderStatusKeys) => {
        onFilterChange("status", selectedStatus);
        setShowStatusModal(false);
    };

    const toggleHasPayment = () => {
        onFilterChange("hasPayment", hasPayment ? null : "true");
    };

    const toggleIncludeArchived = () => {
        onFilterChange("includeArchived", includeArchived ? null : "true");
    };

    const toggleIsGuest = () => {
        onFilterChange("isGuest", isGuest ? "false" : "true");
    };

    return (
        <div className="overflow-hidden rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 mt-12">
            <div className="bg-white dark:bg-zinc-800 p-4 border-b border-zinc-200 dark:border-zinc-700 space-y-4">
                {/* Search Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <SearchBar
                        route="admin/orders"
                        param="email"
                        inputType="email"
                        formText="Buscar ordenes por email de registro"
                        searchText="Ordenes"
                        defaultValue={email}
                        mini
                        hideSubmit
                    />
                    <SearchBar
                        route="admin/orders"
                        param="trackingNumber"
                        inputType="text"
                        formText="Buscar orden por Tracking Number"
                        searchText="Ordenes"
                        defaultValue={trackingNumber}
                        mini
                        hideSubmit
                    />
                </div>

                <div className="flex flex-wrap gap-3 items-center">
                    {/* Status Filter */}
                    <div className="relative">
                        <button
                            onClick={() => setShowStatusModal(!showStatusModal)}
                            className="px-3 py-1.5 text-sm border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-600 transition-colors flex items-center gap-2"
                        >
                            <Filter size={14} />
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

                        {showStatusModal && (
                            <div className="absolute top-full left-0 mt-1 w-52 bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 rounded-md shadow-lg z-10">
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

                    {/* Has Payment Filter */}
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={hasPayment}
                            onChange={toggleHasPayment}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <span className="text-sm text-zinc-700 dark:text-zinc-300">
                            Con pago
                        </span>
                    </label>

                    {/* Is Guest Filter */}
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isGuest}
                            onChange={toggleIsGuest}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <span className="text-sm text-zinc-700 dark:text-zinc-300">
                            Solo invitados
                        </span>
                    </label>

                    {/* Show archived filter */}
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={includeArchived}
                            onChange={toggleIncludeArchived}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <span className="text-sm text-zinc-700 dark:text-zinc-300">
                            Solo archivadas
                        </span>
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

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gradient-to-r from-zinc-800 to-zinc-700 text-left text-sm text-white">
                            <th className="w-8 px-2 py-4"></th>

                            {/* Tracking Number - Sortable */}
                            <th className="px-6 py-4 font-medium">
                                <div className="flex items-center gap-2">
                                    <Package size={16} />
                                    <span>ID Orden</span>
                                </div>
                            </th>

                            {/* Customer Name */}
                            <th className="px-6 py-4 font-medium">
                                <div className="flex items-center gap-2">
                                    <User size={16} />
                                    <span>Cliente</span>
                                </div>
                            </th>

                            {/* Status */}
                            <th className="px-6 py-4 font-medium">
                                <div className="flex items-center gap-2">
                                    <AlertCircle size={16} />
                                    <span>Estado</span>
                                </div>
                            </th>

                            {/* Total - Sortable */}
                            <th className="px-6 py-4 font-medium">
                                <div className="flex items-center gap-2">
                                    <DollarSign size={16} />
                                    <span>Total</span>
                                </div>
                            </th>

                            {/* Date - Sortable */}
                            <th className="px-6 py-4 font-medium">
                                <button
                                    onClick={() => toggleSort("date")}
                                    className="flex items-center gap-2 hover:text-zinc-300 transition-colors cursor-pointer group relative"
                                >
                                    <Calendar size={16} />
                                    <span>Fecha</span>
                                    {getSortIcon("date")}
                                    <Dialog position="bottom">Filtrar ↑↓</Dialog>
                                </button>
                            </th>

                            {/* Actions */}
                            <th className="px-6 py-4 font-medium">
                                <span>Acciones</span>
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700 bg-white dark:bg-zinc-800">
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <OrderEntry key={order.id} order={order} />
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="px-6 py-8 text-center text-zinc-500 dark:text-zinc-400"
                                >
                                    No se encontraron órdenes
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800 px-6 py-3 border-t border-zinc-200 dark:border-zinc-700">
                <div className="flex items-center justify-between">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Mostrando {orders.length} de{" "}
                        {totalOrders || 0} ordenes
                    </p>
                </div>
                
                {totalPages > 1 && (
                    <Pagination
                        route="admin/orders"
                        page={page}
                        totalPages={totalPages}
                    />
                )}
            </div>
        </div>
    );
}