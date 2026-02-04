import { User } from "@/src/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronUp, Package, MapPin, Eye, Clipboard, User2Icon, Crown } from "lucide-react";
import { formatDate } from "@/src/utils/date";
import Dialog from "@/components/ui/Dialog";
import { Fragment } from "react";
import { copyToClipboard } from "@/src/utils/copy";

type UserEntryProps = {
    user: User
};

const getConfirmationStatus = (confirmed: boolean) => {
    return confirmed
        ? { label: "Confirmado", color: "bg-green-200 text-green-800 dark:bg-green-300 dark:text-green-900" }
        : { label: "Pendiente", color: "bg-amber-200 text-amber-800 dark:bg-amber-300 dark:text-amber-900" };
};

export default function UserEntry({ user } : UserEntryProps) {
    const [expandedRow, setExpandedRow] = useState(false);
    const router = useRouter();

    const toggleRowExpansion = () => {
        setExpandedRow(!expandedRow);
    };

    const confirmationStatus = getConfirmationStatus(user.confirmed);

    const handleViewOrders = () => {
        router.push(`/admin/orders?email=${encodeURIComponent(user.email)}`);
    };

    const handleViewPayments = () => {
        router.push(`/admin/payments?email=${encodeURIComponent(user.email)}`);
    };

    const hasAddress = user.address && (
        user.address.street || 
        user.address.city || 
        user.address.region
    );

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

                {/* User ID */}
                <td className="px-6 py-4 text-sm font-mono text-zinc-800 dark:text-zinc-200">
                    <div className="flex items-center gap-2">
                        <span className="font-mono">{user.id.slice(0, 8)}...</span>
                        <button
                            onClick={() => copyToClipboard(user.id)}
                            className="text-zinc-400 hover:text-blue-500 transition-colors duration-200 group relative"
                        >
                            <Dialog position="right-top">Copiar tracking number</Dialog>
                            <Clipboard size={14} />
                        </button>
                    </div>
                </td>

                {/* Client Name & Surname */}
                <td className="px-6 py-4 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    <div className="flex flex-col">
                        <span>
                            {user.name} {user.surname}
                        </span>
                        {user.role === "admin" && (
                            <span className="flex text-xs text-zinc-500 dark:text-zinc-400">
                                <Crown className="text-amber-600" size={14}/>
                                Administrador
                            </span>
                        )}
                        {user.role === "customer" && (
                            <span className="flex gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                                <User2Icon className="text-blue-500" size={14}/>
                                Cliente
                            </span>
                        )}
                    </div>
                </td>

                {/* Email */}
                <td className="px-6 py-4 text-sm text-zinc-800 dark:text-zinc-200">
                    <div className="flex flex-col">
                        <span className="truncate max-w-xs">
                            {user.email}
                        </span>
                        {user.phone && (
                            <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                {user.phone}
                            </span>
                        )}
                    </div>
                </td>

                {/* Confirmation Status */}
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${confirmationStatus.color}`}>
                        {confirmationStatus.label}
                    </span>
                </td>

                {/* Registration Date */}
                <td className="px-6 py-4 text-sm text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
                    {formatDate(user.createdAt)}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                        <button
                            className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-400 transition-colors duration-300 flex items-center gap-1 cursor-pointer"
                            onClick={handleViewOrders}
                            title="Ver órdenes del usuario"
                        >
                            <Package size={14} />
                            Órdenes
                        </button>

                        <button
                            className="text-orange-500 hover:text-orange-600 dark:text-orange-300 dark:hover:text-orange-400 transition-colors duration-300 flex items-center gap-1 cursor-pointer"
                            onClick={handleViewPayments}
                            title="Ver pagos del usuario"
                        >
                            <Eye size={14} />
                            Pagos
                        </button>
                    </div>
                </td>
            </tr>

            {/* Expanded Row - Shipping Address Details */}
            {expandedRow && (
                <tr className="bg-zinc-50 dark:bg-zinc-700/50">
                    <td colSpan={7} className="px-6 py-4">
                        <div className="space-y-4">
                            {/* Shipping Address Section */}
                            {hasAddress ? (
                                <div>
                                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                                        <MapPin size={16} />
                                        Información de Envío
                                    </h4>
                                    <div className="bg-white dark:bg-zinc-800 p-4 rounded-md border border-zinc-200 dark:border-zinc-600">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Address Details */}
                                            <div className="space-y-2">
                                                {user.address?.street && (
                                                    <div>
                                                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                                            Dirección
                                                        </p>
                                                        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                                            {user.address.street}
                                                        </p>
                                                    </div>
                                                )}
                                                {user.address?.reference && (
                                                    <div>
                                                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                                            Referencia
                                                        </p>
                                                        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                                            {user.address.reference}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Location Details */}
                                            <div className="space-y-2">
                                                {user.address?.city && (
                                                    <div>
                                                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                                            Ciudad
                                                        </p>
                                                        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                                            {user.address.city}
                                                        </p>
                                                    </div>
                                                )}
                                                {user.address?.cityArea && (
                                                    <div>
                                                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                                            Comuna
                                                        </p>
                                                        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                                            {user.address.cityArea}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Region & Country */}
                                            <div className="space-y-2">
                                                {user.address?.region && (
                                                    <div>
                                                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                                            Región
                                                        </p>
                                                        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                                            {user.address.region}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Postal Code */}
                                            <div className="space-y-2">
                                                {user.address?.zipCode && (
                                                    <div>
                                                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                                            Código Postal
                                                        </p>
                                                        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                                            {user.address.zipCode}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md">
                                    <p className="text-sm text-amber-800 dark:text-amber-200">
                                        Este usuario aún no ha registrado una dirección de envío.
                                    </p>
                                </div>
                            )}

                            {/* Additional User Info */}
                            <div className="bg-white dark:bg-zinc-800 p-4 rounded-md border border-zinc-200 dark:border-zinc-600">
                                <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                                    Información Adicional
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                            ID Usuario (Completo)
                                        </p>
                                        <p className="font-mono text-zinc-800 dark:text-zinc-200">
                                            {user.id}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                            Rol
                                        </p>
                                        <p className="font-medium text-zinc-800 dark:text-zinc-200 capitalize">
                                            {user.role === "admin" ? "Administrador" : "Cliente"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                            Registro
                                        </p>
                                        <p className="text-zinc-800 dark:text-zinc-200">
                                            {formatDate(user.createdAt)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                            Última Actualización
                                        </p>
                                        <p className="text-zinc-800 dark:text-zinc-200">
                                            {formatDate(user.updatedAt)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            )}
        </Fragment>
    )
}
