import PublicOrderView from '@/views/orders/PublicOrderView'
import { Metadata } from 'next';

export const metadata : Metadata = {
    title: "Seguimiento de la Orden",
    description: "Rastrear el estado y ubicación actual de tu orden sin necesidad de iniciar sesión."
}

export default async function page({ params } : { params: Promise<{ trackingNumber: string }>}) {
    const { trackingNumber } = await params; 

    return (
        <div className='p-3 sm:p-8'>
            <PublicOrderView
                trackingNumber={trackingNumber}
            />
        </div>
    )
}
