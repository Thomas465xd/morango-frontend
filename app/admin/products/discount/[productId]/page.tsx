import SetDiscountForm from "@/components/admin/products/SetDiscountForm";
import { normalizeDate } from "@/src/utils/date";
import { getFirst, parseBoolean, parseNumber } from "@/src/utils/params";
import { Home } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Configurar Descuentos",
    description: "Establece descuentos y promociones para tus productos de joyas."
}

// TODO: implement generateStaticParams() with react query for faster page loads

type DiscountParams = {
    params: Promise<{ productId: string }>, 
    searchParams: { [key: string]: string | string[] | undefined }
}

export default async function page({ params, searchParams } : DiscountParams) {
    const { productId } = await params; 
    const { basePrice, percentage, initialDate, finalDate, status } = await searchParams;

    const rawBasePrice = getFirst(basePrice);
    const rawPercentage = getFirst(percentage);
    const rawInitialDate = getFirst(initialDate);
    const rawFinalDate = getFirst(finalDate);
    const rawStatus = getFirst(status) || null; 

    const parsedBasePrice = parseNumber(rawBasePrice) ?? 100000;
    const parsedPercentage = parseNumber(rawPercentage);
    const parsedStatus = parseBoolean(rawStatus, true); 

	return (
        <section className="p-8">
            <div className="flex-between">
                <div className="">
                    <h1 className="title w-70">
                        Configurar Descuentos
                    </h1>
                    <p className="mt-2 text-stone-600 dark:text-stone-400">
                        Establece una campaña de descuentos para el producto.
                    </p>
                </div>

                <Link
                    href="/admin/products"
                    className="button flex-align"
                >
                    <Home size={20} />
                    Volver al panel
                </Link>
            </div>


            <SetDiscountForm
                productId={productId}
                basePrice={parsedBasePrice}
                discountPercentage={parsedPercentage} // optional
                initialDate={normalizeDate(rawInitialDate)} // optional
                finalDate={normalizeDate(rawFinalDate)} // optional
                status={parsedStatus !== null ? parsedStatus : undefined}
            />
        </section>
	);
}