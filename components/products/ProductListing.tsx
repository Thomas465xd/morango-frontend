import { EnrichedProduct } from '@/src/types'
import React from 'react'
import ProductCard from './ProductCard'

type ProductListingProps = {
    products: EnrichedProduct[]
}

export default function ProductListing({ products }: ProductListingProps) {
	return (
		<div className="mx-auto max-w-2xl py-12 sm:px-6 sm:py-16 lg:max-w-full lg:px-8">
			<h2 className="sr-only">Lista de Joyas</h2>

			<div
				className="
					grid grid-cols-2
                    gap-x-2
					gap-y-2
					sm:grid-cols-2 sm:gap-x-4 sm:gap-y-6
					lg:grid-cols-3 lg:gap-x-6 lg:gap-y-8
					xl:grid-cols-4
				"
			>
				{products.map((product) => (
					<ProductCard 
                        key={product.id} 
                        product={product} 
                    />
				))}
			</div>
		</div>
	);
}

