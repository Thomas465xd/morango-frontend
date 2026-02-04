"use client"; 
import { ShoppingCart, Package, Users, CreditCard, TrendingUp, Settings } from "lucide-react";
import { useState } from "react";
import PolicyModal from "@/components/checkout/PolicyModal";
import { privacyPolicyContent, refundPolicyContent, shippingPolicyContent, termsOfServiceContent } from "@/components/checkout/Policies";

export default function AdminDashboard() {
    const [openPolicy, setOpenPolicy] = useState<'refund' | 'terms' | 'privacy' | 'shipping' | null>(null);

    const features = [
        {
            icon: ShoppingCart,
            title: "Gestionar Órdenes",
            description:
                "Ver, buscar y administrar todas las órdenes de clientes. Cambiar estados, ver detalles de pago y fechas de entrega.",
            color: "bg-blue-50 dark:bg-blue-900/20",
            iconColor: "text-blue-600 dark:text-blue-400",
        },
        {
            icon: Package,
            title: "Gestionar Productos",
            description:
                "Crear, editar y eliminar productos. Administrar inventario, precios y catálogo de joyas.",
            color: "bg-amber-50 dark:bg-amber-900/20",
            iconColor: "text-amber-600 dark:text-amber-400",
        },
        {
            icon: Users,
            title: "Gestionar Usuarios",
            description:
                "Ver lista de clientes registrados, buscar usuarios específicos y administrar permisos de acceso.",
            color: "bg-emerald-50 dark:bg-emerald-900/20",
            iconColor: "text-emerald-600 dark:text-emerald-400",
        },
        {
            icon: CreditCard,
            title: "Gestionar Pagos",
            description:
                "Ver detalles de pagos, procesar reembolsos y consultar transacciones de MercadoPago.",
            color: "bg-violet-50 dark:bg-violet-900/20",
            iconColor: "text-violet-600 dark:text-violet-400",
        },
    ];

    const capabilities = [
        "Buscar órdenes, pagos y usuarios por múltiples criterios",
        "Cambiar estados de órdenes (Procesando, En Tránsito, Entregado, etc.)",
        "Ver detalles completos de transacciones y pagos",
        "Administrar cambios de precios y promociones de productos",
        "Monitorear estado del inventario y stock disponible",
        "Acceder a reportes y análisis (próximamente)",
    ];

    return (
        <div className="mt-8 space-y-8">
            {/* Welcome & Overview Section */}
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-gradient-to-r from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 p-6">
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-2">
                    Bienvenido al Panel de Administración
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                    Desde aquí puedes gestionar todos los aspectos de tu tienda de joyas Morango. Accede a las secciones principales o usa la navegación para administrar tu negocio.
                </p>
            </div>

            {/* Feature Cards Grid */}
            <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
                    Funciones Principales
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {features.map((feature) => {
                        const IconComponent = feature.icon;
                        return (
                            <div
                                key={feature.title}
                                className={`rounded-lg border border-zinc-200 dark:border-zinc-700 ${feature.color} p-5 transition-all duration-300 hover:shadow-md dark:hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-600`}
                            >
                                <div className={`${feature.iconColor} mb-3`}>
                                    <IconComponent size={28} />
                                </div>
                                <h4 className="font-semibold text-zinc-900 dark:text-white mb-2">
                                    {feature.title}
                                </h4>
                                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Capabilities Section */}
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Settings className="text-zinc-600 dark:text-zinc-400" size={24} />
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                        Capacidades del Sistema
                    </h3>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {capabilities.map((capability) => (
                        <li
                            key={capability}
                            className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300"
                        >
                            <span className="text-amber-600 dark:text-amber-400 font-bold mt-0.5">✓</span>
                            <span>{capability}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Analytics Placeholder */}
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="text-zinc-600 dark:text-zinc-400" size={24} />
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                            Analítica
                        </h3>
                    </div>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-700/50 rounded-lg p-8 text-center border border-dashed border-zinc-300 dark:border-zinc-600">
                    <p className="text-zinc-600 dark:text-zinc-400 font-medium">
                        📊 En desarrollo
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-2">
                        Los gráficos, estadísticas y análisis detallados estarán disponibles próximamente. Aquí podrás visualizar métricas de ventas, productos populares y tendencias.
                    </p>
                </div>
            </div>

            {/* Policies Section */}
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Settings className="text-zinc-600 dark:text-zinc-400" size={24} />
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                        Políticas del Sitio
                    </h3>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                    Consulta y revisa las políticas que se muestran a los clientes en la plataforma.
                </p>
                
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => setOpenPolicy('refund')}
                        className="px-4 py-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors duration-200 text-sm font-medium"
                    >
                        Política de Reembolso
                    </button>
                    
                    <button
                        onClick={() => setOpenPolicy('shipping')}
                        className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200 text-sm font-medium"
                    >
                        Política de Envío
                    </button>
                    
                    <button
                        onClick={() => setOpenPolicy('privacy')}
                        className="px-4 py-2 bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 rounded-lg hover:bg-violet-100 dark:hover:bg-violet-900/30 transition-colors duration-200 text-sm font-medium"
                    >
                        Política de Privacidad
                    </button>
                    
                    <button
                        onClick={() => setOpenPolicy('terms')}
                        className="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors duration-200 text-sm font-medium"
                    >
                        Términos del Servicio
                    </button>
                </div>
            </div>

            {/* Policy Modals */}
            <PolicyModal
                isOpen={openPolicy === 'refund'}
                title="Política de Reembolso"
                content={refundPolicyContent}
                onClose={() => setOpenPolicy(null)}
            />

            <PolicyModal
                isOpen={openPolicy === 'terms'}
                title="Términos del Servicio"
                content={termsOfServiceContent}
                onClose={() => setOpenPolicy(null)}
            />

            <PolicyModal
                isOpen={openPolicy === 'privacy'}
                title="Política de Privacidad"
                content={privacyPolicyContent}
                onClose={() => setOpenPolicy(null)}
            />

            <PolicyModal
                isOpen={openPolicy === 'shipping'}
                title="Política de Envío"
                content={shippingPolicyContent}
                onClose={() => setOpenPolicy(null)}
            />
        </div>
    );
}
