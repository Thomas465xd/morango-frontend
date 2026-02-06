import UserOrderDetailsView from '@/views/profile/UserOrderDetailsView';
import { Metadata } from 'next';

export const metadata : Metadata = {
    title: "Detalles de la Orden",
    description: "Visualiza los detalles completos de tu orden, incluyendo productos, precios y estado de envío."
}

export default async function page({ params } : { params: Promise<{ orderId: string }>}) {
    const { orderId } = await params; 

    return (
        <div className='p-3 sm:p-8'>
            <UserOrderDetailsView
                orderId={orderId}
            />
        </div>
    )
}
