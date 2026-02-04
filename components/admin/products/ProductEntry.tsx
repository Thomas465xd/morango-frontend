import Dialog from "@/components/ui/Dialog";
import { deleteProduct } from "@/src/api/ProductAPI";
import { EnrichedProduct, RingAttributes, NecklaceAttributes, BraceletAttributes, EarringAttributes } from "@/src/types";
import { copyToClipboard } from "@/src/utils/copy";
import { formatDate } from "@/src/utils/date";
import { finalPriceColorMap, getDiscountState } from "@/src/utils/discount";
import { formatToCLP } from "@/src/utils/price";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Calendar, ChevronDown, ChevronUp, Clipboard, Info, Package, Pen, Tags, Trash2, TrendingDown } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useThemeForModal } from "@/src/hooks/useTheme";

type ProductEntryProps = {
    product: EnrichedProduct
}

const getProductTypeIcon = (type: string) => {
    const iconMap: Record<string, React.ReactNode> = {
        Anillo: <Package size={16} />,
        Collar: <Package size={16} />,
        Pulsera: <Package size={16} />,
        Aros: <Package size={16} />,
    };
    return iconMap[type] || <Package size={16} />;
};

const getStatusInfo = (isActive: boolean) => {
    return isActive
        ? { label: "Activo", color: "bg-green-200 text-green-800 dark:bg-green-300 dark:text-green-900" }
        : { label: "Inactivo", color: "bg-red-200 text-red-800" };
};

// Component to render attributes based on product type
const ProductAttributes = ({ product }: { product: EnrichedProduct }) => {
    const renderAttributeRow = (label: string, value: string | number | undefined) => {
        if (value === undefined || value === null) return null;
        return (
            <div className="flex justify-between items-center py-1.5 border-b border-zinc-200 dark:border-zinc-600 last:border-b-0">
                <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">{label}:</span>
                <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{value}</span>
            </div>
        );
    };

    const renderRingAttributes = (attrs: RingAttributes) => (
        <div className="space-y-1">
            {renderAttributeRow("Tamaño", attrs.size)}
            {renderAttributeRow("Material", attrs.material)}
            {renderAttributeRow("Piedra Preciosa", attrs.gemstone)}
            {renderAttributeRow("Quilates", attrs.carats)}
        </div>
    );

    const renderNecklaceAttributes = (attrs: NecklaceAttributes) => (
        <div className="space-y-1">
            {renderAttributeRow("Largo", attrs.length)}
            {renderAttributeRow("Material", attrs.material)}
            {renderAttributeRow("Tipo de Cierre", attrs.claspType)}
            {renderAttributeRow("Tipo de Cadena", attrs.chainType)}
        </div>
    );

    const renderBraceletAttributes = (attrs: BraceletAttributes) => (
        <div className="space-y-1">
            {renderAttributeRow("Largo", attrs.length)}
            {renderAttributeRow("Material", attrs.material)}
            {renderAttributeRow("Tipo de Cierre", attrs.claspType)}
            {renderAttributeRow("Estilo", attrs.style)}
        </div>
    );

    const renderEarringAttributes = (attrs: EarringAttributes) => (
        <div className="space-y-1">
            {renderAttributeRow("Tipo", attrs.type)}
            {renderAttributeRow("Material", attrs.material)}
            {renderAttributeRow("Tipo de Soporte", attrs.backType)}
            {renderAttributeRow("Largo", attrs.length)}
        </div>
    );

    return (
        <div className="bg-zinc-100 dark:bg-zinc-600/20 p-3 rounded-md">
            <div className="flex items-center gap-2 mb-3">
                <Package size={16} className="text-zinc-700 dark:text-zinc-300" />
                <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    Especificaciones del Producto
                </span>
            </div>
            
            {product.productType === "Anillo" && renderRingAttributes(product.attributes as RingAttributes)}
            {product.productType === "Collar" && renderNecklaceAttributes(product.attributes as NecklaceAttributes)}
            {product.productType === "Pulsera" && renderBraceletAttributes(product.attributes as BraceletAttributes)}
            {product.productType === "Aros" && renderEarringAttributes(product.attributes as EarringAttributes)}
        </div>
    );
};

