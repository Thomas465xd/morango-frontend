import { CreateOrderForm, EnrichedProduct } from "@/src/types";
import { Disclosure, DisclosureButton, DisclosurePanel, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { MinusIcon, PlusIcon, Sparkles, Tag, ShoppingBag, Shield, Truck, Tags, Minus, Plus, Check, X, ZoomIn } from "lucide-react";
import Image from "next/image";
import ProductCard from "./ProductCard";
import { formatToCLP } from "@/src/utils/price";
import { capitalizeFirstLetter } from "@/src/utils/text";
import Breadcrumb from "../ui/Breadcrumb";
import { usePathname, useRouter } from "next/navigation";
import { useCartStore } from "@/src/store/useCartStore";
import { toast } from "react-toastify";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "@/src/api/OrderAPI";

type ProductDetailsProps = {
	product: EnrichedProduct;
	relatedProducts: EnrichedProduct[];
};

// Helper to format attributes based on product type
const getProductAttributes = (product: EnrichedProduct) => {
	const attributes: { name: string; value: string }[] = [];
	
	switch (product.productType) {
		case 'Anillo':
			if (product.attributes.size) attributes.push({ name: 'Talla', value: product.attributes.size });
			if (product.attributes.material) attributes.push({ name: 'Material', value: product.attributes.material });
			if (product.attributes.gemstone) attributes.push({ name: 'Piedra', value: product.attributes.gemstone });
			if (product.attributes.carats) attributes.push({ name: 'Quilates', value: product.attributes.carats.toString() + " " + "Quilates" });
			break;
		case 'Collar':
			if (product.attributes.material) attributes.push({ name: 'Material', value: product.attributes.material });
			if (product.attributes.length) attributes.push({ name: 'Largo', value: product.attributes.length });
			if (product.attributes.claspType) attributes.push({ name: 'Tipo de Cierre', value: product.attributes.claspType });
			if (product.attributes.chainType) attributes.push({ name: 'Tipo de Cadena', value: product.attributes.chainType });
			break;
		case 'Pulsera':
			if (product.attributes.material) attributes.push({ name: 'Material', value: product.attributes.material });
			if (product.attributes.length) attributes.push({ name: 'Largo', value: product.attributes.length });
			if (product.attributes.claspType) attributes.push({ name: 'Tipo de Cierre', value: product.attributes.claspType });
			if (product.attributes.style) attributes.push({ name: 'Estilo', value: product.attributes.style });
			break;
		case 'Aros':
			if (product.attributes.material) attributes.push({ name: 'Material', value: product.attributes.material });
			if (product.attributes.type) attributes.push({ name: 'Tipo', value: product.attributes.type });
			if (product.attributes.backType) attributes.push({ name: 'Tipo de Broche', value: product.attributes.backType });
			if (product.attributes.length) attributes.push({ name: 'Largo', value: product.attributes.length });
			break;
	}
	
	return attributes;
};

export default function ProductDetails({
	product,
	relatedProducts,
}: ProductDetailsProps) {
    const router = useRouter(); 
    const currentPathname = usePathname(); 
    const { addItem, openCart } = useCartStore(); 

    const cartQuantity = useCartStore(
        state => state.items.find(i => i.productId === product.id)?.quantity ?? 1
    );

    const [ quantity, setQuantity ] = useState<number>(1); 
    const [ zoomedImage, setZoomedImage ] = useState<string | null>(null);

    const queryClient = useQueryClient(); 

    //! Mutation for registering a DRAFT order 
    // customer & address info not set yet, redirect to checkout form page
    const { mutate, isPending } = useMutation({
        mutationFn: (formData: CreateOrderForm) => createOrder(formData),
        onError: (error) => {
            toast.error(error.message || "Error al registrar orden ❌");
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            toast.success(data.message || "Orden creada exitosamente 🎉");
            router.push(`/checkout/${data.order.trackingNumber}`)
        },
    });

	const hasDiscount = product.hasActiveDiscount && product.savings > 0;

	const attributes = getProductAttributes(product);
	const isNew = () => {
		const oneWeekAgo = new Date();
		oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
		return product.createdAt > oneWeekAgo;
	};

    const pages = [{
        name: "Joyas", 
        href: "/home/products", 
        current: false, 
    }, {
        name: product.name,
        href: currentPathname, 
        current: true 
    }]

    const handleAdd = () => {
        if(cartQuantity === product.availableStock || quantity + cartQuantity > product.availableStock + 1) {
            toast.error("No puedes agregar mas de este producto.")
            return
        }

        addItem(product.id, quantity)
        openCart(); 
    }

    const handleBuyNow = () => {
        const formData = {
            items: [{
                productId: product.id, 
                quantity: 1
            }]
        }

        mutate(formData)
    }

	return (
        <main className="mx-auto max-w-7xl sm:px-6 sm:pt-4 lg:px-8">
            <div className="mb-12">
                <Breadcrumb
                    pages={pages}
                />
            </div>

            <div className="mx-auto max-w-2xl lg:max-w-none">
                {/* Product */}
                <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12">
                    <div className="">
                        {/* Image gallery */}
                        <TabGroup className="flex flex-col-reverse">
                            {/* Image selector */}
                            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                                <TabList className="grid grid-cols-4 gap-6">
                                    {product.images.map((image, index) => (
                                        <Tab
                                            key={image}
                                            className="
                                                group relative h-24 cursor-pointer 
                                                flex-center rounded-lg bg-white dark:bg-zinc-800 
                                                border-2 border-transparent hover:border-orange-300 dark:hover:border-orange-200 
                                                transition-all duration-200 
                                                overflow-hidden focus:outline-none 
                                                data-[selected]:border-orange-300 dark:data-[selected]:border-orange-300 
                                                data-[selected]:ring-2 data-[selected]:ring-orange-200/50
                                            "
                                        >
                                            <span className="sr-only">
                                                Imagen {index + 1}
                                            </span>
                                            <span className="absolute inset-0 overflow-hidden rounded-md">
                                                <Image
                                                    alt={`${product.name} - Imagen ${index + 1}`}
                                                    src={image}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </span>
                                        </Tab>
                                    ))}
                                </TabList>
                            </div>

                            <TabPanels>
                                {product.images.map((image, index) => (
                                    <TabPanel key={image}>
                                        <div 
                                            onClick={() => setZoomedImage(image)}
                                            className="relative aspect-square w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900 cursor-zoom-in group"
                                        >
                                            <Image
                                                alt={`${product.name} - Vista ${index + 1}`}
                                                src={image}
                                                fill
                                                className="object-cover group-hover:opacity-90 transition-opacity duration-200"
                                                priority={index === 0}
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/10">
                                                <ZoomIn size={32} className="text-white" />
                                            </div>
                                        </div>
                                    </TabPanel>
                                ))}
                            </TabPanels>
                        </TabGroup>
                    </div>

                    {/* Product info */}
                    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                        {/* Badges */}
                        <div className="flex gap-2 mb-4">
                            {hasDiscount && (
                                <span className="inline-flex items-center gap-1 bg-black text-white border border-white px-3 py-1.5 rounded-full text-sm font-semibold">
                                    <Tags size={14} />
                                    -{Math.round((product.savings / product.basePrice) * 100)}% OFF
                                </span>
                            )}
                            {!hasDiscount && isNew() && (
                                <span className="inline-flex items-center gap-1 bg-orange-300 border-2 border-white text-white px-3 py-1.5 rounded-full text-sm font-semibold">
                                    <Sparkles size={14} />
                                    NUEVO
                                </span>
                            )}
                            {product.availableStock > 0 && product.availableStock <= 5 && (
                                <span className="bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                                    ¡Solo quedan {product.availableStock}!
                                </span>
                            )}
                        </div>

                        {/* Category & Type */}
                        <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-2">
                            <span className="uppercase tracking-wider">{product.productType}</span>
                            {product.category && (
                                <>
                                    <span>•</span>
                                    <span>{product.category}</span>
                                </>
                            )}
                        </div>

                        {/* Product Name */}
                        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-orange-100">
                            {capitalizeFirstLetter(product.name)}
                        </h1>

                        {/* Price */}
                        <div className="mt-4">
                            <h2 className="sr-only">Información de precio</h2>
                            {hasDiscount ? (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <p className="text-2xl line-through text-zinc-500 dark:text-zinc-400">
                                            {formatToCLP(product.basePrice)}
                                        </p>
                                        <span className="text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
                                            Ahorra {formatToCLP(product.savings)}
                                        </span>
                                    </div>
                                    <p className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-orange-200">
                                        {formatToCLP(product.finalPrice)}
                                    </p>
                                </div>
                            ) : (
                                <p className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-orange-200">
                                    {formatToCLP(product.finalPrice)}
                                </p>
                            )}
                        </div>

                        {/* Stock Status */}
                        <div className="mt-4">
                            {product.availableStock > 0 ? (
                                <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                                    ✓ En stock ({product.availableStock} disponibles)
                                </p>
                            ) : (
                                <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                                    ✗ Agotado
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="mt-6">
                            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Descripción</h3>
                            <div className="mt-2 space-y-2 text-base text-zinc-700 dark:text-zinc-300">
                                {product.description}
                            </div>
                        </div>

                        {/* Tags */}
                        {product.tags && product.tags.length > 0 && (
                            <div className="mt-6">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <Tag size={16} className="text-zinc-400" />
                                    {product.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="text-sm bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 px-3 py-1 rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity Controls */}
                        <div className="flex justify-start w-fit my-4 gap-2 border border-zinc-300 dark:border-zinc-600 rounded-md">
                            <button
                                onClick={() =>
                                    setQuantity((q) => Math.max(1, q - 1))
                                }
                                disabled={product.availableStock === 0}
                                className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors rounded-l-md cursor-pointer"
                                aria-label="Reducir cantidad"
                            >
                                <Minus size={14} className="text-zinc-600 dark:text-zinc-400" />
                            </button>
                            
                            <input 
                                className="px-4 text-right text-sm font-medium text-zinc-900 dark:text-zinc-100"
                                type="number"
                                value={quantity}
                                min={1}
                                max={product.availableStock}
                                onChange={(e) => {
                                    const value = Number(e.target.value);
                                    if (!Number.isNaN(value)) {
                                    setQuantity(Math.max(1, Math.min(value, product.availableStock)));
                                    }
                                }}
                            />
                            
                            <button
                                onClick={() =>
                                    setQuantity((q) =>
                                        Math.min(product.availableStock, q + 1)
                                    )
                                }
                                disabled={product.availableStock === 0}
                                className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors rounded-r-md cursor-pointer"
                                aria-label="Aumentar cantidad"
                            >
                                <Plus size={14} className="text-zinc-600 dark:text-zinc-400" />
                            </button>
                        </div>

                        {/* Add to Cart & Buy now buttons */}
                        <div className="mt-8 space-y-4">
                            <button
                                disabled={product.availableStock === 0}
                                onClick={handleAdd}
                                className="
                                    button-orange-gradient w-full flex-center tracking-widest
                                "
                            >
                                <ShoppingBag size={20} />
                                {product.availableStock > 0 ? 'AGREGAR AL CARRITO' : 'AGOTADO'}
                            </button>

                            <button
                                disabled={product.availableStock === 0 || isPending}
                                onClick={handleBuyNow}
                                className="
                                    button w-full h-[56px] flex-center tracking-widest border-orange-200/40 dark:hover:border-orange-200/50 text-orange-200 hover:text-orange-300
                                "
                            >
                                {product.availableStock > 0 ? "COMPRAR AHORA" : "NO DISPONIBLE"}
                            </button>
                        </div>

                        <div className="mt-8">
                            <strong className="text-sm flex-align">
                                <Check color="green"/>
                                Retiro disponible en domicilio Las Condes
                            </strong>
                            <span className="text-sm ml-[32px]">
                                Normalmente está listo en 3 a 5 días
                            </span>
                        </div>

                        {/* Trust Badges */}
                        <div className="mt-8 grid grid-cols-3 gap-4 border-t border-zinc-200 dark:border-zinc-700 pt-8">
                            <div className="text-center">
                                <Shield className="mx-auto h-6 w-6 text-zinc-400 dark:text-zinc-500" />
                                <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                                    Compra Segura
                                </p>
                            </div>
                            <div className="text-center">
                                <Truck className="mx-auto h-6 w-6 text-zinc-400 dark:text-zinc-500" />
                                <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                                    Despacho a Domicilio
                                </p>
                            </div>
                            <div className="text-center">
                                <Sparkles className="mx-auto h-6 w-6 text-zinc-400 dark:text-zinc-500" />
                                <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                                    Garantía
                                </p>
                            </div>
                        </div>

                        {/* Product Attributes */}
                        {attributes.length > 0 && (
                            <section aria-labelledby="details-heading" className="mt-8">
                                <h2 id="details-heading" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                    Especificaciones
                                </h2>
                                <div className="mt-4 divide-y divide-zinc-200 dark:divide-zinc-700 border-t border-zinc-200 dark:border-zinc-700">
                                    {attributes.map((attribute) => (
                                        <Disclosure key={attribute.name} as="div">
                                            <h3>
                                                <DisclosureButton className="group relative flex w-full items-center justify-between py-4 text-left">
                                                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 group-data-[open]:text-orange-500 dark:group-data-[open]:text-orange-300">
                                                        {attribute.name}
                                                    </span>
                                                    <span className="ml-6 flex items-center">
                                                        <PlusIcon
                                                            aria-hidden="true"
                                                            className="block h-5 w-5 text-zinc-400 group-hover:text-zinc-500 dark:group-hover:text-zinc-300 group-data-[open]:hidden"
                                                        />
                                                        <MinusIcon
                                                            aria-hidden="true"
                                                            className="hidden h-5 w-5 text-orange-500 dark:text-orange-300 group-data-[open]:block"
                                                        />
                                                    </span>
                                                </DisclosureButton>
                                            </h3>
                                            <DisclosurePanel className="pb-4">
                                                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                                                    {attribute.value}
                                                </p>
                                            </DisclosurePanel>
                                        </Disclosure>
                                    ))}
                                    <Disclosure as="div">
                                        <h3>
                                            <DisclosureButton className="group relative flex w-full items-center justify-between py-4 text-left">
                                                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 group-data-[open]:text-orange-500 dark:group-data-[open]:text-orange-300">
                                                    Cuidados
                                                </span>
                                                <span className="ml-6 flex items-center">
                                                    <PlusIcon
                                                        aria-hidden="true"
                                                        className="block h-5 w-5 text-zinc-400 group-hover:text-zinc-500 dark:group-hover:text-zinc-300 group-data-[open]:hidden"
                                                    />
                                                    <MinusIcon
                                                        aria-hidden="true"
                                                        className="hidden h-5 w-5 text-orange-500 dark:text-orange-300 group-data-[open]:block"
                                                    />
                                                </span>
                                            </DisclosureButton>
                                        </h3>
                                        <DisclosurePanel className="pb-4">
                                            <p className="text-sm text-zinc-700 dark:text-zinc-300">
                                                Limpia con un paño suave y seco. Evite el contacto con agua, perfumes o productos químicos para mantener su brillo y color.
                                            </p>
                                        </DisclosurePanel>
                                    </Disclosure>
                                </div>
                            </section>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                <section
                    aria-labelledby="related-heading"
                    className="mt-16 border-t border-zinc-200 dark:border-zinc-700 px-4 py-16 sm:px-0"
                >
                    <h2
                        id="related-heading"
                        className="text-2xl font-bold text-zinc-900 dark:text-orange-100 mb-8"
                    >
                        También te puede interesar
                    </h2>

                    <div className="relative">
                        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
                            <div className="flex gap-6 pb-4">
                                {relatedProducts.map((relatedProduct) => (
                                    <div key={relatedProduct.id} className="flex-none w-60">
                                        <ProductCard
                                            product={relatedProduct}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Image Zoom Modal */}
            {zoomedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                    onClick={() => setZoomedImage(null)} // close on outside click
                >
                    <div
                        className="relative max-w-4xl w-full max-h-[90vh] animate-in fade-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()} // prevent closing when clicking modal
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setZoomedImage(null)}
                            className="absolute right-14 p-2 text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200 z-10"
                            aria-label="Cerrar zoom"
                        >
                            <X size={24} />
                        </button>

                        {/* Zoomed Image */}
                        <div className="relative w-full h-[90vh] bg-black rounded-lg overflow-hidden flex items-center justify-center">
                            <Image
                                alt="Imagen ampliada"
                                src={zoomedImage}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>

                        {/* Instructions */}
                        <p className="text-center text-white text-sm mt-4">
                            Click fuera de la imagen para cerrar
                        </p>
                    </div>
                </div>
            )}
        </main>
	);
}