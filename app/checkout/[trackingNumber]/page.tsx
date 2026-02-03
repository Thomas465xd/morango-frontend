import CheckoutView from '@/views/checkout/CheckoutView'

export default async function page({ params } : { params: Promise<{ trackingNumber: string }>}) {
    const { trackingNumber } = await params; 

    return (
        <div className="min-h-screen">
            <CheckoutView
                trackingNumber={trackingNumber}
            />
        </div>
    )
}
