import DevelopmentCard from '@/components/ui/DevelopmentCard'
import { CreditCard } from 'lucide-react'
import React from 'react'

export default function UserPaymentsView() {
    return (
        <div className="mt-8">
            <DevelopmentCard
                icon={CreditCard}
                title="Listado de pagos"
                description="Los listados de pagos asociados a tu cuenta estarán disponibles próximamente."
            />
        </div>
    )
}