export default function ProductEntry({ product } : ProductEntryProps) {
	const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>(
		{}
	);
    const theme = useThemeForModal();

    const router = useRouter(); 
    const queryClient = useQueryClient(); 

    const { mutate } = useMutation({
        mutationFn: deleteProduct, 
        onError: (error) => {
            toast.error(error.message || "Error al eliminar Producto")
        }, 
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["products"] })
            toast.success(data.message || "Producto eliminado exitosamente")
        }
    })

    const toggleRowExpansion = (productId: string) => {
        setExpandedRows((prev) => ({
            ...prev,
            [productId]: !prev[productId],
        }));
    };

    const handleDeleteProduct = async (id: string, name: string) => {
        try {
            Swal.fire({
                title: "¿Estás seguro?",
                text: `Se eliminará el producto: "${name}"`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar",
                theme: theme,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    mutate(id)
                    Swal.fire({
                        title: "¡Eliminado!",
                        text: "El producto ha sido eliminado.",
                        icon: "success",
                        theme: theme,
                    });
                }
            });
        } catch {
            toast.error("Error al eliminar el producto");
        }
    };

    const discount = product.discount;

    const now = new Date();

    const startDate = discount?.startDate
        ? new Date(discount.startDate)
        : null;

    const endDate = discount?.endDate
        ? new Date(discount.endDate)
        : null;

    const isScheduled =
        !!startDate && startDate > now;

    const isExpired =
        !!endDate && endDate < now;

    const isActive =
        discount?.isActive &&
        !isScheduled &&
        !isExpired;

    return (
        <Fragment key={product.id}>
            <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors duration-300 cursor-pointer">
                <td
                    className="px-3 py-4 text-center"
                    onClick={() =>
                        toggleRowExpansion(product.id)
                    }
                >
                    {expandedRows[product.id] ? (
                        <div className="group relative">
                            <ChevronUp
                                size={16}
                                className="text-zinc-500"
                            />
                            <Dialog position="right-top">
                                Menos Info
                            </Dialog>
                        </div>
                    ) : (
                        <div className="group relative">
                            <ChevronDown
                                size={16}
                                className="text-zinc-500"
                            />
                            <Dialog position="right-top">
                                Más Info
                            </Dialog>
                        </div>
                    )}
                </td>

                <td className="px-6 py-4 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    <div className="flex items-center">
                        <span className="mr-2 max-w-32 truncate">
                            {product.name}
                        </span>
                        <button
                            onClick={() =>
                                copyToClipboard(
                                    product.name
                                )
                            }
                            className="text-zinc-400 hover:text-blue-500 transition-colors duration-200 group relative"
                            title="Copiar nombre"
                        >
                            <Dialog position="right-top">
                                Copiar
                            </Dialog>
                            <Clipboard size={14} />
                        </button>
                    </div>
                </td>

                <td className="px-6 py-4 text-sm text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                        {getProductTypeIcon(
                            product.productType
                        )}
                        <span>
                            {product.productType}
                        </span>
                    </div>
                </td>

                <td className="px-6 py-4 text-sm text-zinc-800 dark:text-zinc-200">
                    {product.category}
                </td>

                <td className="flex justify-end px-6 py-4 text-sm font-medium text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
                    <div>
                        {(() => {
                            const discountState = getDiscountState(product);
                            const priceColor = finalPriceColorMap[discountState];

                            if (discountState !== "none") {
                                return (
                                    <div className="flex flex-col">
                                        <span className={`${discountState === "active" ? "ml-auto line-through text-zinc-500" :  `text-zinc-500`} text-xs`}>
                                            {discountState === "active" && formatToCLP(product.basePrice)}
                                            {discountState === "inactive" && "% inactivo"}
                                            {discountState === "future" && "% futuro"}
                                            {discountState === "expired" && "% expirado"}
                                        </span>
                                        <span className={`${priceColor} font-semibold`}>
                                            {formatToCLP(product.finalPrice)}
                                        </span>
                                    </div>
                                );
                            }

                            return (
                                <span className={priceColor}>
                                    {formatToCLP(product.finalPrice)}
                                </span>
                            );
                        })()}
                    </div>
                </td>

                <td className="px-6 py-4 text-sm text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
                    <div className="flex justify-end items-center gap-1">
                        <span
                            className={`
                                ${product.stock < 5 && "text-red-600 font-semibold"}
                                ${product.stock > 10 && "dark:text-green-400 text-green-600"}
                            `}
                        >
                            {product.stock}
                        </span>
                        {product.reserved > 0 && (
                            <span className="text-xs text-zinc-500">
                                ({product.reserved}{" "}
                                reservados)
                            </span>
                        )}
                    </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap flex justify-end">
                    {(() => {
                        const statusInfo =
                            getStatusInfo(
                                product.isActive
                            );
                        return (
                            <span
                                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${statusInfo.color}`}
                            >
                                {statusInfo.label}
                            </span>
                        );
                    })()}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-700">
                    <div className="flex items-center gap-3">
                        {/* <button
                            className="text-blue-500 hover:text-blue-700 transition-colors duration-300 flex items-center gap-1 cursor-pointer"
                            onClick={() =>
                                router.push(
                                    `/home/products/${product.id}`
                                )
                            }
                            title="Ver producto"
                        >
                            <Eye size={14} />
                            Ver
                        </button> */}

                        <button
                            className="text-orange-500 hover:text-orange-600 dark:text-orange-300 dark:hover:text-orange-400 transition-colors duration-300 flex items-center gap-1 cursor-pointer"
                            onClick={() =>
                                router.push(
                                    `/admin/products/discount/${product.id}?basePrice=${product.basePrice}&percentage=${discount?.percentage}&initialDate=${discount?.startDate}&finalDate=${discount?.endDate}&status=${discount?.isActive}`
                                )
                            }
                            title="Editar producto"
                        >
                            <Tags size={14} />
                            Sale
                        </button>

                        <button
                            className="dark:text-blue-300 dark:hover:text-blue-400 transition-colors duration-300 flex items-center gap-1 cursor-pointer"
                            onClick={() =>
                                router.push(
                                    `/admin/products/edit/${product.id}`
                                )
                            }
                            title="Editar producto"
                        >
                            <Pen size={14} />
                            Editar
                        </button>

                        <button
                            className="text-red-700 hover:text-red-900 transition-colors duration-300 flex items-center gap-1 cursor-pointer"
                            onClick={() =>
                                handleDeleteProduct(
                                    product.id,
                                    product.name
                                )
                            }
                            title="Eliminar producto"
                        >
                            <Trash2 size={14} />
                            Eliminar
                        </button>
                    </div>
                </td>
            </tr>

            {expandedRows[product.id] && (
                <tr className="bg-zinc-50 dark:bg-zinc-700/50">
                    <td
                        colSpan={8}
                        className="px-6 py-4"
                    >
                        <div className="flex items-start gap-2 text-sm">
                            <Info
                                size={18}
                                className="text-zinc-400 mt-0.5"
                            />
                            <div className="space-y-4 w-full">
                                <div className="flex flex-col">
                                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                        ID de Producto:
                                    </span>
                                    <div className="flex items-center">
                                        <span className="font-mono text-zinc-800 dark:text-zinc-200 mr-2">
                                            {product.id}
                                        </span>
                                        <button
                                            title="Copiar ID"
                                            onClick={() =>
                                                copyToClipboard(
                                                    product.id
                                                )
                                            }
                                            className="text-zinc-400 hover:text-blue-500 transition-colors duration-200"
                                        >
                                            <Clipboard
                                                size={
                                                    14
                                                }
                                            />
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                        Descripción:
                                    </span>
                                    <p className="text-zinc-800 dark:text-zinc-200 line-clamp-3">
                                        {
                                            product.description
                                        }
                                    </p>
                                </div>

                                {/* Product Attributes Section */}
                                <ProductAttributes product={product} />

                                {discount && discount.percentage > 0 && (
                                    <>
                                        {/* 🟢 ACTIVE */}
                                        {isActive && (
                                            // 🟢 ACTIVE DISCOUNT
                                            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <TrendingDown
                                                        size={16}
                                                        className="text-green-600"
                                                    />
                                                    <span className="text-sm font-semibold text-green-800 dark:text-green-400">
                                                        Descuento Activo
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-2 gap-2 text-sm">
                                                    <div>
                                                        <span className="text-zinc-600 dark:text-zinc-400">
                                                            Porcentaje:
                                                        </span>
                                                        <span className="ml-2 font-medium text-green-700 dark:text-green-300">
                                                            {discount.percentage}%
                                                        </span>
                                                    </div>

                                                    {discount.startDate && (
                                                        <div>
                                                            <span className="text-zinc-600 dark:text-zinc-400">
                                                                Inicio:
                                                            </span>
                                                            <span className="ml-2 font-medium text-zinc-800 dark:text-zinc-200">
                                                                {formatDate(new Date(discount.startDate))}
                                                            </span>
                                                        </div>
                                                    )}

                                                    {discount.endDate && (
                                                        <div>
                                                            <span className="text-zinc-600 dark:text-zinc-400">
                                                                Fin:
                                                            </span>
                                                            <span className="ml-2 font-medium text-zinc-800 dark:text-zinc-200">
                                                                {formatDate(new Date(discount.endDate))}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* 🟡 SCHEDULED */}
                                        {isScheduled && (
                                            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-md">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <TrendingDown size={16} className="text-yellow-600" />
                                                    <span className="text-sm font-semibold text-yellow-800 dark:text-yellow-400">
                                                        Descuento Programado
                                                    </span>
                                                </div>

                                                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                                                    Comienza el{" "}
                                                    <span className="font-medium">
                                                        {formatDate(startDate!)}
                                                    </span>{" "}
                                                    ({discount.percentage}%)
                                                </p>
                                            </div>
                                        )}

                                        {/* 🔴 EXPIRED */}
                                        {isExpired && (
                                            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <TrendingDown size={16} className="text-red-600" />
                                                    <span className="text-sm font-semibold text-red-800 dark:text-red-400">
                                                        Descuento Expirado
                                                    </span>
                                                </div>

                                                <p className="text-sm text-red-700 dark:text-red-300">
                                                    Terminó el{" "}
                                                    <span className="font-medium">
                                                        {formatDate(endDate!)}
                                                    </span>{" "}
                                                    ({discount.percentage}%)
                                                </p>
                                            </div>
                                        )}

                                        {/* 🟠 INACTIVE */}
                                        {!isActive && !isScheduled && !isExpired && !discount.isActive && (
                                            <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-md">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <TrendingDown size={16} className="text-orange-600" />
                                                    <span className="text-sm font-semibold text-orange-800 dark:text-orange-400">
                                                        Descuento Inactivo
                                                    </span>
                                                </div>

                                                <p className="text-sm text-orange-700 dark:text-orange-300">
                                                    {discount.percentage}% configurado pero desactivado
                                                </p>
                                            </div>
                                        )}
                                    </>
                                )}

                                {product.tags &&
                                    product.tags
                                        .length > 0 && (
                                        <div>
                                            <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                                Etiquetas:
                                            </span>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {product.tags.map(
                                                    (
                                                        tag,
                                                        index
                                                    ) => (
                                                        <span
                                                            key={
                                                                index
                                                            }
                                                            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                                        >
                                                            {
                                                                tag
                                                            }
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
                                    <div>
                                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                            Creado:
                                        </span>
                                        <div className="flex items-center gap-1">
                                            <Calendar
                                                size={
                                                    16
                                                }
                                                className="text-zinc-500"
                                            />
                                            <span className="font-medium text-zinc-800 dark:text-zinc-200">
                                                {formatDate(
                                                    product.createdAt
                                                )}
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                            Actualizado:
                                        </span>
                                        <div className="flex items-center gap-1">
                                            <Calendar
                                                size={
                                                    16
                                                }
                                                className="text-zinc-500"
                                            />
                                            <span className="font-medium text-zinc-800 dark:text-zinc-200">
                                                {formatDate(
                                                    product.updatedAt
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                        Imágenes (
                                            {
                                                product
                                                    .images
                                                    .length
                                            }
                                        ):
                                    </span>
                                    <div className="flex gap-2 mt-1 overflow-x-auto">
                                        {product.images
                                            .slice(0, 5)
                                            .map(
                                                (
                                                    url,
                                                    index
                                                ) => (
                                                    <Image
                                                        key={
                                                            index
                                                        }
                                                        src={
                                                            url
                                                        }
                                                        width={200}
                                                        height={96}
                                                        alt={`Imagen ${
                                                            index +
                                                            1
                                                        }`}
                                                        className="w-16 h-16 object-cover rounded border border-zinc-200 dark:border-zinc-600 flex-shrink-0"
                                                    />
                                                )
                                            )}
                                        {product.images
                                            .length >
                                            5 && (
                                            <div className="w-16 h-16 bg-zinc-200 dark:bg-zinc-600 rounded border border-zinc-200 dark:border-zinc-600 flex items-center justify-center text-xs text-zinc-500">
                                                +
                                                {product
                                                    .images
                                                    .length -
                                                    5}
                                            </div>
                                        )}
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
