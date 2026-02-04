import { Payment, PopulatedOrder } from "@/src/types"
import { formatDate } from "@/src/utils/date"
import { formatToCLP } from "@/src/utils/price"
import { copyToClipboard } from "@/src/utils/copy"
import { 
    CreditCard, 
    Package, 
    DollarSign, 
    AlertCircle, 
    Clipboard,
    CheckCircle,
    Clock,
    XCircleIcon,
    PackageX,
    ClockAlert,
    ArrowLeft,
} from "lucide-react"
import { useRouter } from "next/navigation"

type UserPaymentDetailsProps = {
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

export default function UserPaymentDetails({ payment }: UserPaymentDetailsProps) {
    const router = useRouter();
    
    const statusLabel = paymentStatusLabels[payment.status];
    const StatusIcon = statusIcons[payment.status];
    const colorClass = statusColors[payment.status];
    const bgColorClass = statusBgColors[payment.status];

    // Get order info from populated orderId
    const orderInfo = typeof payment.orderId === "string" 
        ? null 
        : (payment.orderId as PopulatedOrder);

    return (
        <main className="mx-auto max-w-4xl pt-8 pb-24 px-4 sm:px-6 lg:px-8">
            {/* Header with Back Button */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-orange-100">
                        Detalles del Pago
                    </h1>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        Referencia: <span className="font-mono font-semibold">{payment.id?.slice(0, 12)}...</span>
                    </p>
                </div>
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
                >
                    <ArrowLeft size={16} />
                    Volver
                </button>
            </div>

            {/* Status Overview Card */}
            <div className={`${bgColorClass} border-2 ${colorClass.replace("text-", "border-")} rounded-lg p-6 mb-8`}>
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <StatusIcon size={24} className={colorClass} />
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                                {statusLabel}
                            </h2>
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            {formatDate(payment.createdAt)}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Monto Pagado</p>
                        <p className="text-3xl font-bold text-orange-600 dark:text-orange-300">
                            {formatToCLP(payment.amount)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Order Information */}
                {orderInfo && (
                    <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                            <Package size={20} />
                            Tu Orden
                        </h3>

                        <div className="space-y-4">
                            {/* Tracking Number */}
                            <div>
                                <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase mb-1">
                                    Número de Seguimiento
                                </p>
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-mono font-semibold text-zinc-900 dark:text-zinc-100">
                                        {orderInfo.trackingNumber}
                                    </p>
                                    <button
                                        onClick={() => copyToClipboard(orderInfo.trackingNumber)}
                                        className="text-zinc-400 hover:text-blue-500 transition-colors"
                                        title="Copiar número de seguimiento"
                                    >
                                        <Clipboard size={14} />
                                    </button>
                                </div>
                            </div>

                            {/* Order Total */}
                            <div className="pt-3 border-t border-zinc-200 dark:border-zinc-700">
                                <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase mb-1">
                                    Total de la Orden
                                </p>
                                <p className="text-lg font-bold text-zinc-900 dark:text-orange-200">
                                    {formatToCLP(orderInfo.total)}
                                </p>
                            </div>

                            {/* Order Status */}
                            <div className="pt-3 border-t border-zinc-200 dark:border-zinc-700">
                                <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase mb-1">
                                    Estado de la Orden
                                </p>
                                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                    {orderInfo.status}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Payment Information */}
                <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                        <CreditCard size={20} />
                        Detalles del Pago
                    </h3>

                    <div className="space-y-4">
                        {/* Payment Method */}
                        {payment.paymentMethod && (
                            <div>
                                <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase mb-1">
                                    Método de Pago
                                </p>
                                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 capitalize">
                                    {payment.paymentMethod}
                                </p>
                            </div>
                        )}

                        {/* Provider */}
                        <div className={payment.paymentMethod ? "pt-3 border-t border-zinc-200 dark:border-zinc-700" : ""}>
                            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase mb-1">
                                Procesado por
                            </p>
                            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 capitalize">
                                {payment.provider}
                            </p>
                        </div>

                        {/* Currency */}
                        <div className="pt-3 border-t border-zinc-200 dark:border-zinc-700">
                            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase mb-1">
                                Moneda
                            </p>
                            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                {payment.currency}
                            </p>
                        </div>

                        {/* Payment Dates */}
                        <div className="pt-3 border-t border-zinc-200 dark:border-zinc-700 space-y-2">
                            <div>
                                <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase mb-1">
                                    Fecha de Pago
                                </p>
                                <p className="text-sm text-zinc-800 dark:text-zinc-200">
                                    {formatDate(payment.createdAt)}
                                </p>
                            </div>
                            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-700">
                                <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase mb-1">
                                    Última Actualización
                                </p>
                                <p className="text-sm text-zinc-800 dark:text-zinc-200">
                                    {formatDate(payment.updatedAt)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rejection Reason Alert - If Present */}
            {payment.status === "rejected" && payment.rejectionReason && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8">
                    <div className="flex items-start gap-3">
                        <AlertCircle size={18} className="text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-red-800 dark:text-red-300 mb-1">
                                Motivo del Rechazo
                            </h4>
                            <p className="text-sm text-red-700 dark:text-red-400">
                                {payment.rejectionReason}
                            </p>
                            <p className="text-xs text-red-600 dark:text-red-500 mt-2">
                                Por favor, intenta nuevamente con otro método de pago o contacta con nuestro equipo de soporte si el problema persiste.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Refund Information - If Refunded */}
            {payment.status === "refunded" && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8">
                    <div className="flex items-start gap-3">
                        <CheckCircle size={18} className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">
                                Reembolso Procesado
                            </h4>
                            <p className="text-sm text-blue-700 dark:text-blue-400">
                                Se ha procesado un reembolso de {formatToCLP(payment.amount)} a tu cuenta. 
                                El reembolso puede tardar de 3 a 5 días hábiles en aparecer en tu extracto bancario.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Help Section */}
            <div className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                    ¿Preguntas sobre tu pago?
                </h4>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-4">
                    Si tienes dudas sobre este pago o necesitas ayuda, no dudes en contactarnos a través de nuestro 
                    <a href="/home/contact" className="ml-1 text-orange-600 dark:text-orange-400 hover:underline">
                        formulario de contacto
                    </a>.
                </p>
                <div className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1">
                    <p>• Referencia de pago: <span className="font-mono">{payment.id?.slice(0, 16)}...</span></p>
                    <p>• ID de preferencia: <span className="font-mono">{payment.mpPreferenceId.slice(0, 16)}...</span></p>
                </div>
            </div>
        </main>
    );
}
