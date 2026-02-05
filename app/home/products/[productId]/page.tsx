import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient } from '@/app/get-query-client'
import ProductDetailsView from '@/views/products/ProductDetailsView'
import { getProductById } from '@/src/api/ProductAPI'
import { Metadata } from 'next'

export async function generateMetadata({
	params,
}: {
	params: Promise<{ productId: string }>
}): Promise<Metadata> {
	const { productId } = await params

	try {
		const queryClient = getQueryClient()

		// Prefetch the data server-side for metadata
		const product = await queryClient.fetchQuery({
			queryKey: ['products', productId],
			queryFn: () => getProductById(productId),
		})

		const productData = product?.product
		const image = productData?.images[0]

		return {
			title: `${productData?.name || 'Producto'}`,
			description:
				productData?.description ||
				'Descubre nuestros productos de joyería de alta calidad',
			openGraph: {
				title: productData?.name,
				description: productData?.description,
				images: image
					? [
							{
								url: image,
								width: 1200,
								height: 630,
								alt: productData?.name,
							},
						]
					: [],
				type: 'website',
			},
			twitter: {
				card: 'summary_large_image',
				title: productData?.name,
				description: productData?.description,
				images: image ? [image] : [],
			},
		}
	} catch (error) {
		console.error('❌ Error generating metadata:', error)
		return {
			title: 'Ver Producto',
			description: 'Descubre nuestros productos de joyería de alta calidad',
		}
	}
}

export default async function page({
	params,
}: {
	params: Promise<{ productId: string }>
}) {
	const { productId } = await params
	const queryClient = getQueryClient()

	// Prefetch the product data on the server
	// This happens during SSR and the data is serialized into the page
	await queryClient.prefetchQuery({
		queryKey: ['products', productId],
		queryFn: () => getProductById(productId),
	})

	return (
		<div className="p-3 sm:p-8" suppressHydrationWarning>
			{/* HydrationBoundary passes the prefetched data to the client */}
			<HydrationBoundary state={dehydrate(queryClient)}>
				<ProductDetailsView productId={productId} />
			</HydrationBoundary>
		</div>
	)
}