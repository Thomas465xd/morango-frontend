import ProductDetailsView from "@/views/products/ProductDetailsView";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Detalles del Producto"
}

export default async function page({ params } : { params: Promise<{ productId: string }>}) {
    const { productId } = await params; 

    // console.log(productId)

	return (
        <div className="p-3 sm:p-8">
            <ProductDetailsView
                productId={productId}
            />
        </div>
	);
}