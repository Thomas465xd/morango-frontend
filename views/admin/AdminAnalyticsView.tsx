import React from 'react';
import { TrendingUp } from 'lucide-react';
import DevelopmentCard from '@/components/ui/DevelopmentCard';

export default function AdminAnalyticsView() {
    return (
        <div className="mt-8">
            <DevelopmentCard
                icon={TrendingUp}
                title="Análisis de ventas y métricas"
                description="Los gráficos, estadísticas y análisis detallados sobre ventas, productos populares, tendencias y métricas clave estarán disponibles próximamente."
            />
        </div>
    )
}
