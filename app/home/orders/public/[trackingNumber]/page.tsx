import PublicOrderView from '@/views/orders/PublicOrderView'
import { Metadata } from 'next';

export const metadata : Metadata = {
    title: "Seguimiento de la orden"
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
