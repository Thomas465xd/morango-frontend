import { Order, OrderStatus, OrderStatusKeys } from '@/src/types';
import { formatDate } from '@/src/utils/date';
import { 
    ChevronDown, 
    ChevronUp, 
    Trash2, 
    Edit,
    Clipboard,
    Package,
    MapPin,
    Truck,
    CreditCard,
    ArchiveX
} from 'lucide-react';
import { Fragment, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Swal from 'sweetalert2';
import Dialog from '@/components/ui/Dialog';
import { formatToCLP } from '@/src/utils/price';
import { useThemeForModal } from '@/src/hooks/useTheme';
import { copyToClipboard } from '@/src/utils/copy';
import { capitalizeFirstLetter } from '@/src/utils/text';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { archiveOrder, deleteOrder, updateOrderStatus } from '@/src/api/OrderAPI';
import { toast } from 'react-toastify';

type OrderEntryProps = {
    order: Order;
};

const statusToKeyMap: Record<OrderStatus, OrderStatusKeys> = {
    "Esperando Pago": "Pending",
    "Procesando": "Processing",
    "En Transito": "Sent",
    "Entregado": "Delivered",
    "Cancelado": "Cancelled",
    "Orden Expirada": "Expired"
};

const statusConfig: Record<OrderStatus, { color: string; bgColor: string }> = {
    "Esperando Pago": { 
        color: "text-amber-800 dark:text-amber-300", 
        bgColor: "bg-amber-100 dark:bg-amber-900/30" 
    },
    "Procesando": { 
        color: "text-blue-800 dark:text-blue-300", 
        bgColor: "bg-blue-100 dark:bg-blue-900/30" 
    },
    "En Transito": { 
        color: "text-orange-800 dark:text-orange-300", 
        bgColor: "bg-orange-100 dark:bg-orange-900/30" 
    },
    "Entregado": { 
        color: "text-green-800 dark:text-green-300", 
        bgColor: "bg-green-100 dark:bg-green-900/30" 
    },
    "Cancelado": { 
        color: "text-red-800 dark:text-red-300", 
        bgColor: "bg-red-100 dark:bg-red-900/30" 
    },
    "Orden Expirada": { 
        color: "text-zinc-800 dark:text-zinc-400", 
        bgColor: "bg-zinc-100 dark:bg-zinc-900/30" 
    }
};

const statusDotColors = {
    "Esperando Pago": "bg-amber-500 shadow-amber-500 shadow-md",
    "Procesando": "bg-blue-500 shadow-blue-500 shadow-md",
    "En Transito": "bg-orange-500 shadow-orange-500 shadow-md",
    "Entregado": "bg-green-500 shadow-green-500 shadow-md",
    "Cancelado": "bg-red-500 shadow-red-500 shadow-md",
    "Orden Expirada": "bg-zinc-500 shadow-zinc-50 shadow-md0"
};

const statusDropdownBgColors = {
    "Esperando Pago": "hover:bg-amber-50 dark:hover:bg-amber-900/20",
    "Procesando": "hover:bg-blue-50 dark:hover:bg-blue-900/20",
    "En Transito": "hover:bg-orange-50 dark:hover:bg-orange-900/20",
    "Entregado": "hover:bg-green-50 dark:hover:bg-green-900/20",
    "Cancelado": "hover:bg-red-50 dark:hover:bg-red-900/20",
    "Orden Expirada": "hover:bg-zinc-50 dark:hover:bg-zinc-900/20"
};

const availableStatuses: OrderStatus[] = [
    "Esperando Pago",
    "Procesando",
    "En Transito",
    "Entregado",
    "Cancelado"
];

// Define valid status transitions
const getValidTransitions = (currentStatus: OrderStatus): OrderStatus[] => {
    const validTransitions: Record<OrderStatus, OrderStatus[]> = {
        "Esperando Pago": ["Cancelado"],
        "Procesando": ["En Transito", "Cancelado"],
        "En Transito": ["Entregado", "Cancelado"],
        "Entregado": ["Cancelado"],
        "Cancelado": [],
        "Orden Expirada": ["Cancelado"]
    };
    return validTransitions[currentStatus] || [];
};

const isStatusTransitionValid = (fromStatus: OrderStatus, toStatus: OrderStatus): boolean => {
    return getValidTransitions(fromStatus).includes(toStatus);
};

export default function OrderEntry({ order }: OrderEntryProps) {
    const [expandedRow, setExpandedRow] = useState(false);
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const theme = useThemeForModal();

    const router = useRouter();
    const queryClient = useQueryClient(); 

    const toggleRowExpansion = () => {
        setExpandedRow(!expandedRow);
    };

    //? Mutation for updating status
    const { mutate: updateStatusMutation } = useMutation({
        mutationFn: updateOrderStatus, 
        onError: (error) => {
            toast.error(error.message || "Error al cambiar estado orden")
        }, 
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["orders"] })
            toast.success(data.message || "Estado actualizado exitosamente")
        }
    })

    //! Mutation for deleting Order 
    const { mutate: deleteOrderMutation } = useMutation({
        mutationFn: deleteOrder, 
        onError: (error) => {
            toast.error(error.message || "Error al eliminar orden")
        }, 
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] })
            Swal.fire({
                title: "¡Eliminado!",
                text: "La orden ha sido eliminada.",
                icon: "success",
                timer: 1000,
                showConfirmButton: false,
                theme: theme,
            });
        }
    })

    //! Mutation for archiving an Order 
    const { mutate: archiveOrderMutation } = useMutation({
        mutationFn: archiveOrder, 
        onError: (error) => {
            toast.error(error.message || "Error al archivar orden")
        }, 
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] })
            Swal.fire({
                title: "¡Archivada!",
                text: "La orden ha sido archivada exitosamente.",
                icon: "success",
                timer: 1000,
                showConfirmButton: false,
                theme: theme,
            });
        }
    })

    const handleStatusChange = (displayStatus: OrderStatus) => {
        setShowStatusDropdown(false);
        
        // Validate status transition
        if (!isStatusTransitionValid(order.status, displayStatus)) {
            toast.error("Esta transición de estado no está permitida");
            return;
        }

        const statusKey = statusToKeyMap[displayStatus];

        Swal.fire({
            title: `Actualizar Estado a "${displayStatus}"`,
            text: "Una vez completada la operación, un Email será enviado al usuario notificando el nuevo estado. 🚚📦",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Actualizar",
            cancelButtonText: "Cancelar",
            theme: theme
        }).then((result) => {
            if (result.isConfirmed) {
                // If status is "Entregado", prompt for deliveredAt date
                if (displayStatus === "Entregado") {
                    promptForDeliveredDate(statusKey);
                } else {
                    // Update without deliveredAt
                    updateStatusMutation({
                        orderId: order.id,
                        status: statusKey
                    });
                }
            }
        });
    };

    const promptForDeliveredDate = (statusKey: OrderStatusKeys) => {
        // Set default to current date/time
        const now = new Date();
        const defaultDateTime = now.toISOString().slice(0, 16);

        Swal.fire({
            title: "Fecha de entrega",
            html: `
                <div class="text-left">
                    <label class="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                        Selecciona la fecha y hora de entrega:
                    </label>
                    <input 
                        type="datetime-local" 
                        id="deliveredAt" 
                        class="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white"
                        value="${defaultDateTime}"
                    />
                </div>
            `,
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
            theme: theme,
            didOpen: (modal) => {
                const input = modal.querySelector("#deliveredAt") as HTMLInputElement;
                if (input) {
                    input.focus();
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const input = document.querySelector("#deliveredAt") as HTMLInputElement;
                const deliveredAtValue = input?.value;

                if (!deliveredAtValue) {
                    toast.error("Por favor selecciona una fecha de entrega");
                    return;
                }

                const deliveredAt = new Date(deliveredAtValue);

                Swal.fire({
                    icon: "success",
                    title: "Estado actualizado",
                    text: "La orden ha sido marcada como entregada",
                    timer: 1000,
                    showConfirmButton: false, 
                    theme: theme,
                });

                updateStatusMutation({
                    orderId: order.id,
                    status: statusKey,
                    deliveredAt
                });
            }
        });
    };

    const handleDeleteOrder = async (id: string) => {
        try {
            Swal.fire({
                title: "Eliminar Orden",
                html: `
                    <p class="underline">
                        No es recomendable eliminar ordenes manualmente.
                    </p>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Nota: Todas las ordenes expiradas que no tengan pagos completados serán eliminadas los domingos a las 3 AM
                    </p>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        ID: ${order.trackingNumber}
                    </p>
                `,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar",
                theme: theme,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    deleteOrderMutation(id)
                }
            });
        } catch {
            toast.error("Error al eliminar la orden");
        }
    };

    const handleArchiveOrder = async (id: string) => {
        try {
            Swal.fire({
                title: "Archivar Orden",
                html: `
                    <p class="underline">
                        No archives ordenes que estan en progreso.
                    </p>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Nota: Todas las ordenes expiradas que no tengan pagos completados serán eliminadas los domingos a las 3 AM
                    </p>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        ID: ${order.trackingNumber}
                    </p>
                `,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, archivar",
                cancelButtonText: "Cancelar",
                theme: theme,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    archiveOrderMutation(id)
                }
            });
        } catch {
            toast.error("Error al archivar la orden");
        }
    };

    const currentStatus = statusConfig[order.status];

    return (
        <Fragment>
            <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors duration-300">
                <td
                    className="px-3 py-4 text-center cursor-pointer"
                    onClick={toggleRowExpansion}
                >
                    {expandedRow ? (
                        <div className="group relative">
                            <ChevronUp size={16} className="text-zinc-500" />
                            <Dialog position="right-top">Menos Info</Dialog>
                        </div>
                    ) : (
                        <div className="group relative">
                            <ChevronDown size={16} className="text-zinc-500" />
                            <Dialog position="right-top">Más Info</Dialog>
                        </div>
                    )}
                </td>

                {/* Tracking Number */}
                <td className="px-6 py-4 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    <div className="flex items-center gap-2">
                        <span className="font-mono">{order.trackingNumber}</span>
                        <button
                            onClick={() => copyToClipboard(order.trackingNumber)}
                            className="text-zinc-400 hover:text-blue-500 transition-colors duration-200 group relative"
                        >
                            <Dialog position="right-top">Copiar tracking number</Dialog>
                            <Clipboard size={14} />
                        </button>
                    </div>
                </td>

                {/* Customer Name */}
                <td className="px-6 py-4 text-sm text-zinc-800 dark:text-zinc-200">
                    <div className="flex flex-col">
                        <span className="font-medium">
                            {order.customer.name} {order.customer.surname}
                        </span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                            {order.customer.email}
                        </span>
                        {order.customer.isGuest && (
                            <span className="text-xs text-orange-600 dark:text-orange-400">
                                (Invitado)
                            </span>
                        )}
                    </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4 text-sm">
                    <div className="relative">
                        <button
                            onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer ${currentStatus.bgColor} ${currentStatus.color} hover:opacity-80 transition-opacity`}
                        >
                            {order.status}
                            <ChevronDown size={12} />
                        </button>

                        {showStatusDropdown && (
                            <div className="absolute top-full left-0 mt-1 w-40 bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 rounded-md shadow-lg z-10">
                                {availableStatuses.map((status) => {
                                    const isValid = isStatusTransitionValid(order.status, status);
                                    const isCurrent = status === order.status;
                                    const dotColor = isValid ? statusDotColors[status] : "bg-zinc-400 shadow-zinc-400 shadow-md";
                                    const bgHoverColor = isValid ? statusDropdownBgColors[status] : "hover:bg-zinc-100 dark:hover:bg-zinc-600/20";
                                    
                                    return (
                                        <button
                                            key={status}
                                            onClick={() => isValid && handleStatusChange(status)}
                                            disabled={!isValid}
                                            className={`w-full text-left px-3 py-2 text-xs transition-colors flex items-center gap-2 ${
                                                isValid ? bgHoverColor : "cursor-not-allowed"
                                            } ${
                                                isCurrent ? 'font-semibold' : ''
                                            } ${
                                                !isValid ? 'opacity-50' : ''
                                            }`}
                                            title={!isValid ? "Transición no permitida" : undefined}
                                        >
                                            <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>
                                            <span>{status}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </td>

                {/* Total */}
                <td className="px-6 py-4 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    {formatToCLP(order.total)}
                </td>

                {/* Date */}
                <td className="px-6 py-4 text-sm text-zinc-800 dark:text-zinc-200">
                    {formatDate(order.createdAt)}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-3">
                        <button
                            className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-400 transition-colors duration-300 flex items-center gap-1 cursor-pointer"
                            onClick={() => router.push(`/admin/payments?search=${order.trackingNumber}`)}
                            title="Ver pago"
                        >
                            <Edit size={14} />
                            Ver Pago
                        </button>

                        {order.archivedAt ? (
                            <button
                                className="text-red-700 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-300 flex items-center gap-1 cursor-pointer"
                                onClick={() => handleDeleteOrder(order.id)}
                                title="Eliminar orden"
                            >
                                <Trash2 size={14} />
                                Eliminar
                            </button>
                        ) : (
                            <button
                                className="text-red-700 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-300 flex items-center gap-1 cursor-pointer"
                                onClick={() => handleArchiveOrder(order.id)}
                                title="Archivar orden"
                            >
                                <ArchiveX size={14} />
                                Archivar
                            </button>
                        )}
                    </div>
                </td>
            </tr>

            {/* Expanded Row */}
            {expandedRow && (
                <tr className="bg-zinc-50 dark:bg-zinc-700/50">
                    <td colSpan={7} className="px-6 py-4">
                        <div className="space-y-6">
                            {/* Order Items */}
                            <div>
                                <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                                    <Package size={16} />
                                    Productos ({order.items.length})
                                </h4>
                                <div className="space-y-2">
                                    {order.items.map((item) => (
                                        <div 
                                            key={item.productId}
                                            className="flex items-center gap-4 bg-white dark:bg-zinc-800 p-3 rounded-md border border-zinc-200 dark:border-zinc-600"
                                        >
                                            <div className="relative">
                                                <div className="w-12 h-12 flex-shrink-0 bg-zinc-100 dark:bg-zinc-700 rounded overflow-hidden">
                                                    <Image
                                                        src={item.productImage}
                                                        alt={item.productName}
                                                        fill
                                                        sizes="48px"
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
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                                    {capitalizeFirstLetter(item.productName)}
                                                </p>
                                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                                    {formatToCLP(item.finalPrice)} × {item.quantity}
                                                </p>
                                            </div>
                                            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                                {formatToCLP(item.itemTotal)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Shipping Address */}
                                <div>
                                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2 flex items-center gap-2">
                                        <MapPin size={16} />
                                        Dirección de envío
                                    </h4>
                                    <div className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                                        <p>{order.shippingAddress.street}</p>
                                        <p>{order.shippingAddress.cityArea}, {order.shippingAddress.city}</p>
                                        <p>{order.shippingAddress.region}</p>
                                        <p>{order.shippingAddress.country}</p>
                                        {order.shippingAddress.reference && (
                                            <p>Referencia: {order.shippingAddress.reference}</p>
                                        )}
                                        {order.shippingAddress.zipCode && (
                                            <p>Código Postal: {order.shippingAddress.zipCode}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Shipping Info */}
                                <div>
                                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2 flex items-center gap-2">
                                        <Truck size={16} />
                                        Información de envío
                                    </h4>
                                    <div className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                                        <p>Método: {order.shippingMethod || 'No especificado'}</p>
                                        <p>Costo: {formatToCLP(order.shipping || 0)}</p>
                                        {order.deliveredAt && (
                                            <p>Entregado: {formatDate(new Date(order.deliveredAt))}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Payment Info */}
                                {order.paymentId && typeof order.paymentId === 'string' && (
                                    <div>
                                        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2 flex items-center gap-2">
                                            <CreditCard size={16} />
                                            ID de pago
                                        </h4>
                                        <div className="flex-align">
                                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                                {order.paymentId}
                                            </p>

                                            <button
                                                onClick={() => copyToClipboard(order.trackingNumber)}
                                                className="text-zinc-400 hover:text-blue-500 transition-colors duration-200 group relative"
                                            >
                                                <Dialog position="right-top">Copiar ID de pago</Dialog>
                                                <Clipboard size={14} />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Stock Status */}
                                <div>
                                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2 flex items-center gap-2">
                                        <Package size={16} />
                                        Estado del Stock
                                    </h4>
                                    <div className="text-sm space-y-1">
                                        {(() => {
                                            const now = new Date();
                                            const expiresAt = new Date(order.stockReservationExpiresAt);
                                            const isReserved = expiresAt > now;
                                            const isExpired = order.status === "Orden Expirada";
                                            const isSold = ["Procesando", "En Transito", "Entregado"].includes(order.status);
                                            const isCancelled = order.status === "Cancelado";

                                            if (isCancelled) {
                                                return (
                                                    <p className="text-red-600 dark:text-red-400">
                                                        Los cambios de stock apropiados han sido procesados
                                                    </p>
                                                );
                                            }

                                            return order.items.map((item) => (
                                                <div key={item.productId} className="flex items-start gap-2">
                                                    {isReserved ? (
                                                        <>
                                                            <span className="text-amber-600 dark:text-amber-400">●</span>
                                                            <p className="text-amber-700 dark:text-amber-300">
                                                                {item.quantity} stock reservado para {item.productName}
                                                            </p>
                                                        </>
                                                    ) : isSold ? (
                                                        <>
                                                            <span className="text-green-600 dark:text-green-400">●</span>
                                                            <p className="text-green-700 dark:text-green-300">
                                                                {item.quantity} stock vendido para {item.productName}
                                                            </p>
                                                        </>
                                                    ) : isExpired ? (
                                                        <>
                                                            <span className="text-red-600 dark:text-red-400">●</span>
                                                            <p className="text-red-700 dark:text-red-300">
                                                                {item.quantity} stock liberado para {item.productName}
                                                            </p>
                                                        </>
                                                    ) : null}
                                                </div>
                                            ));
                                        })()}
                                    </div>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="bg-white dark:bg-zinc-800 p-4 rounded-md border border-zinc-200 dark:border-zinc-600">
                                <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                                    Resumen de la orden
                                </h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-zinc-600 dark:text-zinc-400">Subtotal</span>
                                        <span className="text-zinc-900 dark:text-zinc-100">{formatToCLP(order.subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-zinc-600 dark:text-zinc-400">Envío</span>
                                        <span className="text-zinc-900 dark:text-zinc-100">
                                            {order.shipping === 0 ? 'Gratis' : formatToCLP(order.shipping || 0)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between pt-2 border-t border-zinc-200 dark:border-zinc-700 font-semibold">
                                        <span className="text-zinc-900 dark:text-zinc-100">Total</span>
                                        <span className="text-orange-600 dark:text-orange-400">{formatToCLP(order.total)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            )}
        </Fragment>
    );
}