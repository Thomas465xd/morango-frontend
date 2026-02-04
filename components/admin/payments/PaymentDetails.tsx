import { Payment, PopulatedOrder } from "@/src/types"
import { formatDate } from "@/src/utils/date"
import { formatToCLP } from "@/src/utils/price"
import { copyToClipboard } from "@/src/utils/copy"
import { 
    CreditCard, 
    Package, 
    User, 
    DollarSign, 
    AlertCircle, 
    Info,
    Clipboard,
    CheckCircle,
    Clock,
    XCircleIcon,
    PackageX,
    ClockAlert,
} from "lucide-react"
type PaymentDetailsProps = {
    payment: Payment
}

const paymentStatusLabels = {
    "pending": "Esperando Pago",
    "approved": "Aprobado",
    "rejected": "Rechazado",
    "cancelled": "Cancelado",
    "refunded": "Reembolsado",
    "expired": "Expirado"
}

const statusIcons = {
    "pending": Clock,
    "approved": CheckCircle,
    "rejected": XCircleIcon,
    "cancelled": PackageX,
    "refunded": DollarSign,
    "expired": ClockAlert
}

const statusColors = {
    "pending": "text-amber-600 dark:text-amber-400",
    "approved": "text-green-600 dark:text-green-400",
    "rejected": "text-orange-600 dark:text-orange-400",
    "cancelled": "text-red-600 dark:text-red-400",
    "refunded": "text-blue-600 dark:text-blue-400",
    "expired": "text-zinc-600 dark:text-zinc-400"
}

const statusBgColors = {
    "pending": "bg-amber-100 dark:bg-amber-900/30",
    "approved": "bg-green-100 dark:bg-green-900/30",
    "rejected": "bg-orange-100 dark:bg-orange-900/30",
    "cancelled": "bg-red-100 dark:bg-red-900/30",
    "refunded": "bg-blue-100 dark:bg-blue-900/30",
    "expired": "bg-zinc-100 dark:bg-zinc-900/30"
}

