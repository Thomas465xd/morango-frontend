import ProductsView from "@/views/products/ProductsView"
import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
    title: "Nuestas Joyas"
}

export default function page() {
    return (
        <div className="p-3 sm:p-8">
            {/* Hero Section */}
            <div className="mb-12">
                <div className="relative h-96 sm:h-[500px] rounded-xl overflow-hidden shadow-lg">
                    {/* Background Image */}
                    <Image
                        src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&h=600&fit=crop"
                        alt="Colección de Joyas"
                        fill
                        className="object-cover"
                        priority
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                    {/* Text Content */}
                    <div className="absolute inset-0 flex flex-col items-start justify-end p-6 sm:p-8">
                        <h1 className="heading tracking-widest uppercase text-white mb-3">
                            Explora nuestra Colección
                        </h1>
                        <p className="text-sm sm:text-base text-zinc-100 max-w-2xl leading-relaxed">
                            Diseños frescos y elegantes que realzan cualquier look en todas las temporadas. Confeccionados con piedras en distintos tonos, cada pieza aporta un estilo único y versátil, ideal para usar tanto de día como de noche.
                        </p>
                    </div>
                </div>
            </div>

            <ProductsView />
        </div>
    )
}
