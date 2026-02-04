import { Payment, PaymentStatus, PopulatedOrder } from '@/src/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown, ChevronUp, CreditCard, Info, Eye, Clipboard, Clock, CheckCircle, XCircleIcon, PackageX, DollarSign, ClockAlert, RefreshCw } from 'lucide-react';
import { formatDate } from '@/src/utils/date';
import { formatToCLP } from '@/src/utils/price';
import { copyToClipboard } from '@/src/utils/copy';
import Dialog from '@/components/ui/Dialog';
import { Fragment } from 'react';
import Swal from 'sweetalert2';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { processRefund } from '@/src/api/PaymentAPI';
import { toast } from 'react-toastify';
import { useThemeForModal } from '@/src/hooks/useTheme';

type PaymentEntryProps = {
    payment: Payment
};

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

const statusBgColors: Record<PaymentStatus, string> = {
    "pending": "bg-amber-100 dark:bg-amber-900/30",
    "approved": "bg-green-100 dark:bg-green-900/30",
    "rejected": "bg-orange-100 dark:bg-orange-900/30",
    "cancelled": "bg-red-100 dark:bg-red-900/30",
    "refunded": "bg-blue-100 dark:bg-blue-900/30",
    "expired": "bg-zinc-100 dark:bg-zinc-900/30"
};