// Helper function to render metadata fields safely
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderMetadataField = (label: string, value: any, canCopy: boolean = false) => {
    if (value === undefined || value === null || value === "") return null;

    // Handle nested objects
    if (typeof value === "object") {
        return null; // Skip complex objects, they're handled separately
    }

    // Handle booleans
    if (typeof value === "boolean") {
        return (
            <div className="flex justify-between items-center py-2 border-b border-zinc-200 dark:border-zinc-700 last:border-b-0">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">{label}</span>
                <span className={`text-sm font-medium ${value ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                    {value ? "Sí" : "No"}
                </span>
            </div>
        );
    }

    // Handle numbers and strings
    const displayValue = typeof value === "number" ? formatToCLP(value) : String(value);

    return (
        <div className="flex justify-between items-center py-2 border-b border-zinc-200 dark:border-zinc-700 last:border-b-0">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">{label}</span>
            <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200 truncate max-w-xs">
                    {displayValue}
                </span>
                {canCopy && (
                    <button
                        onClick={() => copyToClipboard(String(value))}
                        className="text-zinc-400 hover:text-blue-500 transition-colors"
                        title="Copiar"
                    >
                        <Clipboard size={14} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default function PaymentDetails({ payment }: PaymentDetailsProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mpMetadata = payment.metadata as Record<string, any> | undefined;
    
    const statusLabel = paymentStatusLabels[payment.status];
    const StatusIcon = statusIcons[payment.status];
    const colorClass = statusColors[payment.status];
    const bgColorClass = statusBgColors[payment.status];

    // Get order info from populated orderId
    const orderInfo = typeof payment.orderId === "string" 
        ? null 
        : (payment.orderId as PopulatedOrder);

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            {/* Header Card - Status Overview */}
            <div className={`${bgColorClass} border-2 ${colorClass.replace("text-", "border-")} rounded-lg p-6`}>
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <StatusIcon size={24} className={colorClass} />
                            <h1 className="font-bold text-zinc-900 dark:text-white">
                                {statusLabel}
                            </h1>
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            {formatDate(payment.createdAt)}
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="font-bold text-zinc-900 dark:text-white">
                            {formatToCLP(payment.amount)}
                        </div>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                            {payment.currency}
                        </p>
                    </div>
                </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Order Information */}
                {orderInfo && (
                    <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                            <Package size={20} />
                            Información de la Orden
                        </h2>

                        <div className="space-y-3">
                            {/* Tracking Number */}
                            <div>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                                    Número de Seguimiento
                                </p>
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-mono font-semibold text-zinc-800 dark:text-zinc-200">
                                        {orderInfo.trackingNumber}
                                    </p>
                                    <button
                                        onClick={() => copyToClipboard(orderInfo.trackingNumber)}
                                        className="text-zinc-400 hover:text-blue-500 transition-colors"
                                    >
                                        <Clipboard size={14} />
                                    </button>
                                </div>
                            </div>

                            {/* Order Total */}
                            <div className="pt-3 border-t border-zinc-200 dark:border-zinc-700">
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                                    Total de la Orden
                                </p>
                                <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                                    {formatToCLP(orderInfo.total)}
                                </p>
                            </div>

                            {/* Order Status */}
                            <div className="pt-3 border-t border-zinc-200 dark:border-zinc-700">
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                                    Estado de la Orden
                                </p>
                                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                    {orderInfo.status}
                                </p>
                            </div>

                            {/* Customer Info */}
                            <div className="pt-3 border-t border-zinc-200 dark:border-zinc-700 space-y-2">
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1 flex items-center gap-1">
                                    <User size={12} /> Cliente
                                </p>
                                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                    {orderInfo.customer.name} {orderInfo.customer.surname}
                                </p>
                                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                                    {orderInfo.customer.email}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Right Column - Payment Information */}
                <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                        <CreditCard size={20} />
                        Información del Pago
                    </h2>

                    <div className="space-y-3">
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
                                        onClick={() => copyToClipboard(payment.mpPaymentId!)}
                                        className="text-zinc-400 hover:text-blue-500 transition-colors"
                                    >
                                        <Clipboard size={14} />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Preference ID */}
                        <div className="pt-3 border-t border-zinc-200 dark:border-zinc-700">
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                                ID de Preferencia
                            </p>
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-mono text-zinc-800 dark:text-zinc-200">
                                    {payment.mpPreferenceId.slice(0, 20)}...
                                </p>
                                <button
                                    onClick={() => copyToClipboard(payment.mpPreferenceId)}
                                    className="text-zinc-400 hover:text-blue-500 transition-colors"
                                >
                                    <Clipboard size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Payment Method */}
                        {payment.paymentMethod && (
                            <div className="pt-3 border-t border-zinc-200 dark:border-zinc-700">
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                                    Método de Pago
                                </p>
                                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 capitalize">
                                    {payment.paymentMethod}
                                </p>
                            </div>
                        )}

                        {/* Provider */}
                        <div className="pt-3 border-t border-zinc-200 dark:border-zinc-700">
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                                Proveedor
                            </p>
                            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 capitalize">
                                {payment.provider}
                            </p>
                        </div>

                        {/* Timestamps */}
                        <div className="pt-3 border-t border-zinc-200 dark:border-zinc-700 space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-zinc-500 dark:text-zinc-400">Creado</span>
                                <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                                    {formatDate(payment.createdAt)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-zinc-500 dark:text-zinc-400">Actualizado</span>
                                <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                                    {formatDate(payment.updatedAt)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rejection Reason - If Present */}
            {payment.rejectionReason && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <AlertCircle size={18} className="text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold text-red-800 dark:text-red-300 mb-1">
                                Motivo del Rechazo
                            </h3>
                            <p className="text-sm text-red-700 dark:text-red-400">
                                {payment.rejectionReason}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* MercadoPago Metadata Section */}
            {payment.status === "approved" && mpMetadata && (
                <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <Info size={20} />
                        Detalles de MercadoPago
                    </h2>

                    {/* Transaction Information */}
                    {(mpMetadata.transaction_amount || mpMetadata.status_detail || mpMetadata.id) && (
                        <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                                Información de la Transacción
                            </h3>
                            <div className="space-y-0">
                                {renderMetadataField("ID de Transacción", mpMetadata.id, true)}
                                {renderMetadataField("Monto de Transacción", mpMetadata.transaction_amount)}
                                {renderMetadataField("Detalles del Estado", mpMetadata.status_detail)}
                                {renderMetadataField("Estado MP", mpMetadata.status)}
                                {renderMetadataField("Modo Vivo", mpMetadata.live_mode)}
                                {renderMetadataField("Código de Autorización", mpMetadata.authorization_code, true)}
                            </div>
                        </div>
                    )}

                    {/* Cardholder Information */}
                    {mpMetadata.card?.cardholder && (
                        <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                                Información de la Tarjeta
                            </h3>
                            <div className="space-y-0">
                                {renderMetadataField("Titular", mpMetadata.card.cardholder.name)}
                                {renderMetadataField("Últimos 4 Dígitos", mpMetadata.card.last_four_digits)}
                                {renderMetadataField("Primeros 6 Dígitos", mpMetadata.card.first_six_digits)}
                                {renderMetadataField("Tipo de Tarjeta", 
                                    mpMetadata.card.tags?.[0] ? mpMetadata.card.tags[0].charAt(0).toUpperCase() + mpMetadata.card.tags[0].slice(1) : undefined
                                )}
                                {renderMetadataField("País", mpMetadata.card.country)}
                                {mpMetadata.card.expiration_month && renderMetadataField(
                                    "Vencimiento", 
                                    `${mpMetadata.card.expiration_month}/${mpMetadata.card.expiration_year}`
                                )}
                            </div>
                        </div>
                    )}

                    {/* Payment Method Information */}
                    {mpMetadata.payment_method && (
                        <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                                Método de Pago
                            </h3>
                            <div className="space-y-0">
                                {renderMetadataField("Tipo", mpMetadata.payment_method.type)}
                                {renderMetadataField("ID", mpMetadata.payment_method.id)}
                                {renderMetadataField("Banco Emisor", mpMetadata.payment_method.issuer_id)}
                            </div>
                        </div>
                    )}

                    {/* Financial Details */}
                    {mpMetadata.transaction_details && (
                        <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                                Detalles Financieros
                            </h3>
                            <div className="space-y-0">
                                {renderMetadataField("Monto Total Pagado", mpMetadata.transaction_details.total_paid_amount)}
                                {renderMetadataField("Monto Neto Recibido", mpMetadata.transaction_details.net_received_amount)}
                                {renderMetadataField("Monto Pagado en Exceso", mpMetadata.transaction_details.overpaid_amount)}
                                {renderMetadataField("Monto de Cuota", mpMetadata.transaction_details.installment_amount)}
                            </div>
                        </div>
                    )}

                    {/* Fee Information */}
                    {mpMetadata.fee_details && mpMetadata.fee_details.length > 0 && (
                        <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                                Comisiones
                            </h3>
                            <div className="space-y-3">
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                {mpMetadata.fee_details.map((fee: any, index: number) => (
                                    <div key={index} className="p-3 bg-zinc-50 dark:bg-zinc-700/50 rounded">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                                {fee.type.replace(/_/g, " ").charAt(0).toUpperCase() + fee.type.replace(/_/g, " ").slice(1)}
                                            </span>
                                            <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                                                {formatToCLP(fee.amount)}
                                            </span>
                                        </div>
                                        {fee.fee_payer && (
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                                Pagador: {fee.fee_payer}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Additional Information */}
                    {(mpMetadata.money_release_date || mpMetadata.money_release_status || mpMetadata.installments) && (
                        <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                                Información Adicional
                            </h3>
                            <div className="space-y-0">
                                {renderMetadataField("Cuotas", mpMetadata.installments)}
                                {renderMetadataField("Estado de Liberación", mpMetadata.money_release_status)}
                                {mpMetadata.money_release_date && renderMetadataField(
                                    "Fecha de Liberación", 
                                    formatDate(new Date(mpMetadata.money_release_date))
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
