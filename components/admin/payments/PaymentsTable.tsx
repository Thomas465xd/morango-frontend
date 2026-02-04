import { Payment, PaymentStatus } from '@/src/types';
import { PaymentSortBy, SortOrder } from '@/src/utils/params';
import { 
    ArrowDown, 
    ArrowUp, 
    ArrowUpDown, 
    Package, 
    User, 
    Calendar,
    DollarSign,
    Filter,
    Clock,
    CheckCircle,
    XCircleIcon,
    PackageX,
    ClockAlert,
    X,
} from 'lucide-react';
import { useState } from 'react';
import Dialog from '@/components/ui/Dialog';
import SearchBar from '@/components/ui/SearchBar';
import Pagination from '@/components/ui/Pagination';
import PaymentEntry from './PaymentEntry';

type PaymentsTableProps = {
    payments: Payment[]
    totalPayments: number;
    totalPages: number; 
    page: number; 
    sortBy: PaymentSortBy;
    sortOrder: SortOrder;
    hasActiveSearch: boolean; 
    search?: string; 
    status?: PaymentStatus; 
    onFilterChange: (key: string, value: string | null) => void;
    onClearFilters: () => void;
    onSortChange: (field: PaymentSortBy) => void;
}

const paymentStatusValues: PaymentStatus[] = [
    "pending",
    "approved",
    "rejected",
    "cancelled",
    "refunded",
    "expired",
];

const paymentStatusLabels: Record<PaymentStatus, string> = {
    pending: "Esperando Pago",
    approved: "Aprobado",
    rejected: "Rechazado",
    cancelled: "Cancelado",
    refunded: "Reembolsado",
    expired: "Expirado"
};

const statusIcons: Record<PaymentStatus, typeof Clock> = {
    "pending": Clock,
    "approved": CheckCircle,
    "rejected": XCircleIcon,
    "cancelled": PackageX,
    "refunded": DollarSign,
    "expired": ClockAlert
};

const statusColors: Record<PaymentStatus, string> = {
    "pending": "text-amber-600 dark:text-amber-400",
    "approved": "text-green-600 dark:text-green-400",
    "rejected": "text-orange-600 dark:text-orange-400",
    "cancelled": "text-red-600 dark:text-red-400",
    "refunded": "text-blue-600 dark:text-blue-400",
    "expired": "text-zinc-600 dark:text-zinc-400"
};

export default function PaymentsTable({
    payments,
    totalPayments,
    totalPages, 
    page, 
    sortBy,
    sortOrder,
    hasActiveSearch,
    status,
    search, 
    onFilterChange,
    onClearFilters,
    onSortChange,
}: PaymentsTableProps) {
    const [showStatusModal, setShowStatusModal] = useState(false);

    const getSortIcon = (field: PaymentSortBy) => {
        if (sortBy !== field) {
            return <ArrowUpDown size={14} className="text-zinc-400" />;
        }
        return sortOrder === "asc" 
            ? <ArrowUp size={14} className="text-white" />
            : <ArrowDown size={14} className="text-white" />;
    };

    const handleStatusSelect = (selectedStatus: PaymentStatus) => {
        onFilterChange("status", selectedStatus);
        setShowStatusModal(false);
    };

    return (
        <div className="overflow-hidden rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 mt-12">
            {/* Filter Controls */}
            <div className="bg-white dark:bg-zinc-800 p-4 border-b border-zinc-200 dark:border-zinc-700 space-y-4">
                {/* Search Bar */}
                <SearchBar
                    route="admin/payments"
                    param="search"
                    inputType="text"
                    formText="Buscar pagos por email del cliente o tracking number de la orden"
                    searchText="Pago"
                    defaultValue={search}
                    mini
                />

                {/* Filters Row */}
                <div className="flex flex-wrap gap-3 items-center">
                    {/* Status Filter */}
                    <div className="relative">
                        <button
                            onClick={() => setShowStatusModal(!showStatusModal)}
                            className="px-3 py-1.5 text-sm border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-600 transition-colors flex items-center gap-2"
                        >
                            <Filter size={14} />
                            {status ? paymentStatusLabels[status] : "Estado"}
                            {status && (
                                <X
                                    size={14}
                                    className="cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onFilterChange("status", null);
                                    }}
                                />
                            )}
                        </button>

                        {showStatusModal && (
                            <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 rounded-md shadow-lg z-10">
                                {paymentStatusValues.map((statusValue) => {
                                    const label = paymentStatusLabels[statusValue];
                                    const StatusIcon = statusIcons[statusValue];
                                    const colorClass = statusColors[statusValue];
                                    

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

                    {/* Clear Filters Button */}
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

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gradient-to-r from-zinc-800 to-zinc-700 text-left text-sm text-white">
                            {/* Expand Icon */}
                            <th className="w-8 px-2 py-4"></th>

                            {/* Payment ID */}
                            <th className="px-6 py-4 font-medium">
                                <div className="flex items-center gap-2">
                                    <Package size={16} />
                                    <span>ID de Pago</span>
                                </div>
                            </th>

                            {/* Customer Email */}
                            <th className="px-6 py-4 font-medium">
                                <div className="flex items-center gap-2">
                                    <User size={16} />
                                    <span>Cliente</span>
                                </div>
                            </th>

                            {/* Amount - Sortable */}
                            <th className="px-6 py-4 font-medium">
                                <button
                                    onClick={() => onSortChange("amount")}
                                    className="flex items-center gap-2 hover:text-zinc-300 transition-colors cursor-pointer group relative"
                                >
                                    <DollarSign size={16} />
                                    <span>Monto</span>
                                    {getSortIcon("amount")}
                                    <Dialog position="bottom">Filtrar ↑↓</Dialog>
                                </button>
                            </th>

                            {/* Status */}
                            <th className="px-6 py-4 font-medium">
                                <div className="flex items-center gap-2">
                                    <Filter size={16} />
                                    <span>Estado</span>
                                </div>
                            </th>

                            {/* Date - Sortable */}
                            <th className="px-6 py-4 font-medium">
                                <button
                                    onClick={() => onSortChange("date")}
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
                        {payments.length > 0 ? (
                            payments.map((payment) => (
                                <PaymentEntry
                                    key={payment.id} 
                                    payment={payment} 
                                />
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="px-6 py-8 text-center text-zinc-500 dark:text-zinc-400"
                                >
                                    No se encontraron pagos
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer with Pagination */}
            <div className="bg-zinc-50 dark:bg-zinc-800 px-6 py-3 border-t border-zinc-200 dark:border-zinc-700">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Mostrando {payments.length} de{" "}
                        {totalPayments || 0} pagos
                    </p>
                </div>
                
                {totalPages > 1 && (
                    <Pagination
                        route="admin/payments"
                        page={page}
                        totalPages={totalPages}
                    />
                )}
            </div>
        </div>
    );
}