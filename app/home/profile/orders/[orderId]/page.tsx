import UserOrderDetailsView from '@/views/profile/UserOrderDetailsView';
import { Metadata } from 'next';

export const metadata : Metadata = {
    title: "Detalles de la orden"
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
