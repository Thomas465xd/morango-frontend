"use client";
import ProductDetails from "@/components/products/ProductDetails";
import ProductDetailsSkeleton from "@/components/skeletons/ProductDetailsSkeleton";
import ErrorCard from "@/components/ui/ErrorCard";
import { getProductById } from "@/src/api/ProductAPI";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useMemo } from "react";

type ProductDetailsViewProps = {
	productId: string;
};

export default function ProductDetailsView({
	productId,
}: ProductDetailsViewProps) {
	// useQuery with the same queryKey as the server prefetch
	// React Query will hydrate this from HydrationBoundary state automatically
	const { data, isLoading, isError } = useQuery({
		queryKey: ["products", productId],
		queryFn: () => getProductById(productId),
		retry: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		staleTime: 60 * 1000, // 1 minute (matches server config)
	});

	const product = useMemo(() => data?.product, [data]);
	const relatedProducts = useMemo(() => data?.relatedProducts, [data]);

	if (isError)
		return (
			<ErrorCard
				icon={X}
				title="Error al cargar producto."
				description="Un error ha ocurrido al cargar los detalles del producto, comprueba tu conexión a internet y recarga la página."
				errorText={"API getProductById request error"}
				showPrevious
				showReload
			/>
		);

	if (isLoading)
		return (
			<ProductDetailsSkeleton />
		);

	if (product && relatedProducts)
		return (
			<ProductDetails
				product={product}
				relatedProducts={relatedProducts}
			/>
		);
}