export default function PaymentEntry({ payment }: PaymentEntryProps) {
    const [expandedRow, setExpandedRow] = useState(false);
    const theme = useThemeForModal();
    const router = useRouter();
    const queryClient = useQueryClient();

    const toggleRowExpansion = () => {
        setExpandedRow(!expandedRow);
    };

    const statusLabel = paymentStatusLabels[payment.status];
    const StatusIcon = statusIcons[payment.status];
    const colorClass = statusColors[payment.status];
    const bgColorClass = statusBgColors[payment.status];

    // Extract key metadata fields for approved payments
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mpMetadata = payment.metadata as Record<string, any> | undefined;
    const paymentMethod = payment.paymentMethod || mpMetadata?.payment_method?.type || "No especificado";
    const installments = mpMetadata?.installments || 1;

    // Get order info from populated orderId
    const orderInfo = typeof payment.orderId === "string" 
        ? null 
        : (payment.orderId as PopulatedOrder);

    // Determine if refund is possible
    const canRefund = payment.status === "approved" && orderInfo?.status === "Cancelado";
    const shouldShowRefundButton = payment.status === "approved" && orderInfo;
    const orderNotCancelled = payment.status === "approved" && orderInfo?.status !== "Cancelado";

    // Refund mutation
    const { mutate: refundMutation } = useMutation({
        mutationFn: processRefund,
        onError: (error) => {
            toast.error(error.message || "Error al procesar reembolso");
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["payments"] });
            Swal.fire({
                title: "¡Reembolso Procesado!",
                text: data.message || "El reembolso ha sido procesado exitosamente.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
                theme: theme,
            });
        },
    });

    const handleRefundClick = () => {
        // If order is not cancelled, show warning modal
        if (orderNotCancelled) {
            Swal.fire({
                title: "Orden no Cancelada",
                html: `
                    <div class="text-center">
                        <p class="text-sm text-zinc-700 dark:text-zinc-300 mb-3">
                            Antes de procesar el reembolso, debes cancelar la orden primero.
                        </p>
                        <p class="text-xs text-zinc-500 dark:text-zinc-400">
                            La cancelación de la orden gestiona correctamente la liberación de stock y el estado de los productos.
                        </p>

                        <a
                            href="/admin/orders?trackingNumber=${(typeof payment.orderId === 'string' ? payment.orderId : payment.orderId.trackingNumber)}"
                            class="link"
                        >
                            Ir a la orden
                        </a>
                    </div>
                `,
                icon: "warning",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Entendido",
                theme: theme,
            });
            return;
        }

        // If order is cancelled, show refund confirmation
        if (canRefund) {
            Swal.fire({
                title: "Procesar Reembolso",
                html: `
                    <div class="text-center">
                        <p class="text-sm text-zinc-700 dark:text-zinc-300 mb-2">
                            ¿Deseas procesar el reembolso para esta orden?
                        </p>
                        <p class="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
                            Se reembolsarán <strong>${formatToCLP(payment.amount)}</strong> al cliente.
                        </p>
                        <p class="mx-auto w-[20em] my-2 text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-2 rounded">
                            Esta acción no puede ser revertida.
                        </p>
                        <a
                            href="/admin/orders?trackingNumber=${(typeof payment.orderId === 'string' ? payment.orderId : payment.orderId.trackingNumber)}"
                            class="link"
                        >
                            Revisar orden antes de proceder
                        </a>
                    </div>
                `,
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, Reembolsar",
                cancelButtonText: "Cancelar",
                theme: theme,
            }).then((result) => {
                if (result.isConfirmed) {
                    refundMutation(payment.id!);
                }
            });
        }
    };

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

                {/* Order ID */}
                <td className="px-6 py-4 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    <div className="flex items-center gap-2">
                        <span className="font-mono">{(typeof payment.orderId === 'string' ? payment.orderId : payment.orderId.id).slice(0, 8)}...</span>
                        <button
                            onClick={() => copyToClipboard(typeof payment.orderId === 'string' ? payment.orderId : payment.orderId.id)}
                            className="text-zinc-400 hover:text-blue-500 transition-colors duration-200 group relative"
                        >
                            <Dialog position="right-top">Copiar ID</Dialog>
                            <Clipboard size={14} />
                        </button>
                    </div>
                </td>

                {/* Provider/Email */}
                <td className="px-6 py-4 text-sm text-zinc-800 dark:text-zinc-200">
                    <div className="flex flex-col">
                        <span className="font-medium capitalize">{payment.provider}</span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                            {paymentMethod}
                        </span>
                    </div>
                </td>

                {/* Amount */}
                <td className="px-6 py-4 text-sm font-semibold text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
                    {formatToCLP(payment.amount)}
                </td>

                {/* Status */}
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${bgColorClass} ${colorClass}`}>
                        <StatusIcon size={14} />
                        {statusLabel}
                    </span>
                </td>

                {/* Date */}
                <td className="px-6 py-4 text-sm text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
                    {formatDate(payment.createdAt)}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                        <button
                            className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-400 transition-colors duration-300 flex items-center gap-1 cursor-pointer"
                            onClick={() => router.push(`/admin/payments/${payment.id}`)}
                            title="Ver detalles del pago"
                        >
                            <Eye size={14} />
                            Ver
                        </button>

                        {/* Conditional Refund Button */}
                        {shouldShowRefundButton && (
                            <button
                                onClick={handleRefundClick}
                                className={`
                                    flex items-center gap-1 
                                    transition-colors duration-300 
                                    text-orange-600 hover:text-orange-700 
                                    dark:text-orange-400 dark:hover:text-orange-500 cursor-pointer
                                `}
                                title={canRefund ? "Procesar reembolso" : "Cancela la orden primero"}
                            >
                                <RefreshCw size={14} />
                                Reembolsar
                            </button>
                        )}
                    </div>
                </td>
            </tr>

            {/* Expanded Row - Payment Details */}
            {expandedRow && (
                <tr className="bg-zinc-50 dark:bg-zinc-700/50">
                    <td colSpan={7} className="px-6 py-4">
                        <div className="space-y-4">
                            {/* Payment Information */}
                            <div>
                                <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                                    <CreditCard size={16} />
                                    Información del Pago
                                </h4>
                                <div className="bg-white dark:bg-zinc-800 p-4 rounded-md border border-zinc-200 dark:border-zinc-600">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Payment ID */}
                                        <div>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                                                ID de Pago
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-mono text-zinc-800 dark:text-zinc-200">
                                                    {payment.mpPaymentId || "No disponible"}
                                                </p>
                                                {payment.mpPaymentId && (
                                                    <button
                                                        onClick={() => copyToClipboard(payment.mpPaymentId || "")}
                                                        className="text-zinc-400 hover:text-blue-500 transition-colors"
                                                    >
                                                        <Clipboard size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {/* Preference ID */}
                                        <div>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                                                ID de Preferencia
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-mono text-zinc-800 dark:text-zinc-200">
                                                    {payment.mpPreferenceId.slice(0, 12)}...
                                                </p>
                                                <button
                                                    onClick={() => copyToClipboard(payment.mpPreferenceId)}
                                                    className="text-zinc-400 hover:text-blue-500 transition-colors"
                                                >
                                                    <Clipboard size={14} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Amount */}
                                        <div>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                                                Monto
                                            </p>
                                            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                                                {formatToCLP(payment.amount)}
                                            </p>
                                        </div>

                                        {/* Currency */}
                                        <div>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                                                Moneda
                                            </p>
                                            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                                {payment.currency}
                                            </p>
                                        </div>

                                        {/* Payment Method */}
                                        <div>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                                                Método de Pago
                                            </p>
                                            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 capitalize">
                                                {paymentMethod}
                                            </p>
                                        </div>

                                        {/* Installments (if available) */}
                                        {installments > 1 && (
                                            <div>
                                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                                                    Cuotas
                                                </p>
                                                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                                    {installments} cuotas
                                                </p>
                                            </div>
                                        )}

                                        {/* Status */}
                                        <div>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                                                Estado del Pago
                                            </p>
                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${bgColorClass} ${colorClass}`}>
                                                <StatusIcon size={12} />
                                                {statusLabel}
                                            </span>
                                        </div>

                                        {/* MercadoPago Status */}
                                        {payment.mpStatus && (
                                            <div>
                                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                                                    Estado MP
                                                </p>
                                                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 capitalize">
                                                    {payment.mpStatus}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Rejection Reason (if rejected) */}
                            {payment.rejectionReason && (
                                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-md">
                                    <h4 className="text-sm font-semibold text-red-800 dark:text-red-300 mb-2 flex items-center gap-2">
                                        <Info size={16} />
                                        Motivo del Rechazo
                                    </h4>
                                    <p className="text-sm text-red-700 dark:text-red-400">
                                        {payment.rejectionReason}
                                    </p>
                                </div>
                            )}

                            {/* MercadoPago Metadata (approved payments) */}
                            {payment.status === "approved" && mpMetadata && (
                                <div>
                                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                                        <Info size={16} />
                                        Detalles de MercadoPago
                                    </h4>
                                    <div className="bg-white dark:bg-zinc-800 p-4 rounded-md border border-zinc-200 dark:border-zinc-600">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            {mpMetadata.transaction_amount && (
                                                <div>
                                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                                        Monto Transacción
                                                    </p>
                                                    <p className="font-medium text-zinc-800 dark:text-zinc-200">
                                                        {formatToCLP(mpMetadata.transaction_amount)}
                                                    </p>
                                                </div>
                                            )}

                                            {mpMetadata.status_detail && (
                                                <div>
                                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                                        Detalles del Estado
                                                    </p>
                                                    <p className="font-medium text-zinc-800 dark:text-zinc-200">
                                                        {mpMetadata.status_detail}
                                                    </p>
                                                </div>
                                            )}

                                            {mpMetadata.cardholder && (
                                                <div>
                                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                                        Titular de la Tarjeta
                                                    </p>
                                                    <p className="font-medium text-zinc-800 dark:text-zinc-200">
                                                        {mpMetadata.cardholder.name}
                                                    </p>
                                                </div>
                                            )}

                                            {mpMetadata.authorization_code && (
                                                <div>
                                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                                        Código de Autorización
                                                    </p>
                                                    <p className="font-medium text-zinc-800 dark:text-zinc-200">
                                                        {mpMetadata.authorization_code}
                                                    </p>
                                                </div>
                                            )}

                                            {mpMetadata.payment_method?.id && (
                                                <div>
                                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                                        Banco
                                                    </p>
                                                    <p className="font-medium text-zinc-800 dark:text-zinc-200 capitalize">
                                                        {mpMetadata.payment_method.id.replace(/_/g, " ")}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Timestamps */}
                            <div className="bg-white dark:bg-zinc-800 p-4 rounded-md border border-zinc-200 dark:border-zinc-600">
                                <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                                    Fechas
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                            Creado
                                        </p>
                                        <p className="font-medium text-zinc-800 dark:text-zinc-200">
                                            {formatDate(payment.createdAt)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                            Actualizado
                                        </p>
                                        <p className="font-medium text-zinc-800 dark:text-zinc-200">
                                            {formatDate(payment.updatedAt)}
                                        </p>
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
